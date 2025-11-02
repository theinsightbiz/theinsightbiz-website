// src/components/FluidCursor.jsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export default function FluidCursor({
  simResolution = 128,
  dyeResolution = 1440,
  captureResolution = 512,
  densityDissipation = 3.5,
  velocityDissipation = 2,
  pressure = 0.1,
  pressureIterations = 20,
  curl = 3,
  splatRadius = 0.2,
  splatForce = 6000,
  shading = true,
  colorUpdateSpeed = 10,
  backColor = { r: 0, g: 0, b: 0 },
  transparent = true,
}) {
  const hostRef = useRef(null);

  // Create a fixed host under <body> once
  if (!hostRef.current && typeof document !== "undefined") {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.inset = "0";
    host.style.zIndex = "2";            // behind app
    host.style.pointerEvents = "none";  // never capture input
    host.style.background = "transparent";
    document.body.appendChild(host);
    hostRef.current = host;
  }

  useEffect(() => {
    if (!supportsWebGL()) return;

    let cleanup = () => {};

    try {
      const canvas = document.createElement("canvas");
      canvas.id = "fluid";
      canvas.style.position = "fixed";
      canvas.style.left = "0";
      canvas.style.top = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "2";
      canvas.style.background = "transparent";
      hostRef.current?.appendChild(canvas);

      // ---------------- Pointers & Config ----------------
      const pointerPrototype = () => ({
        id: -1,
        texcoordX: 0, texcoordY: 0,
        prevTexcoordX: 0, prevTexcoordY: 0,
        deltaX: 0, deltaY: 0,
        down: false, moved: false,
        color: { r: 0, g: 0, b: 0 },
      });
      const pointers = [pointerPrototype()];

      const config = {
        SIM_RESOLUTION: simResolution,
        DYE_RESOLUTION: dyeResolution,
        CAPTURE_RESOLUTION: captureResolution,
        DENSITY_DISSIPATION: densityDissipation,
        VELOCITY_DISSIPATION: velocityDissipation,
        PRESSURE: pressure,
        PRESSURE_ITERATIONS: pressureIterations,
        CURL: curl,
        SPLAT_RADIUS: splatRadius,
        SPLAT_FORCE: splatForce,
        SHADING: shading,
        COLOR_UPDATE_SPEED: colorUpdateSpeed,
        PAUSED: false,
        BACK_COLOR: backColor,
        TRANSPARENT: transparent,
      };

      // ---------------- WebGL Setup ----------------
      function getWebGLContext(canvasEl) {
        const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
        let gl = canvasEl.getContext("webgl2", params);
        if (!gl) gl = canvasEl.getContext("webgl", params) || canvasEl.getContext("experimental-webgl", params);
        if (!gl) return { gl: null, ext: null };

        const isWebGL2 = "drawBuffers" in gl;
        let supportLinearFiltering = false;
        let halfFloat = null;

        if (isWebGL2) {
          gl.getExtension("EXT_color_buffer_float");
          supportLinearFiltering = !!gl.getExtension("OES_texture_float_linear");
        } else {
          halfFloat = gl.getExtension("OES_texture_half_float");
          supportLinearFiltering = !!gl.getExtension("OES_texture_half_float_linear");
        }

        // Transparent clear so canvas never blanks app
        gl.clearColor(config.BACK_COLOR.r, config.BACK_COLOR.g, config.BACK_COLOR.b, config.TRANSPARENT ? 0 : 1);

        const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat && halfFloat.HALF_FLOAT_OES) || 0;

        function supportRenderTextureFormat(gl2, internalFormat, format, type) {
          const texture = gl2.createTexture();
          if (!texture) return false;
          gl2.bindTexture(gl2.TEXTURE_2D, texture);
          gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.NEAREST);
          gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.NEAREST);
          gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
          gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
          gl2.texImage2D(gl2.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
          const fbo = gl2.createFramebuffer();
          if (!fbo) return false;
          gl2.bindFramebuffer(gl2.FRAMEBUFFER, fbo);
          gl2.framebufferTexture2D(gl2.FRAMEBUFFER, gl2.COLOR_ATTACHMENT0, gl2.TEXTURE_2D, texture, 0);
          return gl2.checkFramebufferStatus(gl2.FRAMEBUFFER) === gl2.FRAMEBUFFER_COMPLETE;
        }

        function getSupportedFormat(gl2, internalFormat, format, type) {
          if (!supportRenderTextureFormat(gl2, internalFormat, format, type)) {
            if ("drawBuffers" in gl2) {
              switch (internalFormat) {
                case gl2.R16F:   return getSupportedFormat(gl2, gl2.RG16F,   gl2.RG,   type);
                case gl2.RG16F:  return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);
                default:         return null;
              }
            }
            return null;
          }
          return { internalFormat, format };
        }

        let formatRGBA, formatRG, formatR;
        if (isWebGL2) {
          formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
          formatRG   = getSupportedFormat(gl, gl.RG16F,  gl.RG,   halfFloatTexType);
          formatR    = getSupportedFormat(gl, gl.R16F,   gl.RED,  halfFloatTexType);
        } else {
          formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
          formatRG   = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
          formatR    = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        }

        return {
          gl,
          ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering },
        };
      }

      const addKeywords = (src, kws) => (!kws ? src : kws.map(k => `#define ${k}\n`).join("") + src);

      const { gl, ext } = getWebGLContext(canvas);
      if (!gl || !ext) return;

      const compileShader = (type, source, keywords = null) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, addKeywords(source, keywords));
        gl.compileShader(shader);
        return shader;
      };
      const createProgram = (vs, fs) => {
        if (!vs || !fs) return null;
        const p = gl.createProgram();
        if (!p) return null;
        gl.attachShader(p, vs);
        gl.attachShader(p, fs);
        gl.linkProgram(p);
        return p;
      };
      const getUniforms = (program) => {
        const uniforms = {};
        const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < n; i++) {
          const info = gl.getActiveUniform(program, i);
          if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
        }
        return uniforms;
      };

      class Program {
        constructor(vs, fs) {
          this.program = createProgram(vs, fs);
          this.uniforms = this.program ? getUniforms(this.program) : {};
        }
        bind() { if (this.program) gl.useProgram(this.program); }
      }
      class Material {
        constructor(vertexShader, fragmentShaderSource) {
          this.vertexShader = vertexShader;
          this.fragmentShaderSource = fragmentShaderSource;
          this.programs = {};
          this.activeProgram = null;
          this.uniforms = {};
        }
        setKeywords(keywords) {
          let hash = 0;
          for (const kw of keywords) hash = ((hash << 5) - hash + kw.charCodeAt(0)) | 0;
          let program = this.programs[hash];
          if (!program) {
            const fs = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
            program = createProgram(this.vertexShader, fs);
            this.programs[hash] = program;
          }
          if (program !== this.activeProgram) {
            this.activeProgram = program;
            if (program) this.uniforms = getUniforms(program);
          }
        }
        bind() { if (this.activeProgram) gl.useProgram(this.activeProgram); }
      }

      // ---------------- Shaders ----------------
      const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv,vL,vR,vT,vB;
        uniform vec2 texelSize;
        void main(){
          vUv = aPosition*0.5+0.5;
          vL = vUv - vec2(texelSize.x,0.);
          vR = vUv + vec2(texelSize.x,0.);
          vT = vUv + vec2(0.,texelSize.y);
          vB = vUv - vec2(0.,texelSize.y);
          gl_Position = vec4(aPosition,0.,1.);
        }
      `);

      const copyShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv; uniform sampler2D uTexture;
        void main(){ gl_FragColor = texture2D(uTexture,vUv); }
      `);

      const clearShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
        void main(){ gl_FragColor = value * texture2D(uTexture,vUv); }
      `);

      const displayShaderSource = `
        precision highp float; precision highp sampler2D;
        varying vec2 vUv,vL,vR,vT,vB;
        uniform sampler2D uTexture;
        uniform vec2 texelSize;
        void main(){
          vec3 c = texture2D(uTexture,vUv).rgb;
          #ifdef SHADING
            vec3 lc=texture2D(uTexture,vL).rgb, rc=texture2D(uTexture,vR).rgb;
            vec3 tc=texture2D(uTexture,vT).rgb, bc=texture2D(uTexture,vB).rgb;
            float dx=length(rc)-length(lc), dy=length(tc)-length(bc);
            vec3 n = normalize(vec3(dx,dy,length(texelSize)));
            vec3 l = vec3(0.,0.,1.);
            float diff = clamp(dot(n,l)+0.7,0.7,1.0);
            c*=diff;
          #endif
          float a = max(c.r,max(c.g,c.b));
          gl_FragColor = vec4(c, a);
        }
      `;

      const splatShader = compileShader(gl.FRAGMENT_SHADER, `
        precision highp float; precision highp sampler2D;
        varying vec2 vUv; uniform sampler2D uTarget;
        uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
        void main(){
          vec2 p = vUv - point;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p,p)/radius) * color;
          vec3 base = texture2D(uTarget,vUv).xyz;
          gl_FragColor = vec4(base+splat,1.0);
        }
      `);

      const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
        precision highp float; precision highp sampler2D;
        varying vec2 vUv; uniform sampler2D uVelocity,uSource;
        uniform vec2 texelSize,dyeTexelSize; uniform float dt,dissipation;
        vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize){
          vec2 st = uv/tsize-0.5, i=floor(st), f=fract(st);
          vec4 a=texture2D(sam,(i+vec2(.5,.5))*tsize);
          vec4 b=texture2D(sam,(i+vec2(1.5,.5))*tsize);
          vec4 c=texture2D(sam,(i+vec2(.5,1.5))*tsize);
          vec4 d=texture2D(sam,(i+vec2(1.5,1.5))*tsize);
          return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
        }
        void main(){
          #ifdef MANUAL_FILTERING
            vec2 coord = vUv - dt*bilerp(uVelocity,vUv,texelSize).xy * texelSize;
            vec4 result = bilerp(uSource,coord,dyeTexelSize);
          #else
            vec2 coord = vUv - dt*texture2D(uVelocity,vUv).xy*texelSize;
            vec4 result = texture2D(uSource,coord);
          #endif
          float decay = 1.0 + dissipation*dt;
          gl_FragColor = result/decay;
        }
      `, ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]);

      const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv,vL,vR,vT,vB;
        uniform sampler2D uVelocity;
        void main(){
          float L=texture2D(uVelocity,vL).x, R=texture2D(uVelocity,vR).x;
          float T=texture2D(uVelocity,vT).y, B=texture2D(uVelocity,vB).y;
          vec2 C = texture2D(uVelocity,vUv).xy;
          if (vL.x<0.) L=-C.x; if (vR.x>1.) R=-C.x; if (vT.y>1.) T=-C.y; if (vB.y<0.) B=-C.y;
          float div = .5*(R-L+T-B);
          gl_FragColor = vec4(div,0,0,1);
        }
      `);

      const curlShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv,vL,vR,vT,vB;
        uniform sampler2D uVelocity;
        void main(){
          float L=texture2D(uVelocity,vL).y, R=texture2D(uVelocity,vR).y;
          float T=texture2D(uVelocity,vT).x, B=texture2D(uVelocity,vB).x;
          float vort = R - L - T + B;
          gl_FragColor = vec4(.5*vort,0,0,1);
        }
      `);

      const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
        precision highp float; precision highp sampler2D;
        varying vec2 vUv,vL,vR,vT,vB;
        uniform sampler2D uVelocity,uCurl; uniform float curl,dt;
        void main(){
          float L=texture2D(uCurl,vL).x, R=texture2D(uCurl,vR).x;
          float T=texture2D(uCurl,vT).x, B=texture2D(uCurl,vB).x, C=texture2D(uCurl,vUv).x;
          vec2 force = .5*vec2(abs(T)-abs(B), abs(R)-abs(L));
          force /= length(force)+.0001; force *= curl*C; force.y *= -1.;
          vec2 vel = texture2D(uVelocity,vUv).xy; vel += force*dt; vel = clamp(vel,-1000.,1000.);
          gl_FragColor = vec4(vel,0,1);
        }
      `);

      const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv,vL,vR,vT,vB;
        uniform sampler2D uPressure,uDivergence;
        void main(){
          float L=texture2D(uPressure,vL).x, R=texture2D(uPressure,vR).x;
          float T=texture2D(uPressure,vT).x, B=texture2D(uPressure,vB).x;
          float C=texture2D(uPressure,vUv).x, div=texture2D(uDivergence,vUv).x;
          float p = .25*(L+R+B+T - div);
          gl_FragColor = vec4(p,0,0,1);
        }
      `);

      const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float; precision mediump sampler2D;
        varying highp vec2 vUv,vL,vR,vT,vB;
        uniform sampler2D uPressure,uVelocity;
        void main(){
          float L=texture2D(uPressure,vL).x, R=texture2D(uPressure,vR).x;
          float T=texture2D(uPressure,vT).x, B=texture2D(uPressure,vB).x;
          vec2 v = texture2D(uVelocity,vUv).xy; v.xy -= vec2(R-L, T-B);
          gl_FragColor = vec4(v,0,1);
        }
      `);

      // ---------------- Fullscreen Quad ----------------
      const blit = (() => {
        const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
        const elem = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elem);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        return (target, doClear = false) => {
          if (!target) { gl.viewport(0,0,gl.drawingBufferWidth, gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER,null); }
          else { gl.viewport(0,0,target.width,target.height); gl.bindFramebuffer(gl.FRAMEBUFFER,target.fbo); }
          if (doClear){ gl.clear(gl.COLOR_BUFFER_BIT); }
          gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        };
      })();

      // ---------------- FBO helpers ----------------
      let dye, velocity, divergence, curlTex, pressureTex;

      const copyProgram = new Program(baseVertexShader, copyShader);
      const clearProgram = new Program(baseVertexShader, clearShader);
      const splatProgram = new Program(baseVertexShader, splatShader);
      const advectionProgram = new Program(baseVertexShader, advectionShader);
      const divergenceProgram = new Program(baseVertexShader, divergenceShader);
      const curlProgram = new Program(baseVertexShader, curlShader);
      const vorticityProgram = new Program(baseVertexShader, vorticityShader);
      const pressureProgram = new Program(baseVertexShader, pressureShader);
      const gradientSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
      const displayMaterial = new Material(baseVertexShader, displayShaderSource);

      function createFBO(w,h,internalFormat,format,type,param){
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
        const fbo = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0,0,w,h); gl.clear(gl.COLOR_BUFFER_BIT);
        const texelSizeX = 1/w, texelSizeY = 1/h;
        return { texture, fbo, width:w, height:h, texelSizeX, texelSizeY, attach(id){ gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
      }
      function createDoubleFBO(w,h,internalFormat,format,type,param){
        const f1 = createFBO(w,h,internalFormat,format,type,param);
        const f2 = createFBO(w,h,internalFormat,format,type,param);
        return { width:w, height:h, texelSizeX:f1.texelSizeX, texelSizeY:f1.texelSizeY, read:f1, write:f2, swap(){ const t=this.read; this.read=this.write; this.write=t; } };
      }
      function resizeFBO(target,w,h,internalFormat,format,type,param){
        const n = createFBO(w,h,internalFormat,format,type,param);
        copyProgram.bind(); copyProgram.uniforms.uTexture && gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
        blit(n,false); return n;
      }
      function resizeDoubleFBO(target,w,h,internalFormat,format,type,param){
        if (target.width===w && target.height===h) return target;
        target.read = resizeFBO(target.read,w,h,internalFormat,format,type,param);
        target.write = createFBO(w,h,internalFormat,format,type,param);
        target.width=w; target.height=h; target.texelSizeX=1/w; target.texelSizeY=1/h; return target;
      }
      function getResolution(resolution){
        const w=gl.drawingBufferWidth, h=gl.drawingBufferHeight;
        const aspect = (w/h) < 1 ? h/w : w/h;
        const min=Math.round(resolution), max=Math.round(resolution*aspect);
        return (w>h) ? { width:max, height:min } : { width:min, height:max };
      }
      // ---- SINGLE helper definition (used everywhere) ----
      function scaleByPixelRatio(n){ const r = window.devicePixelRatio||1; return Math.floor(n*r); }

      function updateKeywords(){ const ks=[]; if (config.SHADING) ks.push("SHADING"); displayMaterial.setKeywords(ks); }
      function initFramebuffers(){
        const simRes = getResolution(config.SIM_RESOLUTION);
        const dyeRes = getResolution(config.DYE_RESOLUTION);
        const texType = ext.halfFloatTexType;
        const rgba = ext.formatRGBA, rg = ext.formatRG, r = ext.formatR;
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
        gl.disable(gl.BLEND);

        if (!dye) dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        else dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

        if (!velocity) velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        else velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

        divergence  = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        curlTex     = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        pressureTex = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      }
      updateKeywords();
      initFramebuffers();

      // ---------------- Sim loop ----------------
      const wrap = (val,min,max)=>{ const range=max-min; if (range===0) return min; return ((val-min)%range)+min; };
      function generateColor(){ const c=HSVtoRGB(Math.random(),1,1); c.r*=.15; c.g*=.15; c.b*=.15; return c; }
      function HSVtoRGB(h,s,v){ let r=0,g=0,b=0; const i=Math.floor(h*6), f=h*6-i, p=v*(1-s), q=v*(1-f*s), t=v*(1-(1-f)*s);
        switch(i%6){ case 0:r=v;g=t;b=p;break; case 1:r=q;g=v;b=p;break; case 2:r=p;g=v;b=t;break; case 3:r=p;g=q;b=v;break; case 4:r=t;g=p;b=v;break; case 5:r=v;g=p;b=q;break; }
        return { r,g,b };
      }

      let lastUpdateTime = Date.now();
      let colorUpdateTimer = 0;
      let rafId = 0; // SINGLE declaration

      function calcDeltaTime(){ const now=Date.now(); let dt=(now-lastUpdateTime)/1000; dt=Math.min(dt,0.016666); lastUpdateTime=now; return dt; }
      function resizeCanvas(){ const w=scaleByPixelRatio(canvas.clientWidth), h=scaleByPixelRatio(canvas.clientHeight);
        if (canvas.width!==w || canvas.height!==h){ canvas.width=w; canvas.height=h; return true; } return false; }
      function updateColors(dt){ colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
        if (colorUpdateTimer >= 1){ colorUpdateTimer = wrap(colorUpdateTimer,0,1); pointers.forEach(p => { p.color = generateColor(); }); } }
      function applyInputs(){ for (const p of pointers){ if (p.moved){ p.moved=false; splatPointer(p); } } }

      function step(dt){
        gl.disable(gl.BLEND);

        // curl
        curlProgram.bind();
        curlProgram.uniforms.texelSize && gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        curlProgram.uniforms.uVelocity && gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
        blit(curlTex);

        // vorticity
        vorticityProgram.bind();
        vorticityProgram.uniforms.texelSize && gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        vorticityProgram.uniforms.uVelocity && gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
        vorticityProgram.uniforms.uCurl && gl.uniform1i(vorticityProgram.uniforms.uCurl, curlTex.attach(1));
        vorticityProgram.uniforms.curl && gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
        vorticityProgram.uniforms.dt && gl.uniform1f(vorticityProgram.uniforms.dt, dt);
        blit(velocity.write); velocity.swap();

        // divergence
        divergenceProgram.bind();
        divergenceProgram.uniforms.texelSize && gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        divergenceProgram.uniforms.uVelocity && gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
        blit(divergence);

        // clear pressure
        clearProgram.bind();
        clearProgram.uniforms.uTexture && gl.uniform1i(clearProgram.uniforms.uTexture, pressureTex.read.attach(0));
        clearProgram.uniforms.value && gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
        blit(pressureTex.write); pressureTex.swap();

        // pressure
        pressureProgram.bind();
        pressureProgram.uniforms.texelSize && gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        pressureProgram.uniforms.uDivergence && gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
        for (let i=0;i<config.PRESSURE_ITERATIONS;i++){
          pressureProgram.uniforms.uPressure && gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTex.read.attach(1));
          blit(pressureTex.write); pressureTex.swap();
        }

        // gradient subtract
        gradientSubtractProgram.bind();
        gradientSubtractProgram.uniforms.texelSize && gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gradientSubtractProgram.uniforms.uPressure && gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressureTex.read.attach(0));
        gradientSubtractProgram.uniforms.uVelocity && gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
        blit(velocity.write); velocity.swap();

        // advection velocity
        advectionProgram.bind();
        advectionProgram.uniforms.texelSize && gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize)
          gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
        const velId = velocity.read.attach(0);
        advectionProgram.uniforms.uVelocity && gl.uniform1i(advectionProgram.uniforms.uVelocity, velId);
        advectionProgram.uniforms.uSource && gl.uniform1i(advectionProgram.uniforms.uSource, velId);
        advectionProgram.uniforms.dt && gl.uniform1f(advectionProgram.uniforms.dt, dt);
        advectionProgram.uniforms.dissipation && gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
        blit(velocity.write); velocity.swap();

        // advection dye
        if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize)
          gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
        advectionProgram.uniforms.uVelocity && gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
        advectionProgram.uniforms.uSource && gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
        advectionProgram.uniforms.dissipation && gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
        blit(dye.write); dye.swap();
      }

      function render(target){
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        const width = target ? target.width : gl.drawingBufferWidth;
        const height = target ? target.height : gl.drawingBufferHeight;
        displayMaterial.bind();
        if (config.SHADING && displayMaterial.uniforms.texelSize)
          gl.uniform2f(displayMaterial.uniforms.texelSize, 1/width, 1/height);
        displayMaterial.uniforms.uTexture && gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
        blit(target,false);
      }

      function updateFrame(){
        const dt = calcDeltaTime();
        if (resizeCanvas()) initFramebuffers();
        updateColors(dt);
        applyInputs();
        step(dt);
        render(null);
        rafId = requestAnimationFrame(updateFrame);
      }

      // ---------------- Interaction ----------------
      function splatPointer(p){ const dx=p.deltaX*config.SPLAT_FORCE, dy=p.deltaY*config.SPLAT_FORCE; splat(p.texcoordX,p.texcoordY,dx,dy,p.color); }
      function clickSplat(p){ const c=generateColor(); c.r*=10; c.g*=10; c.b*=10; const dx=10*(Math.random()-.5), dy=30*(Math.random()-.5); splat(p.texcoordX,p.texcoordY,dx,dy,c); }
      function splat(x,y,dx,dy,color){
        splatProgram.bind();
        splatProgram.uniforms.uTarget && gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
        splatProgram.uniforms.aspectRatio && gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width/canvas.height);
        splatProgram.uniforms.point && gl.uniform2f(splatProgram.uniforms.point, x, y);
        splatProgram.uniforms.color && gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0);
        splatProgram.uniforms.radius && gl.uniform1f(splatProgram.uniforms.radius, (function correctRadius(r){ const ar=canvas.width/canvas.height; if (ar>1) r*=ar; return r; })(config.SPLAT_RADIUS/100));
        blit(velocity.write); velocity.swap();

        splatProgram.uniforms.uTarget && gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
        splatProgram.uniforms.color && gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
        blit(dye.write); dye.swap();
      }

      function updatePointerDownData(p,id,x,y){
        p.id=id; p.down=true; p.moved=false;
        p.texcoordX=x/canvas.width; p.texcoordY=1-y/canvas.height;
        p.prevTexcoordX=p.texcoordX; p.prevTexcoordY=p.texcoordY;
        p.deltaX=0; p.deltaY=0; p.color=generateColor();
      }
      function updatePointerMoveData(p,x,y,color){
        p.prevTexcoordX=p.texcoordX; p.prevTexcoordY=p.texcoordY;
        p.texcoordX=x/canvas.width; p.texcoordY=1-y/canvas.height;
        const ar = canvas.width/canvas.height;
        p.deltaX = (p.texcoordX-p.prevTexcoordX) * (ar<1 ? ar : 1);
        p.deltaY = (p.texcoordY-p.prevTexcoordY) / (ar>1 ? ar : 1);
        p.moved = Math.abs(p.deltaX)>0 || Math.abs(p.deltaY)>0;
        p.color=color;
      }
      function updatePointerUpData(p){ p.down=false; }

      // Use the single helper defined above
      const mousedown = (e)=>{ const p=pointers[0]; updatePointerDownData(p,-1,scaleByPixelRatio(e.clientX),scaleByPixelRatio(e.clientY)); clickSplat(p); };
      const firstMouseMove = (e)=>{ const p=pointers[0]; updateFrame(); updatePointerMoveData(p,scaleByPixelRatio(e.clientX),scaleByPixelRatio(e.clientY),generateColor()); document.body.removeEventListener("mousemove", firstMouseMove); };
      const mousemove = (e)=>{ const p=pointers[0]; updatePointerMoveData(p,scaleByPixelRatio(e.clientX),scaleByPixelRatio(e.clientY),p.color); };

      const firstTouchStart = (e)=>{ const t=e.targetTouches, p=pointers[0]; for (let i=0;i<t.length;i++){ updateFrame(); updatePointerDownData(p,t[i].identifier,scaleByPixelRatio(t[i].clientX),scaleByPixelRatio(t[i].clientY)); } document.body.removeEventListener("touchstart", firstTouchStart); };
      const touchstart = (e)=>{ const t=e.targetTouches, p=pointers[0]; for (let i=0;i<t.length;i++){ updatePointerDownData(p,t[i].identifier,scaleByPixelRatio(t[i].clientX),scaleByPixelRatio(t[i].clientY)); } };
      const touchmove = (e)=>{ const t=e.targetTouches, p=pointers[0]; for (let i=0;i<t.length;i++){ updatePointerMoveData(p,scaleByPixelRatio(t[i].clientX),scaleByPixelRatio(t[i].clientY),p.color); } };
      const touchend = ()=>{ const p=pointers[0]; updatePointerUpData(p); };

      window.addEventListener("mousedown", mousedown);
      document.body.addEventListener("mousemove", firstMouseMove);
      window.addEventListener("mousemove", mousemove);
      document.body.addEventListener("touchstart", firstTouchStart, { passive: true });
      window.addEventListener("touchstart", touchstart, { passive: true });
      window.addEventListener("touchmove", touchmove, { passive: true });
      window.addEventListener("touchend", touchend);

      // Start one frame so it runs even before moving
      rafId = requestAnimationFrame(updateFrame);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousedown", mousedown);
        document.body.removeEventListener("mousemove", firstMouseMove);
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("touchstart", firstTouchStart);
        window.removeEventListener("touchstart", touchstart);
        window.removeEventListener("touchmove", touchmove);
        window.removeEventListener("touchend", touchend);
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    } catch {
      // silently disable effect on failure
    }
    return () => { try { cleanup && cleanup(); } catch {} };
  }, [
    simResolution, dyeResolution, captureResolution,
    densityDissipation, velocityDissipation, pressure, pressureIterations,
    curl, splatRadius, splatForce, shading, colorUpdateSpeed,
    backColor?.r, backColor?.g, backColor?.b, transparent,
  ]);

  // Canvas is portaled to <body>; nothing to render in tree
  return hostRef.current ? createPortal(null, hostRef.current) : null;
}

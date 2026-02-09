import React from "react";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/not-found.json";

export default function Notfound() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "#ffffff",
        backgroundImage: "none",
      }}
    >
      <Lottie
        animationData={notFoundAnimation}
        loop={true}
        style={{ width: "min(560px, 92vw)", height: "auto" }}
      />
    </div>
  );
}

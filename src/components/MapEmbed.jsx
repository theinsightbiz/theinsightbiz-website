import React from 'react'

export default function MapEmbed(){
  const q = encodeURIComponent('A-272, Block A, Surajmal Vihar, New Delhi- 110092')
  const src = `https://www.google.com/maps?q=${q}&output=embed`
  return (
    <div className="map-embed">
      <iframe title="Insight Biz Location" src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

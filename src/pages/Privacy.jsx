import React from 'react'

export default function Privacy(){
  return (
    <section className="page wide">
      <div className="pr-hero">
        <span className="ribbon" aria-hidden="true"></span>
        <h1>Privacy Policy</h1>
        <p>Your data, safeguarded—transparent controls and compliance.</p>
      </div>

      <article className="panel-premium" style={{marginTop:'1.2rem'}}>
        <p>
          We value your privacy. Any information you share with us via forms or communication channels is used solely to
          respond to your queries, provide services you request, and improve our offerings. We do not sell your data to third parties.
          Where we use third-party services (e.g., analytics, mapping), their respective privacy policies apply.
        </p>
        <p>
          You may request access, correction, or deletion of your information by contacting us at contact@theinsightbiz.com.
          We implement reasonable technical and organizational measures to safeguard your data.
        </p>
        <p>
          By using this website, you consent to this policy. Updates to this policy will be posted on this page.
        </p>
      </article>
    </section>
  )
}

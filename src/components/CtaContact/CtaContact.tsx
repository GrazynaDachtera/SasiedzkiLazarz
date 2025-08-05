"use client";

import React, { useState } from "react";
import "./CtaContact.scss";

export default function CtaContact() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 👉 hook up your submission logic here (API call, etc.)
    console.log("Submitted e-mail:", email);
  };

  return (
    <section className="cta-contact">
      <div className="cta-contact__container">
        {/* left side – copy */}
        <div className="cta-contact__content">
          <h2>Zapisz się do newslettera!</h2>
        </div>

        {/* right side – form */}
        <form className="cta-contact__form" onSubmit={handleSubmit}>
          <label htmlFor="cta-contact-email" className="sr-only">
            Adres e-mail
          </label>

          <input
            id="cta-contact-email"
            type="email"
            placeholder="Wpisz adres mailowy"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Zapisz się!</button>

          <label className="cta-contact__checkbox">
            <input type="checkbox" required />
            <span>
              Wyrażam zgodę na otrzymywanie newslettera na wskazany przeze mnie
              adres&nbsp;e-mail
            </span>
          </label>
        </form>
      </div>
    </section>
  );
}

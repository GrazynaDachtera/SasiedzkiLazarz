"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import emailjs from "@emailjs/browser";
import "./ContactComponent.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="arrow-icon"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.57-1.15a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16v16H4z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 22s-7-5.14-7-11a7 7 0 1 1 14 0c0 5.86-7 11-7 11z" />
    <circle cx="12" cy="11" r="2.5" />
  </svg>
);

export default function ContactComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    const honey = (
      formRef.current.querySelector(
        'input[name="bot_honey"]'
      ) as HTMLInputElement | null
    )?.value;
    if (honey) return;

    const rodoCb = formRef.current.querySelector<HTMLInputElement>(
      "input[name='consent_rodo']"
    )!;
    const mktCb = formRef.current.querySelector<HTMLInputElement>(
      "input[name='consent_marketing']"
    )!;

    formRef.current
      .querySelectorAll(
        "input[type='hidden'][name='consent_rodo'], input[type='hidden'][name='consent_marketing']"
      )
      .forEach((el) => el.remove());

    rodoCb.disabled = true;
    mktCb.disabled = true;

    const rodoHidden = document.createElement("input");
    rodoHidden.type = "hidden";
    rodoHidden.name = "consent_rodo";
    rodoHidden.value = rodoCb.checked ? "Tak" : "Nie";

    const mktHidden = document.createElement("input");
    mktHidden.type = "hidden";
    mktHidden.name = "consent_marketing";
    mktHidden.value = mktCb.checked ? "Tak" : "Nie";

    formRef.current.appendChild(rodoHidden);
    formRef.current.appendChild(mktHidden);

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string }
      );
      formRef.current.reset();
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg("Ups… Nie udało się wysłać wiadomości. Spróbuj ponownie.");
      setStatus("error");
    } finally {
      rodoCb.disabled = false;
      mktCb.disabled = false;
    }
  }

  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=ul.+U%C5%82a%C5%84ska+5%2C+60-748+Pozna%C5%84";

  return (
    <section className={`Contact ${poppins.className}`}>
      <div className="contact-top">
        <div className="contact-container contact-grid">
          <div className="contact-form">
            <h1 className="contact-title">Kontakt</h1>

            <form
              ref={formRef}
              className="form"
              onSubmit={handleSubmit}
              noValidate
            >
              <input
                type="text"
                name="bot_honey"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" name="page_url" value="/kontakt" />

              <p aria-live="polite" style={{ margin: 0 }}>
                {status === "sending" && "Wysyłanie…"}
                {status === "sent" && (
                  <span className="security">
                    <ShieldIcon /> Dziękujemy! Wiadomość wysłana.
                  </span>
                )}
                {status === "error" && (
                  <span style={{ color: "#c00" }}>{errorMsg}</span>
                )}
              </p>

              <div className="row full">
                <label className="sr-only" htmlFor="name">
                  Imię i nazwisko / Firma
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Imię i nazwisko / Firma"
                  required
                />
              </div>

              <div className="row two">
                <div>
                  <label className="sr-only" htmlFor="phone">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Telefon"
                    inputMode="tel"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                  />
                </div>
              </div>

              <div className="row full">
                <label className="sr-only" htmlFor="message">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Wiadomość"
                  rows={6}
                  required
                />
              </div>

              <label className="consent">
                <input type="checkbox" name="consent_rodo" required />
                <span>
                  Zgoda na przetwarzanie danych osobowych{" "}
                  <span className="required">*</span>
                </span>
              </label>

              <label className="consent">
                <input type="checkbox" name="consent_marketing" />
                <span>Zgoda marketingowa</span>
              </label>

              <p className="security">
                <ShieldIcon /> <span>Twoje dane są bezpieczne</span>
              </p>

              <button
                type="submit"
                className="submit"
                disabled={status === "sending"}
              >
                <span>
                  {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
                </span>
                <ArrowIcon />
              </button>
            </form>
          </div>

          <div className="contact-hero">
            <Image
              src="/Contact/person.png"
              alt="Portret osoby"
              width={620}
              height={560}
              priority
              sizes="(max-width: 992px) 90vw, 620px"
            />
          </div>
        </div>
      </div>

      <div className="contact-strip">
        <div className="contact-container strip-grid">
          <div className="strip-item">
            <div className="icon" aria-hidden="true">
              <PhoneIcon />
            </div>
            <div className="meta">
              <p className="label">Biuro:</p>
              <a href="tel:605550370" className="value">
                605 550 370
              </a>
            </div>
          </div>

          <div
            className="strip-item"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div className="icon" aria-hidden="true">
              <PinIcon />
            </div>
            <div
              className="meta"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <a
                className="value"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                itemProp="name"
              >
                Sąsiedzki Łazarz
              </a>
              <p className="label" aria-label="Adres">
                <span itemProp="streetAddress">ul. Ułańska 5</span>,{" "}
                <span itemProp="postalCode">60-748</span>{" "}
                <span itemProp="addressLocality">Poznań</span>
              </p>
            </div>
          </div>

          <div className="strip-item">
            <div className="icon" aria-hidden="true">
              <MailIcon />
            </div>
            <div className="meta">
              <p className="label">E-mail:</p>
              <a href="mailto:kontakt@sasiedzkilazarz.pl" className="value">
                kontakt@sasiedzkilazarz.pl
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

if (typeof window !== "undefined") {
  console.log("EmailJS vars:", {
    service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  });
}

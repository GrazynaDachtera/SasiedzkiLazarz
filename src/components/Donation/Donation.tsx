"use client";

import { useCallback, useState } from "react";
import "./Donation.scss";

type Line =
  | { kind: "text"; text: string }
  | { kind: "label"; label: string; text: string; boldText?: boolean }
  | { kind: "title"; text: string }
  | { kind: "mixed"; before: string; strong: string; after: string };

const RULES: Line[] = [
  {
    kind: "text",
    text: "Jesteśmy lokalną organizacją, która od lat pracuje na rzecz mieszkańców Osiedla Święty Łazarz. Organizujemy wydarzenia sąsiedzkie, warsztaty, akcje porządkowe oraz projekty wspierające integrację i bezpieczeństwo w naszej dzielnicy. Wszystkie działania finansujemy dzięki składkom członkowskim, dotacjom oraz darowiznom od mieszkańców i sympatyków.",
  },
  { kind: "title", text: "Jak możesz pomóc?" },
  {
    kind: "text",
    text: "Najprostszym sposobem jest wpłata darowizny na nasze konto bankowe. Nawet niewielka kwota ma realny wpływ - pomaga w zakupie materiałów, logistycznym wsparciu wydarzeń i promocji działań społecznych.",
  },
  { kind: "title", text: "Dane do przelewu:" },
  {
    kind: "label",
    label: "Nazwa:",
    text: "Stowarzyszenie Sąsiedzki Łazarz",
    boldText: true,
  },
  {
    kind: "label",
    label: "Numer konta bankowego:",
    text: "65 1090 1476 0000 0001 6175 6613",
    boldText: true,
  },
  {
    kind: "label",
    label: "Proponowane pole tytułu przelewu:",
    text: "Darowizna na cele statutowe - [Twoje imię]",
  },
  { kind: "title", text: "Przejrzystość i podziękowania" },
  {
    kind: "text",
    text: "Rozliczamy się jawnie - darowizny są wykorzystywane zgodnie ze statutem stowarzyszenia. Po dokonaniu wpłaty chętnie wyślemy podziękowanie i informację, na co przeznaczyliśmy środki (jeśli podasz kontakt mailowy). Dziękujemy za zaufanie i wsparcie naszego lokalnego sąsiedztwa!",
  },
];

export default function DonationPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (val: string) => {
    const digitsOnly = val.replace(/\D/g, "");
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(digitsOnly);
      } else {
        const ta = document.createElement("textarea");
        ta.value = digitsOnly;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }, []);

  return (
    <main className="help-wrapper">
      <h1 className="help-title">Ty też możesz pomóc</h1>

      <section className="help-content">
        <h2 className="help-subtitle">
          Wesprzyj Stowarzyszenie Sąsiedzki Łazarz
        </h2>

        <div className="help-text">
          {RULES.map((item, i) => {
            if (item.kind === "title") {
              return (
                <p key={i}>
                  <strong>{item.text}</strong>
                </p>
              );
            }

            if (item.kind === "label") {
              const isAccount = item.label
                .toLowerCase()
                .includes("numer konta");
              const isName = item.label.toLowerCase().startsWith("nazwa");

              return (
                <p key={i} className={isAccount ? "copy-line" : undefined}>
                  <strong>{item.label}</strong>{" "}
                  {item.boldText ? (
                    <strong
                      className={isAccount || isName ? "as-text" : undefined}
                    >
                      {item.text}
                    </strong>
                  ) : (
                    item.text
                  )}
                  {isAccount && (
                    <>
                      <button
                        type="button"
                        className={`copy-btn${copied ? " is-copied" : ""}`}
                        onClick={() => handleCopy(item.text)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleCopy(item.text);
                          }
                        }}
                        aria-live="polite"
                        aria-label="Skopiuj numer konta do schowka"
                        title="Skopiuj numer konta (bez spacji)"
                      >
                        {copied ? "Skopiowano!" : "Kopiuj"}
                      </button>
                      <span className="sr-only">
                        {copied ? "Numer konta skopiowany do schowka" : ""}
                      </span>
                    </>
                  )}
                </p>
              );
            }

            if (item.kind === "mixed") {
              return (
                <p key={i}>
                  {item.before}
                  <strong>{item.strong}</strong>
                  {item.after}
                </p>
              );
            }

            return <p key={i}>{item.text}</p>;
          })}
        </div>
      </section>
    </main>
  );
}

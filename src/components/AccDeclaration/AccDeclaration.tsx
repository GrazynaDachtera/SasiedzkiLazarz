"use client";

import "./AccDeclaration.scss";
import React, { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  title: React.ReactNode;
  body?: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "s1",
    title: (
      <>
        Deklaracja dostępności dotyczy strony internetowej{" "}
        <a
          href="https://sasiedzkilazarz.pl"
          target="_blank"
          rel="noopener noreferrer"
        >
          sasiedzkilazarz.pl
        </a>
        .
      </>
    ),
  },
  {
    id: "s2",
    title:
      "Sąsiedzki Łazarz zobowiązuje się dołożyć wszelkich starań, aby zapewnić dostępność swojej strony internetowej",
  },
  {
    id: "s3",
    title: "Data publikacji strony internetowej",
    body: <p>25 sierpnia 2025 roku.</p>,
  },
  {
    id: "s4",
    title: "Data ostatniej istotnej aktualizacji",
    body: <p>25 sierpnia 2025 roku.</p>,
  },
  {
    id: "s5",
    title: "Stan dostępności cyfrowej",
    body: (
      <p>
        Strona internetowa jest częściowo zgodna z załącznikiem do ustawy z dnia
        4 kwietnia 2019 r. o dostępności cyfrowej stron internetowych i
        aplikacji mobilnych podmiotów publicznych, z powodu niezgodności lub
        wyłączeń wymienionych poniżej.
      </p>
    ),
  },
  {
    id: "s6",
    title: "Niedostępne treści",
    body: (
      <p>
        Formularz kontaktowy może być problematyczny dla osób, które korzystają
        z czytnika ekranu. Można natomiast skontaktować się z nami, pisząc na
        adres mailowy lub dzwoniąc do nas. Dane teleadresowe znajdują się
        bezpośrednio pod formularzem kontaktowym.
      </p>
    ),
  },
  {
    id: "s7",
    title: "Treści nieobjęte przepisami",
    body: (
      <p>
        W opublikowanych filmach w aktualnościach nie ma napisów dla osób
        niesłyszących i Głuchych.
      </p>
    ),
  },
  {
    id: "s8",
    title: "Dokumenty archiwalne",
    body: (
      <p>
        Dokumenty archiwalne nie są publikowane. Jeżeli potrzebują Państwo
        dostępu do nich, prosimy o skontaktowanie się z nami i wskazanie, które
        z nich są potrzebne i jak powinniśmy je dostosować.
      </p>
    ),
  },
  {
    id: "s9",
    title: "Informacje zwrotne i dane kontaktowe",
    body: (
      <p>
        Wszystkie problemy z dostępnością cyfrową tej strony internetowej
        prosimy zgłaszać telefonicznie lub mailowo: tel.{" "}
        <a href="tel:+48605550370">605&nbsp;550&nbsp;370</a>,{" "}
        <a href="mailto:kontakt@sasiedzkilazarz.pl">
          kontakt@sasiedzkilazarz.pl
        </a>
        .
      </p>
    ),
  },
  {
    id: "s10",
    title:
      "Każdy ma prawo wystąpić z żądaniem zapewnienia dostępności cyfrowej tej strony internetowej lub jej elementów",
    body: (
      <>
        <p>Zgłaszając takie żądanie, prosimy podać:</p>
        <ul className="accDeclaration-sublist">
          <li>swoje imię i nazwisko,</li>
          <li>swoje dane kontaktowe (np. numer telefonu, e-mail),</li>
          <li>
            dokładny adres strony internetowej, na której jest niedostępny
            cyfrowo element lub treść,
          </li>
          <li>
            opis na czym polega problem i jaki sposób jego rozwiązania byłby dla
            Ciebie najwygodniejszy.
          </li>
        </ul>
        <p>
          Na zgłoszenie odpowiemy najszybciej jak to możliwe, nie później niż w
          ciągu 7 dni od jego otrzymania.
        </p>
      </>
    ),
  },
  {
    id: "s11",
    title:
      "Jeżeli nie będziemy w stanie zapewnić dostępności cyfrowej strony internetowej lub treści, wskazanej w żądaniu, zaproponujemy dostęp do nich w alternatywny sposób",
  },
];

function escRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlightString(text: string, q: string): React.ReactNode {
  if (!q) return text;
  const re = new RegExp(`(${escRe(q)})`, "ig");
  const parts = text.split(re);
  const ql = q.toLowerCase();
  return parts.map((p, i) =>
    p.toLowerCase() === ql ? (
      <mark key={i}>{p}</mark>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    )
  );
}
function highlightNode(node: React.ReactNode, q: string): React.ReactNode {
  if (!q) return node;
  if (typeof node === "string") return highlightString(node, q);
  if (typeof node === "number" || node === null || node === undefined)
    return node;
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>{highlightNode(child, q)}</React.Fragment>
    ));
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (!props || props.children === undefined) return node;
    return React.cloneElement(node, props, highlightNode(props.children, q));
  }
  return node;
}

function numberFor(id: string) {
  return SECTIONS.findIndex((s) => s.id === id) + 1;
}

export default function AccDeclarationPage() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [query, setQuery] = useState("");
  const [navIndex, setNavIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (id && SECTIONS.some((s) => s.id === id)) setActiveId(id);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter((s) =>
      `${numberFor(s.id)} ${typeof s.title === "string" ? s.title : ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  useEffect(() => {
    const idx = Math.max(
      0,
      filtered.findIndex((s) => s.id === activeId)
    );
    setNavIndex(idx === -1 ? 0 : idx);
  }, [filtered, activeId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${activeId}`);
      const el = document.getElementById(`panel-${activeId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeId]);

  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

  function onKeyNav(e: React.KeyboardEvent) {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(navIndex + 1, filtered.length - 1);
      setNavIndex(next);
      setActiveId(filtered[next].id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(navIndex - 1, 0);
      setNavIndex(prev);
      setActiveId(filtered[prev].id);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setActiveId(filtered[navIndex].id);
    }
  }

  function copyLink() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#${activeId}`
        : `#${activeId}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).finally(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      });
    }
  }

  function backToList() {
    const el = document.getElementById("acc-toc");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="accDeclaration-wrapper">
      <h1 className="accDeclaration-title">Deklaracja dostępności</h1>

      <section className="accDeclaration-content">
        <div className="accDeclaration-actions">
          <button className="btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Pokaż tylko wybraną" : "Pokaż wszystko"}
          </button>
          <button className="btn" onClick={copyLink}>
            {copied ? "Skopiowano" : "Kopiuj link do sekcji"}
          </button>
        </div>
        <div className="accDeclaration-grid">
          <aside
            className="accDeclaration-sidenav"
            aria-label="Spis punktów"
            onKeyDown={onKeyNav}
            tabIndex={0}
            id="acc-toc"
          >
            <h2 className="accDeclaration-subtitle">
              Deklaracja dostępności Sąsiedzki Łazarz
            </h2>
            <div className="accDeclaration-search">
              <input
                type="search"
                placeholder="Szukaj pozycji…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Szukaj w tytułach"
              />
            </div>
            <ul role="tablist" className="accDeclaration-navlist">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={activeId === s.id}
                    aria-controls={`panel-${s.id}`}
                    id={`tab-${s.id}`}
                    className={
                      activeId === s.id
                        ? "accDeclaration-navitem is-active"
                        : "accDeclaration-navitem"
                    }
                    onClick={() => setActiveId(s.id)}
                  >
                    <span className="accDeclaration-navmarker">
                      {numberFor(s.id)}.
                    </span>
                    <span className="accDeclaration-navtitle">
                      {typeof s.title === "string"
                        ? highlightString(s.title, query)
                        : s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <article className="accDeclaration-panel">
            <button className="back-btn" onClick={backToList}>
              ← Spis treści
            </button>

            {showAll ? (
              SECTIONS.map((s) => (
                <section
                  className="accDeclaration-block"
                  key={s.id}
                  id={`panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${s.id}`}
                >
                  <h3 className="accDeclaration-heading">
                    <strong className="accDeclaration-marker">
                      {numberFor(s.id)}.
                    </strong>{" "}
                    {typeof s.title === "string" ? s.title : s.title}
                  </h3>
                  {s.body && (
                    <div className="accDeclaration-text">
                      {query ? highlightNode(s.body, query) : s.body}
                    </div>
                  )}
                </section>
              ))
            ) : (
              <section
                className="accDeclaration-block"
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
              >
                <h3 className="accDeclaration-heading">
                  <strong className="accDeclaration-marker">
                    {numberFor(active.id)}.
                  </strong>{" "}
                  {active.title}
                </h3>
                {active.body && (
                  <div className="accDeclaration-text">
                    {query ? highlightNode(active.body, query) : active.body}
                  </div>
                )}
              </section>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}

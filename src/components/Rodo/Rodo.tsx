"use client";

import "./Rodo.scss";
import React, { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  title: React.ReactNode;
  body?: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "s1",
    title: "Informacja o przetwarzaniu danych osobowych (RODO)",
    body: (
      <p>
        Zgodnie z art. 13 ust. 1 i 2 rozporządzenia Parlamentu Europejskiego i
        Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. („RODO”) informujemy, jak
        poniżej.
      </p>
    ),
  },
  {
    id: "s2",
    title: "Administrator danych",
    body: (
      <p>
        Administratorem Państwa danych osobowych jest{" "}
        <strong>Magda Krawczyk</strong>, adres korespondencyjny: ul. Ułańska 5,
        60-748 Poznań, tel. <a href="tel:+48605550370">605&nbsp;550&nbsp;370</a>
        ,{" "}
        <a href="mailto:kontakt@sasiedzkilazarz.pl">
          kontakt@sasiedzkilazarz.pl
        </a>
        .
      </p>
    ),
  },
  {
    id: "s3",
    title: "Zakres i źródło danych",
    body: (
      <p>
        Administrator przetwarza dane osobowe Użytkowników serwisu{" "}
        <a
          href="https://sasiedzkilazarz.pl"
          target="_blank"
          rel="noopener noreferrer"
        >
          sasiedzkilazarz.pl
        </a>
        .
      </p>
    ),
  },
  {
    id: "s4",
    title: "Cele i podstawy prawne przetwarzania",
    body: (
      <>
        <p>Dane osobowe Użytkowników przetwarzane są w następujących celach:</p>
        <ul className="rodo-sublist">
          <li>
            świadczenie usług drogą elektroniczną oraz obsługa zapytań
            ofertowych i reklamacji —{" "}
            <em>podstawa: art. 6 ust. 1 lit. b RODO (wykonanie umowy)</em>;
          </li>
          <li>
            działania marketingowe (np. newsletter, wiadomości SMS) i promocyjne
            — <em>podstawa: art. 6 ust. 1 lit. a RODO (zgoda)</em>;
          </li>
          <li>
            analityka i statystyka w celu poprawy funkcjonalności i usług —{" "}
            <em>
              podstawa: art. 6 ust. 1 lit. f RODO (uzasadniony interes
              administratora)
            </em>
            ;
          </li>
          <li>
            wykrywanie nadużyć, ustalenie odpowiedzialności, dochodzenie
            roszczeń lub obrona przed nimi —{" "}
            <em>
              podstawa: art. 6 ust. 1 lit. f RODO (ochrona praw administratora)
            </em>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "s5",
    title: "Marketing bezpośredni",
    body: (
      <p>
        Dane mogą być wykorzystywane do kierowania treści marketingowych różnymi
        kanałami (e-mail, MMS/SMS, telefon). Informacje handlowe drogą
        elektroniczną są wysyłane wyłącznie po wyrażeniu stosownej zgody.
      </p>
    ),
  },
  {
    id: "s6",
    title: "Odbiorcy danych",
    body: (
      <p>
        Dane mogą być ujawniane podmiotom przetwarzającym je na zlecenie
        Administratora na podstawie umów powierzenia (art. 28 RODO), podmiotom
        którym Administrator udostępnia dane, a także podmiotom uprawnionym na
        mocy przepisów prawa.
      </p>
    ),
  },
  {
    id: "s7",
    title: "Okres przechowywania danych",
    body: (
      <>
        <p>
          Okres przetwarzania zależy od rodzaju usługi i celu. Co do zasady,
          dane są przetwarzane przez czas świadczenia usługi lub realizowania
          zamówienia, a następnie do czasu:
        </p>
        <ul className="rodo-sublist">
          <li>zakończenia wykonywania umowy,</li>
          <li>
            wycofania udzielonej zgody — gdy podstawą przetwarzania jest zgoda,
          </li>
          <li>
            skutecznego sprzeciwu — gdy podstawą jest uzasadniony interes
            Administratora.
          </li>
        </ul>
        <p>
          Okres może zostać przedłużony, jeżeli przetwarzanie jest niezbędne do
          ustalenia, dochodzenia lub obrony roszczeń, a po tym czasie wyłącznie
          w zakresie wymaganym przepisami prawa. Po upływie okresów dane są
          nieodwracalnie usuwane lub anonimizowane.
        </p>
      </>
    ),
  },
  {
    id: "s8",
    title: "Prawo cofnięcia zgody",
    body: (
      <p>
        Jeżeli przetwarzanie odbywa się na podstawie zgody, mogą ją Państwo
        wycofać w dowolnym momencie. Cofnięcie zgody nie wpływa na zgodność z
        prawem przetwarzania dokonanego przed jej wycofaniem.
      </p>
    ),
  },
  {
    id: "s9",
    title: "Prawa osób, których dane dotyczą",
    body: (
      <>
        <p>Przysługuje Państwu prawo do:</p>
        <ul className="rodo-sublist">
          <li>dostępu do danych,</li>
          <li>sprostowania danych,</li>
          <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
          <li>ograniczenia przetwarzania,</li>
          <li>sprzeciwu wobec przetwarzania,</li>
          <li>przenoszenia danych.</li>
        </ul>
        <p>
          Przysługuje również prawo wniesienia skargi do Prezesa Urzędu Ochrony
          Danych Osobowych, jeżeli uznają Państwo, że przetwarzanie narusza
          przepisy prawa, w tym RODO.
        </p>
      </>
    ),
  },
  {
    id: "s10",
    title: "Dobrowolność podania danych",
    body: (
      <p>
        Podanie danych oznaczonych jako obowiązkowe jest wymagane w celu
        założenia i obsługi konta; ich niepodanie uniemożliwi założenie konta.
        Podanie pozostałych danych jest dobrowolne.
      </p>
    ),
  },
  {
    id: "s11",
    title: "Profilowanie i zautomatyzowane decyzje",
    body: (
      <p>
        Dane osobowe przetwarzane w celach marketingowych i promocyjnych nie są
        przetwarzane w sposób zautomatyzowany, w tym w formie profilowania.
      </p>
    ),
  },
  {
    id: "s12",
    title: "Zasady przetwarzania danych",
    body: (
      <p>
        Administrator czuwa, aby dane były przetwarzane zgodnie z prawem,
        zbierane dla oznaczonych i zgodnych z prawem celów, merytorycznie
        poprawne oraz adekwatne do celów przetwarzania, z poszanowaniem zasad
        wynikających z RODO i innych przepisów prawa.
      </p>
    ),
  },
  {
    id: "s13",
    title: "Kontakt w sprawach RODO",
    body: (
      <p>
        W sprawach związanych z przetwarzaniem danych prosimy o kontakt:{" "}
        <a href="mailto:kontakt@sasiedzkilazarz.pl">
          kontakt@sasiedzkilazarz.pl
        </a>{" "}
        lub korespondencyjnie: Sąsiedzki Łazarz, ul. Ułańska 5, 60-748 Poznań, z
        dopiskiem „dane osobowe”.
      </p>
    ),
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

export default function RodoPage() {
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
    const el = document.getElementById("rodo-toc");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="rodo-wrapper">
      <h1 className="rodo-title">RODO</h1>

      <section className="rodo-content">
        <div className="rodo-actions">
          <button className="btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Pokaż tylko wybraną" : "Pokaż wszystko"}
          </button>
          <button className="btn" onClick={() => window.print()}>
            Drukuj PDF
          </button>
          <button className="btn" onClick={copyLink}>
            {copied ? "Skopiowano" : "Kopiuj link do sekcji"}
          </button>
        </div>

        <div className="rodo-grid">
          <aside
            className="rodo-sidenav"
            aria-label="Spis punktów"
            onKeyDown={onKeyNav}
            tabIndex={0}
            id="rodo-toc"
          >
            <h2 className="rodo-subtitle">
              RODO - Informacja o przetwarzaniu danych osobowych
            </h2>
            <div className="rodo-search">
              <input
                type="search"
                placeholder="Szukaj pozycji…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Szukaj w tytułach"
              />
            </div>
            <ul role="tablist" className="rodo-navlist">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={activeId === s.id}
                    aria-controls={`panel-${s.id}`}
                    id={`tab-${s.id}`}
                    className={
                      activeId === s.id
                        ? "rodo-navitem is-active"
                        : "rodo-navitem"
                    }
                    onClick={() => setActiveId(s.id)}
                  >
                    <span className="rodo-navmarker">{numberFor(s.id)}.</span>
                    <span className="rodo-navtitle">
                      {typeof s.title === "string"
                        ? highlightString(s.title, query)
                        : s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <article className="rodo-panel">
            <button className="back-btn" onClick={backToList}>
              ← Spis treści
            </button>

            {showAll ? (
              SECTIONS.map((s) => (
                <section
                  className="rodo-block"
                  key={s.id}
                  id={`panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${s.id}`}
                >
                  <h3 className="rodo-heading">
                    <strong className="rodo-marker">{numberFor(s.id)}.</strong>{" "}
                    {typeof s.title === "string" ? s.title : s.title}
                  </h3>
                  {s.body && (
                    <div className="rodo-text">
                      {query ? highlightNode(s.body, query) : s.body}
                    </div>
                  )}
                </section>
              ))
            ) : (
              <section
                className="rodo-block"
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
              >
                <h3 className="rodo-heading">
                  <strong className="rodo-marker">
                    {numberFor(active.id)}.
                  </strong>{" "}
                  {active.title}
                </h3>
                {active.body && (
                  <div className="rodo-text">
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

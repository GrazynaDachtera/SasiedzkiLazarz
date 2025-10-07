"use client";

import "./PrivacyPolicy.scss";
import React, { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  marker: string;
  title: string;
  body: React.ReactNode;
};

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

const SECTIONS: Section[] = [
  {
    id: "s1",
    marker: "I.",
    title: "DEFINICJE",
    body: (
      <>
        <p>
          Administrator - Sąsiedzki Łazarz, ul. Ułańska 5, 60-748 Poznań, NIP:
          7792584284 REGON: 540869932, tel. 605 550 370,
          kontakt@sasiedzkilazarz.pl.
        </p>
        <p>
          Dane osobowe - wszelkie informacje o zidentyfikowanej lub możliwej do
          zidentyfikowania osobie fizycznej („osobie, której dane dotyczą”);
          możliwa do zidentyfikowania osoba fizyczna to osoba, którą można
          bezpośrednio lub pośrednio zidentyfikować, w szczególności na
          podstawie identyfikatora takiego jak imię i nazwisko, numer
          identyfikacyjny, dane o lokalizacji, identyfikator internetowy lub
          jeden bądź kilka szczególnych czynników określających fizyczną,
          fizjologiczną, genetyczną, psychiczną, ekonomiczną, kulturową lub
          społeczną tożsamość osoby fizycznej.
        </p>
        <p>
          Polityka - niniejsza polityka prywatności strony internetowej
          prowadzonej pod adresem: sasiedzkilazarz.pl (dalej: „Strona”)
        </p>
        <p>
          RODO - Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z
          dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z
          przetwarzaniem danych osobowych i w sprawie swobodnego przepływu
          takich danych oraz uchylenia dyrektywy 95/46/WE.
        </p>
        <p>
          Ustawa - ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych
          (tekst. jedn.: Dz. U. z 2019 r. poz. 1781)
        </p>
        <p>
          Użytkownik - każda osoba fizyczna odwiedzająca Stronę lub korzystająca
          z jednej albo kilku usług czy funkcjonalności opisanych w Polityce.
        </p>
      </>
    ),
  },
  {
    id: "s2",
    marker: "II.",
    title: "DANE OSOBOWE",
    body: (
      <>
        <p>
          Administrator przetwarza dane osobowe Użytkownika Strony:
          sasiedzkilazarz.pl
        </p>
        <p>
          Dane osobowe Użytkowników przetwarzane będą w następujących celach:
        </p>
        <ul className="privacyPolicy-sublist">
          <li>
            w celu świadczenia usług drogą elektroniczną związanych w zakresie
            niezbędnym do nawiązania, ukształtowania treści zmiany, rozwiązania
            i prawidłowej realizacji usługi świadczonej drogą elektroniczną i
            realizacji składanych przez Użytkownika zapytań ofertowych,
            rezerwacji online składanych przez formularz rezerwacyjny, zamówień
            lub reklamacji, w celu ich rozpatrzenia. Podstawą przetwarzania
            danych osobowych jest art. 6 ust. 1 lit. b RODO (wykonanie umowy);
          </li>
          <li>
            marketingowych (newsletter, wysyłka wiadomości SMS) i promocyjnych
            towarów i usług oferowanych przez Administratora. Podstawą
            przetwarzania danych osobowych jest art. 6 ust. 1 lit. a RODO
            (osoba, której dane dotyczą wyraziła zgodę na przetwarzanie swoich
            danych osobowych w jednym lub większej liczbie określonych celów);
          </li>
          <li>
            w celach analitycznych i statystycznych. Podstawą prawną
            przetwarzania jest prawnie uzasadniony interes Administratora (art.
            6 ust.1lit. f RODO) polegający na prowadzeniu analiz aktywności
            Użytkowników, a także ich preferencji w celu poprawy stosowanych
            funkcjonalności i świadczonych usług;
          </li>
          <li>
            wykrywania przypadków niedozwolonego korzystania z usług, ustalenia
            odpowiedzialności oraz dochodzenia roszczeń lub obrony przed nimi.
            Podstawą prawną przetwarzania jest prawnie uzasadniony interes
            Administratora (art. 6 ust.1lit. f RODO) polegający na ochronie jego
            praw.
          </li>
        </ul>
        <p>
          Dane osobowe Użytkowników mogą być również wykorzystywane przez
          Administratora, aby kierować do niego treści marketingowe różnymi
          kanałami, tj. za pośrednictwem poczty e-mail, drogą MMS/SMS lub
          telefonicznie. Przesyłanie Użytkownikom informacji handlowych drogą
          elektroniczną odbywa się wyłącznie po wyrażeniu przez Użytkowników
          zgody na taką formę komunikacji.
        </p>
        <p>
          Dane osobowe Użytkowników mogą być ujawniane i udostępniane odbiorcom
          lub stronom trzecim, którymi mogą być podmioty, którym administrator
          danych osobowych powierza przetwarzanie danych osobowych, na mocy i w
          oparciu o umowy powierzenia i zgodnie z wymogami art. 28 RODO,
          podmioty którym Administrator udostępnia dane osobowe, a także
          podmioty upoważnione z mocy przepisów prawa.
        </p>
        <p>
          Okres przetwarzania danych przez Administratora zależy od rodzaju
          świadczonej usługi i celu przetwarzania. Co do zasady dane
          przetwarzane są przez czas świadczenia usługi, do czasu wycofania
          wyrażonej zgody lub zgłoszenia skutecznego sprzeciwu względem
          przetwarzania danych w przypadkach, gdy podstawą prawną przetwarzania
          danych jest uzasadniony interes Administratora. Okres przetwarzania
          danych może być przedłużony w przypadku, gdy przetwarzanie jest
          niezbędne do ustalenia i dochodzenia ewentualnych roszczeń lub obrony
          przed nimi, a po tym czasie jedynie w przypadku i w zakresie, w jakim
          będą wymagać tego przepisy prawa. Po upływie okresu przetwarzania dane
          są nieodwracalnie usuwane lub anonimizowane.
        </p>
        <p>
          Okres przetwarzania danych przez Administratora zależy od rodzaju
          świadczonej usługi i celu przetwarzania. Co do zasady dane
          przetwarzane są przez czas świadczenia usługi lub realizowania
          zamówienia, do czasu:
        </p>
        <ul className="privacyPolicy-sublist">
          <li>a. zakończenia wykonywania umowy,</li>
          <li>
            b. wycofania wyrażonej zgody, gdy podstawą prawną przetwarzania
            danych jest zgoda Użytkownika lub
          </li>
          <li>
            c. zgłoszenia skutecznego sprzeciwu względem przetwarzania danych w
            przypadkach, gdy podstawą prawną przetwarzania danych jest
            uzasadniony interes Administratora.
          </li>
        </ul>
        <p>
          Okres przetwarzania danych może być każdorazowo przedłużony w
          przypadku, gdy przetwarzanie jest niezbędne do ustalenia i dochodzenia
          ewentualnych roszczeń lub obrony przed nimi, a po tym czasie jedynie w
          przypadku i w zakresie, w jakim będą wymagać tego przepisy prawa. Po
          upływie okresu przetwarzania dane są nieodwracalnie usuwane lub
          anonimizowane.
        </p>
        <p>
          W przypadku przetwarzania danych osobowych w oparciu o udzieloną przez
          Użytkownika zgodę, wszystkie udzielone zgody na przetwarzanie danych
          osobowych mogą być wycofane w dowolnym momencie, bez wpływu na
          zgodność z prawem przetwarzania, którego dokonano na podstawie zgody
          przed jej cofnięciem.
        </p>
        <p>
          Użytkownikowi przysługuje prawo żądania od Administratora dostępu do
          treści swoich danych, ich sprostowania, usunięcia, ograniczenia
          przetwarzania, wniesienia sprzeciwu wobec przetwarzania, a także prawo
          do przenoszenia danych. Użytkownikowi przysługuje również prawo
          wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, gdy
          uzna, że przetwarzanie ich danych osobowych narusza przepisy prawa, w
          tym RODO.
        </p>
        <p>
          Podanie danych oznaczonych jako obowiązkowe jest wymagane w celu
          założenia i obsługi konta, a ich niepodanie skutkuje brakiem
          możliwości założenia konta. Podanie pozostałych danych jest
          dobrowolne.
        </p>
        <p>
          Dane osobowe Użytkowników przetwarzane w celach marketingowych i
          promocyjnych towarów i usług oferowanych przez Administratora nie będą
          przetwarzane w sposób zautomatyzowany, w tym również w formie
          profilowania.
        </p>
        <p>
          Administrator danych osobowych czuwa nad tym, aby dane osobowe były
          przetwarzane zgodnie z prawem, w szczególności z przepisami RODO i
          innymi przepisami prawa regulującymi kwestie ochrony danych osobowych,
          a nadto, aby były zbierane dla oznaczonych, zgodnym z prawem celów,
          merytorycznie poprawne i adekwatne w stosunku do celów, dla jakich są
          przetwarzane.
        </p>
      </>
    ),
  },
  {
    id: "s3",
    marker: "III.",
    title: "PLIKI COOKIES",
    body: (
      <>
        <p>
          Administrator stosuje tzw. pliki cookies – dane informatyczne
          zapisywane przez serwery internetowe na urządzeniu końcowym
          Użytkownika, które mogą być następnie odczytywane przez serwery
          internetowe przy każdorazowym połączeniu się z urządzeniem końcowym
          Użytkownika.
        </p>
        <p>
          Zapisane na urządzeniu końcowym Użytkownika pliki cookies są
          wykorzystywane przez Administratora w celu świadczenia usług na
          najwyższym poziomie, dostosowanych do ich indywidualnych potrzeb, jak
          również w celach reklamowych i statystycznych.
        </p>
        <p>
          Użytkownik może za pomocą opcji przeglądarki internetowej w każdym
          czasie dokonywać zmian w zakresie ustawień dotyczących plików cookies,
          w szczególności poprzez zablokowanie wykorzystywania plików cookies,
          bądź ich usunięcie. Szczegółowe informacje o możliwości i sposobach
          obsługi plików cookies dostępne są w ustawieniach wykorzystywanej
          przez Użytkownika przeglądarki internetowej. Zezwolenie na korzystanie
          z plików cookies, bądź niewyłączenie tej opcji, jeżeli jest ona
          włączona domyślnie, oznacza, że cookies będą zamieszczane w urządzeniu
          końcowym Użytkownika a Administrator będzie mógł uzyskiwać do nich
          dostęp.
        </p>
      </>
    ),
  },
  {
    id: "s4",
    marker: "IV.",
    title: "KONTAKT",
    body: (
      <p>
        W przypadku pytań dotyczących niniejszej polityki prywatności lub
        jakichkolwiek kwestii związanych z przetwarzaniem danych osobowych
        Użytkownika przez Administratora, prosimy o kontakt pod adresem poczty
        elektronicznej kontakt@sasiedzkilazarz.pl lub korespondencyjnie
        Sąsiedzki Łazarz, ul. Ułańska 5, 60-748 Poznań z dopiskiem „dane
        osobowe”.
      </p>
    ),
  },
  {
    id: "s5",
    marker: "V.",
    title: "POSTANOWIENIA KOŃCOWE",
    body: (
      <ul className="privacyPolicy-sublist">
        <li>
          Polityka jest na bieżąco weryfikowana i w razie potrzeby
          aktualizowana.
        </li>
        <li>
          W przypadku aktualizacji Polityki Prywatności Użytkownik zostanie o
          tym powiadomiony poprzez wysłanie wiadomości e-mail.
        </li>
        <li>
          Aktualna wersja Polityki została przyjęta i obowiązuje od dnia 28
          kwietnia 2022 r.
        </li>
      </ul>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
      `${s.marker} ${s.title}`.toLowerCase().includes(q)
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
    const el = document.getElementById("pp-toc");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="privacyPolicy-wrapper">
      <h1 className="privacyPolicy-title">Polityka prywatności</h1>

      <section className="privacyPolicy-content">
        <div className="privacyPolicy-actions">
          <button className="btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Pokaż tylko wybraną" : "Pokaż wszystko"}
          </button>
          <button className="btn" onClick={copyLink}>
            {copied ? "Skopiowano" : "Kopiuj link do sekcji"}
          </button>
        </div>

        <div className="privacyPolicy-grid">
          <aside
            className="privacyPolicy-sidenav"
            aria-label="Spis sekcji"
            onKeyDown={onKeyNav}
            tabIndex={0}
            id="pp-toc"
          >
            <h2 className="privacyPolicy-subtitle">
              Polityka prywatności strony internetowej sasiedzkilazarz.pl
            </h2>
            <div className="privacyPolicy-search">
              <input
                type="search"
                placeholder="Szukaj w tytułach…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Szukaj w tytułach sekcji"
              />
            </div>
            <ul role="tablist" className="privacyPolicy-navlist">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={activeId === s.id}
                    aria-controls={`panel-${s.id}`}
                    id={`tab-${s.id}`}
                    className={
                      activeId === s.id
                        ? "privacyPolicy-navitem is-active"
                        : "privacyPolicy-navitem"
                    }
                    onClick={() => setActiveId(s.id)}
                  >
                    <span className="privacyPolicy-navmarker">{s.marker}</span>
                    <span className="privacyPolicy-navtitle">
                      {highlightString(s.title, query)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <article className="privacyPolicy-panel">
            <button className="back-btn" onClick={backToList}>
              ← Spis treści
            </button>

            {showAll ? (
              SECTIONS.map((s) => (
                <section
                  className="privacyPolicy-block"
                  key={s.id}
                  id={`panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${s.id}`}
                >
                  <h3 className="privacyPolicy-heading">
                    <strong className="privacyPolicy-marker">{s.marker}</strong>{" "}
                    {s.title}
                  </h3>
                  <div className="privacyPolicy-text">
                    {query ? highlightNode(s.body, query) : s.body}
                  </div>
                </section>
              ))
            ) : (
              <section
                className="privacyPolicy-block"
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
              >
                <h3 className="privacyPolicy-heading">
                  <strong className="privacyPolicy-marker">
                    {active.marker}
                  </strong>{" "}
                  {active.title}
                </h3>
                <div className="privacyPolicy-text">
                  {query ? highlightNode(active.body, query) : active.body}
                </div>
              </section>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}

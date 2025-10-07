"use client";

import "./Regulations.scss";
import React, { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  marker: string;
  title: string;
  body: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "p1",
    marker: "§ 1",
    title: "Postanowienia ogólne",
    body: (
      <ul className="regulations-sublist">
        <li>
          Stowarzyszenie nosi nazwę: Sąsiedzki Łazarz i zwane jest dalej
          „Stowarzyszeniem”.
        </li>
        <li>Siedzibą Stowarzyszenia jest Poznań.</li>
        <li>
          Terenem działania Stowarzyszenia jest obszar Rzeczpospolitej Polskiej.
        </li>
        <li>
          Stowarzyszenie jest dobrowolnym, samorządnym, trwałym zrzeszeniem o
          celach niezarobkowych, nieposiadającym osobowości prawnej.
        </li>
        <li>
          Stowarzyszenie może we własnym imieniu nabywać prawa, w tym własność i
          inne prawa rzeczowe, zaciągać zobowiązania, pozywać i być pozywane.
        </li>
        <li>
          Stowarzyszenie opiera swoją działalność na społecznej pracy członków.
        </li>
        <li>
          Podstawą działania są postanowienia niniejszego regulaminu oraz
          przepisy ustawy z 7 kwietnia 1989 r. Prawo o stowarzyszeniach.
        </li>
      </ul>
    ),
  },
  {
    id: "p2",
    marker: "§ 2",
    title: "Cele i sposoby realizacji",
    body: (
      <>
        <p>Cele Stowarzyszenia to:</p>
        <ul className="regulations-sublist">
          <li>
            działanie na rzecz integracji, wzmacniania więzi międzyludzkich,
            znoszenia barier międzypokoleniowych i kulturowych wśród lokalnych
            społeczności oraz wspólnot: seniorów, osób z niepełnosprawnościami,
            rodzin wielodzietnych, dzieci i młodzieży, osób samotnych oraz
            samodzielnie wychowujących dzieci, osób zagrożonych wykluczeniem;
          </li>
          <li>
            działalność wspomagająca rozwój wspólnot i społeczności lokalnych,
            integracji i reintegracji zawodowej i społecznej osób zagrożonych
            wykluczeniem społecznym;
          </li>
          <li>
            krzewienie i propagowanie wzorców współżycia społecznego i postaw
            obywatelskich;
          </li>
          <li>
            działanie na rzecz popularyzacji: wiedzy historycznej, świadomości
            obywatelskiej, tradycji lokalnych, miejskich oraz narodowych, w tym
            działania na rzecz upamiętniania osób, miejsc, wydarzeń, renowacji
            obiektów, rewitalizacji;
          </li>
          <li>
            działalność na rzecz zwiększania świadomości prawnej społeczeństwa;
          </li>
          <li>
            działalność na rzecz podtrzymywania i upowszechniania tradycji
            narodowej, pielęgnowania polskości oraz rozwoju świadomości
            narodowej, obywatelskiej i kulturowej, a także dla mniejszości
            narodowych i etnicznych oraz języka regionalnego, a tym na rzecz
            integracji cudzoziemców; działanie na rzecz rozwoju turystyki
            lokalnej i krajoznawstwa;
          </li>
          <li>
            działanie na rzecz promocji zdrowego trybu życia, aktywności
            fizycznej i uprawiania sportu; promocja ochrony zdrowia, wspieranie
            i upowszechnianie kultury fizycznej;
          </li>
          <li>
            działanie na rzecz edukacji artystycznej i kulturalnej, rozwoju
            umiejętności oraz kształcenia ustawicznego osób w każdym wieku;
          </li>
          <li>
            działanie na rzecz zwiększenia dostępności do kultury, edukacji,
            działań artystycznych oraz rozwoju kultury i sztuki, wspieranie i
            promocja lokalnych twórców i artystów;
          </li>
          <li>
            inicjowanie i wspieranie przekształcania oraz tworzenia przestrzeni
            dostępnych dla osób ze szczególnymi potrzebami; działalność na rzecz
            osób niepełnosprawnych, a także na rzecz osób w wieku emerytalnym;
          </li>
          <li>
            wspieranie lokalnej przedsiębiorczości i innowacyjnych inicjatyw,
            ich rozwoju;
          </li>
          <li>działalność na rzecz równych praw kobiet i mężczyzn;</li>
          <li>
            działalność wspomagająca rozwój techniki, wynalazczości i
            innowacyjności oraz rozpowszechnianie i wdrażanie nowych rozwiązań
            technicznych w praktyce gospodarczej;
          </li>
          <li>
            działalność na rzecz dzieci i młodzieży, upowszechniania i ochrony
            praw dziecka;
          </li>
          <li>
            promowanie ekologii i ochrony zwierząt oraz ochrony dziedzictwa
            przyrodniczego;
          </li>
          <li>
            działalność na rzecz porządku i bezpieczeństwa publicznego,
            ratownictwa i ochrony ludności, obronności państwa i działalności
            Sił Zbrojnych Rzeczypospolitej Polskiej;
          </li>
          <li>
            upowszechnianie i ochrona wolności i praw człowieka oraz swobód
            obywatelskich, a także działania wspomagające rozwój demokracji;
          </li>
          <li>
            działalność na rzecz nieodpłatnego poradnictwa obywatelskiego,
            upowszechniania i ochrony praw konsumentów;
          </li>
          <li>
            działalność na rzecz integracji europejskiej oraz rozwijania
            kontaktów i współpracy między społeczeństwami;
          </li>
          <li>
            działalność na rzecz kombatantów i osób represjonowanych, weteranów
            i weteranów poszkodowanych w rozumieniu ustawy z dnia 19 sierpnia
            2011 r. o weteranach działań poza granicami państwa (Dz. U. z 2023
            r. poz. 2112);
          </li>
          <li>działalność na rzecz rodziny, macierzyństwa, rodzicielstwa;</li>
          <li>
            działalność na rzecz przeciwdziałania uzależnieniom i patologiom
            społecznym;
          </li>
        </ul>

        <p>Stowarzyszenie realizuje swoje cele poprzez:</p>
        <ul className="regulations-sublist">
          <li>
            prowadzenie działalności informacyjnej, stron, portali internetowych
            i społecznościowych, kampanii społecznych;
          </li>
          <li>
            współdziałanie z władzami samorządowymi, rządowymi, mediami,
            placówkami oświatowymi, innymi organizacjami pozarządowymi oraz
            lokalnymi wspólnotami i społecznościami;
          </li>
          <li>
            wydawanie ulotek, czasopism, broszur, książek, albumów i artykułów
            związanych z celami Stowarzyszenia;
          </li>
          <li>
            tworzenie różnego rodzaju projektów związanych z integracją,
            kulturą, sztuką, historią i turystyką, prowadzenie działalności
            kulturalnej;
          </li>
          <li>
            organizowanie wydarzeń rozrywkowo-kulturalnych, spotkań towarzyskich
            i integracyjnych, pikników, koncertów, projekcji filmowych i
            festiwali, spotkań autorskich, konferencji, szkoleń, pokazów i
            wykładów;
          </li>
          <li>
            organizowanie zawodów i konkursów związanych z celami
            Stowarzyszenia;
          </li>
          <li>
            organizowanie, prowadzenie i branie udziału w wydarzeniach
            artystycznych, warsztatach twórczych, zajęciach, spektaklach,
            wystawach i konkursach;
          </li>
          <li>
            organizowanie i branie udziału w spotkaniach, rajdach, wycieczkach i
            wyjazdach integracyjnych, krajoznawczych i rekreacyjnych, a także
            tworzenie i prowadzenie gier terenowych i spacerów;
          </li>
          <li>
            organizowanie czasu wolnego dla dzieci, młodzieży, osób dorosłych i
            seniorów;
          </li>
          <li>
            udzielanie wsparcia pozafinansowego osobom w trudnej sytuacji
            życiowej;
          </li>
          <li>
            realizowanie spektakli, filmów, utworów, nagrań video i innych form
            sztuki;
          </li>
          <li>
            działanie na rzecz powstawania i renowacji obiektów upamiętniających
            osoby, miejsca i wydarzenia;
          </li>
          <li>
            gromadzenie środków z funduszy zewnętrznych, własnych i zbiórek
            publicznych;
          </li>
          <li>
            zatrudnianie pracowników i zlecanie zadań podmiotom zewnętrznym;
          </li>
          <li>prowadzenie nieodpłatnej działalności pożytku publicznego;</li>
          <li>
            działanie na rzecz podnoszenia kwalifikacji i kompetencji członków
            Stowarzyszenia.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "p3",
    marker: "§ 3",
    title: "Władze Stowarzyszenia",
    body: (
      <>
        <p>Władzami Stowarzyszenia są:</p>
        <ul className="regulations-sublist">
          <li>Walne Zebranie Członków,</li>
          <li>Zarząd.</li>
        </ul>
        <p>
          Najwyższą władzą Stowarzyszenia jest Walne Zebranie Członków, które
          stanowią wszyscy członkowie Stowarzyszenia.
        </p>
        <p>
          Walne Zebranie Członków właściwe jest do podejmowania decyzji we
          wszystkich sprawach Stowarzyszenia, z wyjątkiem spraw zastrzeżonych do
          kompetencji Zarządu.
        </p>
        <p>
          Zarząd składa się z 3 osób – Prezesa, Wiceprezesa oraz Członka
          Zarządu. Kadencja Zarządu trwa 4 lata.
        </p>
        <p>
          Walne Zebranie Członków zwołuje Zarząd z własnej inicjatywy lub na
          wniosek co najmniej 1/3 członków Stowarzyszenia.
        </p>
        <p>
          Uchwały Walnego Zebrania Członków zapadają zwykłą większością głosów,
          przy obecności co najmniej połowy uprawnionych do głosowania członków
          w pierwszym terminie, a w drugim terminie co najmniej 30 minut
          później, bez względu na liczbę obecnych członków Stowarzyszenia.
        </p>
        <p>Do kompetencji Walnego Zebrania Członków należą:</p>
        <ul className="regulations-sublist">
          <li>wybór i odwoływanie członków Zarządu,</li>
          <li>uchwalanie Regulaminu i jego zmian,</li>
          <li>podjęcie uchwały w sprawie rozwiązania Stowarzyszenia,</li>
          <li>ustalanie wysokości składki członkowskiej,</li>
          <li>kontrola działań podejmowanych przez Zarząd,</li>
        </ul>
        <p>Do kompetencji i obowiązków Zarządu należy:</p>
        <ul className="regulations-sublist">
          <li>reprezentowanie Stowarzyszenia i działanie w jego imieniu,</li>
          <li>wykonywanie uchwał Walnego Zebrania Członków,</li>
          <li>kierowanie bieżącą działalnością Stowarzyszenia,</li>
          <li>
            zarządzanie środkami finansowymi zgodnie z prawem, Regulaminem i
            uchwałami Walnego Zebrania Członków,
          </li>
          <li>przyjmowanie i wykluczanie członków,</li>
          <li>
            informowanie organu nadzorującego o zdarzeniach uzasadniających
            zmianę wpisu w ewidencji oraz zmianie miejsca zamieszkania członków
            Zarządu,
          </li>
        </ul>
        <p>
          Uchwały Zarządu zapadają większością głosów w obecności co najmniej
          dwóch członków Zarządu. W przypadku równej ilości głosów decyduje głos
          Prezesa.
        </p>
        <p>
          W przypadku zmniejszenia składu Zarządu uzupełnienie następuje poprzez
          wybory na nieobsadzone stanowisko.
        </p>
        <p>
          Stowarzyszenie reprezentuje łącznie dwóch członków Zarządu – w tym
          Prezes.
        </p>
        <p>
          Czynności przekraczające zwykły zarząd wymagają zgody wszystkich
          członków oraz pełnomocnictwa.
        </p>
        <p>Czynności przekraczające zwykły zarząd to w szczególności:</p>
        <ul className="regulations-sublist">
          <li>
            nabycie lub zbycie nieruchomości lub prawa użytkowania wieczystego,
          </li>
          <li>ustanowienie ograniczonego prawa rzeczowego,</li>
          <li>zawarcie umowy kredytu albo pożyczki,</li>
          <li>
            przejęcie, uznanie, zwolnienie z długu, poręczenie lub podobna
            umowa,
          </li>
          <li>zobowiązania przekraczające 10 000 zł.</li>
        </ul>
      </>
    ),
  },
  {
    id: "p4",
    marker: "§ 4",
    title: "Członkostwo",
    body: (
      <>
        <p>
          Członkiem może być osoba fizyczna posiadająca obywatelstwo polskie lub
          cudzoziemiec z miejscem zamieszkania w Polsce, mająca pełną zdolność
          do czynności prawnych i niepozbawiona praw publicznych, która złoży
          pisemną deklarację i zaakceptuje Regulamin.
        </p>
        <p>
          Uchwały w sprawach członkostwa podejmuje Zarząd. Od uchwały
          przysługuje odwołanie do Walnego Zebrania Członków w terminie 30 dni.
        </p>
        <p>Członkostwo ustaje w razie:</p>
        <ul className="regulations-sublist">
          <li>wykluczenia przez Walne Zebranie Członków,</li>
          <li>pisemnej rezygnacji,</li>
          <li>utraty praw obywatelskich prawomocnym wyrokiem sądu,</li>
          <li>śmierci członka.</li>
        </ul>
        <p>Prawa członków:</p>
        <ul className="regulations-sublist">
          <li>bierne i czynne uczestnictwo w Walnym Zebraniu Członków,</li>
          <li>korzystanie z dorobku i majątku Stowarzyszenia,</li>
          <li>zgłaszanie wniosków do działalności Stowarzyszenia,</li>
        </ul>
        <p>Obowiązki członków:</p>
        <ul className="regulations-sublist">
          <li>przestrzeganie Regulaminu,</li>
          <li>terminowe opłacanie składek,</li>
          <li>realizacja celów Stowarzyszenia.</li>
        </ul>
      </>
    ),
  },
  {
    id: "p5",
    marker: "§ 5",
    title: "Majątek i finanse",
    body: (
      <>
        <p>
          Źródła finansowania: składki członkowskie, dotacje, darowizny, spadki,
          zapisy, dochody z majątku i ofiarność publiczna.
        </p>
        <p>
          Środkami finansowymi zarządza Zarząd zgodnie z prawem, Regulaminem i
          uchwałami Walnego Zgromadzenia Członków.
        </p>
        <p>
          Członkowie odpowiadają solidarnie całym majątkiem, gdy egzekucja z
          majątku stowarzyszenia zwykłego okaże się bezskuteczna.
        </p>
        <p>Stowarzyszenie nie może:</p>
        <ul className="regulations-sublist">
          <li>powoływać terenowych jednostek organizacyjnych,</li>
          <li>zrzeszać osób prawnych,</li>
          <li>prowadzić działalności gospodarczej,</li>
          <li>prowadzić odpłatnej działalności pożytku publicznego.</li>
        </ul>
      </>
    ),
  },
  {
    id: "p6",
    marker: "§ 6",
    title: "Rozwiązanie Stowarzyszenia",
    body: (
      <>
        <p>
          Stowarzyszenie ulega rozwiązaniu na podstawie uchwały Walnego Zebrania
          Członków.
        </p>
        <p>
          W uchwale o rozwiązaniu wybiera się likwidatora i określa
          przeznaczenie pozostałego majątku Stowarzyszenia.
        </p>
      </>
    ),
  },
  {
    id: "p7",
    marker: "§ 7",
    title: "Postanowienia końcowe",
    body: (
      <p>
        W sprawach nieuregulowanych niniejszym regulaminem stosuje się przepisy
        ustawy z 7 kwietnia 1989 r. Prawo o stowarzyszeniach.
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

export default function RegulationsPage() {
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
    const el = document.getElementById("toc");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="regulations-wrapper">
      <h1 className="regulations-title">Regulamin</h1>

      <section className="regulations-content">
        <div className="regulations-actions">
          <button className="btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Pokaż tylko wybrany" : "Pokaż wszystko"}
          </button>
          <button className="btn" onClick={copyLink}>
            {copied ? "Skopiowano" : "Kopiuj link do sekcji"}
          </button>
        </div>

        <div className="regulations-grid">
          <aside
            className="regulations-sidenav"
            aria-label="Spis paragrafów"
            onKeyDown={onKeyNav}
            tabIndex={0}
            id="toc"
          >
            <h2 className="regulations-subtitle">Regulamin Sąsiedzki Łazarz</h2>
            <div className="regulations-search">
              <input
                type="search"
                placeholder="Szukaj paragrafu…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Szukaj w tytułach paragrafów"
              />
            </div>
            <ul role="tablist" className="regulations-navlist">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={activeId === s.id}
                    aria-controls={`panel-${s.id}`}
                    id={`tab-${s.id}`}
                    className={
                      activeId === s.id
                        ? "regulations-navitem is-active"
                        : "regulations-navitem"
                    }
                    onClick={() => setActiveId(s.id)}
                  >
                    <span className="regulations-navmarker">{s.marker}</span>
                    <span className="regulations-navtitle">
                      {highlightString(s.title, query)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <article className="regulations-panel">
            <button className="back-btn" onClick={backToList}>
              ← Spis treści
            </button>

            {showAll ? (
              SECTIONS.map((s) => (
                <section
                  className="regulations-block"
                  key={s.id}
                  id={`panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${s.id}`}
                >
                  <h3 className="regulations-heading">
                    <strong className="regulations-marker">{s.marker}</strong>{" "}
                    {s.title}
                  </h3>
                  <div className="regulations-text">
                    {query ? highlightNode(s.body, query) : s.body}
                  </div>
                </section>
              ))
            ) : (
              <section
                className="regulations-block"
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
              >
                <h3 className="regulations-heading">
                  <strong className="regulations-marker">
                    {active.marker}
                  </strong>{" "}
                  {active.title}
                </h3>
                <div className="regulations-text">
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

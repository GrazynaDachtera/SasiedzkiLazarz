// AreasExtended.tsx
"use client";

import React, { useMemo, useState } from "react";
import "./AreasExtended.scss";

type ActivityItem = { title: string; text?: string };
type AreasOfActivityProps = { items?: ActivityItem[] };

const DEFAULT_ITEMS: ActivityItem[] = [
  {
    title:
      "Działanie na rzecz integracji, wzmacniania więzi międzyludzkich, znoszenia barier międzypokoleniowych i kulturowych wśród lokalnych społeczności oraz wspólnot: seniorów, osób z niepełnosprawnościami, rodzin wielodzietnych, dzieci i młodzieży, osób samotnych oraz samodzielnie wychowujących dzieci, osób zagrożonych wykluczeniem;",
  },
  {
    title:
      "Działalność wspomagająca rozwój wspólnot i społeczności lokalnych, integracji i reintegracji zawodowej i społecznej osób zagrożonych wykluczeniem społecznym;",
  },
  {
    title:
      "Krzewienie i propagowanie wzorców współżycia społecznego i postaw obywatelskich;",
  },
  {
    title:
      "Działanie na rzecz popularyzacji: wiedzy historycznej, świadomości obywatelskiej, tradycji lokalnych, miejskich oraz narodowych, w tym działania na rzecz upamiętniania osób, miejsc, wydarzeń, renowacji obiektów, rewitalizacji;",
  },
  {
    title:
      "Działalność na rzecz zwiększania świadomości prawnej społeczeństwa;",
  },
  {
    title:
      "Działalność na rzecz podtrzymywania i upowszechniania tradycji narodowej, pielęgnowania polskości oraz rozwoju świadomości narodowej, obywatelskiej i kulturowej, a także dla mniejszości narodowych i etnicznych oraz języka regionalnego, a tym na rzecz integracji cudzoziemców;",
  },
  { title: "Działanie na rzecz rozwoju turystyki lokalnej i krajoznawstwa;" },
  {
    title:
      "Działanie na rzecz promocji zdrowego trybu życia, aktywności fizycznej i uprawiania sportu; promocja ochrony zdrowia, wspieranie i upowszechnianie kultury fizycznej;",
  },
  {
    title:
      "Działanie na rzecz edukacji artystycznej i kulturalnej, rozwoju umiejętności oraz kształcenia ustawicznego osób w każdym wieku;",
  },
  {
    title:
      "Działanie na rzecz zwiększenia dostępności do kultury, edukacji, działań artystycznych oraz rozwoju kultury i sztuki, wspieranie i promocja lokalnych twórców i artystów;",
  },
  {
    title:
      "Inicjowanie i wspieranie przekształcania oraz tworzenia przestrzeni dostępnych dla osób ze szczególnymi potrzebami; działalność na rzecz osób niepełnosprawnych, a także na rzecz osób w wieku emerytalnym;",
  },
  {
    title:
      "Wspieranie lokalnej przedsiębiorczości i innowacyjnych inicjatyw, ich rozwoju;",
  },
  { title: "Działalność na rzecz równych praw kobiet i mężczyzn;" },
  {
    title:
      "Działalność wspomagająca rozwój techniki, wynalazczości i innowacyjności oraz rozpowszechnianie i wdrażanie nowych rozwiązań technicznych w praktyce gospodarczej;",
  },
  {
    title:
      "Działalność na rzecz dzieci i młodzieży, upowszechniania i ochrony praw dziecka;",
  },
  {
    title:
      "Promowanie ekologii i ochrony zwierząt oraz ochrony dziedzictwa przyrodniczego;",
  },
  {
    title:
      "Działalność na rzecz porządku i bezpieczeństwa publicznego, ratownictwa i ochrony ludności, obronności państwa i działalności Sił Zbrojnych Rzeczypospolitej Polskiej;",
  },
  {
    title:
      "Upowszechnianie i ochrona wolności i praw człowieka oraz swobód obywatelskich, a także działania wspomagające rozwój demokracji;",
  },
  {
    title:
      "Działalność na rzecz nieodpłatnego poradnictwa obywatelskiego, upowszechniania i ochrony praw konsumentów;",
  },
  {
    title:
      "Działalność na rzecz integracji europejskiej oraz rozwijania kontaktów i współpracy między społeczeństwami;",
  },
  {
    title:
      "Działalność na rzecz kombatantów i osób represjonowanych, weteranów i weteranów poszkodowanych w rozumieniu ustawy z dnia 19 sierpnia 2011 r. o weteranach działań poza granicami państwa (Dz. U. z 2023 r. poz. 2112);",
  },
  { title: "Działalność na rzecz rodziny, macierzyństwa, rodzicielstwa;" },
  {
    title:
      "Działalność na rzecz przeciwdziałania uzależnieniom i patologiom społecznym;",
  },
  {
    title:
      "Prowadzenie działalności informacyjnej, stron, portali internetowych i społecznościowych, kampanii społecznych;",
  },
  {
    title:
      "Współdziałanie z władzami samorządowymi, rządowymi, mediami, placówkami oświatowymi, innymi organizacjami pozarządowymi oraz lokalnymi wspólnotami i społecznościami;",
  },
  {
    title:
      "Wydawanie ulotek, czasopism, broszur, książek, albumów i artykułów związanych z celami Stowarzyszenia;",
  },
  {
    title:
      "Tworzenie różnego rodzaju projektów związanych z integracją, kulturą, sztuką, historią i turystyką, prowadzenie działalności kulturalnej;",
  },
  {
    title:
      "Organizowanie wydarzeń rozrywkowo-kulturalnych, spotkań towarzyskich i integracyjnych, pikników, koncertów, projekcji filmowych i festiwali, spotkań autorskich, konferencji, szkoleń, pokazów i wykładów;",
  },
  {
    title:
      "Organizowanie zawodów i konkursów związanych z celami Stowarzyszenia;",
  },
  {
    title:
      "Organizowanie, prowadzenie i branie udziału w wydarzeniach artystycznych, warsztatach twórczych, zajęciach, spektaklach, wystawach i konkursach związanych z kulturą, sztuką, muzyką, fotografią, rękodziełem, rzemiosłem, plastyką, turystyką, filmografią, architekturą, krajoznawstwem i historią;",
  },
  {
    title:
      "Organizowanie i branie udziału w spotkaniach, rajdach, wycieczkach i wyjazdach integracyjnych, krajoznawczych i rekreacyjnych, a także tworzenie, organizowanie i prowadzenie gier terenowych i spacerów;",
  },
  {
    title:
      "Organizowanie czasu wolnego dla dzieci, młodzieży, osób dorosłych i seniorów;",
  },
  {
    title:
      "Udzielanie wsparcia pozafinansowego osobom w trudnej sytuacji życiowej;",
  },
  {
    title:
      "Realizowanie spektakli, filmów, utworów, nagrań video i innych form sztuki związanych z celami Stowarzyszenia;",
  },
  {
    title:
      "Działanie na rzecz powstawania i renowacji obiektów upamiętniających osoby, miejsca i wydarzenia związane z historią, krajoznawstwem, kulturą i sztuką;",
  },
  {
    title:
      "Gromadzenie środków na działalność Stowarzyszenia z funduszy zewnętrznych oraz własnych i zbiórek publicznych;",
  },
  {
    title:
      "Zatrudnianie pracowników, w tym członków Stowarzyszenia, zlecanie zadań podmiotom zewnętrznym w związku z realizowaniem celów Stowarzyszenia;",
  },
  { title: "Prowadzenie nieodpłatnej działalności pożytku publicznego;" },
  {
    title:
      "Działanie na rzecz podnoszenia kwalifikacji i kompetencji członków Stowarzyszenia.",
  },
];

function highlight(text: string, q: string) {
  if (!q.trim()) return text;
  const parts = text.split(
    new RegExp(`(${q.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")})`, "ig")
  );
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function AreasOfActivity({
  items = DEFAULT_ITEMS,
}: AreasOfActivityProps) {
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const needle = q.toLowerCase();
    return items.filter((i) =>
      (i.title + " " + (i.text ?? "")).toLowerCase().includes(needle)
    );
  }, [items, q]);

  const INITIAL = 10;
  const visible = showAll ? filtered : filtered.slice(0, INITIAL);

  return (
    <section className="areasextended-top-wrapper">
      <div className="areasextended-container">
        <div className="areasextended-controls">
          <input
            className="areasextended-search"
            type="search"
            placeholder="Szukaj w obszarach…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShowAll(false);
            }}
            aria-label="Szukaj w obszarach działalności"
          />
          <span className="areasextended-count" aria-live="polite">
            {filtered.length} wyników
          </span>
        </div>

        <ol className="areasextended-list enhanced" role="list">
          {visible.map((item, idx) => {
            const absoluteIndex = items.indexOf(item) + 1;
            const id = `obszar-${absoluteIndex}`;
            return (
              <li key={id} id={id} className="areasextended-card">
                <a
                  className="areasextended-permalink"
                  href={`#${id}`}
                  aria-label={`Link do pozycji ${absoluteIndex}`}
                >
                  #
                </a>
                <h3 className="areasextended-card-title">
                  {highlight(item.title, q)}
                </h3>
                {item.text && (
                  <p className="areasextended-card-text">
                    {highlight(item.text, q)}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        {!showAll && filtered.length > INITIAL && (
          <button
            className="areasextended-more"
            onClick={() => setShowAll(true)}
          >
            Pokaż wszystko ({filtered.length})
          </button>
        )}

        {filtered.length === 0 && (
          <p className="areasextended-empty">
            Brak wyników. Spróbuj innego hasła lub wyczyść wyszukiwanie.
          </p>
        )}
      </div>
    </section>
  );
}

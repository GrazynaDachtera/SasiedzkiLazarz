"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import "./Members.scss";

type MemberImage = { src?: string; alt?: string };

type Member = {
  name: string;
  role: string;
  bio: string;
  image?: MemberImage;
};

type MembersProps = {
  title?: string;
  subtitle?: string;
  members?: Member[];
  bg?: "white" | "gray";
};

const defaultMembers: Member[] = [
  {
    name: "Magda Krawczyk",
    role: "Prezeska Stowarzyszenia",
    bio: "Prezeska stowarzyszenia, od 2024 roku radna Rady Osiedla Święty Łazarz. Z wykształcenia ekonomistka, zawodowo zajmowała się zamówieniami publicznymi w administracji rządowej oraz samorządowej, obecnie procesem kontroli zarządczej. W 2025 roku w parku Kasprowicza pojawiły się stoły do ping-ponga – to z jej inicjatywy.",
    image: {
      src: "/AboutFoundation/MagdaKrawczyk.jpeg",
      alt: "Magda Krawczyk",
    },
  },
  {
    name: "Sylwia Badzińska",
    role: "Wiceprezeska Stowarzyszenia",
    bio: "Wiceprezeska stowarzyszenia, radna osiedlowa drugiej kadencji oraz współzałożycielka Stowarzyszenia Łazarz Pomaga. W 2022 roku uhonorowana tytułem Przyjaciel Łazarza za wieloletnie zaangażowanie na rzecz lokalnej społeczności. Od 14 lat aktywnie i z wielkim zaangażowaniem działa w Fundacji dla Zwierząt Animalia, gdzie ratuje bezdomne i porzucone psy oraz koty, prowadzi również dom tymczasowy dla kotów. Posiada bogate doświadczenie w organizacji wydarzeń integrujących mieszkańców Łazarza – pomysłodawczyni m.in. festynu „Łazarskie pożegnanie lata” (koncerty, animacje, prezentacje lokalnych organizacji). Koncerty młodych talentów w ramach Dni Łazarza, a także warsztatów ekologicznych. Każdego roku koordynuje osiedlowy etap miejskiego konkursu Zielony Poznań. Z determinacją walczy o zachowanie i rozwój terenów zielonych na Łazarzu – m.in. terenów po dawnych ogródkach działkowych na południe od ul. Hetmańskiej. Dzięki jej zaangażowaniu w Studium Uwarunkowań i Kierunków Zagospodarowania Przestrzennego udało się zachować jako tereny zielone/działkowe ROD im. O. Kopczyńskiego oraz Marii Curie-Skłodowskiej. Angażuje się również w ochronę lokalnych zabytków – od lat walczy o ocalenie historycznego budynku Sołtysówki przy ul. Głogowskiej 35, a w 2022 roku współorganizowała pierwszy okrągły stół w sprawie ratowania tego obiektu. Walka o zachowanie Sołtysówki trwa i podejmowane są kolejne kroki, by uchronić ją przed zniszczeniem i przywróceniem jej należne miejsca w przestrzeni Łazarza. Współtworzy w Poznaniu miejski Program opieki nad zwierzętami bezdomnymi, a w najbliższym czasie przygotowuje się do udziału w Ogólnopolskim Kongresie Praw Zwierząt organizowanym przez posłanki Sejmu RP.",
  },
  {
    name: "Agnieszka Michalak",
    role: "Członkini Zarządu Stowarzyszenia",
    bio: "Członkini zarządu stowarzyszenia, radna osiedlowa (3 kadencja), magister gospodarki przestrzennej, wytrwały bojownik o poprawę infrastruktury i bezpieczeństwa w okolicy: podjęła skuteczne starania o przejście dla pieszych przez ulicę Kasprzaka koło Morawskiego, o fotoradar na ulicy Hetmańskiej (po serii wypadków, w tym śmiertelnych), a także wpisanie do Studium uwarunkowań i kierunków zagospodarowania przestrzennego miasta Poznania łączników zieleni i terenu zieleni działkowej w okolicach ulicy Hetmańskiej. Współorganizatorka wielu wydarzeń osiedlowych: „Łazarskiego pożegnania lata”, Eko pikniku na Rynku Łazarskim, obecnie w trakcie realizacji jest grant NIW z FIO na Konwent Rad Rodziców, którego jest jedną z inicjatorek. To forum wymiany wiedzy i doświadczeń, oferujący cykliczne spotkania i szkolenia.",
  },
  {
    name: "Roman Modrzyński",
    role: "Członek Stowarzyszenia",
    bio: "Członek stowarzyszenia, działacz społeczny od wielu lat związany z Łazarzem, trzykrotnie wybrany na radnego osiedlowego. W 2022 roku uhonorowany tytułem Człowieka Roku Łazarza. Aktywnie działa na rzecz mieszkańców, organizując i współorganizując wydarzenia społeczne, historyczne i zdrowotne, takie jak festyny, pokazy filmowe czy wystawy. Współtworzył m.in. pokaz filmu „Błogosławiona”, wystawę witrynową „Dawny Łazarz”, Niedzielę Palmową na Rynku Łazarskim czy Targ Różności w ramach obchodów 125. rocznicy przyłączenia Łazarza do Poznania. Pomysłodawca przejażdżki dla osób z niepełnosprawnością „Tramwaj Św. Mikołaja”. Jest członkiem Stowarzyszenia Wirtualny Łazarz, współpracuje z lokalnymi klubami seniora, a także angażuje się w działania integracyjne na rzecz osób z niepełnosprawnościami, współpracując m.in. ze ŚDS „Kamyk”, Stowarzyszeniem Na Tak oraz PSONI Poznań.",
    image: { src: "/AboutFoundation/Roman.JPEG", alt: "Roman Modrzyński" },
  },
  {
    name: "Joanna Kamińska",
    role: "Członkini Stowarzyszenia",
    bio: "Członkini stowarzyszenia, radna osiedlowa, absolwentka wydziałowych studiów tłumaczeń konferencyjnych filologii germańskiej i angielskiej Uniwersytetu Adama Mickiewicza w Poznaniu oraz trzyletniego programu „Zarządzanie kształceniem grup młodzieży i dorosłych” prowadzonego przez Fundację Otto Benecke. W ramach kilkuletniej współpracy z organizacjami związanymi z Mniejszością Niemiecką w Polsce edukuje w zakresie efektywnej pracy w grupie, koordynacji projektu, zarządzania sobą w czasie, produktywności oraz aktywizacji społeczności lokalnej, tak młodzież, jak i seniorów. Doświadczenie zdobyte w tej pracy chce przenieść i skutecznie zaimplementować na Łazarskim Fyrtlu. Kocha historię łazarskich kamienic i stara się zarażać tym uczuciem, organizując spacery z lokalnymi przewodnikami.",
  },
  {
    name: "Michał Frankiewicz",
    role: "Członek Stowarzyszenia",
    bio: "Członek stowarzyszenia, radny osiedlowy. Organizator cyklicznych akcji Sąsiedzkiego Sprzątania Łazarza, które za każdym razem zyskują więcej uczestników i wsparcie kolejnych lokalnych biznesów. Działa w Poznańskiej Sieci Dostępności od początku jej istnienia, organizował na Łazarzu spotkanie z seniorami, na którym opowiadał o usługach Poznańskiego Centrum Dostępności. Bliskie są mu tematy czystości, dostępności przestrzennej i infrastruktury rowerowej.",
  },
  {
    name: "Paulina Prusiecka",
    role: "Członkini Stowarzyszenia",
    bio: "Członkini stowarzyszenia, radna osiedlowa, absolwentka Uniwersytetu Artystycznego w Poznaniu oraz Uniwersytetu Warszawskiego. Zawodowo zajmuje się marketingiem nieruchomości oraz sektora HORECA. Jej pasją jest łączenie sztuk pięknych, biznesu i działań społecznych. Jest współzałożycielką galerii sztuki i od lat prowadzi rodzinną fundację. Organizatorka wystaw malarstwa i fotografii, wydarzeń charytatywnych na rzecz seniorów i osób z niepełnosprawnościami oraz akcji nasadzania drzew w lokalnych szkołach, przedszkolach i domach opieki.",
  },
  {
    name: "Natalia Gielniak",
    role: "Członkini Stowarzyszenia",
    bio: 'Członkini stowarzyszenia, radna osiedlowa, aktywnie działa także w stowarzyszeniu „Młodzi Razem". Nieocenione wsparcie w organizacji wydarzeń. Brała udział w reprezentacji Łazarza w konkursie Wianki’24 (3 miejsce) oraz w Kulinarnym Turnieju Dzielnic’25.',
  },
  {
    name: "Michał Turno",
    role: "Członek Stowarzyszenia",
    bio: "Członek stowarzyszenia, radny osiedlowy, pracownik Wydziału Sportu Urzędu Miasta Poznania. Świetnie zna strukturę i funkcjonowanie miejskich jednostek. Posiada doświadczenie w działalności w samorządach szkolnych, Młodzieżowej Radzie Miasta Poznania, Stowarzyszeniu Młodzi Demokraci, kółkach studenckich oraz Stowarzyszeniu Nowa Generacja.",
  },
];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

function MemberCard({ m, onOpen }: { m: Member; onOpen: () => void }) {
  return (
    <article className="members-card" role="listitem">
      <div className="members-photo">
        {m.image?.src ? (
          <Image
            src={m.image.src}
            alt={m.image.alt || m.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="members-photo-img"
          />
        ) : (
          <div aria-hidden className="members-photo-fallback">
            {initialsOf(m.name)}
          </div>
        )}
      </div>
      <div className="members-meta">
        <h3 className="members-name">{m.name}</h3>
        <p className="members-role">{m.role}</p>
        <div className="members-actions">
          <button
            type="button"
            className="members-more"
            onClick={onOpen}
            aria-label={`Zobacz opis: ${m.name}`}
          >
            Zobacz opis
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Members({
  title = "Poznaj nas bliżej!",
  subtitle,
  bg = "white",
  members = defaultMembers,
}: MembersProps) {
  const data = useMemo(
    () => (members?.length ? members : defaultMembers),
    [members]
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const getGapAndCard = () => {
    const track = trackRef.current;
    if (!track) return { gap: 0, card: 0 };
    const first = track.querySelector<HTMLElement>(".members-card");
    const card = first?.getBoundingClientRect().width ?? 0;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return { gap, card };
  };

  const visibleCount = () => {
    const track = trackRef.current;
    if (!track) return 1;
    const { gap, card } = getGapAndCard();
    const per = card + gap;
    if (!per) return 1;
    return Math.max(1, Math.round(track.clientWidth / per));
  };

  const updateNavState = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth - 1;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft < maxScroll);
  };

  const scrollByVisible = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const { gap, card } = getGapAndCard();
    const per = card + gap || el.clientWidth;
    const n = visibleCount();
    const delta = per * n * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    updateNavState();
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateNavState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => updateNavState());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Member | null>(null);

  const openDialog = (m: Member) => {
    setActive(m);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setActive(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      className={`members-wrapper ${bg === "gray" ? "is-gray" : "is-white"}`}
    >
      <div className="members-container">
        <header className="members-header">
          <h2 className="members-title">{title}</h2>
          {subtitle && <p className="members-subtitle">{subtitle}</p>}
        </header>

        <div
          className="members-carousel"
          role="region"
          aria-label="Lista członków"
        >
          <button
            type="button"
            aria-label="Poprzedni"
            className={`members-nav members-nav-left ${
              !canPrev ? "is-disabled" : ""
            }`}
            onClick={() => scrollByVisible("left")}
            disabled={!canPrev}
          >
            <span aria-hidden>‹</span>
          </button>

          <div className="members-track" role="list" ref={trackRef}>
            {data.map((m, i) => (
              <MemberCard
                key={`${m.name}-${i}`}
                m={m}
                onOpen={() => openDialog(m)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Następny"
            className={`members-nav members-nav-right ${
              !canNext ? "is-disabled" : ""
            }`}
            onClick={() => scrollByVisible("right")}
            disabled={!canNext}
          >
            <span aria-hidden>›</span>
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="members-dialog"
        aria-labelledby="members-dialog-title"
      >
        {active && (
          <div className="members-dialog-content">
            <button
              className="members-dialog-close"
              onClick={closeDialog}
              aria-label="Zamknij"
            >
              ×
            </button>
            <div className="members-dialog-scroll">
              <div className="members-dialog-header">
                <div className="members-dialog-avatar">
                  {active.image?.src ? (
                    <Image
                      src={active.image.src}
                      alt={active.image.alt || active.name}
                      fill
                      sizes="96px"
                      className="members-dialog-avatar-img"
                    />
                  ) : (
                    <div className="members-dialog-avatar-fallback">
                      {initialsOf(active.name)}
                    </div>
                  )}
                </div>
                <div className="members-dialog-meta">
                  <h3 id="members-dialog-title" className="members-dialog-name">
                    {active.name}
                  </h3>
                  <p className="members-dialog-role">{active.role}</p>
                </div>
              </div>
              <p className="members-dialog-bio">{active.bio}</p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

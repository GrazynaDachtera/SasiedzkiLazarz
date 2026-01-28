"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type SyntheticEvent as ReactSyntheticEvent,
} from "react";
import Image from "next/image";
import "./Project9.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type LinkBlock = { t: "link"; label: string; href: string };
type Block = Paragraph | Heading | LinkBlock;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Na zaproszenie Fundacji AITWAR braliśmy udział w organizacji obchodów 125. rocznicy połączenia wsi Święty Łazarz, Jeżyce i Wilda z Poznaniem. Wspólnie z reprezentacją Łazarza: stowarzyszeniem Wirtualny Łazarz, CIL Łazanka, Klubem Krąg i harcerzami ze Szczepu Łazarz przygotowywaliśmy wydarzenia na naszym fyrtlu.",
  },
  {
    t: "p",
    text: "My zrealizowaliśmy 2 projekty: spacer w Piotrem Ciesielskim, przewodnikiem z PoPoznaniu.pl, oraz opracowanie i wykonanie wystawy witrynowej Dawny Łazarz.",
  },
  {
    t: "p",
    text: "Spacer - to jak zawsze hit, pomimo mroźnej aury stawiły się tłumy! Zorganizowała go Joanna Kamińska.",
  },
  {
    t: "p",
    text: "A wystawa to była fantastyczna okazja, żeby razem w mieszkańcami powspominać… W 11 witrynach sklepowych umieszczone zostały plansze z pocztówką oraz opisem tego miejsca 125 lat temu. Zostały przygotowane przez Magdę Krawczyk i Romana Modrzyńskiego. Wystawa była też prezentowana na finałowym festynie, wraz z krówkami od Pomorskiego (dlaczego - dowiecie się z Wystawy 😊). Dziękujemy wszystkim gościom za wizytę i opowieści.",
  },
  {
    t: "p",
    text: "Zapraszamy na samodzielny spacer po dawnym Łazarzu z naszymi tablicami i pocztówkami z początku XX wieku od Biblioteki Uniwersyteckiej w Poznaniu.",
  },
  {
    t: "p",
    text: "Wystawa witrynowa „Dawny Łazarz” została zorganizowana w ramach Projektu „JEDEN-DWA-PIĘĆ! - działania międzydzielnicowe z okazji 125 rocznicy przyłączenia Jeżyc, Łazarza i Wildy do Poznania”, finansowanego ze środków Miasta Poznania.",
  },
  {
    t: "p",
    text: "Organizatorem obchodów była Fundacja AITWAR, która koordynowała działania lokalnych współorganizatorów.",
  },
  { t: "h3", text: "Linki" },
  { t: "p", text: "Wydarzenie na fb https://fb.me/e/4xXRenvof" },
  {
    t: "link",
    label: "Plik pdf",
    href: "/Projects/Project9/Dawny_11_plakaty_logo_qr_fin.pdf",
  },
  {
    t: "link",
    label: "Tablice „Dawny Łazarz”",
    href: "/Projects/Project9/Dawny_wydarzenie.png",
  },
  {
    t: "link",
    label: "Kalendarium obchodów",
    href: "/Projects/Project9/Kalendarium.pdf",
  },
];

const URL_RE = /(https?:\/\/[^\s]+)/g;

function renderWithLinks(text: string) {
  const parts = text.split(URL_RE);
  return parts.map((part, idx) =>
    part.startsWith("http") ? (
      <a
        key={`${part}-${idx}`}
        href={part}
        className="project9-link"
        target="_blank"
        rel="noreferrer"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "p") {
          return (
            <p key={i} className="project9-paragraph">
              {renderWithLinks(b.text)}
            </p>
          );
        }

        if (b.t === "h3") {
          return (
            <h3 key={i} className="project9-subheading">
              {b.text}
            </h3>
          );
        }

        return (
          <p key={i} className="project9-paragraph">
            <a
              href={b.href}
              className="project9-link"
              target="_blank"
              rel="noreferrer"
            >
              {b.label}
            </a>
          </p>
        );
      })}
    </>
  );
}

type GalleryImage = { src: string; alt: string; w: number; h: number };

const IMAGES: readonly GalleryImage[] = [
  {
    src: "/Projects/Project9/125_spacer_wyd_fin.png",
    alt: "Galeria Project9 – zdjęcie 1",
    w: 1600,
    h: 1067,
  },
] as const;

function useLightbox(total: number) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const isOpen = index !== null;

  const open = useCallback((i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIndex(null);
  }, []);

  const step = useCallback(
    (delta: number) => {
      setIndex((i) => {
        if (i === null) return i;
        return (i + delta + total) % total;
      });
    },
    [total],
  );

  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const docEl = document.documentElement;
    const scrollY = window.scrollY;

    const prevStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    const scrollbarWidth = window.innerWidth - docEl.clientWidth;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = prevStyles.overflow;
      body.style.position = prevStyles.position;
      body.style.top = prevStyles.top;
      body.style.left = prevStyles.left;
      body.style.right = prevStyles.right;
      body.style.width = prevStyles.width;
      body.style.paddingRight = prevStyles.paddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, next, prev]);

  const onBackdropPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) close();
    },
    [close],
  );

  const onCancel = useCallback(
    (e: ReactSyntheticEvent<HTMLDialogElement, Event>) => {
      e.preventDefault();
      close();
    },
    [close],
  );

  const swipe = useRef<{
    x: number;
    y: number;
    pointerId: number | null;
    active: boolean;
  }>({ x: 0, y: 0, pointerId: null, active: false });

  const onViewerPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") return;
      swipe.current = {
        x: e.clientX,
        y: e.clientY,
        pointerId: e.pointerId,
        active: true,
      };
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [],
  );

  const onViewerPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!swipe.current.active || swipe.current.pointerId !== e.pointerId)
        return;

      swipe.current.active = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}

      const dx = e.clientX - swipe.current.x;
      const dy = e.clientY - swipe.current.y;

      const min = 50;
      const ratio = 1.2;

      if (Math.abs(dx) >= min && Math.abs(dx) > Math.abs(dy) * ratio) {
        if (dx > 0) prev();
        else next();
      }
    },
    [next, prev],
  );

  const onViewerPointerCancel = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      swipe.current.active = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
    },
    [],
  );

  return {
    dialogRef,
    index,
    open,
    close,
    prev,
    next,
    onBackdropPointerDown,
    onCancel,
    onViewerPointerDown,
    onViewerPointerUp,
    onViewerPointerCancel,
  };
}

function Gallery({ images }: { images: readonly GalleryImage[] }) {
  const {
    dialogRef,
    index,
    open,
    close,
    prev,
    next,
    onBackdropPointerDown,
    onCancel,
    onViewerPointerDown,
    onViewerPointerUp,
    onViewerPointerCancel,
  } = useLightbox(images.length);

  const active = useMemo(
    () => (index === null ? null : images[index]),
    [images, index],
  );

  return (
    <>
      <div className="project9-gallery" role="list">
        {images.map((img, i) => (
          <button
            key={img.src}
            className="project9-gallery-item"
            onClick={() => open(i)}
            aria-label={`Otwórz zdjęcie ${i + 1} z ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="project9-gallery-img"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project9-gallery-dialog"
        aria-label="Podgląd zdjęcia"
        onPointerDown={onBackdropPointerDown}
        onCancel={onCancel}
      >
        {active && (
          <div
            className="project9-viewer"
            role="document"
            onPointerDown={onViewerPointerDown}
            onPointerUp={onViewerPointerUp}
            onPointerCancel={onViewerPointerCancel}
          >
            <button
              className="project9-viewer-close"
              onClick={close}
              aria-label="Zamknij"
            >
              ×
            </button>
            <button
              className="project9-viewer-nav project9-prev"
              onClick={prev}
              aria-label="Poprzednie zdjęcie"
            >
              ‹
            </button>
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.w}
              height={active.h}
              sizes="90vw"
              className="project9-viewer-img"
              priority
            />
            <button
              className="project9-viewer-nav project9-next"
              onClick={next}
              aria-label="Następne zdjęcie"
            >
              ›
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}

export default function Project9Page() {
  return (
    <main className="project9-wrapper">
      <section className="project9-content">
        <h2 className="project9-subtitle">
          Dawny Łazarz - wystawa witrynowa z okazji 125-lecia połączenia z
          Poznaniem
        </h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project9-subheading">Galeria</h3>
        <Gallery images={IMAGES} />
      </section>
    </main>
  );
}

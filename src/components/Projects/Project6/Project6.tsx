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
import "./Project6.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Block = Paragraph | Heading;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Z inicjatywy naszej członkini Pauliny Prusieckiej Stowarzyszenie Sąsiedzki Łazarz zrealizowało piękną, wiosenną akcję – nasadzenia drzew owocowych.",
  },
  {
    t: "p",
    text: "Z radością przekazaliśmy grusze, śliwki, jabłonie i czereśnie do Domu Pomocy Społecznej oraz Szkoły Podstawowej nr 80. Wierzymy, że każde posadzone drzewo to nie tylko gest na rzecz ekologii, ale także symbol troski o przyszłe pokolenia i wspólnotę, którą budujemy na Łazarzu.",
  },
  {
    t: "p",
    text: "Dzięki tej inicjatywie nasze otoczenie stanie się jeszcze bardziej zielone i przyjazne, a owoce posłużą zarówno mieszkańcom, jak i uczniom. To mały krok ku większej zmianie – ku światu, w którym dbamy o naturę i o siebie nawzajem.",
  },
];

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.t === "p" ? (
          <p key={i} className="project6-paragraph">
            {b.text}
          </p>
        ) : (
          <h3 key={i} className="project6-subheading">
            {b.text}
          </h3>
        ),
      )}
    </>
  );
}

type GalleryImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

const IMAGES: readonly GalleryImage[] = [
  {
    src: "/Projects/Project6/image1.jpeg",
    alt: "Ręka trzymająca młode drzewko owocowe gotowe do posadzenia",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project6/image2.jpeg",
    alt: "Ulotka Stowarzyszenia Sąsiedzki Łazarz z logo i zdjęciem członków grupy",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project6/image3.jpeg",
    alt: "Kobieta trzymająca drzewko owocowe przed wejściem do budynku porośniętego bluszczem",
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
  }>({
    x: 0,
    y: 0,
    pointerId: null,
    active: false,
  });

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
      <div className="project6-gallery" role="list">
        {images.map((img, i) => (
          <button
            key={img.src}
            className="project6-gallery-item"
            onClick={() => open(i)}
            aria-label={`Otwórz zdjęcie ${i + 1} z ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="project6-gallery-img"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project6-gallery-dialog"
        aria-label="Podgląd zdjęcia"
        onPointerDown={onBackdropPointerDown}
        onCancel={onCancel}
      >
        {active && (
          <div
            className="project6-viewer"
            role="document"
            onPointerDown={onViewerPointerDown}
            onPointerUp={onViewerPointerUp}
            onPointerCancel={onViewerPointerCancel}
          >
            <button
              className="project6-viewer-close"
              onClick={close}
              aria-label="Zamknij"
            >
              ×
            </button>
            <button
              className="project6-viewer-nav project6-prev"
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
              className="project6-viewer-img"
              priority
            />
            <button
              className="project6-viewer-nav project6-next"
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

export default function Project6Page() {
  return (
    <main className="project6-wrapper">
      <section className="project6-content">
        <h2 className="project6-subtitle">
          Wiosenne nasadzenia drzew owocowych
        </h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project6-subheading">Galeria</h3>
        <Gallery images={IMAGES} />
      </section>
    </main>
  );
}

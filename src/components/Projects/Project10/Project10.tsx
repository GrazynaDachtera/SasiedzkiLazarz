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
import "./Project10.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Block = Paragraph | Heading;

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: `Wspólnie z mieszkańcami przygotowaliśmy listę budynków, których wygląd budzi obawy co do stanu
technicznego. Listę przekazaliśmy do Powiatowego Inspektora Nadzoru Budowlanego dla Miasta
Poznania. Cyklicznie zwracamy się do PINB o informacje o przeprowadzonych kontrolach,
interwencjach i ich wynikach. Aktualności udostępniamy na naszej stronie FB i Instagramie.`,
  },
  {
    t: "p",
    text: `#łazarskierudery #rudery`,
  },
];

const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
const isHashtagsOnly = (s: string) =>
  /^(\s*#[^\s#]+(\s+#[^\s#]+)*)\s*$/.test(s);

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "h3") {
          return (
            <h3 key={i} className="project10-subheading">
              {b.text}
            </h3>
          );
        }

        const text = normalize(b.text);
        const hashtagsOnly = isHashtagsOnly(text);

        return (
          <p
            key={i}
            className={`project10-paragraph${
              hashtagsOnly ? " project10-hashtags" : ""
            }`}
          >
            {text}
          </p>
        );
      })}
    </>
  );
}

type GalleryImage = { src: string; alt: string; w: number; h: number };

const IMAGES: readonly GalleryImage[] = [
  {
    src: "/Projects/Project10/rudery_czerwiec.jpg",
    alt: "Galeria Project10 – zdjęcie 1",
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

  const showNav = images.length > 1;

  return (
    <>
      <div className="project10-gallery" role="list">
        {images.map((img, i) => (
          <button
            key={img.src}
            className="project10-gallery-item"
            onClick={() => open(i)}
            aria-label={`Otwórz zdjęcie ${i + 1} z ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="project10-gallery-img"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project10-gallery-dialog"
        aria-label="Podgląd zdjęcia"
        onPointerDown={onBackdropPointerDown}
        onCancel={onCancel}
      >
        {active && (
          <div
            className="project10-viewer"
            role="document"
            onPointerDown={onViewerPointerDown}
            onPointerUp={onViewerPointerUp}
            onPointerCancel={onViewerPointerCancel}
          >
            <button
              className="project10-viewer-close"
              onClick={close}
              aria-label="Zamknij"
            >
              ×
            </button>

            {showNav && (
              <button
                className="project10-viewer-nav project10-prev"
                onClick={prev}
                aria-label="Poprzednie zdjęcie"
              >
                ‹
              </button>
            )}

            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.w}
              height={active.h}
              sizes="90vw"
              className="project10-viewer-img"
              priority
            />

            {showNav && (
              <button
                className="project10-viewer-nav project10-next"
                onClick={next}
                aria-label="Następne zdjęcie"
              >
                ›
              </button>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

export default function Project10Page() {
  return (
    <main className="project10-wrapper">
      <section className="project10-content">
        <h2 className="project10-subtitle">Rudery na Łazarzu</h2>

        <RichText blocks={DESCRIPTION} />

        <h3 className="project10-subheading">Galeria</h3>
        <Gallery images={IMAGES} />
      </section>
    </main>
  );
}

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
import "./Project1.scss";

type Paragraph = { t: "p"; text: string };
type Heading = { t: "h3"; text: string };
type Link = { t: "a"; text: string; href: string };
type OrderedList = { t: "ol"; items: string[] };
type Block = Paragraph | Heading | Link | OrderedList;

type GalleryImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
};

const RULES: string[] = [
  "Ochrona istniejącej zieleni - zachowanie drzew, które już dziś zatrzymują wodę, obniżają temperaturę i chronią przed smogiem",
  "Bliskość dla mieszkańców - miejsce rekreacji dostępne pieszo i rowerem, zgodne z ideą „15-minutowego miasta”",
  "Gospodarność - utrzymanie roślinności jest tańsze i skuteczniejsze niż nasadzanie nowych drzew",
  "Społeczna zgoda - pod wnioskami do planów zagospodarowania podpisało się już ponad 200 osób",
];

const DESCRIPTION: Block[] = [
  {
    t: "p",
    text: "Stowarzyszenie Sąsiedzkie Łazarz, wspólnie z mieszkankami i mieszkańcami dzielnicy, podjęło inicjatywę utworzenia nowego parku w kwartale ulic: Hetmańska - Dmowskiego - Krauthofera - Górecka.",
  },
  {
    t: "p",
    text: "Obecnie teren ten, dawniej ogródki działkowe, porasta bogata i dojrzała zieleń - około 1500 drzew i krzewów. Choć w dokumentach planistycznych przeznaczony jest pod zabudowę usługową, mieszkańcy widzą w nim ogromny potencjał jako zielonego serca dzielnicy.",
  },
  { t: "h3", text: "Dlaczego park jest potrzebny?" },
  { t: "ol", items: RULES },
  { t: "h3", text: "Nasz cel" },
  {
    t: "p",
    text: "Chcemy, aby Miasto Poznań przeznaczyło działki miejskie w tym kwartale na park-sad, włączyło ten obszar do planu zieleni miejskiej i zabezpieczyło go przed zabudową. Park miałby łączyć skwer Jacka Hałasika z powstającym parkiem Górczyńskim, tworząc ciąg rekreacyjny i przyrodniczy.",
  },
  {
    t: "p",
    text: "To inicjatywa oddolna - mieszkańców Łazarza i okolic, którzy chcą żyć w zdrowym, zielonym i przyjaznym otoczeniu.",
  },
  {
    t: "p",
    text: "Zapraszamy do wspierania petycji i dołączenia do działań na rzecz nowego parku!",
  },
  {
    t: "a",
    text: "Wesprzyj petycję",
    href: "https://www.petycjeonline.com/petycja_w_sprawie_parku_sadu_przy_hetmanskiej?fbclid=IwZXh0bgNhZW0CMTEAAR4q1rry1p3ben0Roz2Psgb5JULuv8EtnLAk4VKZ26Mjg-gTjGfdow0rNa4Csw_aem_SWSWsCw-yKeCSqs_kyYD3Q",
  },
];

const IMAGES: readonly GalleryImage[] = [
  {
    src: "/Projects/Project1/image1.jpeg",
    alt: "Zieleń w kwartale Hetmańska-Dmowskiego",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image2.jpeg",
    alt: "Dojrzałe drzewa i krzewy",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image3.jpeg",
    alt: "Przestrzeń rekreacyjna",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image4.jpeg",
    alt: "Ścieżka pieszo-rowerowa",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image5.jpeg",
    alt: "Dzika roślinność",
    w: 1600,
    h: 1067,
  },
  {
    src: "/Projects/Project1/image7.jpeg",
    alt: "Połączenie ze skwerem Jacka Hałasika",
    w: 1600,
    h: 1067,
  },
] as const;

function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "p")
          return (
            <p key={i} className="projects-paragraph">
              {b.text}
            </p>
          );
        if (b.t === "h3")
          return (
            <h3 key={i} className="projects-subheading">
              {b.text}
            </h3>
          );
        if (b.t === "ol") {
          return (
            <ol key={i} className="projects-list">
              {b.items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i} className="projects-paragraph">
            <a
              className="projects-link"
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {b.text}
            </a>
          </p>
        );
      })}
    </>
  );
}

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
    isOpen,
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
      <div className="projects-gallery" role="list">
        {images.map((img, i) => (
          <button
            key={img.src}
            className="gallery-item"
            onClick={() => open(i)}
            aria-label={`Otwórz zdjęcie ${i + 1} z ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="gallery-img"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="gallery-dialog"
        aria-label="Podgląd zdjęcia"
        onPointerDown={onBackdropPointerDown}
        onCancel={onCancel}
      >
        {active && (
          <div
            className="viewer"
            role="document"
            onPointerDown={onViewerPointerDown}
            onPointerUp={onViewerPointerUp}
            onPointerCancel={onViewerPointerCancel}
          >
            <button
              className="viewer-close"
              onClick={close}
              aria-label="Zamknij"
            >
              ×
            </button>
            <button
              className="viewer-nav prev"
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
              className="viewer-img"
              priority
            />
            <button
              className="viewer-nav next"
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

export default function ProjectsPage() {
  return (
    <main className="projects-wrapper">
      <section className="projects-content">
        <h2 className="projects-subtitle">Park-sad przy Hetmańskiej</h2>
        <RichText blocks={DESCRIPTION} />
        <h3 className="projects-subheading">Galeria</h3>
        <Gallery images={IMAGES} />
      </section>
    </main>
  );
}

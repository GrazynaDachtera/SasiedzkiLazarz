"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./Navbar.scss";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      document.body.classList.toggle("overflow-hidden", next);
      document.body.classList.toggle("menu-open", next);
      return next;
    });
  };

  const close = useCallback(() => {
    setOpen(false);
    document.body.classList.remove("overflow-hidden");
    document.body.classList.remove("menu-open");
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      if (
        open &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      )
        close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open, close]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) close();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [close]);

  const items = [
    { label: "O nas", path: "/AboutUs" },
    { label: "Aktualności", path: "/NewsPage" },
    { label: "Osiedlowe ABC", path: "/Abc" },
    { label: "Projekty", path: "/Projects" },
    { label: "Ty też możesz pomóc", path: "/Donation" },
    { label: "Kontakt", path: "/Contact" },
  ];

  return (
    <>
      {mounted &&
        createPortal(
          <>
            <header className="wrapper-navbar">
              <nav className="navbar">
                <div className="logo-navbar">
                  <Link href="/" aria-label="KuziSport – Home" onClick={close}>
                    <Image
                      src="/NavBar/logo.png"
                      alt="Logo Sasiedzki Lazarz"
                      width={400}
                      height={180}
                      priority
                      quality={95}
                      sizes="(min-width: 769px) 180px, 150px"
                      className="logo"
                    />
                  </Link>
                </div>

                <ul className={`nav-horizontal ${open ? "hidden" : ""}`}>
                  {items.map((i) => (
                    <li
                      key={i.path}
                      className={pathname === i.path ? "active" : ""}
                    >
                      <Link href={i.path} onClick={close}>
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <button
                  className={`hamburger-btn ${open ? "active" : ""}`}
                  aria-label="Menu"
                  onClick={toggle}
                >
                  <span />
                  <span />
                  <span />
                </button>
              </nav>
            </header>

            <div
              ref={drawerRef}
              className={`nav-drawer ${open ? "open" : ""}`}
              onMouseLeave={close}
            >
              <ul>
                {items.map((i) => (
                  <li
                    key={i.path}
                    className={pathname === i.path ? "active" : ""}
                  >
                    <Link href={i.path} onClick={close}>
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="social-icons">
                <a
                  href="https://www.facebook.com/sasiedzkilazarz/?locale=pl_PL"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sasiedzki_lazarz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={`nav-mask ${open ? "show" : ""}`} onClick={close} />
          </>,
          document.body
        )}
    </>
  );
}

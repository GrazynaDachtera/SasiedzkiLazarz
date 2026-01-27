"use client";

import { useEffect, useRef, useState } from "react";
import "./NewsPage.scss";

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (dom?: Element | null) => void;
      };
    };
  }
}

export default function NewsSubpage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const renderPlugin = () => {
    const root = containerRef.current;
    if (!root) return;

    const el = root.querySelector(".fb-page") as HTMLElement | null;
    if (!el) return;

    const containerWidth = root.clientWidth;
    const width = Math.min(500, Math.max(180, containerWidth));
    const height = Math.max(700, Math.floor(window.innerHeight * 0.85));

    el.setAttribute("data-width", String(width));
    el.setAttribute("data-height", String(height));

    if (window.FB) {
      window.FB.XFBML.parse(root);
      setLoaded(true);
    }
  };

  useEffect(() => {
    const tryParse = () => renderPlugin();

    if (!document.getElementById("fb-root")) {
      const fbRoot: HTMLDivElement = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }

    if (window.FB) {
      tryParse();
    } else if (!document.getElementById("facebook-jssdk")) {
      const script: HTMLScriptElement = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.src =
        "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v20.0";
      script.onload = () => tryParse();
      document.body.appendChild(script);
    }

    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => renderPlugin(), 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <main className="newsPage-wrapper">
      <section className="newsPage-wall">
        <div className="newsPage-container">
          <div className="newsPage-card">
            <div className="newsPage-cardHeader">
              <h2 className="newsPage-cardTitle">Aktualności z Facebooka</h2>
              <span className="newsPage-cardMeta">Sąsiedzki Łazarz</span>
            </div>

            {!loaded && (
              <div className="newsPage-skeleton" aria-hidden="true">
                <div className="skeleton-line" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
              </div>
            )}

            <div ref={containerRef} className="fb-wrapper">
              <div
                className="fb-page"
                data-href="https://www.facebook.com/sasiedzkilazarz"
                data-tabs="timeline"
                data-width=""
                data-height=""
                data-hide-cover="false"
                data-show-facepile="true"
                data-adapt-container-width="true"
              >
                <blockquote
                  cite="https://www.facebook.com/sasiedzkilazarz"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/sasiedzkilazarz">
                    Sąsiedzki Łazarz na Facebooku
                  </a>
                </blockquote>
              </div>
            </div>

            <p className="newsPage-fallback">
              Nie widzisz wtyczki?{" "}
              <a
                href="https://www.facebook.com/sasiedzkilazarz/?locale=pl_PL"
                target="_blank"
                rel="noreferrer"
              >
                Otwórz stronę na Facebooku
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

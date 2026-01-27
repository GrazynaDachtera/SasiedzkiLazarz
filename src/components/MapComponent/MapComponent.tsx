"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Poppins } from "next/font/google";
import "./MapComponent.scss";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "600", "700"],
});

type Props = {
  company?: string;
  nip?: string;
  regon?: string;
  krs?: string;
  className?: string;
};

type LeafletModule = typeof import("leaflet");
type LeafletMap = import("leaflet").Map;
type LeafletHandler = import("leaflet").Handler;

type MapWithHandlers = LeafletMap & {
  dragging: LeafletHandler;
  touchZoom: LeafletHandler;
  doubleClickZoom: LeafletHandler;
  boxZoom: LeafletHandler;
  keyboard: LeafletHandler;
  scrollWheelZoom: LeafletHandler;
};

export default function MapComponent({
  company = "Sąsiedzki Łazarz",
  nip = "7792584284",
  regon = "540869932",
  krs,
  className = "",
}: Props) {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  const [mapUnlocked, setMapUnlocked] = useState(false);

  const setInteractivity = useCallback((enabled: boolean) => {
    const base = mapRef.current;
    if (!base) return;

    const map = base as MapWithHandlers;

    if (enabled) {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      map.scrollWheelZoom.enable();
    } else {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      map.scrollWheelZoom.disable();
    }
  }, []);

  useEffect(() => {
    if (!mapEl.current) return;

    const ensureLeafletCss = () => {
      if (document.querySelector("link[data-leaflet]")) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.setAttribute("data-leaflet", "");
      document.head.appendChild(link);
    };

    const init = async () => {
      ensureLeafletCss();
      const L: LeafletModule = await import("leaflet");

      const map = L.map(mapEl.current!, {
        center: [52.4064, 16.9252],
        zoom: 15,
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      const geocodeAddress = async () => {
        const params = new URLSearchParams({
          format: "jsonv2",
          q: "Łazarz, 61-001 Poznań",
          countrycodes: "pl",
          limit: "1",
          viewbox: "16.75,52.55,17.10,52.29",
          bounded: "1",
        });

        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?${params.toString()}`,
          { headers: { "Accept-Language": "pl" } },
        );

        const data: Array<{ lat: string; lon: string }> = await res.json();
        if (data[0]) {
          return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
        return { lat: 52.4064, lng: 16.9252 };
      };

      const { lat, lng } = await geocodeAddress();
      map.setView([lat, lng], 17);
    };

    void init();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    setInteractivity(mapUnlocked);
  }, [mapUnlocked, setInteractivity]);

  return (
    <section className={`MapComponent ${poppins.className} ${className}`}>
      <div
        ref={mapEl}
        className={`map-embed ${mapUnlocked ? "is-unlocked" : "is-locked"}`}
      />

      {!mapUnlocked && (
        <div className="map-guard" aria-hidden="false">
          <button
            type="button"
            className="map-guard__btn"
            onClick={() => setMapUnlocked(true)}
            aria-label="Enable map interactions"
          >
            Click to move the map
          </button>
        </div>
      )}

      {mapUnlocked && (
        <button
          type="button"
          className="map-lock-btn"
          onClick={() => setMapUnlocked(false)}
          aria-label="Lock map to scroll the page"
        >
          Lock map (scroll page)
        </button>
      )}

      <div className="info-card" aria-label="Company contact card">
        <div className="card-header">
          <span className="pin">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="12"
                cy="11"
                r="2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </span>
          <h3>{company}</h3>
        </div>

        <div className="list">
          <div className="list-row list-row--accent">
            <b>NIP:</b> {nip}
          </div>
          <div className="list-row list-row--accent">
            <b>REGON:</b> {regon}
          </div>
          {krs && (
            <div className="list-row">
              <b>KRS:</b> {krs}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import "./DownloadMaterials.scss";

const MATERIALS = [
  {
    text: "Regulamin Stowarzyszenia Sąsiedzki Łazarz w wersji pdf",
    link: "Downloads/REGULAMIN_Sasiedzki_Lazarz.pdf",
  },
  {
    text: "Logotyp Stowarzyszenia Sąsiedzki Łazarz w wersji pdf",
    link: "/Downloads/Logo.pdf",
  },
  {
    text: "Logotyp Stowarzyszenia Sąsiedzki Łazarz w wersji jpg",
    link: "/Downloads/Logo.jpg",
  },
];

export default function DownloadMaterialsPage() {
  return (
    <main className="downloadMaterials-wrapper">
      <h1 className="downloadMaterials-title">Materiały do pobrania</h1>

      <section className="downloadMaterials-content">
        <h2 className="downloadMaterials-subtitle">
          Materiały do pobrania Sąsiedzki Łazarz
        </h2>

        <ol className="downloadMaterials-list">
          {MATERIALS.map((item) => (
            <li key={item.text}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

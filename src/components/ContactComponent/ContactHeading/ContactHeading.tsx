"use client";

import Link from "next/link";
import "./ContactHeading.scss";

export default function ContactHeadingPage() {
  return (
    <main className="AbcHeading-wrapper">
      <h1 className="AbcHeading-title">
        <Link href="/Contact">Kontakt</Link>
      </h1>
    </main>
  );
}

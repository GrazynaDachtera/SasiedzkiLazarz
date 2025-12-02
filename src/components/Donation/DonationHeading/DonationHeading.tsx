"use client";

import Link from "next/link";
import "./DonationHeading.scss";

export default function DonationHeadingPage() {
  return (
    <main className="AbcHeading-wrapper">
      <h1 className="AbcHeading-title">
        <Link href="/Donation">Ty też możesz pomóc</Link>
      </h1>
    </main>
  );
}

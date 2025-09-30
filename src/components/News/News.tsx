"use client";

import Image from "next/image";
import "./News.scss";

type Article = {
  href: string;
  thumbnail: string;
  category: string;
  title: string;
};

export default function News() {
  const articles: Article[] = [
    {
      href: "https://www.facebook.com/photo/?fbid=731160189901239&set=a.182448548105742&locale=pl_PL",
      thumbnail: "/News/smallimage1.jpg",
      category: "PRACE · TRAMWAJE · UTRUDNIENIA",
      title:
        "🚊🚌 Status prac na torach? W poniedziałek 18 sierpnia: ➡️  przywrócone zostaje funkcjonowanie linii 1️⃣ i 7️⃣na trasach stałych, ➡️ 1️⃣0️⃣ będzie jeździła przez Łazarz. A to dlatego, że przez Hetmańską tramwaje będą mogły jeździć na wprost, ale jeszcze będą utrudnienia dla 🚗aut z powodu zamknięcia ulicy 28 czerwca 1956 na odcinku od Hetmańskiej do Traugutta. ⚠️ Węzeł Bałtyk nadal rozkopany, obowiązują objazdy tramwajowe przez Towarową. 1️⃣6️⃣4️⃣ wróciło na zwykłą trasę 🙌 Wszystkie szczegóły znajdziecie na stronie MPK Poznań Sp. z o.o., link w komentarzu ⬇️⬇️⬇️ PS Wiecie o łące i ulach na zajezdni Franowo?",
    },
    {
      href: "https://www.facebook.com/photo/?fbid=122112297740958380&set=a.122111249054958380&locale=pl_PL",
      thumbnail: "/News/smallimage2.jpg",
      category: "PIKNIKI · POŻARY · NAUKA",
      title: "Już wkrótce nasze sasiedzkie pikniki! Sprawdź Wydarzenia 👇👇👇",
    },
    {
      href: "https://www.facebook.com/photo?fbid=728726370144621&set=a.182448548105742&locale=pl_PL",
      thumbnail: "/News/smallimage3.jpg",
      category: "KONCERTY · FYRTEL · WARSZTATY",
      title:
        '🎉 W tym tygodniu piątek wypada już w czwartek, więc naszą listę wydłużyliśmy o jeden dzień, ale i tak wszystko się nie zmieściło: sprawdźcie w komentarzach szczegóły. Jest też link do informatora, co będzie w długi weekend działało na naszym fyrtlu👇👇 Dodaliśmy też kilka pomysłów "z dojazdem", m.in. na placu Wolności.',
    },
  ];

  return (
    <section className="News">
      <div className="news-container">
        <div className="news-left">
          <span className="news-tagline">bądź na bieżąco!</span>
          <h2 className="news-heading">Blog</h2>
          <div className="news-list">
            {articles.map((a, i) => (
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="news-item"
                key={i}
              >
                <div className="news-thumb">
                  <Image
                    src={a.thumbnail}
                    alt={a.title}
                    width={140}
                    height={110}
                    priority={i === 0}
                  />
                </div>
                <div className="news-copy">
                  <span className="news-category">{a.category}</span>
                  <p className="news-title">{a.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

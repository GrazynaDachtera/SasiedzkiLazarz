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
      href: "https://www.facebook.com/photo?fbid=765844246432833&set=a.182448548105742&locale=pl_PL",
      thumbnail: "/News/smallimage1.jpg",
      category: "PETYCJE · PARK · HETMAŃSKA",
      title: `🌳Aktualizacja! 📩
19 września petycje w sprawie parku–sadu na południe od ulicy Hetmańskiej trafiły do:
✅️ Rady Miasta Poznania
✅️ oraz do Prezydenta Poznania.`,
    },
    {
      href: "https://www.facebook.com/sasiedzkilazarz/videos/1620423938934155/?locale=pl_PL",
      thumbnail: "/News/smallimage2.png",
      category: "REWITALIZACJA · WIELKOPOLSKA · KONFERENCJA",
      title:
        "Dzisiaj mieliśmy okazję posłuchać o rewitalizacji w Wielkopolsce, dzięki udziałowi w konferencji „Rewitalizacja się opłaca! Jak inwestować w odnowę przestrzeni i rozwój społeczności”, zorganizowanej przez Wielkopolski Fundusz Rozwoju.",
    },
    {
      href: "https://www.facebook.com/photo.php?fbid=762593770091214&set=pb.100090217936902.-2207520000&type=3&locale=pl_PL",
      thumbnail: "/News/smallimage3.jpg",
      category: "JESIEŃ · BLAJBA · WERNISAŻ",
      title: `🍂 No i mamy jesień! 🌥️
Słońce wstaje później, dzień robi się coraz krótszy, a wieczory z cieplym kocem wygrywają z innymi rozrywkami☕🍁`,
    },
  ];

  return (
    <section className="News">
      <div className="news-container">
        <div className="news-left">
          <span className="news-tagline">Przegląd wydarzeń</span>
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

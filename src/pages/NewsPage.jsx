import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FiSearch,
  FiCalendar,
  FiTag,
  FiArrowRight,
  FiFilter,
} from "react-icons/fi";
import "../styles/components.css";

// Fallback/demo news items
const DEMO_NEWS = [
  {
    id: "1",
    title: "LAAQS 2025 Annual General Meeting – Results & Announcements",
    content:
      "The 2025 AGM was held in Maseru with over 200 members in attendance. New executive committee members were elected and strategic plans unveiled for the next three years.",
    category: "Announcements",
    date: "2025-04-15",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop",
  },
  {
    id: "2",
    title: "New CPD Programme: BIM & Digital Construction Technology",
    content:
      "LAAQS is proud to announce a new Building Information Modelling CPD course developed in partnership with the National University of Lesotho and local industry practitioners.",
    category: "CPD",
    date: "2025-04-08",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=300&fit=crop",
  },
  {
    id: "3",
    title: "Government Infrastructure Projects Create New QS Opportunities",
    content:
      "Major government infrastructure projects including road development and housing schemes are creating significant opportunities for registered quantity surveyors across Lesotho.",
    category: "Industry",
    date: "2025-04-01",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=300&fit=crop",
  },
  {
    id: "4",
    title: "LAAQS Signs MoU with South African Council for QS Profession",
    content:
      "A landmark Memorandum of Understanding has been signed to facilitate recognition of qualifications and professional mobility between Lesotho and South Africa.",
    category: "Partnerships",
    date: "2025-03-20",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=300&fit=crop",
  },
  {
    id: "5",
    title: "Call for Entries: LAAQS Excellence Awards 2025",
    content:
      "Nominations are now open for the LAAQS Excellence Awards recognising outstanding contributions to the built environment profession in Lesotho.",
    category: "Awards",
    date: "2025-03-10",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
  },
  {
    id: "6",
    title: "Continuing Education: Online Learning Platform Launched",
    content:
      "LAAQS members now have access to an online learning platform with over 50 self-paced modules covering cost estimating, contract administration, and project management.",
    category: "CPD",
    date: "2025-03-01",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=300&fit=crop",
  },
];

const CATEGORIES = [
  "All",
  "Announcements",
  "CPD",
  "Industry",
  "Partnerships",
  "Awards",
];

const CAT_BADGE = {
  Announcements: "badge-blue",
  CPD: "badge-green",
  Industry: "badge-gold",
  Partnerships: "badge-grey",
  Awards: "badge-red",
};

export default function NewsPage() {
  const [news, setNews] = useState(DEMO_NEWS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(
          query(collection(db, "news"), orderBy("date", "desc")),
        );
        if (!snap.empty) {
          setNews(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } catch (_) {
        /* use demo data */
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filtered = news.filter((n) => {
    const matchCat = category === "All" || n.category === category;
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>News</span>
          </div>
          <h1>News &amp; Updates</h1>
          <p>
            Stay informed with the latest from LAAQS and the built environment
            industry
          </p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          {/* Filters */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 36,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", flex: "1 1 280px" }}>
              <FiSearch
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                className="form-control"
                style={{ paddingLeft: 38 }}
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className="btn btn-sm"
                  style={{
                    background: category === c ? "var(--primary)" : "#fff",
                    color: category === c ? "#fff" : "var(--text)",
                    border: "1.5px solid var(--border)",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {loading && <div className="spinner" />}

          {!loading && filtered.length === 0 && (
            <div className="empty-state">
              <p>No news articles found.</p>
            </div>
          )}

          {/* Featured Article */}
          {featured && (
            <div
              className="card"
              style={{
                marginBottom: 36,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div style={{ overflow: "hidden", minHeight: 300 }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .4s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.transform = "scale(1.04)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
              <div style={{ padding: "36px" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <span
                    className={`badge ${CAT_BADGE[featured.category] || "badge-grey"}`}
                  >
                    <FiTag size={10} /> {featured.category}
                  </span>
                  <span
                    style={{
                      fontSize: ".8rem",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <FiCalendar size={12} />{" "}
                    {new Date(featured.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span className="badge badge-gold" style={{ marginBottom: 12 }}>
                  Featured
                </span>
                <h2
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    color: "var(--primary)",
                    fontSize: "1.5rem",
                    marginBottom: 16,
                    lineHeight: 1.35,
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: 1.8,
                    marginBottom: 24,
                  }}
                >
                  {featured.content.substring(0, 220)}...
                </p>
                <Link to={`/news/${featured.id}`} className="btn btn-primary">
                  Read Full Article <FiArrowRight />
                </Link>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid-3">
            {rest.map((n) => (
              <div key={n.id} className="card">
                <div className="news-card-img">
                  <img src={n.image} alt={n.title} />
                </div>
                <div className="news-card-body">
                  <div className="news-card-meta">
                    <span
                      className={`badge ${CAT_BADGE[n.category] || "badge-grey"}`}
                    >
                      {n.category}
                    </span>
                    <span
                      style={{
                        fontSize: ".78rem",
                        color: "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <FiCalendar size={11} />{" "}
                      {new Date(n.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3>{n.title}</h3>
                  <p>{n.content.substring(0, 130)}...</p>
                  <Link to={`/news/${n.id}`} className="btn btn-sm btn-outline">
                    Read More <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

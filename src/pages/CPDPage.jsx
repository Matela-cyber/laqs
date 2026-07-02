import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FiCalendar,
  FiClock,
  FiAward,
  FiBookOpen,
  FiArrowRight,
  FiUsers,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import "../styles/components.css";

const DEMO_COURSES = [
  {
    id: "1",
    title: "Introduction to BIM (Building Information Modelling)",
    type: "Course",
    points: 8,
    duration: "2 days",
    date: "2025-05-20",
    location: "Maseru, NUL Campus",
    mode: "In-person",
    description:
      "A comprehensive introduction to BIM principles and applications in quantity surveying practice. Internationally recognised and accredited.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=200&fit=crop",
    fee: "LSL 1,200",
    seats: 30,
    enrolled: 18,
  },
  {
    id: "2",
    title: "Contract Administration for QS Professionals",
    type: "Workshop",
    points: 5,
    duration: "1 day",
    date: "2025-05-28",
    location: "Maseru, Avani Hotel",
    mode: "In-person",
    description:
      "Covers NEC4, FIDIC, and local government contracts. Practical case studies and group exercises included.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    fee: "LSL 850",
    seats: 40,
    enrolled: 35,
  },
  {
    id: "3",
    title: "Sustainable Construction & Green Building",
    type: "Webinar",
    points: 3,
    duration: "3 hours",
    date: "2025-06-05",
    location: "Online (Zoom)",
    mode: "Online",
    description:
      "Learn about sustainable building practices, green ratings, and lifecycle cost analysis in the Lesotho context.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop",
    fee: "LSL 400",
    seats: 100,
    enrolled: 45,
  },
  {
    id: "4",
    title: "Cost Estimating & Bills of Quantities Masterclass",
    type: "Course",
    points: 10,
    duration: "3 days",
    date: "2025-06-16",
    location: "Maseru, LAAQS Centre",
    mode: "In-person",
    description:
      "Deep dive into advanced cost estimating techniques, BQ preparation, and software tools used in modern QS practice.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    fee: "LSL 2,000",
    seats: 25,
    enrolled: 12,
  },
  {
    id: "5",
    title: "Professional Ethics & Code of Conduct",
    type: "Seminar",
    points: 4,
    duration: "Half day",
    date: "2025-06-20",
    location: "Maseru",
    mode: "Hybrid",
    description:
      "Mandatory CPD session on professional ethics, complaints handling, and LAAQS code of conduct for all members.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop",
    fee: "Free (Members)",
    seats: 80,
    enrolled: 30,
  },
  {
    id: "6",
    title: "Property Valuation Fundamentals",
    type: "Course",
    points: 6,
    duration: "2 days",
    date: "2025-07-08",
    location: "Online (Zoom)",
    mode: "Online",
    description:
      "An introduction to property valuation methods relevant to QS and property professionals in Lesotho.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop",
    fee: "LSL 900",
    seats: 50,
    enrolled: 8,
  },
];

const TYPE_BADGE = {
  Course: "badge-blue",
  Workshop: "badge-gold",
  Webinar: "badge-green",
  Seminar: "badge-grey",
};
const MODE_BADGE = {
  "In-person": "badge-blue",
  Online: "badge-green",
  Hybrid: "badge-gold",
};

export default function CPDPage() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState(DEMO_COURSES);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "courses"), orderBy("date")),
        );
        if (!snap.empty)
          setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (_) {}
    };
    fetch();
  }, []);

  const handleEnrol = (course) => {
    if (!currentUser) {
      toast.error("Please sign in to enrol.");
      return;
    }
    toast.success(
      `Successfully enrolled in "${course.title}". Check your email for confirmation.`,
    );
  };

  const filtered =
    filter === "All" ? courses : courses.filter((c) => c.type === filter);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>CPD</span>
          </div>
          <h1>CPD &amp; Training</h1>
          <p>
            Earn Continuing Professional Development points through accredited
            programmes
          </p>
        </div>
      </div>

      {/* CPD Stats */}
      <section
        className="section-sm"
        style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}
      >
        <div className="container">
          <div className="grid-4" style={{ textAlign: "center" }}>
            {[
              {
                icon: <FiBookOpen size={28} />,
                num: "50+",
                label: "Available Courses",
              },
              {
                icon: <FiAward size={28} />,
                num: "200+",
                label: "Certificates Issued",
              },
              {
                icon: <FiUsers size={28} />,
                num: "1,200+",
                label: "Course Enrollments",
              },
              {
                icon: <FiCalendar size={28} />,
                num: "12",
                label: "Annual Events",
              },
            ].map((s) => (
              <div key={s.label} style={{ padding: "12px" }}>
                <div style={{ color: "var(--accent)", marginBottom: 8 }}>
                  {s.icon}
                </div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div
            className="flex-between"
            style={{ marginBottom: 32, flexWrap: "wrap", gap: 12 }}
          >
            <div>
              <span className="section-label">Upcoming Programmes</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                CPD Courses &amp; Events
              </h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "Course", "Workshop", "Webinar", "Seminar"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="btn btn-sm"
                  style={{
                    background: filter === f ? "var(--primary)" : "#fff",
                    color: filter === f ? "#fff" : "var(--text)",
                    border: "1.5px solid var(--border)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-3">
            {filtered.map((c) => {
              const spotsLeft = c.seats - c.enrolled;
              return (
                <div key={c.id} className="card">
                  <div style={{ position: "relative" }}>
                    <div className="news-card-img">
                      <img src={c.image} alt={c.title} />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        display: "flex",
                        gap: 6,
                      }}
                    >
                      <span
                        className={`badge ${TYPE_BADGE[c.type] || "badge-grey"}`}
                      >
                        {c.type}
                      </span>
                      <span
                        className={`badge ${MODE_BADGE[c.mode] || "badge-grey"}`}
                      >
                        {c.mode}
                      </span>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "var(--accent)",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: ".72rem",
                        fontWeight: 700,
                      }}
                    >
                      {c.points} CPD pts
                    </div>
                  </div>
                  <div style={{ padding: "24px" }}>
                    <h3
                      style={{
                        color: "var(--primary)",
                        fontWeight: 600,
                        marginBottom: 10,
                        lineHeight: 1.4,
                      }}
                    >
                      {c.title}
                    </h3>
                    <p
                      style={{
                        fontSize: ".85rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.7,
                        marginBottom: 16,
                      }}
                    >
                      {c.description.substring(0, 120)}...
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        marginBottom: 20,
                      }}
                    >
                      {[
                        [
                          FiCalendar,
                          new Date(c.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }),
                        ],
                        [FiClock, c.duration],
                        [FiAward, c.location],
                      ].map(([Icon, val]) => (
                        <div
                          key={val}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: ".8rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          <Icon size={13} /> {val}
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          color: "var(--primary)",
                          fontSize: "1.1rem",
                        }}
                      >
                        {c.fee}
                      </span>
                      <span
                        style={{
                          fontSize: ".78rem",
                          color:
                            spotsLeft <= 5
                              ? "var(--danger)"
                              : "var(--text-muted)",
                        }}
                      >
                        {spotsLeft} seat{spotsLeft !== 1 ? "s" : ""} left
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div
                      style={{
                        background: "var(--border)",
                        borderRadius: 4,
                        height: 6,
                        marginBottom: 16,
                      }}
                    >
                      <div
                        style={{
                          width: `${(c.enrolled / c.seats) * 100}%`,
                          height: "100%",
                          background: "var(--accent)",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleEnrol(c)}
                      className="btn btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Enrol Now <FiArrowRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CPD Info */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="cpd-info-layout">
            <div>
              <span className="section-label">CPD Requirements</span>
              <h2 className="section-title">
                Understanding Your CPD Obligations
              </h2>
              <div className="divider" />
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                LAAQS requires all professional members to complete a minimum of{" "}
                <strong>20 CPD points per year</strong> to maintain their good
                standing and professional registration.
              </p>
              {[
                [
                  "Minimum 20 points",
                  "required per year for professional members",
                ],
                ["Points expire", "after 3 years if not renewed"],
                ["Accredited providers", "only count towards your total"],
                ["Certificate issued", "upon completion of each programme"],
              ].map(([bold, rest]) => (
                <div
                  key={bold}
                  style={{ display: "flex", gap: 12, marginBottom: 14 }}
                >
                  <FiAward
                    color="var(--accent)"
                    size={18}
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <span style={{ fontSize: ".92rem", lineHeight: 1.6 }}>
                    <strong>{bold}</strong> {rest}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--bg)",
                borderRadius: "var(--radius-lg)",
                padding: "36px",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                style={{
                  color: "var(--primary)",
                  marginBottom: 20,
                  fontWeight: 700,
                }}
              >
                CPD Point Categories
              </h4>
              {[
                {
                  cat: "Structured Learning",
                  desc: "Courses, workshops, seminars",
                  pts: "Up to 15 pts/yr",
                },
                {
                  cat: "Unstructured Learning",
                  desc: "Reading, self-study, online articles",
                  pts: "Up to 5 pts/yr",
                },
                {
                  cat: "Presenting & Teaching",
                  desc: "Giving talks, lectures",
                  pts: "Up to 5 pts/yr",
                },
                {
                  cat: "Industry Involvement",
                  desc: "Committee work, mentoring",
                  pts: "Up to 5 pts/yr",
                },
              ].map((item) => (
                <div
                  key={item.cat}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: ".9rem",
                        marginBottom: 3,
                      }}
                    >
                      {item.cat}
                    </div>
                    <div
                      style={{ fontSize: ".8rem", color: "var(--text-muted)" }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <span
                    className="badge badge-gold"
                    style={{ flexShrink: 0, marginLeft: 12 }}
                  >
                    {item.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

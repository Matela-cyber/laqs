import React from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import "../styles/components.css";

const COMMITTEE = [
  {
    name: "Mr. Lehlohonolo Mokhele",
    role: "President",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&face",
  },
  {
    name: "Ms. Nthabiseng Ramaema",
    role: "Vice-President",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&face",
  },
  {
    name: "Mr. Tšepiso Letsie",
    role: "Secretary General",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&face",
  },
  {
    name: "Ms. Mamorena Sello",
    role: "Treasurer",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&face",
  },
  {
    name: "Mr. Rethabile Molapo",
    role: "CPD Chair",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&face",
  },
  {
    name: "Ms. Limakatso Ntai",
    role: "Membership Chair",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&face",
  },
];

const MILESTONES = [
  { year: "2005", event: "LAAQS founded by 12 founding members in Maseru" },
  {
    year: "2008",
    event: "Recognised by the Government of Lesotho Ministry of Public Works",
  },
  {
    year: "2012",
    event: "Affiliated with AAQS – Africa Association of Quantity Surveyors",
  },
  { year: "2015", event: "Launched first accredited CPD programme" },
  { year: "2018", event: "Established member directory and online services" },
  { year: "2022", event: "Membership surpassed 400 registered professionals" },
  {
    year: "2025",
    event: "Digital transformation: full online membership & CPD portal",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>About</span>
          </div>
          <h1>About LAAQS</h1>
          <p>
            Advancing the built environment profession in the Kingdom of Lesotho
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <div>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">
                The Professional Voice of Quantity Surveyors in Lesotho
              </h2>
              <div className="divider" />
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.85,
                  marginBottom: 18,
                }}
              >
                The Lesotho Association of Architects and Quantity Surveyors
                (LAAQS) is the recognised professional body for quantity
                surveyors, cost consultants, and architects in Lesotho. We
                represent practitioners in both the public and private sectors.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.85,
                  marginBottom: 24,
                }}
              >
                Our mandate is to regulate the profession, raise standards,
                deliver professional development, and advocate on behalf of our
                members with government, industry, and international bodies.
              </p>
              {[
                "Regulated by Government of Lesotho",
                "AAQS Affiliated Member Body",
                "500+ Active Members",
                "Accredited CPD Programme",
              ].map((i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <FiCheckCircle color="var(--success)" size={17} />
                  <span style={{ fontSize: ".9rem" }}>{i}</span>
                </div>
              ))}
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=500&fit=crop"
                alt="LAAQS office"
                style={{
                  borderRadius: "var(--radius-lg)",
                  width: "100%",
                  height: 420,
                  objectFit: "cover",
                  boxShadow: "var(--shadow-lg)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="grid-2">
            <div
              style={{
                background: "var(--primary)",
                color: "#fff",
                padding: "40px 36px",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                style={{
                  fontSize: ".75rem",
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--accent-light)",
                  marginBottom: 12,
                }}
              >
                Our Vision
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.6rem",
                  marginBottom: 20,
                  lineHeight: 1.3,
                }}
              >
                A World-Class Quantity Surveying Profession in Lesotho
              </h3>
              <p style={{ opacity: 0.85, lineHeight: 1.8 }}>
                To be the leading professional institution in Lesotho that
                drives excellence, innovation, and ethical practice in the built
                environment, recognised across Africa and beyond.
              </p>
            </div>
            <div
              style={{
                background: "var(--accent)",
                color: "#fff",
                padding: "40px 36px",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                style={{
                  fontSize: ".75rem",
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,.75)",
                  marginBottom: 12,
                }}
              >
                Our Mission
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.6rem",
                  marginBottom: 20,
                  lineHeight: 1.3,
                }}
              >
                Empowering Professionals, Elevating Standards
              </h3>
              <p style={{ opacity: 0.9, lineHeight: 1.8 }}>
                To regulate, develop, and promote the quantity surveying and
                architecture professions in Lesotho through education, advocacy,
                certification, and the delivery of high-quality professional
                services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="section-label">Our Values</span>
            <h2 className="section-title" style={{ margin: "0 auto" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid-4">
            {[
              {
                icon: "⚖️",
                title: "Integrity",
                desc: "We uphold the highest ethical standards in all our dealings.",
              },
              {
                icon: "🏆",
                title: "Excellence",
                desc: "We strive for outstanding quality in professional services.",
              },
              {
                icon: "🤝",
                title: "Collaboration",
                desc: "We work together with stakeholders for industry growth.",
              },
              {
                icon: "🌍",
                title: "Development",
                desc: "We invest in lifelong learning and professional growth.",
              },
            ].map((v) => (
              <div
                key={v.title}
                style={{
                  textAlign: "center",
                  padding: "32px 24px",
                  background: "var(--bg)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: "2.4rem", marginBottom: 16 }}>
                  {v.icon}
                </div>
                <h4
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {v.title}
                </h4>
                <p
                  style={{
                    fontSize: ".88rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee */}
      <section
        id="committee"
        className="section"
        style={{ background: "var(--bg)" }}
      >
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="section-label">Leadership</span>
            <h2 className="section-title" style={{ margin: "0 auto" }}>
              Executive Committee 2025
            </h2>
            <div className="divider" style={{ margin: "16px auto 0" }} />
          </div>
          <div className="grid-3">
            {COMMITTEE.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  textAlign: "center",
                  border: "1px solid var(--border)",
                  transition: "all .25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = "var(--shadow-md)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "var(--shadow-sm)")
                }
              >
                <div style={{ height: 180, overflow: "hidden" }}>
                  <img
                    src={c.img}
                    alt={c.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "20px 16px" }}>
                  <h4
                    style={{
                      color: "var(--primary)",
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {c.name}
                  </h4>
                  <span className="badge badge-gold">{c.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="section-label">Our History</span>
            <h2 className="section-title" style={{ margin: "0 auto" }}>
              20 Years of Progress
            </h2>
          </div>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                style={{
                  display: "flex",
                  gap: 24,
                  marginBottom: 32,
                  paddingBottom: 32,
                  borderBottom:
                    i < MILESTONES.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 72,
                    height: 36,
                    background: "var(--primary)",
                    color: "#fff",
                    borderRadius: "var(--radius)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: ".9rem",
                  }}
                >
                  {m.year}
                </div>
                <p
                  style={{
                    fontSize: ".95rem",
                    lineHeight: 1.7,
                    color: "var(--text)",
                    paddingTop: 6,
                  }}
                >
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2>Become Part of Our Story</h2>
          <p>
            Join LAAQS and help shape the future of quantity surveying in
            Lesotho.
          </p>
          <div className="cta-actions">
            <Link to="/membership" className="btn btn-primary btn-lg">
              Apply for Membership <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn btn-white btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

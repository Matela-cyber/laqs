import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiUsers,
  FiBook,
  FiBriefcase,
  FiFileText,
  FiAward,
  FiGlobe,
  FiCheckCircle,
  FiCalendar,
} from "react-icons/fi";
import "../styles/components.css";

const STATS = [
  { num: "500+", label: "Registered Members" },
  { num: "120+", label: "CPD Courses Offered" },
  { num: "15+", label: "Years of Service" },
  { num: "200+", label: "Projects Certified" },
];

const FEATURES = [
  {
    icon: <FiUsers />,
    title: "Professional Membership",
    desc: "Join a network of qualified quantity surveyors and architects. Access exclusive resources, networking events, and industry updates.",
  },
  {
    icon: <FiBook />,
    title: "CPD & Training",
    desc: "Earn Continuing Professional Development points through accredited courses, workshops, webinars, and site visits.",
  },
  {
    icon: <FiBriefcase />,
    title: "Job Opportunities",
    desc: "Explore top QS and architecture career opportunities across Lesotho and the Southern African region.",
  },
  {
    icon: <FiFileText />,
    title: "Resources & Documents",
    desc: "Access standard forms, government guidelines, technical publications, and contract documents.",
  },
  {
    icon: <FiAward />,
    title: "Certifications",
    desc: "Receive official certifications upon completing accredited CPD programmes recognised across Africa.",
  },
  {
    icon: <FiGlobe />,
    title: "Industry Advocacy",
    desc: "We represent members' interests with government, developers, and international bodies like AAQS.",
  },
];

const NEWS = [
  {
    id: 1,
    title: "LAAQS 2025 Annual General Meeting – Results & Announcements",
    excerpt:
      "The 2025 AGM was held in Maseru with over 200 members in attendance. New executive committee members were elected and strategic plans unveiled.",
    date: "15 Apr 2025",
    category: "Announcements",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=210&fit=crop",
  },
  {
    id: 2,
    title: "New CPD Programme: BIM & Digital Construction",
    excerpt:
      "LAAQS is proud to announce a new Building Information Modelling CPD course in partnership with local universities.",
    date: "8 Apr 2025",
    category: "CPD",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=210&fit=crop",
  },
  {
    id: 3,
    title:
      "Government Construction Projects: Opportunities for QS Practitioners",
    excerpt:
      "Major government infrastructure projects create new opportunities for registered quantity surveyors in Lesotho.",
    date: "1 Apr 2025",
    category: "Industry",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=210&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    text: "Joining LAAQS was the best decision of my professional career. The networking opportunities and CPD programmes have elevated my practice significantly.",
    name: "Thabo Molefe",
    title: "Senior Quantity Surveyor, Maseru",
    initials: "TM",
  },
  {
    text: "LAAQS provides a strong platform for young professionals. The mentorship and resources available have helped me grow immensely.",
    name: "Malehloa Ntšekhe",
    title: "Graduate QS, Leribe",
    initials: "MN",
  },
  {
    text: "The member directory has connected me with excellent QS consultants for my construction projects. Highly recommended.",
    name: "Rethabile Sithole",
    title: "Property Developer",
    initials: "RS",
  },
];

const MEMBERSHIPS = [
  {
    name: "Student",
    fee: "LSL 500",
    period: "/ year",
    desc: "For full-time students enrolled in QS or Architecture programmes.",
    features: [
      "Access to resources",
      "CPD at reduced rates",
      "Student events",
      "Networking",
      "No voting rights",
    ],
    included: [true, true, true, true, false],
  },
  {
    name: "Graduate",
    fee: "LSL 1,200",
    period: "/ year",
    desc: "For recent graduates working towards full professional status.",
    features: [
      "All Student benefits",
      "Job board access",
      "Mentorship programme",
      "Annual certificate",
      "Reduced CPD fees",
    ],
    included: [true, true, true, true, true],
    featured: true,
  },
  {
    name: "Professional",
    fee: "LSL 2,500",
    period: "/ year",
    desc: "Full membership for registered, practising quantity surveyors.",
    features: [
      "All Graduate benefits",
      "Voting rights",
      "Committee eligibility",
      "Free CPD (2 per year)",
      "Practice endorsement",
    ],
    included: [true, true, true, true, true],
  },
  {
    name: "Corporate",
    fee: "LSL 8,000",
    period: "/ year",
    desc: "For quantity surveying practices and firms.",
    features: [
      "5 staff members",
      "Priority listings",
      "Branding opportunities",
      "AGM representation",
      "Free job postings",
    ],
    included: [true, true, true, true, true],
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="hero-grid-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <FiAward size={14} /> Est. 2005 &nbsp;·&nbsp; Maseru, Lesotho
            </div>
            <h1>
              Advancing the
              <br />
              <em>Quantity Surveying</em>
              <br />
              Profession in Lesotho
            </h1>
            <p>
              LAAQS is the leading professional body for quantity surveyors and
              architects in Lesotho — setting standards, empowering
              professionals, and championing the built environment since 2005.
            </p>
            <div className="hero-actions">
              <Link to="/membership" className="btn btn-primary btn-lg">
                Join LAAQS <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-white btn-lg">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <span className="section-label">What We Offer</span>
            <h2
              className="section-title"
              style={{ margin: "0 auto", maxWidth: 560 }}
            >
              Everything You Need as a<br />
              QS Professional
            </h2>
            <div className="divider" style={{ margin: "16px auto 0" }} />
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About strip ── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="about-strip">
            <div>
              <span className="section-label">About LAAQS</span>
              <h2 className="section-title">
                Setting the Standard for Built Environment Professionals
              </h2>
              <div className="divider" />
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}
              >
                The Lesotho Association of Architects and Quantity Surveyors
                (LAAQS) was founded to regulate, develop, and promote the
                quantity surveying and architecture professions in the Kingdom
                of Lesotho.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                We work closely with government ministries, educational
                institutions, and international bodies such as the African
                Association of Quantity Surveyors (AAQS) to ensure our members
                remain competitive and well-respected across the continent.
              </p>
              {[
                "Regulated by the Ministry of Local Government",
                "Affiliated with AAQS (Africa Association of QS)",
                "Over 500 registered members nationwide",
                "Fully accredited CPD programme",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <FiCheckCircle color="var(--success)" size={18} />
                  <span style={{ fontSize: ".92rem" }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 32 }}>
                <Link to="/about" className="btn btn-primary">
                  Our Full Story <FiArrowRight />
                </Link>
              </div>
            </div>
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=500&fit=crop"
                alt="Construction professionals"
              />
              <div className="about-highlight">
                <strong>20+</strong>
                <span>Years of Professional Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Membership Types ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <span className="section-label">Membership</span>
            <h2 className="section-title" style={{ margin: "0 auto" }}>
              Choose Your Membership Category
            </h2>
            <div className="divider" style={{ margin: "16px auto 0" }} />
          </div>
          <div className="grid-4">
            {MEMBERSHIPS.map((m) => (
              <div
                key={m.name}
                className={`membership-card${m.featured ? " featured" : ""}`}
              >
                {m.featured && (
                  <div className="membership-popular">Most Popular</div>
                )}
                <h3>{m.name}</h3>
                <p style={{ fontSize: ".85rem", color: "var(--text-muted)" }}>
                  {m.desc}
                </p>
                <div className="membership-fee">
                  {m.fee}
                  <span>{m.period}</span>
                </div>
                <div className="membership-features">
                  {m.features.map((feat, i) => (
                    <div key={feat} className="membership-feature">
                      {m.included[i] ? (
                        <FiCheckCircle className="check" size={15} />
                      ) : (
                        <span className="cross" style={{ fontSize: ".9rem" }}>
                          ✕
                        </span>
                      )}
                      <span style={{ fontSize: ".85rem" }}>{feat}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/membership"
                  className={`btn btn-sm ${m.featured ? "btn-primary" : "btn-outline"}`}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div
            className="flex-between"
            style={{ marginBottom: 40, flexWrap: "wrap", gap: 16 }}
          >
            <div>
              <span className="section-label">Latest News</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Industry News &amp; Updates
              </h2>
            </div>
            <Link to="/news" className="btn btn-outline">
              View All News <FiArrowRight />
            </Link>
          </div>
          <div className="grid-3">
            {NEWS.map((n) => (
              <div key={n.id} className="card">
                <div className="news-card-img">
                  <img src={n.img} alt={n.title} />
                </div>
                <div className="news-card-body">
                  <div className="news-card-meta">
                    <span className="badge badge-blue">{n.category}</span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: ".78rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      <FiCalendar size={12} /> {n.date}
                    </span>
                  </div>
                  <h3>{n.title}</h3>
                  <p>{n.excerpt}</p>
                  <Link to={`/news/${n.id}`} className="btn btn-sm btn-outline">
                    Read More <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="section-label">Testimonials</span>
            <h2 className="section-title" style={{ margin: "0 auto" }}>
              What Our Members Say
            </h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-title">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Join LAAQS?</h2>
          <p>
            Become part of Lesotho's premier professional body for quantity
            surveyors and architects. Elevate your career and connect with over
            500 professionals.
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

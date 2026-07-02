import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";
import toast from "react-hot-toast";
import "../styles/components.css";

const DEMO_JOBS = [
  {
    id: "1",
    title: "Senior Quantity Surveyor",
    company: "Lesotho Highlands Development Authority",
    location: "Maseru, Lesotho",
    type: "Full-time",
    salary: "LSL 25,000–35,000/mo",
    category: "Quantity Surveying",
    deadline: "2025-05-30",
    description:
      "LHDA seeks an experienced QS to manage cost control on major water infrastructure projects. Min 5 years experience required. Registration with LAAQS mandatory.",
    posted: "2025-04-20",
  },
  {
    id: "2",
    title: "Graduate Quantity Surveyor",
    company: "Temo Construction Ltd",
    location: "Maseru, Lesotho",
    type: "Full-time",
    salary: "LSL 8,000–12,000/mo",
    category: "Quantity Surveying",
    deadline: "2025-05-25",
    description:
      "An exciting opportunity for a recent graduate to join a leading construction firm. Mentorship provided. BSc QS required.",
    posted: "2025-04-18",
  },
  {
    id: "3",
    title: "Project Manager – Housing Development",
    company: "Millennium Challenge Account",
    location: "Maseru / Remote",
    type: "Contract",
    salary: "Negotiable",
    category: "Project Management",
    deadline: "2025-05-15",
    description:
      "MCA-Lesotho requires an experienced project manager to oversee housing development programmes under the compact agreement.",
    posted: "2025-04-15",
  },
  {
    id: "4",
    title: "Architect – Urban Projects",
    company: "Ministry of Public Works",
    location: "Maseru, Lesotho",
    type: "Government",
    salary: "PSA Scale",
    category: "Architecture",
    deadline: "2025-06-01",
    description:
      "Join the government team designing sustainable urban infrastructure. Must be registered with LAAQS and hold a professional architecture qualification.",
    posted: "2025-04-10",
  },
  {
    id: "5",
    title: "Cost Estimator",
    company: "Global QS Consultants",
    location: "Maseru, Lesotho",
    type: "Full-time",
    salary: "LSL 15,000–20,000/mo",
    category: "Cost Consulting",
    deadline: "2025-05-20",
    description:
      "Global QS Consultants seeks a skilled cost estimator for commercial and residential projects. Experience with bills of quantities required.",
    posted: "2025-04-08",
  },
  {
    id: "6",
    title: "Facilities Manager",
    company: "Standard Lesotho Bank",
    location: "Maseru, Lesotho",
    type: "Full-time",
    salary: "LSL 18,000–25,000/mo",
    category: "Facilities Management",
    deadline: "2025-05-31",
    description:
      "Manage and maintain bank branches across Lesotho. QS background preferred. Experience in facilities management required.",
    posted: "2025-04-05",
  },
];

const CATEGORIES = [
  "All",
  "Quantity Surveying",
  "Architecture",
  "Project Management",
  "Cost Consulting",
  "Facilities Management",
];
const TYPES = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Government",
  "Remote",
];

const TYPE_BADGE = {
  "Full-time": "badge-green",
  Contract: "badge-gold",
  Government: "badge-blue",
  Remote: "badge-grey",
  "Part-time": "badge-grey",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState(DEMO_JOBS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All Types");
  const [activeJob, setActiveJob] = useState(DEMO_JOBS[0]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "jobs"), orderBy("posted", "desc")),
        );
        if (!snap.empty) {
          const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setJobs(data);
          setActiveJob(data[0]);
        }
      } catch (_) {}
    };
    fetchJobs();
  }, []);

  const filtered = jobs.filter((j) => {
    const matchCat = category === "All" || j.category === category;
    const matchType = type === "All Types" || j.type === type;
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Jobs</span>
          </div>
          <h1>Job Opportunities</h1>
          <p>Find QS and architecture career opportunities across Lesotho</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          {/* Search & filters */}
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              marginBottom: 32,
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="jobs-filters" style={{ gap: 14 }}>
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
                  placeholder="Search jobs or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="form-control"
                style={{ minWidth: 180, flex: "1 1 180px" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                className="form-control"
                style={{ minWidth: 160, flex: "1 1 160px" }}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="jobs-layout">
            {/* Job list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p
                style={{
                  fontSize: ".85rem",
                  color: "var(--text-muted)",
                  marginBottom: 4,
                }}
              >
                {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
              </p>
              {filtered.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setActiveJob(job)}
                  style={{
                    background: "#fff",
                    borderRadius: "var(--radius-lg)",
                    padding: "20px",
                    border: `2px solid ${activeJob?.id === job.id ? "var(--primary)" : "var(--border)"}`,
                    cursor: "pointer",
                    transition: "all .2s",
                    boxShadow:
                      activeJob?.id === job.id
                        ? "var(--shadow-md)"
                        : "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <h4
                      style={{
                        color: "var(--primary)",
                        fontWeight: 600,
                        fontSize: ".95rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {job.title}
                    </h4>
                    <span
                      className={`badge ${TYPE_BADGE[job.type] || "badge-grey"}`}
                    >
                      {job.type}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: ".82rem",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {job.company}
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: ".78rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      <FiMapPin size={11} /> {job.location}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: ".78rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {job.salary}
                    </span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="empty-state">
                  <p>No jobs match your criteria.</p>
                </div>
              )}
            </div>

            {/* Job detail */}
            {activeJob && (
              <div
                className="sticky-panel"
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "36px",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 20,
                    gap: 12,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "var(--primary)",
                      fontSize: "1.5rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {activeJob.title}
                  </h2>
                  <span
                    className={`badge ${TYPE_BADGE[activeJob.type] || "badge-grey"}`}
                  >
                    {activeJob.type}
                  </span>
                </div>
                <h4 style={{ marginBottom: 20, color: "var(--text-muted)" }}>
                  {activeJob.company}
                </h4>

                <div className="detail-grid">
                  {[
                    [FiMapPin, "Location", activeJob.location],
                    [null, "Salary", activeJob.salary],
                    [FiBriefcase, "Category", activeJob.category],
                    [
                      FiCalendar,
                      "Deadline",
                      new Date(activeJob.deadline).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }),
                    ],
                  ].map(([Icon, label, val]) => (
                    <div
                      key={label}
                      style={{
                        background: "var(--bg)",
                        borderRadius: "var(--radius)",
                        padding: "12px 14px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: ".75rem",
                          color: "var(--text-muted)",
                          marginBottom: 4,
                        }}
                      >
                        {Icon && <Icon size={12} />} {label}
                      </div>
                      <div style={{ fontSize: ".88rem", fontWeight: 600 }}>
                        {val}
                      </div>
                    </div>
                  ))}
                </div>

                <h4 style={{ marginBottom: 12, color: "var(--primary)" }}>
                  Job Description
                </h4>
                <p
                  style={{
                    lineHeight: 1.8,
                    color: "var(--text-muted)",
                    marginBottom: 28,
                  }}
                >
                  {activeJob.description}
                </p>

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={() =>
                      toast.success(
                        "Application submitted! The employer will contact you.",
                      )
                    }
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    Apply Now <FiArrowRight />
                  </button>
                  <button
                    onClick={() =>
                      toast("Job saved to your profile.", { icon: "🔖" })
                    }
                    className="btn btn-outline"
                  >
                    Save
                  </button>
                </div>
                <p
                  style={{
                    fontSize: ".78rem",
                    color: "var(--text-muted)",
                    marginTop: 12,
                    textAlign: "center",
                  }}
                >
                  Posted:{" "}
                  {new Date(activeJob.posted).toLocaleDateString("en-GB")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Post a job CTA */}
      <section className="cta-banner" style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "1.8rem" }}>Are You an Employer?</h2>
          <p>
            Post job opportunities and reach qualified QS professionals across
            Lesotho.
          </p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Post a Job Listing <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

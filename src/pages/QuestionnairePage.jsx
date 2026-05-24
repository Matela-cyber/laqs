import React, { useState } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiTrash2,
  FiSave,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import toast from "react-hot-toast";
import "../styles/components.css";

/* ─── helpers ─────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2, 9);

function SectionCard({ title, hint, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,.06)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 24px",
          background: open ? "var(--primary)" : "#f9fafb",
          color: open ? "#fff" : "var(--text)",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: 600,
          transition: "background .2s",
        }}
      >
        <span>{title}</span>
        {open ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
      </button>
      {open && (
        <div style={{ padding: "24px" }}>
          {hint && (
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 20,
                fontSize: ".85rem",
                color: "#1d4ed8",
              }}
            >
              <FiInfo size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{hint}</span>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

function Field({ label, required, children, note }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontWeight: 600,
          fontSize: ".88rem",
          color: "var(--text)",
          marginBottom: 6,
        }}
      >
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {note && (
        <p
          style={{
            fontSize: ".78rem",
            color: "var(--text-muted)",
            marginTop: 4,
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: ".9rem",
  color: "var(--text)",
  background: "#fafafa",
  outline: "none",
  boxSizing: "border-box",
};

const textarea = { ...input, minHeight: 90, resize: "vertical" };

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0 24px",
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function QuestionnairePage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ── 1. Organisation ── */
  const [org, setOrg] = useState({
    fullName: "",
    acronym: "",
    registrationNumber: "",
    yearFounded: "",
    physicalAddress: "",
    postalAddress: "",
    phone: "",
    altPhone: "",
    email: "",
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });

  /* ── 2. Mission / Vision / Values ── */
  const [mvv, setMvv] = useState({
    mission: "",
    vision: "",
    coreValues: "",
    mandate: "",
  });

  /* ── 3. Statistics ── */
  const [stats, setStats] = useState({
    totalMembers: "",
    yearsOfService: "",
    cpdCoursesOffered: "",
    projectsCertified: "",
    activeStudentMembers: "",
    registeredFirms: "",
  });

  /* ── 4. Milestones ── */
  const [milestones, setMilestones] = useState([
    { id: uid(), year: "", event: "" },
  ]);

  /* ── 5. Executive Committee ── */
  const [committee, setCommittee] = useState([
    {
      id: uid(),
      name: "",
      role: "",
      qualifications: "",
      employer: "",
      email: "",
      phone: "",
      photoUrl: "",
      bio: "",
    },
  ]);

  /* ── 6. Membership Categories ── */
  const [membershipTypes, setMembershipTypes] = useState([
    {
      id: uid(),
      name: "",
      annualFee: "",
      eligibility: "",
      benefits: "",
      requirements: "",
    },
  ]);

  /* ── 7. CPD Events ── */
  const [cpdEvents, setCpdEvents] = useState([
    {
      id: uid(),
      title: "",
      type: "Course",
      date: "",
      endDate: "",
      location: "",
      mode: "In-person",
      fee: "",
      cpdPoints: "",
      seatsAvailable: "",
      description: "",
      facilitator: "",
      contactEmail: "",
    },
  ]);

  /* ── 8. News / Announcements ── */
  const [newsItems, setNewsItems] = useState([
    {
      id: uid(),
      title: "",
      category: "Announcements",
      date: "",
      content: "",
      imageUrl: "",
    },
  ]);

  /* ── 9. Job Listings ── */
  const [jobs, setJobs] = useState([
    {
      id: uid(),
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      category: "Quantity Surveying",
      deadline: "",
      description: "",
    },
  ]);

  /* ── 10. Shop / Publications ── */
  const [publications, setPublications] = useState([
    {
      id: uid(),
      title: "",
      category: "Standard Form",
      price: "",
      description: "",
      fileUrl: "",
      coverImageUrl: "",
    },
  ]);

  /* ── 11. Contact Departments ── */
  const [departments, setDepartments] = useState([
    { id: uid(), name: "", contactPerson: "", email: "", phone: "" },
  ]);

  /* ── 12. Partners / Affiliates ── */
  const [partners, setPartners] = useState([
    { id: uid(), name: "", type: "", website: "", logoUrl: "", notes: "" },
  ]);

  /* ── 13. Testimonials ── */
  const [testimonials, setTestimonials] = useState([
    { id: uid(), name: "", jobTitle: "", memberType: "", quote: "" },
  ]);

  /* ══ list helpers ══ */
  function addRow(setter, template) {
    setter((prev) => [...prev, { ...template, id: uid() }]);
  }
  function removeRow(setter, id) {
    setter((prev) =>
      prev.length > 1 ? prev.filter((r) => r.id !== id) : prev,
    );
  }
  function updateRow(setter, id, field, value) {
    setter((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  }

  /* ══ SUBMIT ══ */
  async function handleSubmit(e) {
    e.preventDefault();
    if (!org.fullName || !org.email || !org.phone) {
      toast.error("Please complete the required fields in Section 1.");
      return;
    }
    setLoading(true);
    try {
      await setDoc(doc(db, "questionnaire", "laaqs_info"), {
        organisation: org,
        missionVisionValues: mvv,
        statistics: stats,
        milestones,
        executiveCommittee: committee,
        membershipTypes,
        cpdEvents,
        news: newsItems,
        jobs,
        publications,
        contactDepartments: departments,
        partners,
        testimonials,
        submittedAt: serverTimestamp(),
        status: "submitted",
      });
      toast.success("Questionnaire saved successfully!");
      setSaved(true);
    } catch (err) {
      console.error(err);
      toast.error("Save failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (saved) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          textAlign: "center",
          padding: 32,
        }}
      >
        <FiCheckCircle size={64} color="#059669" />
        <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>
          Information Saved!
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: 480 }}>
          Your responses have been stored in the database. The website
          administrator can now review and publish the real content across all
          pages.
        </p>
        <Link to="/admin" className="btn btn-primary" style={{ marginTop: 8 }}>
          Back to Admin Panel
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span>{" "}
            <Link to="/admin">Admin</Link> <span>/</span>{" "}
            <span>Questionnaire</span>
          </div>
          <h1>Website Content Questionnaire</h1>
          <p>
            Please fill in your organisation's real information so the website
            can display accurate content on all pages.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div
            style={{
              background: "#fef3c7",
              border: "1px solid #fbbf24",
              borderRadius: 10,
              padding: "14px 20px",
              marginBottom: 32,
              fontSize: ".9rem",
              color: "#92400e",
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <FiInfo size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              <strong>Instructions:</strong> Complete as many sections as
              possible. Fields marked with{" "}
              <span style={{ color: "#ef4444" }}>*</span> are required. Click
              each section header to expand it. You can save and return later —
              your progress is stored in Firebase.
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ══════════════════════════════════════════
                SECTION 1 — ORGANISATION DETAILS
            ══════════════════════════════════════════ */}
            <SectionCard
              title="1. Organisation Information"
              hint="This information appears in the footer, contact page, and various headers across the site."
              defaultOpen
            >
              <div style={grid2}>
                <Field label="Full Official Name" required>
                  <input
                    style={input}
                    placeholder="e.g. Lesotho Association of Architects and Quantity Surveyors"
                    value={org.fullName}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, fullName: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Acronym / Short Name" required>
                  <input
                    style={input}
                    placeholder="e.g. LAAQS"
                    value={org.acronym}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, acronym: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Official Registration Number">
                  <input
                    style={input}
                    placeholder="e.g. NPO/2005/001"
                    value={org.registrationNumber}
                    onChange={(e) =>
                      setOrg((o) => ({
                        ...o,
                        registrationNumber: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Year Founded">
                  <input
                    style={input}
                    placeholder="e.g. 2005"
                    value={org.yearFounded}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, yearFounded: e.target.value }))
                    }
                  />
                </Field>
              </div>
              <Field label="Physical / Office Address" required>
                <textarea
                  style={textarea}
                  placeholder="Building name, Street, City, Country"
                  value={org.physicalAddress}
                  onChange={(e) =>
                    setOrg((o) => ({ ...o, physicalAddress: e.target.value }))
                  }
                />
              </Field>
              <Field label="Postal Address (if different)">
                <textarea
                  style={{ ...textarea, minHeight: 60 }}
                  placeholder="PO Box / Private Bag"
                  value={org.postalAddress}
                  onChange={(e) =>
                    setOrg((o) => ({ ...o, postalAddress: e.target.value }))
                  }
                />
              </Field>
              <div style={grid2}>
                <Field label="Primary Phone Number" required>
                  <input
                    style={input}
                    placeholder="+266 22 ..."
                    value={org.phone}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, phone: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Alternative / WhatsApp Number">
                  <input
                    style={input}
                    placeholder="+266 58 ..."
                    value={org.altPhone}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, altPhone: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Official Email Address" required>
                  <input
                    style={input}
                    type="email"
                    placeholder="info@laaqs.org.ls"
                    value={org.email}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, email: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Website URL">
                  <input
                    style={input}
                    placeholder="https://www.laaqs.org.ls"
                    value={org.website}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, website: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Facebook Page URL">
                  <input
                    style={input}
                    placeholder="https://facebook.com/..."
                    value={org.facebook}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, facebook: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Twitter / X Profile URL">
                  <input
                    style={input}
                    placeholder="https://twitter.com/..."
                    value={org.twitter}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, twitter: e.target.value }))
                    }
                  />
                </Field>
                <Field label="LinkedIn Page URL">
                  <input
                    style={input}
                    placeholder="https://linkedin.com/company/..."
                    value={org.linkedin}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, linkedin: e.target.value }))
                    }
                  />
                </Field>
                <Field label="YouTube Channel URL">
                  <input
                    style={input}
                    placeholder="https://youtube.com/..."
                    value={org.youtube}
                    onChange={(e) =>
                      setOrg((o) => ({ ...o, youtube: e.target.value }))
                    }
                  />
                </Field>
              </div>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 2 — MISSION / VISION / VALUES
            ══════════════════════════════════════════ */}
            <SectionCard
              title="2. Mission, Vision & Core Values"
              hint="These appear on the About page and hero sections."
            >
              <Field label="Mission Statement" required>
                <textarea
                  style={textarea}
                  placeholder="Our mission is to..."
                  value={mvv.mission}
                  onChange={(e) =>
                    setMvv((m) => ({ ...m, mission: e.target.value }))
                  }
                />
              </Field>
              <Field label="Vision Statement" required>
                <textarea
                  style={textarea}
                  placeholder="Our vision is to..."
                  value={mvv.vision}
                  onChange={(e) =>
                    setMvv((m) => ({ ...m, vision: e.target.value }))
                  }
                />
              </Field>
              <Field
                label="Core Values"
                note='List each value on a new line, e.g. "Integrity", "Excellence", "Accountability"'
              >
                <textarea
                  style={textarea}
                  placeholder={
                    "Integrity\nExcellence\nAccountability\nCollaboration"
                  }
                  value={mvv.coreValues}
                  onChange={(e) =>
                    setMvv((m) => ({ ...m, coreValues: e.target.value }))
                  }
                />
              </Field>
              <Field label="Official Mandate / Legal Authority">
                <textarea
                  style={textarea}
                  placeholder="Describe the legal mandate or legislation under which the organisation operates..."
                  value={mvv.mandate}
                  onChange={(e) =>
                    setMvv((m) => ({ ...m, mandate: e.target.value }))
                  }
                />
              </Field>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 3 — STATISTICS
            ══════════════════════════════════════════ */}
            <SectionCard
              title="3. Key Statistics & Achievements"
              hint='These numbers appear as the "Stats" banner on the home page (e.g. 500+ Members, 15+ Years of Service).'
            >
              <div style={grid2}>
                <Field label="Total Registered Members">
                  <input
                    style={input}
                    placeholder="e.g. 320"
                    value={stats.totalMembers}
                    onChange={(e) =>
                      setStats((s) => ({ ...s, totalMembers: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Years of Service / Operation">
                  <input
                    style={input}
                    placeholder="e.g. 20"
                    value={stats.yearsOfService}
                    onChange={(e) =>
                      setStats((s) => ({
                        ...s,
                        yearsOfService: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="CPD Courses / Events Offered (total to date)">
                  <input
                    style={input}
                    placeholder="e.g. 80"
                    value={stats.cpdCoursesOffered}
                    onChange={(e) =>
                      setStats((s) => ({
                        ...s,
                        cpdCoursesOffered: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Projects Certified / Endorsed">
                  <input
                    style={input}
                    placeholder="e.g. 150"
                    value={stats.projectsCertified}
                    onChange={(e) =>
                      setStats((s) => ({
                        ...s,
                        projectsCertified: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Active Student Members">
                  <input
                    style={input}
                    placeholder="e.g. 45"
                    value={stats.activeStudentMembers}
                    onChange={(e) =>
                      setStats((s) => ({
                        ...s,
                        activeStudentMembers: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Registered Corporate / Firm Members">
                  <input
                    style={input}
                    placeholder="e.g. 12"
                    value={stats.registeredFirms}
                    onChange={(e) =>
                      setStats((s) => ({
                        ...s,
                        registeredFirms: e.target.value,
                      }))
                    }
                  />
                </Field>
              </div>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 4 — HISTORY & MILESTONES
            ══════════════════════════════════════════ */}
            <SectionCard
              title="4. Organisation History & Milestones"
              hint="A timeline on the About page. Add one row per significant event in the organisation's history."
            >
              {milestones.map((m, i) => (
                <div
                  key={m.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr 36px",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <input
                    style={input}
                    placeholder="Year"
                    value={m.year}
                    onChange={(e) =>
                      updateRow(setMilestones, m.id, "year", e.target.value)
                    }
                  />
                  <input
                    style={input}
                    placeholder="Describe the event / milestone"
                    value={m.event}
                    onChange={(e) =>
                      updateRow(setMilestones, m.id, "event", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeRow(setMilestones, m.id)}
                    style={{
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: 8,
                      cursor: "pointer",
                      color: "#ef4444",
                    }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRow(setMilestones, { year: "", event: "" })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add Milestone
              </button>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 5 — EXECUTIVE COMMITTEE
            ══════════════════════════════════════════ */}
            <SectionCard
              title="5. Executive Committee / Leadership Team"
              hint="Each member appears as a profile card on the About page. Provide a direct photo URL or upload photos separately."
            >
              {committee.map((m) => (
                <div
                  key={m.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 16,
                    background: "#fafafa",
                  }}
                >
                  <div style={grid2}>
                    <Field label="Full Name" required>
                      <input
                        style={input}
                        placeholder="e.g. Mr. Lehlohonolo Mokhele"
                        value={m.name}
                        onChange={(e) =>
                          updateRow(setCommittee, m.id, "name", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Role / Position" required>
                      <input
                        style={input}
                        placeholder="e.g. President"
                        value={m.role}
                        onChange={(e) =>
                          updateRow(setCommittee, m.id, "role", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Qualifications">
                      <input
                        style={input}
                        placeholder="e.g. BSc QS (Hons), MRICS"
                        value={m.qualifications}
                        onChange={(e) =>
                          updateRow(
                            setCommittee,
                            m.id,
                            "qualifications",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Current Employer / Organisation">
                      <input
                        style={input}
                        placeholder="e.g. Ministry of Public Works"
                        value={m.employer}
                        onChange={(e) =>
                          updateRow(
                            setCommittee,
                            m.id,
                            "employer",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Contact Email">
                      <input
                        style={input}
                        type="email"
                        placeholder="member@example.com"
                        value={m.email}
                        onChange={(e) =>
                          updateRow(setCommittee, m.id, "email", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Contact Phone">
                      <input
                        style={input}
                        placeholder="+266 ..."
                        value={m.phone}
                        onChange={(e) =>
                          updateRow(setCommittee, m.id, "phone", e.target.value)
                        }
                      />
                    </Field>
                  </div>
                  <Field
                    label="Profile Photo URL"
                    note="Paste a direct link to a photo (e.g. from Google Drive, Dropbox, or a photo hosting site)."
                  >
                    <input
                      style={input}
                      placeholder="https://..."
                      value={m.photoUrl}
                      onChange={(e) =>
                        updateRow(
                          setCommittee,
                          m.id,
                          "photoUrl",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <Field label="Short Biography (2–3 sentences)">
                    <textarea
                      style={{ ...textarea, minHeight: 70 }}
                      placeholder="Describe the member's background, experience, and contribution to the profession..."
                      value={m.bio}
                      onChange={(e) =>
                        updateRow(setCommittee, m.id, "bio", e.target.value)
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeRow(setCommittee, m.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: ".82rem",
                    }}
                  >
                    <FiTrash2 size={13} /> Remove Member
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setCommittee, {
                    name: "",
                    role: "",
                    qualifications: "",
                    employer: "",
                    email: "",
                    phone: "",
                    photoUrl: "",
                    bio: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add Committee Member
              </button>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 6 — MEMBERSHIP CATEGORIES
            ══════════════════════════════════════════ */}
            <SectionCard
              title="6. Membership Categories & Fees"
              hint="These appear on the Membership page. Provide accurate fees in Lesotho Loti (LSL) or relevant currency."
            >
              {membershipTypes.map((t) => (
                <div
                  key={t.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 16,
                    background: "#fafafa",
                  }}
                >
                  <div style={grid2}>
                    <Field label="Category Name" required>
                      <input
                        style={input}
                        placeholder="e.g. Student / Graduate / Professional / Corporate"
                        value={t.name}
                        onChange={(e) =>
                          updateRow(
                            setMembershipTypes,
                            t.id,
                            "name",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Annual Fee (with currency)" required>
                      <input
                        style={input}
                        placeholder="e.g. LSL 500/yr"
                        value={t.annualFee}
                        onChange={(e) =>
                          updateRow(
                            setMembershipTypes,
                            t.id,
                            "annualFee",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Eligibility Criteria">
                    <textarea
                      style={{ ...textarea, minHeight: 60 }}
                      placeholder="Who qualifies for this category?"
                      value={t.eligibility}
                      onChange={(e) =>
                        updateRow(
                          setMembershipTypes,
                          t.id,
                          "eligibility",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <Field label="Benefits" note="List one benefit per line.">
                    <textarea
                      style={{ ...textarea, minHeight: 80 }}
                      placeholder={
                        "Access to member directory\nFree CPD (2 per year)\nVoting rights\nAnnual certificate"
                      }
                      value={t.benefits}
                      onChange={(e) =>
                        updateRow(
                          setMembershipTypes,
                          t.id,
                          "benefits",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <Field label="Application Requirements">
                    <textarea
                      style={{ ...textarea, minHeight: 60 }}
                      placeholder="Documents needed to apply (e.g. certified ID, qualification certificates, CV)"
                      value={t.requirements}
                      onChange={(e) =>
                        updateRow(
                          setMembershipTypes,
                          t.id,
                          "requirements",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeRow(setMembershipTypes, t.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: ".82rem",
                    }}
                  >
                    <FiTrash2 size={13} /> Remove Category
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setMembershipTypes, {
                    name: "",
                    annualFee: "",
                    eligibility: "",
                    benefits: "",
                    requirements: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add Membership Category
              </button>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 7 — CPD EVENTS
            ══════════════════════════════════════════ */}
            <SectionCard
              title="7. CPD Events & Training Programme"
              hint="These appear on the CPD page. Provide upcoming events or recently completed ones."
            >
              {cpdEvents.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 16,
                    background: "#fafafa",
                  }}
                >
                  <Field label="Event Title" required>
                    <input
                      style={input}
                      placeholder="e.g. Introduction to BIM for QS Practitioners"
                      value={ev.title}
                      onChange={(e) =>
                        updateRow(setCpdEvents, ev.id, "title", e.target.value)
                      }
                    />
                  </Field>
                  <div style={grid2}>
                    <Field label="Type">
                      <select
                        style={input}
                        value={ev.type}
                        onChange={(e) =>
                          updateRow(setCpdEvents, ev.id, "type", e.target.value)
                        }
                      >
                        {[
                          "Course",
                          "Workshop",
                          "Webinar",
                          "Seminar",
                          "Site Visit",
                          "Conference",
                        ].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Delivery Mode">
                      <select
                        style={input}
                        value={ev.mode}
                        onChange={(e) =>
                          updateRow(setCpdEvents, ev.id, "mode", e.target.value)
                        }
                      >
                        {["In-person", "Online", "Hybrid"].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Start Date">
                      <input
                        style={input}
                        type="date"
                        value={ev.date}
                        onChange={(e) =>
                          updateRow(setCpdEvents, ev.id, "date", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="End Date">
                      <input
                        style={input}
                        type="date"
                        value={ev.endDate}
                        onChange={(e) =>
                          updateRow(
                            setCpdEvents,
                            ev.id,
                            "endDate",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Venue / Location">
                      <input
                        style={input}
                        placeholder="e.g. Maseru, NUL Campus / Online (Zoom)"
                        value={ev.location}
                        onChange={(e) =>
                          updateRow(
                            setCpdEvents,
                            ev.id,
                            "location",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="CPD Points Awarded">
                      <input
                        style={input}
                        placeholder="e.g. 8"
                        value={ev.cpdPoints}
                        onChange={(e) =>
                          updateRow(
                            setCpdEvents,
                            ev.id,
                            "cpdPoints",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Registration Fee">
                      <input
                        style={input}
                        placeholder="e.g. LSL 1,200"
                        value={ev.fee}
                        onChange={(e) =>
                          updateRow(setCpdEvents, ev.id, "fee", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Available Seats">
                      <input
                        style={input}
                        placeholder="e.g. 30"
                        value={ev.seatsAvailable}
                        onChange={(e) =>
                          updateRow(
                            setCpdEvents,
                            ev.id,
                            "seatsAvailable",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Facilitator / Presenter Name">
                      <input
                        style={input}
                        placeholder="Name and credentials"
                        value={ev.facilitator}
                        onChange={(e) =>
                          updateRow(
                            setCpdEvents,
                            ev.id,
                            "facilitator",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Contact Email for Bookings">
                      <input
                        style={input}
                        type="email"
                        placeholder="cpd@laaqs.org.ls"
                        value={ev.contactEmail}
                        onChange={(e) =>
                          updateRow(
                            setCpdEvents,
                            ev.id,
                            "contactEmail",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Course Description">
                    <textarea
                      style={textarea}
                      placeholder="Describe the course content, objectives, and target audience..."
                      value={ev.description}
                      onChange={(e) =>
                        updateRow(
                          setCpdEvents,
                          ev.id,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeRow(setCpdEvents, ev.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: ".82rem",
                    }}
                  >
                    <FiTrash2 size={13} /> Remove Event
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setCpdEvents, {
                    title: "",
                    type: "Course",
                    date: "",
                    endDate: "",
                    location: "",
                    mode: "In-person",
                    fee: "",
                    cpdPoints: "",
                    seatsAvailable: "",
                    description: "",
                    facilitator: "",
                    contactEmail: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add CPD Event
              </button>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 8 — NEWS & ANNOUNCEMENTS
            ══════════════════════════════════════════ */}
            <SectionCard
              title="8. News & Announcements"
              hint="These appear on the News page and the homepage news preview. Add current or recent articles."
            >
              {newsItems.map((n) => (
                <div
                  key={n.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 16,
                    background: "#fafafa",
                  }}
                >
                  <div style={grid2}>
                    <Field label="Headline / Title" required>
                      <input
                        style={input}
                        placeholder="Article headline"
                        value={n.title}
                        onChange={(e) =>
                          updateRow(setNewsItems, n.id, "title", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Category">
                      <select
                        style={input}
                        value={n.category}
                        onChange={(e) =>
                          updateRow(
                            setNewsItems,
                            n.id,
                            "category",
                            e.target.value,
                          )
                        }
                      >
                        {[
                          "Announcements",
                          "CPD",
                          "Industry",
                          "Partnerships",
                          "Awards",
                          "Events",
                          "Governance",
                        ].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Publication Date">
                      <input
                        style={input}
                        type="date"
                        value={n.date}
                        onChange={(e) =>
                          updateRow(setNewsItems, n.id, "date", e.target.value)
                        }
                      />
                    </Field>
                    <Field
                      label="Article Image URL"
                      note="Optional: link to a relevant photo."
                    >
                      <input
                        style={input}
                        placeholder="https://..."
                        value={n.imageUrl}
                        onChange={(e) =>
                          updateRow(
                            setNewsItems,
                            n.id,
                            "imageUrl",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Article Content / Body" required>
                    <textarea
                      style={{ ...textarea, minHeight: 120 }}
                      placeholder="Write the full article content here..."
                      value={n.content}
                      onChange={(e) =>
                        updateRow(setNewsItems, n.id, "content", e.target.value)
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeRow(setNewsItems, n.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: ".82rem",
                    }}
                  >
                    <FiTrash2 size={13} /> Remove Article
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setNewsItems, {
                    title: "",
                    category: "Announcements",
                    date: "",
                    content: "",
                    imageUrl: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add News Article
              </button>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 9 — JOB LISTINGS
            ══════════════════════════════════════════ */}
            <SectionCard
              title="9. Current Job Listings"
              hint="These appear on the Jobs page. List active vacancies relevant to the QS and architecture profession."
            >
              {jobs.map((j) => (
                <div
                  key={j.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 16,
                    background: "#fafafa",
                  }}
                >
                  <div style={grid2}>
                    <Field label="Job Title" required>
                      <input
                        style={input}
                        placeholder="e.g. Senior Quantity Surveyor"
                        value={j.title}
                        onChange={(e) =>
                          updateRow(setJobs, j.id, "title", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Employer / Company Name" required>
                      <input
                        style={input}
                        placeholder="e.g. Ministry of Public Works"
                        value={j.company}
                        onChange={(e) =>
                          updateRow(setJobs, j.id, "company", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Location">
                      <input
                        style={input}
                        placeholder="e.g. Maseru, Lesotho"
                        value={j.location}
                        onChange={(e) =>
                          updateRow(setJobs, j.id, "location", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Employment Type">
                      <select
                        style={input}
                        value={j.type}
                        onChange={(e) =>
                          updateRow(setJobs, j.id, "type", e.target.value)
                        }
                      >
                        {[
                          "Full-time",
                          "Part-time",
                          "Contract",
                          "Government",
                          "Internship",
                        ].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Salary / Remuneration">
                      <input
                        style={input}
                        placeholder="e.g. LSL 20,000–30,000/mo or Negotiable"
                        value={j.salary}
                        onChange={(e) =>
                          updateRow(setJobs, j.id, "salary", e.target.value)
                        }
                      />
                    </Field>
                    <Field label="Category">
                      <select
                        style={input}
                        value={j.category}
                        onChange={(e) =>
                          updateRow(setJobs, j.id, "category", e.target.value)
                        }
                      >
                        {[
                          "Quantity Surveying",
                          "Architecture",
                          "Project Management",
                          "Cost Consulting",
                          "Engineering",
                          "Other",
                        ].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Application Deadline">
                      <input
                        style={input}
                        type="date"
                        value={j.deadline}
                        onChange={(e) =>
                          updateRow(setJobs, j.id, "deadline", e.target.value)
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Job Description & Requirements">
                    <textarea
                      style={textarea}
                      placeholder="Describe the role, responsibilities, and minimum requirements..."
                      value={j.description}
                      onChange={(e) =>
                        updateRow(setJobs, j.id, "description", e.target.value)
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeRow(setJobs, j.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: ".82rem",
                    }}
                  >
                    <FiTrash2 size={13} /> Remove Job
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setJobs, {
                    title: "",
                    company: "",
                    location: "",
                    type: "Full-time",
                    salary: "",
                    category: "Quantity Surveying",
                    deadline: "",
                    description: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add Job Listing
              </button>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 10 — PUBLICATIONS / SHOP
            ══════════════════════════════════════════ */}
            <SectionCard
              title="10. Publications & Shop Items"
              hint="These appear in the Shop page. Include standard forms, guidelines, or documents sold/distributed by LAAQS."
            >
              {publications.map((p) => (
                <div
                  key={p.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 16,
                    background: "#fafafa",
                  }}
                >
                  <div style={grid2}>
                    <Field label="Document / Publication Title" required>
                      <input
                        style={input}
                        placeholder="e.g. Standard Form of Contract – Building Works"
                        value={p.title}
                        onChange={(e) =>
                          updateRow(
                            setPublications,
                            p.id,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Category">
                      <select
                        style={input}
                        value={p.category}
                        onChange={(e) =>
                          updateRow(
                            setPublications,
                            p.id,
                            "category",
                            e.target.value,
                          )
                        }
                      >
                        {[
                          "Standard Form",
                          "Guideline",
                          "Technical Paper",
                          "Practice Note",
                          "CPD Material",
                          "Government Circular",
                        ].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Price (LSL or Free)">
                      <input
                        style={input}
                        placeholder="e.g. LSL 350 or Free"
                        value={p.price}
                        onChange={(e) =>
                          updateRow(
                            setPublications,
                            p.id,
                            "price",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Download / File URL (if publicly available)">
                      <input
                        style={input}
                        placeholder="https://..."
                        value={p.fileUrl}
                        onChange={(e) =>
                          updateRow(
                            setPublications,
                            p.id,
                            "fileUrl",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea
                      style={{ ...textarea, minHeight: 60 }}
                      placeholder="Brief description of the document..."
                      value={p.description}
                      onChange={(e) =>
                        updateRow(
                          setPublications,
                          p.id,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeRow(setPublications, p.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: ".82rem",
                    }}
                  >
                    <FiTrash2 size={13} /> Remove Publication
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setPublications, {
                    title: "",
                    category: "Standard Form",
                    price: "",
                    description: "",
                    fileUrl: "",
                    coverImageUrl: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add Publication
              </button>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 11 — CONTACT DEPARTMENTS
            ══════════════════════════════════════════ */}
            <SectionCard
              title="11. Contact Departments & Office Hours"
              hint="These appear on the Contact page. List each department or contact point separately."
            >
              {departments.map((d) => (
                <div
                  key={d.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 36px",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <input
                    style={input}
                    placeholder="Department"
                    value={d.name}
                    onChange={(e) =>
                      updateRow(setDepartments, d.id, "name", e.target.value)
                    }
                  />
                  <input
                    style={input}
                    placeholder="Contact Person"
                    value={d.contactPerson}
                    onChange={(e) =>
                      updateRow(
                        setDepartments,
                        d.id,
                        "contactPerson",
                        e.target.value,
                      )
                    }
                  />
                  <input
                    style={input}
                    type="email"
                    placeholder="Email"
                    value={d.email}
                    onChange={(e) =>
                      updateRow(setDepartments, d.id, "email", e.target.value)
                    }
                  />
                  <input
                    style={input}
                    placeholder="Phone"
                    value={d.phone}
                    onChange={(e) =>
                      updateRow(setDepartments, d.id, "phone", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeRow(setDepartments, d.id)}
                    style={{
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: 8,
                      cursor: "pointer",
                      color: "#ef4444",
                    }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setDepartments, {
                    name: "",
                    contactPerson: "",
                    email: "",
                    phone: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                <FiPlus size={14} /> Add Department
              </button>
              <Field
                label="Office Hours"
                note="e.g. Monday–Friday: 08:00–16:30 | Closed on public holidays"
              >
                <textarea
                  style={{ ...textarea, minHeight: 60 }}
                  placeholder={
                    "Monday – Friday: 08:00 – 16:30\nSaturday: Closed\nSunday: Closed"
                  }
                  onChange={() => {}}
                />
              </Field>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 12 — PARTNERS & AFFILIATES
            ══════════════════════════════════════════ */}
            <SectionCard
              title="12. Partners, Affiliates & Accrediting Bodies"
              hint="Logos and links appear on the About and Home pages. Include AAQS, SACQSP, NUL, government bodies, etc."
            >
              {partners.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 140px 1fr 36px",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <input
                    style={input}
                    placeholder="Organisation Name"
                    value={p.name}
                    onChange={(e) =>
                      updateRow(setPartners, p.id, "name", e.target.value)
                    }
                  />
                  <select
                    style={input}
                    value={p.type}
                    onChange={(e) =>
                      updateRow(setPartners, p.id, "type", e.target.value)
                    }
                  >
                    {[
                      "",
                      "Affiliate Body",
                      "Government",
                      "Academic",
                      "Industry",
                      "International",
                      "Sponsor",
                    ].map((o) => (
                      <option key={o} value={o}>
                        {o || "Type…"}
                      </option>
                    ))}
                  </select>
                  <input
                    style={input}
                    placeholder="Website URL"
                    value={p.website}
                    onChange={(e) =>
                      updateRow(setPartners, p.id, "website", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeRow(setPartners, p.id)}
                    style={{
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: 8,
                      cursor: "pointer",
                      color: "#ef4444",
                    }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setPartners, {
                    name: "",
                    type: "",
                    website: "",
                    logoUrl: "",
                    notes: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add Partner
              </button>
            </SectionCard>

            {/* ══════════════════════════════════════════
                SECTION 13 — TESTIMONIALS
            ══════════════════════════════════════════ */}
            <SectionCard
              title="13. Member Testimonials"
              hint="These appear on the homepage. Provide quotes from real members with their permission."
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 16,
                    background: "#fafafa",
                  }}
                >
                  <div style={grid2}>
                    <Field label="Member Full Name">
                      <input
                        style={input}
                        placeholder="e.g. Thabo Molefe"
                        value={t.name}
                        onChange={(e) =>
                          updateRow(
                            setTestimonials,
                            t.id,
                            "name",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Job Title & Location">
                      <input
                        style={input}
                        placeholder="e.g. Senior QS, Maseru"
                        value={t.jobTitle}
                        onChange={(e) =>
                          updateRow(
                            setTestimonials,
                            t.id,
                            "jobTitle",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                    <Field label="Membership Type">
                      <select
                        style={input}
                        value={t.memberType}
                        onChange={(e) =>
                          updateRow(
                            setTestimonials,
                            t.id,
                            "memberType",
                            e.target.value,
                          )
                        }
                      >
                        {[
                          "",
                          "Student",
                          "Graduate",
                          "Professional",
                          "Corporate",
                        ].map((o) => (
                          <option key={o} value={o}>
                            {o || "Select…"}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Quote / Testimonial">
                    <textarea
                      style={{ ...textarea, minHeight: 80 }}
                      placeholder="What the member said about LAAQS..."
                      value={t.quote}
                      onChange={(e) =>
                        updateRow(
                          setTestimonials,
                          t.id,
                          "quote",
                          e.target.value,
                        )
                      }
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={() => removeRow(setTestimonials, t.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontSize: ".82rem",
                    }}
                  >
                    <FiTrash2 size={13} /> Remove Testimonial
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addRow(setTestimonials, {
                    name: "",
                    jobTitle: "",
                    memberType: "",
                    quote: "",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  color: "var(--primary)",
                  fontSize: ".87rem",
                  fontWeight: 600,
                }}
              >
                <FiPlus size={14} /> Add Testimonial
              </button>
            </SectionCard>

            {/* ══ SUBMIT ══ */}
            <div
              style={{
                textAlign: "center",
                marginTop: 40,
                paddingTop: 32,
                borderTop: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  color: "var(--text-muted)",
                  marginBottom: 20,
                  fontSize: ".9rem",
                }}
              >
                Review your entries above, then click{" "}
                <strong>Save to Database</strong>. The admin will apply your
                information across the website.
              </p>
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: loading ? "#94a3b8" : "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "14px 36px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 14px rgba(0,0,0,.15)",
                  transition: "background .2s",
                }}
              >
                <FiSave size={18} />
                {loading ? "Saving…" : "Save to Database"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiCheckCircle,
  FiUpload,
  FiArrowRight,
  FiUser,
  FiMail,
  FiPhone,
  FiBook,
  FiBriefcase,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import "../styles/components.css";

const TYPES = [
  {
    id: "student",
    name: "Student",
    fee: "LSL 500/yr",
    desc: "Full-time students in QS or Architecture.",
    features: ["Resource access", "Student events", "CPD at 50% discount"],
  },
  {
    id: "graduate",
    name: "Graduate",
    fee: "LSL 1,200/yr",
    desc: "Graduates working towards professional status.",
    features: [
      "All student benefits",
      "Job board",
      "Mentorship",
      "Annual certificate",
    ],
    popular: true,
  },
  {
    id: "professional",
    name: "Professional",
    fee: "LSL 2,500/yr",
    desc: "Registered, practising quantity surveyors.",
    features: [
      "All graduate benefits",
      "Voting rights",
      "Free CPD (2/yr)",
      "Committee eligibility",
    ],
  },
  {
    id: "corporate",
    name: "Corporate",
    fee: "LSL 8,000/yr",
    desc: "Quantity surveying practices and firms.",
    features: [
      "5 staff members",
      "Priority listing",
      "Branding",
      "Free job posts",
    ],
  },
];

export default function MembershipPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("graduate");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: currentUser?.email || "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    gender: "",
    residentialAddress: "",
    profession: "",
    employer: "",
    employmentHistory: "",
    fieldOfPractice: "",
    otherPractice: "",
    qualifications: "",
    professionalBodies: "",
    referees: "",
    motivation: "",
    declarationAccepted: false,
    annexures: "",
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please sign in or register first.");
      navigate("/register");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "applications"), {
        ...form,
        membershipType: selectedType,
        userId: currentUser.uid,
        status: "pending",
        submittedAt: new Date().toISOString(),
      });
      toast.success(
        "Application submitted successfully! We'll review it within 5–7 business days.",
      );
      setStep(4);
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Membership</span>
          </div>
          <h1>Membership Application</h1>
          <p>
            Apply for a new membership category or upgrade your existing
            membership online.
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--border)",
          padding: "20px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              maxWidth: 600,
            }}
          >
            {["Choose Type", "Your Details", "Review", "Done"].map(
              (label, i) => (
                <React.Fragment key={label}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background:
                          step > i
                            ? "var(--success)"
                            : step === i + 1
                              ? "var(--primary)"
                              : "var(--border)",
                        color: step >= i + 1 ? "#fff" : "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".8rem",
                        fontWeight: 700,
                        transition: "all .3s",
                      }}
                    >
                      {step > i + 1 ? <FiCheckCircle size={16} /> : i + 1}
                    </div>
                    <span
                      style={{
                        fontSize: ".72rem",
                        marginTop: 4,
                        color:
                          step === i + 1
                            ? "var(--primary)"
                            : "var(--text-muted)",
                        fontWeight: step === i + 1 ? 600 : 400,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div
                      style={{
                        flex: 2,
                        height: 2,
                        background:
                          step > i + 1 ? "var(--success)" : "var(--border)",
                        transition: "all .3s",
                        margin: "0 0 20px",
                      }}
                    />
                  )}
                </React.Fragment>
              ),
            )}
          </div>
        </div>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          {/* Step 1: Choose type */}
          {step === 1 && (
            <div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>
                Select Membership Type
              </h2>
              <p className="section-sub" style={{ marginBottom: 40 }}>
                Choose the category that best describes your professional status
                and select the membership level you want to apply for.
              </p>
              <div className="grid-4" style={{ marginBottom: 40 }}>
                {TYPES.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`membership-card${t.popular ? " featured" : ""}${selectedType === t.id ? "" : ""}`}
                    style={{
                      cursor: "pointer",
                      outline:
                        selectedType === t.id
                          ? "3px solid var(--accent)"
                          : "none",
                      outlineOffset: 2,
                    }}
                  >
                    {t.popular && (
                      <div className="membership-popular">Most Popular</div>
                    )}
                    <h3>{t.name}</h3>
                    <p
                      style={{
                        fontSize: ".82rem",
                        color: "var(--text-muted)",
                        margin: "8px 0 12px",
                      }}
                    >
                      {t.desc}
                    </p>
                    <div
                      className="membership-fee"
                      style={{ fontSize: "1.4rem" }}
                    >
                      {t.fee}
                    </div>
                    <div
                      className="membership-features"
                      style={{ margin: "16px 0" }}
                    >
                      {t.features.map((f) => (
                        <div key={f} className="membership-feature">
                          <FiCheckCircle className="check" size={14} />
                          <span style={{ fontSize: ".82rem" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        padding: "8px",
                        textAlign: "center",
                        borderRadius: "var(--radius)",
                        background:
                          selectedType === t.id ? "var(--accent)" : "var(--bg)",
                        color:
                          selectedType === t.id ? "#fff" : "var(--text-muted)",
                        fontSize: ".82rem",
                        fontWeight: 600,
                        transition: "all .2s",
                      }}
                    >
                      {selectedType === t.id ? "✓ Selected" : "Select"}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => setStep(2)}
                  className="btn btn-primary btn-lg"
                >
                  Continue <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Details form */}
          {step === 2 && (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <h2 className="section-title" style={{ marginBottom: 8 }}>
                Your Details
              </h2>
              <p className="section-sub" style={{ marginBottom: 36 }}>
                Please complete the personal and professional details below as
                they appear on your identification documents.
              </p>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "36px",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="grid-2">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      name="firstName"
                      className="form-control"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Lehlohonolo"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      name="lastName"
                      className="form-control"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Mokhele"
                    />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input
                      name="dateOfBirth"
                      type="date"
                      className="form-control"
                      value={form.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nationality</label>
                    <input
                      name="nationality"
                      className="form-control"
                      value={form.nationality}
                      onChange={handleChange}
                      placeholder="e.g. Mosotho"
                    />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Gender / Sex</label>
                    <select
                      name="gender"
                      className="form-control"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Residential Address *</label>
                    <input
                      name="residentialAddress"
                      className="form-control"
                      value={form.residentialAddress}
                      onChange={handleChange}
                      required
                      placeholder="Physical address"
                    />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+266 5000 0000"
                    />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Profession / Specialisation *</label>
                    <select
                      name="profession"
                      className="form-control"
                      value={form.profession}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select profession</option>
                      <option>Quantity Surveyor</option>
                      <option>Architect</option>
                      <option>Cost Consultant</option>
                      <option>Project Manager</option>
                      <option>Civil Engineer</option>
                      <option>Student</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Current Employer / University</label>
                    <input
                      name="employer"
                      className="form-control"
                      value={form.employer}
                      onChange={handleChange}
                      placeholder="Company or institution name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Employment History *</label>
                  <textarea
                    name="employmentHistory"
                    className="form-control"
                    value={form.employmentHistory}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Company, role, years served"
                    required
                  />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Field of Practice</label>
                    <select
                      name="fieldOfPractice"
                      className="form-control"
                      value={form.fieldOfPractice}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Building Construction</option>
                      <option>Civil Engineering</option>
                      <option>Electrical / Mechanical</option>
                      <option>Architecture</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Other Practice (if any)</label>
                    <input
                      name="otherPractice"
                      className="form-control"
                      value={form.otherPractice}
                      onChange={handleChange}
                      placeholder="Please specify"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Educational Qualifications *</label>
                  <textarea
                    name="qualifications"
                    className="form-control"
                    value={form.qualifications}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g. BSc Quantity Surveying – NUL, 2020"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Other Professional Institutes</label>
                  <textarea
                    name="professionalBodies"
                    className="form-control"
                    value={form.professionalBodies}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Institute name, grade, membership number"
                  />
                </div>
                <div className="form-group">
                  <label>Professional Referees (2 required)</label>
                  <textarea
                    name="referees"
                    className="form-control"
                    value={form.referees}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Name, title, organisation, contact email"
                  />
                </div>
                <div className="form-group">
                  <label>Motivation for Joining</label>
                  <textarea
                    name="motivation"
                    className="form-control"
                    value={form.motivation}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Why do you want to join LAAQS?"
                  />
                </div>
                <div
                  style={{
                    background: "var(--bg)",
                    borderRadius: "var(--radius)",
                    padding: "16px 18px",
                    marginTop: 8,
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="declarationAccepted"
                      checked={form.declarationAccepted}
                      onChange={handleChange}
                      style={{ marginTop: 4 }}
                    />
                    <span style={{ fontSize: ".88rem", lineHeight: 1.6 }}>
                      I confirm that the information provided is true and that I
                      consent to LAAQS verifying it. I understand that certified
                      supporting documents may be requested.
                    </span>
                  </label>
                </div>
                <div className="form-group">
                  <label>Required Annexures</label>
                  <input
                    name="annexures"
                    className="form-control"
                    value={form.annexures}
                    onChange={handleChange}
                    placeholder="Certified ID/passport, certificates, professional membership proof"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 24,
                  justifyContent: "space-between",
                }}
              >
                <button onClick={() => setStep(1)} className="btn btn-outline">
                  ← Back
                </button>
                <button
                  onClick={() => {
                    if (
                      !form.firstName ||
                      !form.lastName ||
                      !form.email ||
                      !form.phone ||
                      !form.dateOfBirth ||
                      !form.residentialAddress ||
                      !form.profession ||
                      !form.employmentHistory ||
                      !form.qualifications ||
                      !form.declarationAccepted
                    ) {
                      toast.error(
                        "Please complete all required fields and confirm the declaration.",
                      );
                      return;
                    }
                    setStep(3);
                  }}
                  className="btn btn-primary"
                >
                  Review Application <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div style={{ maxWidth: 640, margin: "0 auto" }}>
              <h2 className="section-title" style={{ marginBottom: 8 }}>
                Review Your Application
              </h2>
              <p className="section-sub" style={{ marginBottom: 32 }}>
                Please confirm the details before submitting.
              </p>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    background: "var(--bg)",
                    borderRadius: "var(--radius)",
                    padding: "16px 20px",
                    marginBottom: 24,
                  }}
                >
                  <strong>Membership Type:</strong>{" "}
                  {TYPES.find((t) => t.id === selectedType)?.name} —{" "}
                  {TYPES.find((t) => t.id === selectedType)?.fee}
                </div>
                <div
                  style={{
                    background: "var(--bg)",
                    borderRadius: "var(--radius)",
                    padding: "16px 20px",
                    marginBottom: 24,
                  }}
                >
                  <strong>Application Purpose:</strong> New application or
                  membership upgrade request.
                </div>
                {[
                  ["Full Name", `${form.firstName} ${form.lastName}`],
                  ["Date of Birth", form.dateOfBirth],
                  ["Email", form.email],
                  ["Phone", form.phone],
                  ["Address", form.residentialAddress],
                  ["Profession", form.profession],
                  ["Employer / University", form.employer],
                  ["Employment History", form.employmentHistory],
                  ["Qualifications", form.qualifications],
                  ["Other Professional Institutes", form.professionalBodies],
                  ["Required Annexures", form.annexures],
                ].map(
                  ([label, value]) =>
                    value && (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          gap: 16,
                          paddingBottom: 12,
                          marginBottom: 12,
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <span
                          style={{
                            width: 160,
                            flexShrink: 0,
                            fontSize: ".85rem",
                            color: "var(--text-muted)",
                            fontWeight: 500,
                          }}
                        >
                          {label}
                        </span>
                        <span style={{ fontSize: ".9rem" }}>{value}</span>
                      </div>
                    ),
                )}
                <div
                  className="alert alert-info"
                  style={{ marginTop: 16, marginBottom: 0 }}
                >
                  By submitting, you agree to LAAQS's Code of Professional
                  Conduct and constitution. Your application will be reviewed
                  within 5–7 business days.
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 24,
                  justifyContent: "space-between",
                }}
              >
                <button onClick={() => setStep(2)} className="btn btn-outline">
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application ✓"}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: "5rem", marginBottom: 16 }}>🎉</div>
              <h2 className="section-title">Application Submitted!</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  maxWidth: 480,
                  margin: "12px auto 36px",
                  lineHeight: 1.8,
                }}
              >
                Thank you for applying to LAAQS. Your application is under
                review and can be tracked from your dashboard. You'll receive an
                email confirmation within 5–7 business days.
              </p>
              <div
                style={{ display: "flex", gap: 16, justifyContent: "center" }}
              >
                <Link to="/dashboard" className="btn btn-primary">
                  Go to My Dashboard
                </Link>
                <Link to="/" className="btn btn-outline">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

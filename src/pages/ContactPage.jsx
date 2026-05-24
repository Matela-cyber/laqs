import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import "../styles/components.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "contact_messages"), {
        ...form,
        submittedAt: new Date().toISOString(),
        status: "unread",
      });
      toast.success("Message sent! We'll respond within 2 business days.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        department: "",
      });
    } catch (_) {
      toast.error("Failed to send. Please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
          </div>
          <h1>Contact Us</h1>
          <p>We're here to help. Reach out to the LAAQS secretariat.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap: 48,
              alignItems: "start",
            }}
          >
            {/* Left: Contact info */}
            <div>
              <span className="section-label">Get in Touch</span>
              <h2 className="section-title">We'd Love to Hear From You</h2>
              <div className="divider" />
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: 32,
                }}
              >
                Whether you have questions about membership, CPD programmes, or
                professional matters, our secretariat team is available to
                assist you.
              </p>

              {[
                {
                  Icon: FiMapPin,
                  title: "Office Address",
                  lines: ["123 Kingsway Road", "Maseru 100, Lesotho"],
                },
                {
                  Icon: FiPhone,
                  title: "Phone Numbers",
                  lines: ["+266 2200 0000 (Main)", "+266 5800 0000 (Mobile)"],
                },
                {
                  Icon: FiMail,
                  title: "Email Addresses",
                  lines: [
                    "info@laaqs.org.ls",
                    "membership@laaqs.org.ls",
                    "cpd@laaqs.org.ls",
                  ],
                },
                {
                  Icon: FiClock,
                  title: "Office Hours",
                  lines: [
                    "Monday – Friday: 8:00 – 17:00",
                    "Saturday: 9:00 – 13:00",
                    "Sunday & Public Holidays: Closed",
                  ],
                },
              ].map(({ Icon, title, lines }) => (
                <div
                  key={title}
                  style={{ display: "flex", gap: 16, marginBottom: 28 }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius)",
                      background: "var(--primary)",
                      color: "var(--accent-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: 700,
                        marginBottom: 6,
                        fontSize: ".9rem",
                      }}
                    >
                      {title}
                    </h4>
                    {lines.map((l) => (
                      <p
                        key={l}
                        style={{
                          fontSize: ".88rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.7,
                        }}
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 28 }}>
                <h4
                  style={{
                    fontWeight: 700,
                    marginBottom: 14,
                    fontSize: ".9rem",
                  }}
                >
                  Follow Us
                </h4>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    [FiFacebook, "#"],
                    [FiTwitter, "#"],
                    [FiLinkedin, "#"],
                  ].map(([Icon, href], i) => (
                    <a
                      key={i}
                      href={href}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "var(--radius)",
                        background: "var(--primary)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--accent)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "var(--primary)")
                      }
                    >
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact form */}
            <div
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                padding: "40px",
                boxShadow: "var(--shadow-sm)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  color: "var(--primary)",
                  fontSize: "1.4rem",
                  marginBottom: 28,
                }}
              >
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      name="department"
                      className="form-control"
                      value={form.department}
                      onChange={handleChange}
                    >
                      <option value="">Select department</option>
                      <option>General Inquiry</option>
                      <option>Membership</option>
                      <option>CPD & Training</option>
                      <option>Jobs & Careers</option>
                      <option>Accounts & Payments</option>
                      <option>Complaints</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      name="subject"
                      className="form-control"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <FiSend size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div
        style={{
          height: 360,
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <FiMapPin size={40} style={{ opacity: 0.6, marginBottom: 12 }} />
          <p style={{ opacity: 0.8 }}>
            LAAQS Offices — 123 Kingsway Road, Maseru 100, Lesotho
          </p>
          <p style={{ fontSize: ".82rem", opacity: 0.55, marginTop: 8 }}>
            (Interactive map available with Google Maps API key)
          </p>
        </div>
      </div>
    </>
  );
}

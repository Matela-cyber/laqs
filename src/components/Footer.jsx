import React from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiArrowRight,
} from "react-icons/fi";
import "../styles/components.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  L
                </div>
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "1rem",
                      color: "#fff",
                    }}
                  >
                    LAAQS
                  </strong>
                  <span style={{ fontSize: ".7rem", opacity: 0.65 }}>
                    Lesotho Association of Architects &amp; Quantity Surveyors
                  </span>
                </div>
              </div>
              <p>
                The professional body representing quantity surveyors and
                architects in Lesotho, dedicated to advancing the profession,
                upholding ethical standards, and serving the built environment
                industry.
              </p>
              <div className="footer-socials">
                <a href="#" aria-label="Facebook">
                  <FiFacebook />
                </a>
                <a href="#" aria-label="Twitter">
                  <FiTwitter />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
                <a href="#" aria-label="Instagram">
                  <FiInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <nav className="footer-links">
                {[
                  ["/about", "About LAAQS"],
                  ["/membership", "Become a Member"],
                  ["/members", "Member Directory"],
                  ["/cpd", "CPD & Training"],
                  ["/news", "News & Updates"],
                  ["/jobs", "Job Opportunities"],
                  ["/shop", "Shop & Payments"],
                  ["/contact", "Contact Us"],
                ].map(([to, label]) => (
                  <Link key={to} to={to}>
                    <FiArrowRight size={12} /> {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div className="footer-col">
              <h4>Services</h4>
              <nav className="footer-links">
                {[
                  ["/membership/types", "Membership Types"],
                  ["/cpd", "CPD Courses"],
                  ["/cpd", "Events & Seminars"],
                  ["/members", "Find a QS"],
                  ["/shop", "Pay Membership Fees"],
                  ["/shop", "Buy Documents"],
                  ["/jobs", "Post a Job"],
                  ["/about#committee", "Our Committee"],
                ].map(([to, label]) => (
                  <Link key={label} to={to}>
                    <FiArrowRight size={12} /> {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>Contact Info</h4>
              <div className="footer-contact-item">
                <FiMapPin size={15} />
                <span>
                  123 Kingsway Road, Maseru 100,
                  <br />
                  Lesotho
                </span>
              </div>
              <div className="footer-contact-item">
                <FiPhone size={15} />
                <span>
                  +266 2200 0000
                  <br />
                  +266 5800 0000
                </span>
              </div>
              <div className="footer-contact-item">
                <FiMail size={15} />
                <span>
                  info@laaqs.org.ls
                  <br />
                  membership@laaqs.org.ls
                </span>
              </div>
              <div style={{ marginTop: 20 }}>
                <p
                  style={{
                    fontSize: ".82rem",
                    opacity: 0.65,
                    marginBottom: 10,
                  }}
                >
                  Office Hours: Mon–Fri 8:00–17:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span>
            © {year} LAAQS – Lesotho Association of Architects &amp; Quantity
            Surveyors. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

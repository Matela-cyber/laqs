import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import "../styles/components.css";

const DEMO_MEMBERS = [
  {
    id: "1",
    name: "Lehlohonolo Mokhele",
    profession: "Senior Quantity Surveyor",
    location: "Maseru",
    company: "LMQ Consultants",
    status: "Professional",
    email: "l.mokhele@example.com",
    initials: "LM",
  },
  {
    id: "2",
    name: "Nthabiseng Ramaema",
    profession: "Architect",
    location: "Maseru",
    company: "Studio Arch LS",
    status: "Professional",
    email: "n.ramaema@example.com",
    initials: "NR",
  },
  {
    id: "3",
    name: "Tšepiso Letsie",
    profession: "Cost Consultant",
    location: "Leribe",
    company: "Temo Construction",
    status: "Graduate",
    email: "t.letsie@example.com",
    initials: "TL",
  },
  {
    id: "4",
    name: "Mamorena Sello",
    profession: "Quantity Surveyor",
    location: "Maseru",
    company: "MCA-Lesotho",
    status: "Professional",
    email: "m.sello@example.com",
    initials: "MS",
  },
  {
    id: "5",
    name: "Rethabile Molapo",
    profession: "Project Manager",
    location: "Berea",
    company: "Government – MoPW",
    status: "Professional",
    email: "r.molapo@example.com",
    initials: "RM",
  },
  {
    id: "6",
    name: "Limakatso Ntai",
    profession: "Graduate QS",
    location: "Maseru",
    company: "Global QS Consultants",
    status: "Graduate",
    email: "l.ntai@example.com",
    initials: "LN",
  },
  {
    id: "7",
    name: "Thabiso Makara",
    profession: "Quantity Surveyor",
    location: "Mafeteng",
    company: "TM QS Practice",
    status: "Professional",
    email: "t.makara@example.com",
    initials: "TM",
  },
  {
    id: "8",
    name: "Palesa Ralebese",
    profession: "Architect",
    location: "Maseru",
    company: "Urban Design Studio",
    status: "Professional",
    email: "p.ralebese@example.com",
    initials: "PR",
  },
  {
    id: "9",
    name: "Motšelisi Pheko",
    profession: "Civil Engineer / QS",
    location: "Qacha's Nek",
    company: "LHDA",
    status: "Corporate",
    email: "m.pheko@example.com",
    initials: "MP",
  },
];

const STATUS_BADGE = {
  Professional: "badge-blue",
  Graduate: "badge-green",
  Student: "badge-grey",
  Corporate: "badge-gold",
};
const PROFESSIONS = [
  "All",
  "Quantity Surveyor",
  "Architect",
  "Cost Consultant",
  "Project Manager",
  "Civil Engineer / QS",
  "Graduate QS",
];
const LOCATIONS = [
  "All",
  "Maseru",
  "Leribe",
  "Berea",
  "Mafeteng",
  "Qacha's Nek",
  "Mohale's Hoek",
];

export default function MembersPage() {
  const [members, setMembers] = useState(DEMO_MEMBERS);
  const [search, setSearch] = useState("");
  const [profession, setProfession] = useState("All");
  const [location, setLocation] = useState("All");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        if (!snap.empty) {
          const data = snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((m) => m.membership_status === "approved");
          if (data.length > 0) setMembers(data);
        }
      } catch (_) {}
    };
    fetchMembers();
  }, []);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.company || "").toLowerCase().includes(search.toLowerCase());
    const matchProf = profession === "All" || m.profession === profession;
    const matchLoc = location === "All" || m.location === location;
    return matchSearch && matchProf && matchLoc;
  });

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Members</span>
          </div>
          <h1>Member Directory</h1>
          <p>
            Search and connect with LAAQS registered professionals across
            Lesotho
          </p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          {/* Filters */}
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              marginBottom: 36,
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: "1 1 260px" }}>
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
                  placeholder="Search by name or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="form-control"
                style={{ flex: "0 0 200px" }}
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              >
                {PROFESSIONS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <select
                className="form-control"
                style={{ flex: "0 0 180px" }}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <p
            style={{
              fontSize: ".88rem",
              color: "var(--text-muted)",
              marginBottom: 24,
            }}
          >
            Showing {filtered.length} of {members.length} registered members
          </p>

          <div className="grid-3">
            {filtered.map((m) => (
              <div key={m.id} className="card" style={{ padding: 0 }}>
                <div style={{ padding: "28px", textAlign: "center" }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      margin: "0 auto 16px",
                    }}
                  >
                    {m.initials ||
                      (m.name || "")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                  </div>
                  <h4
                    style={{
                      color: "var(--primary)",
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {m.name}
                  </h4>
                  <p
                    style={{
                      fontSize: ".85rem",
                      color: "var(--text-muted)",
                      marginBottom: 8,
                    }}
                  >
                    {m.profession || "Quantity Surveyor"}
                  </p>
                  <span
                    className={`badge ${STATUS_BADGE[m.status || m.membership_status] || "badge-grey"}`}
                  >
                    {m.status || m.membership_status || "Member"}
                  </span>
                </div>
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    padding: "16px 24px",
                  }}
                >
                  {m.company && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: ".82rem",
                        color: "var(--text-muted)",
                        marginBottom: 8,
                      }}
                    >
                      <FiBriefcase size={13} /> {m.company}
                    </div>
                  )}
                  {m.location && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: ".82rem",
                        color: "var(--text-muted)",
                        marginBottom: 12,
                      }}
                    >
                      <FiMapPin size={13} /> {m.location}
                    </div>
                  )}
                  <a
                    href={`mailto:${m.email}`}
                    className="btn btn-sm btn-outline"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <FiMail size={13} /> Contact
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <FiUser
                size={48}
                style={{
                  margin: "0 auto 16px",
                  display: "block",
                  opacity: 0.3,
                }}
              />
              <p>No members match your search criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

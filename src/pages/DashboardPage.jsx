import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FiUser,
  FiAward,
  FiFileText,
  FiBook,
  FiBriefcase,
  FiLogOut,
  FiEdit,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import "../styles/components.css";

const STATUS_COLOR = {
  approved: "var(--success)",
  pending: "#f59e0b",
  rejected: "var(--danger)",
  active: "var(--success)",
};

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const loadData = async () => {
      try {
        const userSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (userSnap.exists()) setUserData(userSnap.data());

        const appSnap = await getDocs(
          query(
            collection(db, "applications"),
            where("userId", "==", currentUser.uid),
          ),
        );
        setApplications(appSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (_) {
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.success("Signed out successfully.");
  };

  if (loading) return <div className="spinner" />;

  const memberStatus = userData?.membership_status || "pending";
  const memberType = userData?.membershipType || "Not specified";

  return (
    <div
      style={{ minHeight: "100vh", background: "var(--bg)", display: "flex" }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "var(--primary)",
          color: "#fff",
          padding: "0",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div
          style={{
            padding: "28px 20px",
            borderBottom: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.3rem",
              fontWeight: 700,
              fontFamily: "'Playfair Display',serif",
              margin: "0 auto 12px",
            }}
          >
            {(currentUser?.displayName || "M").charAt(0)}
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontWeight: 700, fontSize: ".95rem" }}>
              {currentUser?.displayName || "Member"}
            </p>
            <p style={{ fontSize: ".75rem", opacity: 0.65, marginTop: 2 }}>
              {currentUser?.email}
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "3px 12px",
                borderRadius: 999,
                fontSize: ".7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                background:
                  memberStatus === "approved"
                    ? "rgba(5,150,105,.25)"
                    : "rgba(245,158,11,.25)",
                color: memberStatus === "approved" ? "#6ee7b7" : "#fcd34d",
              }}
            >
              {memberStatus}
            </span>
          </div>
        </div>

        <nav style={{ padding: "16px 12px" }}>
          {[
            ["/dashboard", FiUser, "My Profile"],
            ["/membership", FiAward, "Membership"],
            ["/cpd", FiBook, "CPD Courses"],
            ["/jobs", FiBriefcase, "Job Board"],
            ["/news", FiFileText, "News"],
            ["/shop", FiFileText, "Shop"],
          ].map(([to, Icon, label]) => (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: "var(--radius)",
                color: "rgba(255,255,255,.75)",
                fontSize: ".88rem",
                marginBottom: 4,
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.1)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,.75)";
              }}
            >
              <Icon size={17} /> {label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,.1)",
            marginTop: "auto",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: "var(--radius)",
              color: "rgba(255,255,255,.65)",
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              fontSize: ".88rem",
            }}
          >
            <FiLogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          padding: "40px",
          overflow: "auto",
          maxWidth: "calc(100% - 260px)",
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              color: "var(--primary)",
              fontSize: "1.8rem",
              marginBottom: 6,
            }}
          >
            Welcome, {(currentUser?.displayName || "Member").split(" ")[0]}
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Your LAAQS member portal overview
          </p>
        </div>

        {/* Status cards */}
        <div className="grid-4" style={{ marginBottom: 36 }}>
          {[
            {
              label: "Membership Status",
              value:
                memberStatus.charAt(0).toUpperCase() + memberStatus.slice(1),
              icon: <FiAward size={24} />,
              color: STATUS_COLOR[memberStatus] || "#6b7280",
            },
            {
              label: "CPD Points (2025)",
              value: "12 / 20",
              icon: <FiBook size={24} />,
              color: "var(--primary)",
            },
            {
              label: "Applications",
              value: applications.length,
              icon: <FiFileText size={24} />,
              color: "var(--accent)",
            },
            {
              label: "Member Since",
              value: userData?.createdAt
                ? new Date(userData.createdAt).getFullYear()
                : "—",
              icon: <FiCalendar size={24} />,
              color: "var(--success)",
            },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: ".78rem",
                      color: "var(--text-muted)",
                      marginBottom: 6,
                      fontWeight: 500,
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: card.color,
                      fontFamily: "'Playfair Display',serif",
                    }}
                  >
                    {card.value}
                  </p>
                </div>
                <div style={{ color: card.color, opacity: 0.7 }}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Membership status banner */}
        {memberStatus === "pending" && (
          <div className="alert alert-warning" style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <FiClock size={18} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Membership Application Under Review</strong>
                <p style={{ marginTop: 4, fontSize: ".88rem" }}>
                  Your application is being reviewed by our team. You'll receive
                  an email notification within 5–7 business days.
                </p>
              </div>
            </div>
          </div>
        )}
        {memberStatus === "approved" && (
          <div className="alert alert-success" style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FiCheckCircle size={18} />
              <div>
                <strong>Membership Active</strong> — You are a registered{" "}
                {memberType} member in good standing.
              </div>
            </div>
          </div>
        )}

        <div className="grid-2">
          {/* Profile */}
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              padding: "28px",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h3 style={{ color: "var(--primary)", fontWeight: 700 }}>
                My Profile
              </h3>
              <Link to="/membership" className="btn btn-sm btn-outline">
                <FiEdit size={13} /> Edit
              </Link>
            </div>
            {[
              ["Name", currentUser?.displayName],
              ["Email", currentUser?.email],
              ["Phone", userData?.phone || "Not provided"],
              ["Profession", userData?.profession || "Not specified"],
              ["Status", memberStatus],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  paddingBottom: 12,
                  marginBottom: 12,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    width: 120,
                    flexShrink: 0,
                    fontSize: ".82rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: ".88rem",
                    fontWeight: label === "Status" ? 600 : 400,
                    color:
                      label === "Status"
                        ? STATUS_COLOR[memberStatus]
                        : "var(--text)",
                  }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Applications */}
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--radius-lg)",
              padding: "28px",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h3
              style={{
                color: "var(--primary)",
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              My Applications
            </h3>
            {applications.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "32px 0",
                  color: "var(--text-muted)",
                }}
              >
                <FiAlertCircle
                  size={32}
                  style={{
                    display: "block",
                    margin: "0 auto 12px",
                    opacity: 0.3,
                  }}
                />
                <p style={{ fontSize: ".88rem" }}>
                  No applications submitted yet.
                </p>
                <Link
                  to="/membership"
                  className="btn btn-sm btn-primary"
                  style={{ marginTop: 16 }}
                >
                  Apply for Membership
                </Link>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  style={{
                    padding: "14px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, fontSize: ".9rem" }}>
                        {app.membershipType?.charAt(0).toUpperCase() +
                          app.membershipType?.slice(1)}{" "}
                        Membership
                      </p>
                      <p
                        style={{
                          fontSize: ".78rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        Submitted:{" "}
                        {app.submittedAt
                          ? new Date(app.submittedAt).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                    <span
                      style={{
                        padding: "3px 12px",
                        borderRadius: 999,
                        fontSize: ".72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        background:
                          app.status === "approved"
                            ? "#d1fae5"
                            : app.status === "rejected"
                              ? "#fee2e2"
                              : "#fef3c7",
                        color:
                          app.status === "approved"
                            ? "#065f46"
                            : app.status === "rejected"
                              ? "#991b1b"
                              : "#92400e",
                      }}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* CPD Progress */}
        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            padding: "28px",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h3 style={{ color: "var(--primary)", fontWeight: 700 }}>
              CPD Progress 2025
            </h3>
            <Link to="/cpd" className="btn btn-sm btn-outline">
              Enrol in Courses
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: ".88rem", color: "var(--text-muted)" }}>
              Points earned this year
            </span>
            <span style={{ fontWeight: 700 }}>12 / 20 pts</span>
          </div>
          <div
            style={{
              background: "var(--border)",
              borderRadius: 6,
              height: 12,
              marginBottom: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "60%",
                height: "100%",
                background:
                  "linear-gradient(90deg, var(--primary), var(--accent))",
                borderRadius: 6,
                transition: "width .5s",
              }}
            />
          </div>
          <p style={{ fontSize: ".85rem", color: "var(--text-muted)" }}>
            You need <strong>8 more CPD points</strong> to meet your annual
            requirement.{" "}
            <Link to="/cpd" style={{ color: "var(--primary)" }}>
              Explore upcoming courses →
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

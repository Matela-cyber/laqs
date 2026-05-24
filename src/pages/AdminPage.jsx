import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FiUsers,
  FiFileText,
  FiBook,
  FiBriefcase,
  FiSettings,
  FiCheck,
  FiX,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiMail,
  FiHome,
  FiBarChart2,
  FiMessageSquare,
  FiLogOut,
} from "react-icons/fi";
import toast from "react-hot-toast";
import "../styles/components.css";

const NAV = [
  { key: "overview", icon: FiBarChart2, label: "Overview" },
  { key: "members", icon: FiUsers, label: "Members" },
  { key: "applications", icon: FiFileText, label: "Applications" },
  { key: "news", icon: FiFileText, label: "News" },
  { key: "jobs", icon: FiBriefcase, label: "Jobs" },
  { key: "cpd", icon: FiBook, label: "CPD" },
  { key: "messages", icon: FiMessageSquare, label: "Messages" },
  {
    key: "questionnaire",
    icon: FiEdit,
    label: "Questionnaire",
    href: "/admin/questionnaire",
  },
];

export default function AdminPage() {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  const [members, setMembers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [news, setNews] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    category: "Announcements",
    image: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    category: "Quantity Surveying",
    deadline: "",
    description: "",
    posted: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (userRole && userRole !== "admin") {
      toast.error("Admin access only.");
      navigate("/dashboard");
      return;
    }
    if (userRole === "admin") loadAll();
  }, [currentUser, userRole]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [m, a, n, j, msg] = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(
          query(collection(db, "applications"), orderBy("submittedAt", "desc")),
        ),
        getDocs(query(collection(db, "news"), orderBy("date", "desc"))),
        getDocs(query(collection(db, "jobs"), orderBy("posted", "desc"))),
        getDocs(collection(db, "contact_messages")),
      ]);
      setMembers(m.docs.map((d) => ({ id: d.id, ...d.data() })));
      setApplications(a.docs.map((d) => ({ id: d.id, ...d.data() })));
      setNews(n.docs.map((d) => ({ id: d.id, ...d.data() })));
      setJobs(j.docs.map((d) => ({ id: d.id, ...d.data() })));
      setMessages(msg.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async (id, status) => {
    await updateDoc(doc(db, "applications", id), { status });
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
    toast.success(`Application ${status}.`);
  };

  const publishNews = async (e) => {
    e.preventDefault();
    try {
      const ref = await addDoc(collection(db, "news"), newsForm);
      setNews((prev) => [{ id: ref.id, ...newsForm }, ...prev]);
      setNewsForm({
        title: "",
        content: "",
        category: "Announcements",
        image: "",
        date: new Date().toISOString().split("T")[0],
      });
      toast.success("News article published.");
    } catch (_) {
      toast.error("Failed to publish.");
    }
  };

  const publishJob = async (e) => {
    e.preventDefault();
    try {
      const ref = await addDoc(collection(db, "jobs"), jobForm);
      setJobs((prev) => [{ id: ref.id, ...jobForm }, ...prev]);
      setJobForm({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        salary: "",
        category: "Quantity Surveying",
        deadline: "",
        description: "",
        posted: new Date().toISOString().split("T")[0],
      });
      toast.success("Job posting published.");
    } catch (_) {
      toast.error("Failed to post job.");
    }
  };

  const deleteItem = async (colName, id, setState) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteDoc(doc(db, colName, id));
    setState((prev) => prev.filter((i) => i.id !== id));
    toast.success("Deleted.");
  };

  if (!userRole) return <div className="spinner" />;
  if (userRole !== "admin") return null;

  const STATS = [
    {
      label: "Total Members",
      value: members.length,
      icon: <FiUsers />,
      color: "var(--primary)",
    },
    {
      label: "Pending Applications",
      value: applications.filter((a) => a.status === "pending").length,
      icon: <FiFileText />,
      color: "#f59e0b",
    },
    {
      label: "News Articles",
      value: news.length,
      icon: <FiFileText />,
      color: "var(--success)",
    },
    {
      label: "Unread Messages",
      value: messages.filter((m) => m.status === "unread").length,
      icon: <FiMail />,
      color: "var(--danger)",
    },
  ];

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "var(--primary-dark)",
          color: "#fff",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid rgba(255,255,255,.1)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 9,
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#fff",
            }}
          >
            L
          </div>
          <div>
            <strong style={{ fontSize: ".9rem" }}>LAAQS</strong>
            <p style={{ fontSize: ".7rem", opacity: 0.6 }}>Admin Panel</p>
          </div>
        </div>
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          {NAV.map(({ key, icon: Icon, label, href }) =>
            href ? (
              <Link
                key={key}
                to={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "var(--radius)",
                  background: "transparent",
                  color: "rgba(255,255,255,.65)",
                  textDecoration: "none",
                  fontSize: ".88rem",
                  marginBottom: 3,
                  transition: "all .2s",
                }}
              >
                <Icon size={17} /> {label}
              </Link>
            ) : (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "var(--radius)",
                  background:
                    tab === key ? "rgba(255,255,255,.12)" : "transparent",
                  color: tab === key ? "#fff" : "rgba(255,255,255,.65)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: ".88rem",
                  marginBottom: 3,
                  transition: "all .2s",
                }}
              >
                <Icon size={17} /> {label}
                {key === "applications" &&
                  applications.filter((a) => a.status === "pending").length >
                    0 && (
                    <span
                      style={{
                        marginLeft: "auto",
                        background: "#f59e0b",
                        color: "#fff",
                        borderRadius: 999,
                        padding: "0 7px",
                        fontSize: ".7rem",
                        fontWeight: 700,
                      }}
                    >
                      {
                        applications.filter((a) => a.status === "pending")
                          .length
                      }
                    </span>
                  )}
              </button>
            ),
          )}
        </nav>
        <div
          style={{
            padding: "12px 10px",
            borderTop: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              color: "rgba(255,255,255,.55)",
              fontSize: ".85rem",
              marginBottom: 4,
            }}
          >
            <FiHome size={16} /> View Website
          </Link>
          <button
            onClick={async () => {
              await logout();
              navigate("/");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "10px 12px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,.55)",
              cursor: "pointer",
              fontSize: ".85rem",
            }}
          >
            <FiLogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 36px", overflow: "auto" }}>
        {/* Overview */}
        {tab === "overview" && (
          <>
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                color: "var(--primary)",
                fontSize: "1.8rem",
                marginBottom: 28,
              }}
            >
              Dashboard Overview
            </h1>
            <div className="grid-4" style={{ marginBottom: 36 }}>
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "#fff",
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: ".78rem",
                          color: "var(--text-muted)",
                          marginBottom: 6,
                        }}
                      >
                        {s.label}
                      </p>
                      <p
                        style={{
                          fontSize: "2rem",
                          fontWeight: 700,
                          color: s.color,
                          fontFamily: "'Playfair Display',serif",
                        }}
                      >
                        {loading ? "—" : s.value}
                      </p>
                    </div>
                    <div
                      style={{
                        color: s.color,
                        fontSize: "1.5rem",
                        opacity: 0.7,
                      }}
                    >
                      {s.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid-2">
              <div
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  border: "1px solid var(--border)",
                }}
              >
                <h3
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  Recent Applications
                </h3>
                {applications.slice(0, 5).map((app) => (
                  <div
                    key={app.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600, fontSize: ".88rem" }}>
                        {app.firstName} {app.lastName}
                      </p>
                      <p
                        style={{
                          fontSize: ".78rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {app.membershipType}
                      </p>
                    </div>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 999,
                        fontSize: ".7rem",
                        fontWeight: 700,
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
                ))}
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  border: "1px solid var(--border)",
                }}
              >
                <h3
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  Recent Messages
                </h3>
                {messages.slice(0, 5).map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <p style={{ fontWeight: 600, fontSize: ".88rem" }}>
                      {msg.name}
                    </p>
                    <p
                      style={{ fontSize: ".78rem", color: "var(--text-muted)" }}
                    >
                      {msg.subject || msg.message?.substring(0, 60)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Members */}
        {tab === "members" && (
          <>
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                color: "var(--primary)",
                fontSize: "1.8rem",
                marginBottom: 24,
              }}
            >
              Members ({members.length})
            </h1>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Profession</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 600 }}>{m.name}</td>
                      <td>{m.email}</td>
                      <td>{m.profession || "—"}</td>
                      <td>
                        <span
                          className={`badge ${m.membership_status === "approved" ? "badge-green" : m.membership_status === "pending" ? "badge-gold" : "badge-red"}`}
                        >
                          {m.membership_status || "pending"}
                        </span>
                      </td>
                      <td
                        style={{
                          fontSize: ".82rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {m.createdAt
                          ? new Date(m.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Applications */}
        {tab === "applications" && (
          <>
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                color: "var(--primary)",
                fontSize: "1.8rem",
                marginBottom: 24,
              }}
            >
              Membership Applications
            </h1>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td style={{ fontWeight: 600 }}>
                        {app.firstName} {app.lastName}
                      </td>
                      <td>{app.email}</td>
                      <td>
                        <span className="badge badge-blue">
                          {app.membershipType}
                        </span>
                      </td>
                      <td
                        style={{
                          fontSize: ".82rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {app.submittedAt
                          ? new Date(app.submittedAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        <span
                          className={`badge ${app.status === "approved" ? "badge-green" : app.status === "rejected" ? "badge-red" : "badge-gold"}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td>
                        {app.status === "pending" && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              onClick={() =>
                                updateApplication(app.id, "approved")
                              }
                              className="btn btn-sm"
                              style={{
                                background: "var(--success)",
                                color: "#fff",
                                border: "none",
                                padding: "5px 10px",
                              }}
                            >
                              <FiCheck size={13} /> Approve
                            </button>
                            <button
                              onClick={() =>
                                updateApplication(app.id, "rejected")
                              }
                              className="btn btn-sm"
                              style={{
                                background: "var(--danger)",
                                color: "#fff",
                                border: "none",
                                padding: "5px 10px",
                              }}
                            >
                              <FiX size={13} /> Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* News */}
        {tab === "news" && (
          <>
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                color: "var(--primary)",
                fontSize: "1.8rem",
                marginBottom: 24,
              }}
            >
              Manage News
            </h1>
            <div className="grid-2" style={{ alignItems: "start" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px",
                  border: "1px solid var(--border)",
                }}
              >
                <h3
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  Publish New Article
                </h3>
                <form onSubmit={publishNews}>
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      className="form-control"
                      value={newsForm.title}
                      onChange={(e) =>
                        setNewsForm((f) => ({ ...f, title: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Content *</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={newsForm.content}
                      onChange={(e) =>
                        setNewsForm((f) => ({ ...f, content: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        className="form-control"
                        value={newsForm.category}
                        onChange={(e) =>
                          setNewsForm((f) => ({
                            ...f,
                            category: e.target.value,
                          }))
                        }
                      >
                        {[
                          "Announcements",
                          "CPD",
                          "Industry",
                          "Partnerships",
                          "Awards",
                        ].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newsForm.date}
                        onChange={(e) =>
                          setNewsForm((f) => ({ ...f, date: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      className="form-control"
                      value={newsForm.image}
                      onChange={(e) =>
                        setNewsForm((f) => ({ ...f, image: e.target.value }))
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <FiPlus /> Publish Article
                  </button>
                </form>
              </div>
              <div>
                <h3
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  Published Articles ({news.length})
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {news.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        background: "#fff",
                        borderRadius: "var(--radius)",
                        padding: "16px",
                        border: "1px solid var(--border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: ".88rem",
                            marginBottom: 4,
                          }}
                        >
                          {n.title}
                        </p>
                        <div style={{ display: "flex", gap: 8 }}>
                          <span className="badge badge-blue">{n.category}</span>
                          <span
                            style={{
                              fontSize: ".75rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            {n.date}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteItem("news", n.id, setNews)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--danger)",
                          cursor: "pointer",
                        }}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Jobs */}
        {tab === "jobs" && (
          <>
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                color: "var(--primary)",
                fontSize: "1.8rem",
                marginBottom: 24,
              }}
            >
              Manage Jobs
            </h1>
            <div className="grid-2" style={{ alignItems: "start" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: "28px",
                  border: "1px solid var(--border)",
                }}
              >
                <h3
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  Post New Job
                </h3>
                <form onSubmit={publishJob}>
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      className="form-control"
                      value={jobForm.title}
                      onChange={(e) =>
                        setJobForm((f) => ({ ...f, title: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Company *</label>
                      <input
                        className="form-control"
                        value={jobForm.company}
                        onChange={(e) =>
                          setJobForm((f) => ({ ...f, company: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        className="form-control"
                        value={jobForm.location}
                        onChange={(e) =>
                          setJobForm((f) => ({
                            ...f,
                            location: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Job Type</label>
                      <select
                        className="form-control"
                        value={jobForm.type}
                        onChange={(e) =>
                          setJobForm((f) => ({ ...f, type: e.target.value }))
                        }
                      >
                        {[
                          "Full-time",
                          "Part-time",
                          "Contract",
                          "Government",
                          "Remote",
                        ].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        className="form-control"
                        value={jobForm.salary}
                        onChange={(e) =>
                          setJobForm((f) => ({ ...f, salary: e.target.value }))
                        }
                        placeholder="e.g. LSL 15,000/mo"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      value={jobForm.deadline}
                      onChange={(e) =>
                        setJobForm((f) => ({ ...f, deadline: e.target.value }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={jobForm.description}
                      onChange={(e) =>
                        setJobForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <FiPlus /> Post Job
                  </button>
                </form>
              </div>
              <div>
                <h3
                  style={{
                    color: "var(--primary)",
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  Active Listings ({jobs.length})
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {jobs.map((j) => (
                    <div
                      key={j.id}
                      style={{
                        background: "#fff",
                        borderRadius: "var(--radius)",
                        padding: "16px",
                        border: "1px solid var(--border)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: ".88rem",
                            marginBottom: 4,
                          }}
                        >
                          {j.title}
                        </p>
                        <p
                          style={{
                            fontSize: ".8rem",
                            color: "var(--text-muted)",
                            marginBottom: 6,
                          }}
                        >
                          {j.company} · {j.location}
                        </p>
                        <span
                          className={`badge ${j.type === "Full-time" ? "badge-green" : "badge-gold"}`}
                        >
                          {j.type}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteItem("jobs", j.id, setJobs)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--danger)",
                          cursor: "pointer",
                        }}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Messages */}
        {tab === "messages" && (
          <>
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                color: "var(--primary)",
                fontSize: "1.8rem",
                marginBottom: 24,
              }}
            >
              Contact Messages ({messages.length})
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    background: "#fff",
                    borderRadius: "var(--radius-lg)",
                    padding: "24px",
                    border: `1px solid ${msg.status === "unread" ? "var(--accent)" : "var(--border)"}`,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 700 }}>
                        {msg.name}{" "}
                        <span
                          style={{
                            fontWeight: 400,
                            color: "var(--text-muted)",
                            fontSize: ".85rem",
                          }}
                        >
                          — {msg.email}
                        </span>
                      </p>
                      {msg.subject && (
                        <p
                          style={{
                            fontSize: ".88rem",
                            color: "var(--primary)",
                            marginTop: 2,
                          }}
                        >
                          {msg.subject}
                        </p>
                      )}
                    </div>
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      {msg.status === "unread" && (
                        <span className="badge badge-red">New</span>
                      )}
                      <span
                        style={{
                          fontSize: ".78rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {msg.submittedAt
                          ? new Date(msg.submittedAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: ".9rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {msg.message}
                  </p>
                  <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Your enquiry"}`}
                      className="btn btn-sm btn-primary"
                    >
                      <FiMail size={13} /> Reply
                    </a>
                    <button
                      onClick={() =>
                        deleteItem("contact_messages", msg.id, setMessages)
                      }
                      className="btn btn-sm"
                      style={{
                        background: "none",
                        border: "1.5px solid var(--border)",
                        color: "var(--danger)",
                      }}
                    >
                      <FiTrash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="empty-state">
                  <p>No messages yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import "../styles/components.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.code === "auth/invalid-credential"
          ? "Invalid email or password."
          : "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              L
            </div>
            <span
              style={{
                color: "rgba(255,255,255,.85)",
                fontWeight: 600,
                letterSpacing: ".04em",
              }}
            >
              LAAQS Portal
            </span>
          </Link>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            padding: "40px",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              color: "var(--primary)",
              marginBottom: 6,
              fontSize: "1.6rem",
            }}
          >
            Sign In
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: ".9rem",
              marginBottom: 28,
            }}
          >
            Welcome back to your LAAQS member portal
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: "relative" }}>
                <FiMail
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  style={{ paddingLeft: 38 }}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <div style={{ position: "relative" }}>
                <FiLock
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  className="form-control"
                  style={{ paddingLeft: 38, paddingRight: 42 }}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                  }}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 4 }}
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <FiArrowRight /> Sign In
                </>
              )}
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: 24,
              fontSize: ".9rem",
              color: "var(--text-muted)",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--primary)", fontWeight: 600 }}
            >
              Register here
            </Link>
          </div>
          <div
            style={{ textAlign: "center", marginTop: 12, fontSize: ".85rem" }}
          >
            <Link to="/" style={{ color: "var(--text-muted)" }}>
              ← Back to website
            </Link>
          </div>
        </div>

        {/* Demo credentials notice */}
        <div
          style={{
            background: "rgba(255,255,255,.1)",
            borderRadius: "var(--radius)",
            padding: "14px 18px",
            marginTop: 20,
            color: "rgba(255,255,255,.75)",
            fontSize: ".8rem",
            textAlign: "center",
          }}
        >
          <strong>Demo:</strong> Register a new account to test the system
        </div>
      </div>
    </div>
  );
}

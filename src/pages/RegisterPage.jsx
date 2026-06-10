import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiPhone,
} from "react-icons/fi";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import "../styles/components.css";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await register(
        form.email,
        form.password,
        `${form.firstName} ${form.lastName}`,
        {
          phone: form.phone,
          profession: form.profession,
        },
      );
      toast.success("Account created! Welcome to LAAQS.");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : "Registration failed. Please try again.";
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
      <div style={{ width: "100%", maxWidth: 520 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <img
              src={logo}
              alt="LAAQS logo"
              style={{
                width: 56,
                height: 56,
                borderRadius: 13,
                objectFit: "contain",
                background: "#fff",
                padding: 8,
              }}
            />
            <span style={{ color: "rgba(255,255,255,.85)", fontWeight: 600 }}>
              LAAQS Member Portal
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
              fontSize: "1.5rem",
            }}
          >
            Create Account
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: ".9rem",
              marginBottom: 28,
            }}
          >
            Join the LAAQS professional community
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>First Name *</label>
                <div style={{ position: "relative" }}>
                  <FiUser
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-muted)",
                    }}
                  />
                  <input
                    name="firstName"
                    className="form-control"
                    style={{ paddingLeft: 38 }}
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
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
            <div className="grid-2">
              <div className="form-group">
                <label>Phone Number</label>
                <div style={{ position: "relative" }}>
                  <FiPhone
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--text-muted)",
                    }}
                  />
                  <input
                    name="phone"
                    className="form-control"
                    style={{ paddingLeft: 38 }}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+266 5000 0000"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Profession</label>
                <select
                  name="profession"
                  className="form-control"
                  value={form.profession}
                  onChange={handleChange}
                >
                  <option value="">Select profession</option>
                  <option>Quantity Surveyor</option>
                  <option>Architect</option>
                  <option>Cost Consultant</option>
                  <option>Project Manager</option>
                  <option>Student</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Password *</label>
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
                    style={{ paddingLeft: 38, paddingRight: 38 }}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    style={{
                      position: "absolute",
                      right: 10,
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
              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  name="confirm"
                  type="password"
                  className="form-control"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  required
                />
              </div>
            </div>
            <p
              style={{
                fontSize: ".78rem",
                color: "var(--text-muted)",
                marginBottom: 20,
              }}
            >
              By registering, you agree to LAAQS's{" "}
              <Link to="/terms" style={{ color: "var(--primary)" }}>
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy" style={{ color: "var(--primary)" }}>
                Privacy Policy
              </Link>
              .
            </p>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              disabled={loading}
            >
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  <FiArrowRight /> Create Account
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "var(--primary)", fontWeight: 600 }}
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

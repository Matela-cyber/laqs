import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiBriefcase,
  FiUsers,
  FiBook,
  FiFileText,
  FiHome,
  FiInfo,
  FiMail,
  FiChevronDown,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiLayout,
  FiShoppingBag,
} from "react-icons/fi";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

export default function Navbar() {
  const { currentUser, userRole, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMobileOpen(false);

  // Toggle dropdown in mobile view
  const toggleDropdown = (dropdownName) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
    }));
  };

  // Close all dropdowns when closing mobile menu
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdowns({});
  };

  return (
    <nav
      className="navbar"
      style={scrolled ? { boxShadow: "0 4px 20px rgba(0,0,0,.3)" } : {}}
    >
      {/* Top bar with auth buttons */}
      <div className="navbar-top">
        <div className="container navbar-top-container">
          <div className="navbar-top-right">
            {currentUser ? (
              <>
                <Link to="/news" className="btn-stay-informed">
                  Stay Informed
                </Link>
                <Link
                  to="/dashboard"
                  className="btn btn-sm"
                  style={{ background: "rgba(255,255,255,.15)", color: "#fff" }}
                >
                  <FiUser size={14} />{" "}
                  {currentUser.displayName?.split(" ")[0] || "Account"}
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-sm"
                  style={{
                    background: "rgba(255,255,255,.1)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  <FiLogOut size={14} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-auth btn-signin">
                  Sign In
                </Link>
                <Link to="/register" className="btn-auth btn-register">
                  Register
                </Link>
                <Link to="/news" className="btn-stay-informed">
                  Stay Informed
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="navbar-main">
        <div className="container">
          {/* Brand */}
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            <div className="navbar-brand-logo">
              <img src={logo} alt="LAAQS logo" />
            </div>
            <div className="navbar-brand-text">
              <strong>LAAQS</strong>
              <span>Lesotho Association of Architects &amp; QS</span>
            </div>
          </Link>

          {/* Quick Action Buttons */}
          <div className="navbar-quick-actions">
            <Link to="/members" className="quick-action-btn">
              <FiUsers size={18} />
              <span>Find a QS</span>
            </Link>
            <Link to="/members" className="quick-action-btn">
              <FiBriefcase size={18} />
              <span>Opportunities</span>
            </Link>
            <Link to="/shop" className="quick-action-btn">
              <FiShoppingBag size={18} />
              <span>Shop</span>
            </Link>
          </div>

          {/* Links */}
          <div className={`navbar-links${mobileOpen ? " open" : ""}`}>
            <NavLink to="/" end onClick={closeMobileMenu}>
              <FiHome /> Home
            </NavLink>
            <NavLink to="/about" onClick={closeMobileMenu}>
              <FiInfo /> About
            </NavLink>

            {/* Membership dropdown */}
            <div
              className={`nav-dropdown${openDropdowns.membership ? " open" : ""}`}
            >
              <button
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown("membership")}
                aria-expanded={openDropdowns.membership}
              >
                <span>
                  <FiUsers /> Membership
                </span>
                <FiChevronDown size={13} />
              </button>
              <div className="nav-dropdown-menu">
                <NavLink to="/membership" onClick={closeMobileMenu}>
                  <FiUsers /> Join / Apply
                </NavLink>
                <NavLink to="/membership/types" onClick={closeMobileMenu}>
                  <FiFileText /> Membership Types
                </NavLink>
                <NavLink to="/members" onClick={closeMobileMenu}>
                  <FiUsers /> Member Directory
                </NavLink>
              </div>
            </div>

            {/* CPD dropdown */}
            <div className={`nav-dropdown${openDropdowns.cpd ? " open" : ""}`}>
              <button
                className="nav-dropdown-trigger"
                onClick={() => toggleDropdown("cpd")}
                aria-expanded={openDropdowns.cpd}
              >
                <span>
                  <FiBook /> CPD
                </span>
                <FiChevronDown size={13} />
              </button>
              <div className="nav-dropdown-menu">
                <NavLink to="/cpd" onClick={closeMobileMenu}>
                  <FiBook /> Courses & Events
                </NavLink>
                <NavLink to="/cpd/certificates" onClick={closeMobileMenu}>
                  <FiFileText /> My Certificates
                </NavLink>
              </div>
            </div>

            <NavLink to="/news" onClick={closeMobileMenu}>
              <FiFileText /> News
            </NavLink>
            <NavLink to="/jobs" onClick={closeMobileMenu}>
              <FiBriefcase /> Jobs
            </NavLink>
            <NavLink to="/shop" onClick={closeMobileMenu}>
              <FiShoppingBag /> Shop
            </NavLink>
            <NavLink to="/contact" onClick={closeMobileMenu}>
              <FiMail /> Contact
            </NavLink>
          </div>

          <div className="navbar-actions">
            <button
              className="navbar-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiFileText,
  FiCreditCard,
  FiDownload,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import "../styles/components.css";

const MEMBERSHIP_FEES = [
  {
    id: "student",
    name: "Student Membership",
    fee: 500,
    desc: "Annual fee for full-time students",
  },
  {
    id: "graduate",
    name: "Graduate Membership",
    fee: 1200,
    desc: "Annual fee for graduate members",
  },
  {
    id: "professional",
    name: "Professional Membership",
    fee: 2500,
    desc: "Annual fee for professional members",
  },
  {
    id: "corporate",
    name: "Corporate Membership",
    fee: 8000,
    desc: "Annual fee for corporate members (firms)",
  },
];

const DOCUMENTS = [
  {
    id: "d1",
    name: "Standard Conditions of Contract for Construction",
    price: 350,
    format: "PDF",
    pages: 84,
  },
  {
    id: "d2",
    name: "LAAQS Standard Preliminary Bill of Quantities Template",
    price: 250,
    format: "Excel + PDF",
    pages: 45,
  },
  {
    id: "d3",
    name: "Guide to QS Fees – Lesotho Edition (2024)",
    price: 500,
    format: "PDF",
    pages: 120,
  },
  {
    id: "d4",
    name: "Building Cost Indices Report – Q1 2025",
    price: 300,
    format: "PDF",
    pages: 28,
  },
  {
    id: "d5",
    name: "Government Construction Contract Manual",
    price: 450,
    format: "PDF",
    pages: 96,
  },
  {
    id: "d6",
    name: "LAAQS Member Code of Professional Conduct",
    price: 0,
    format: "PDF",
    pages: 12,
  },
];

export default function ShopPage() {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [tab, setTab] = useState("fees");

  const addToCart = (item) => {
    if (!currentUser) {
      toast.error("Please sign in to make a purchase.");
      return;
    }
    if (cart.find((c) => c.id === item.id)) {
      toast("Already in cart.");
      return;
    }
    setCart((c) => [...c, item]);
    toast.success(`${item.name} added to cart.`);
  };

  const removeFromCart = (id) =>
    setCart((c) => c.filter((item) => item.id !== id));

  const total = cart.reduce((s, i) => s + (i.fee || i.price), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    toast.success(
      "Redirecting to payment gateway... (EcoCash / Bank transfer instructions will be emailed.)",
    );
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Shop</span>
          </div>
          <h1>Shop &amp; Payments</h1>
          <p>
            Pay membership fees and purchase professional documents &amp;
            publications
          </p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="shop-layout">
            {/* Main content */}
            <div>
              {/* Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  marginBottom: 36,
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  padding: 6,
                  border: "1px solid var(--border)",
                  width: "fit-content",
                }}
              >
                {[
                  ["fees", FiCreditCard, "Membership Fees"],
                  ["docs", FiFileText, "Documents"],
                ].map(([key, Icon, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className="btn btn-sm"
                    style={{
                      background:
                        tab === key ? "var(--primary)" : "transparent",
                      color: tab === key ? "#fff" : "var(--text)",
                      border: "none",
                      gap: 6,
                    }}
                  >
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>

              {/* Membership fees */}
              {tab === "fees" && (
                <div>
                  <h2 className="section-title" style={{ marginBottom: 8 }}>
                    Pay Membership Fees
                  </h2>
                  <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>
                    Select your membership category to pay your annual
                    subscription fee.
                  </p>
                  <div className="grid-2">
                    {MEMBERSHIP_FEES.map((fee) => (
                      <div
                        key={fee.id}
                        style={{
                          background: "#fff",
                          borderRadius: "var(--radius-lg)",
                          padding: "28px",
                          border: "1px solid var(--border)",
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        <FiCreditCard
                          color="var(--accent)"
                          size={28}
                          style={{ marginBottom: 12 }}
                        />
                        <h4
                          style={{
                            color: "var(--primary)",
                            fontWeight: 700,
                            marginBottom: 6,
                          }}
                        >
                          {fee.name}
                        </h4>
                        <p
                          style={{
                            fontSize: ".85rem",
                            color: "var(--text-muted)",
                            marginBottom: 16,
                          }}
                        >
                          {fee.desc}
                        </p>
                        <div
                          style={{
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            color: "var(--accent)",
                            fontFamily: "'Playfair Display',serif",
                            marginBottom: 20,
                          }}
                        >
                          LSL {fee.fee.toLocaleString()}
                          <span
                            style={{
                              fontSize: ".9rem",
                              fontFamily: "'Inter',sans-serif",
                              color: "var(--text-muted)",
                              fontWeight: 400,
                            }}
                          >
                            /yr
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(fee)}
                          className="btn btn-primary"
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          Add to Cart <FiArrowRight />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {tab === "docs" && (
                <div>
                  <h2 className="section-title" style={{ marginBottom: 8 }}>
                    Publications &amp; Documents
                  </h2>
                  <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>
                    Purchase official LAAQS documents, contract templates, and
                    industry publications.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {DOCUMENTS.map((doc) => (
                      <div
                        key={doc.id}
                        style={{
                          background: "#fff",
                          borderRadius: "var(--radius-lg)",
                          padding: "24px",
                          border: "1px solid var(--border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 20,
                          boxShadow: "var(--shadow-sm)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 16,
                            alignItems: "flex-start",
                          }}
                        >
                          <FiFileText
                            color="var(--primary)"
                            size={24}
                            style={{ flexShrink: 0, marginTop: 2 }}
                          />
                          <div>
                            <h4
                              style={{
                                fontWeight: 600,
                                color: "var(--primary)",
                                marginBottom: 4,
                              }}
                            >
                              {doc.name}
                            </h4>
                            <div style={{ display: "flex", gap: 12 }}>
                              <span className="badge badge-grey">
                                {doc.format}
                              </span>
                              <span
                                style={{
                                  fontSize: ".78rem",
                                  color: "var(--text-muted)",
                                }}
                              >
                                {doc.pages} pages
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 10,
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "1.1rem",
                              color:
                                doc.price === 0
                                  ? "var(--success)"
                                  : "var(--primary)",
                            }}
                          >
                            {doc.price === 0 ? "Free" : `LSL ${doc.price}`}
                          </span>
                          {doc.price === 0 ? (
                            <button
                              onClick={() => toast.success("Downloading...")}
                              className="btn btn-sm btn-outline"
                            >
                              <FiDownload size={13} /> Download
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                addToCart({ ...doc, fee: doc.price })
                              }
                              className="btn btn-sm btn-primary"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <div
              className="sticky-panel"
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
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <FiShoppingBag /> Cart ({cart.length})
              </h3>
              {cart.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 0",
                    color: "var(--text-muted)",
                  }}
                >
                  <FiShoppingBag
                    size={32}
                    style={{
                      margin: "0 auto 12px",
                      display: "block",
                      opacity: 0.3,
                    }}
                  />
                  <p style={{ fontSize: ".88rem" }}>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 20 }}>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          paddingBottom: 14,
                          marginBottom: 14,
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: ".85rem",
                              fontWeight: 600,
                              marginBottom: 2,
                            }}
                          >
                            {item.name}
                          </p>
                          <p
                            style={{
                              fontSize: ".78rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            {item.desc || item.format}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 6,
                          }}
                        >
                          <span style={{ fontWeight: 700, fontSize: ".9rem" }}>
                            LSL {(item.fee || item.price).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              fontSize: ".72rem",
                              color: "var(--danger)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      marginBottom: 24,
                      paddingTop: 4,
                      borderTop: "2px solid var(--primary)",
                    }}
                  >
                    <span>Total</span>
                    <span style={{ color: "var(--primary)" }}>
                      LSL {total.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Proceed to Payment <FiArrowRight />
                  </button>
                  <p
                    style={{
                      fontSize: ".72rem",
                      color: "var(--text-muted)",
                      textAlign: "center",
                      marginTop: 12,
                    }}
                  >
                    Accepted: EcoCash | Bank Transfer | Card
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MembershipPage from "./pages/MembershipPage";
import MembersPage from "./pages/MembersPage";
import CPDPage from "./pages/CPDPage";
import NewsPage from "./pages/NewsPage";
import JobsPage from "./pages/JobsPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import QuestionnairePage from "./pages/QuestionnairePage";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/components.css";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function FullPage({ children }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: "'Inter',sans-serif", fontSize: ".88rem" },
            success: { iconTheme: { primary: "#059669", secondary: "#fff" } },
          }}
        />
        <Routes>
          <Route
            path="/login"
            element={
              <FullPage>
                <LoginPage />
              </FullPage>
            }
          />
          <Route
            path="/register"
            element={
              <FullPage>
                <RegisterPage />
              </FullPage>
            }
          />
          <Route
            path="/dashboard"
            element={
              <FullPage>
                <DashboardPage />
              </FullPage>
            }
          />
          <Route
            path="/admin/*"
            element={
              <FullPage>
                <AdminPage />
              </FullPage>
            }
          />
          <Route
            path="/admin/questionnaire"
            element={
              <Layout>
                <QuestionnairePage />
              </Layout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutPage />
              </Layout>
            }
          />
          <Route
            path="/membership"
            element={
              <Layout>
                <MembershipPage />
              </Layout>
            }
          />
          <Route
            path="/membership/types"
            element={
              <Layout>
                <MembershipPage />
              </Layout>
            }
          />
          <Route
            path="/members"
            element={
              <Layout>
                <MembersPage />
              </Layout>
            }
          />
          <Route
            path="/cpd"
            element={
              <Layout>
                <CPDPage />
              </Layout>
            }
          />
          <Route
            path="/cpd/certificates"
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            }
          />
          <Route
            path="/news"
            element={
              <Layout>
                <NewsPage />
              </Layout>
            }
          />
          <Route
            path="/news/:id"
            element={
              <Layout>
                <NewsPage />
              </Layout>
            }
          />
          <Route
            path="/jobs"
            element={
              <Layout>
                <JobsPage />
              </Layout>
            }
          />
          <Route
            path="/shop"
            element={
              <Layout>
                <ShopPage />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <ContactPage />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <div style={{ textAlign: "center", padding: "120px 24px" }}>
                  <h1
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "var(--primary)",
                      fontSize: "4rem",
                      marginBottom: 16,
                    }}
                  >
                    404
                  </h1>
                  <p style={{ color: "var(--text-muted)", marginBottom: 32 }}>
                    Page not found.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Back to Home
                  </a>
                </div>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

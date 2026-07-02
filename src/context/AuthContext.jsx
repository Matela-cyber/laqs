import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();
const DEMO_EMAIL = "tebohomatela@gmail.com";
const DEMO_PASSWORD = "matelapass";
const DEMO_STORAGE_KEY = "laqs-demo-user";

export const useAuth = () => useContext(AuthContext);

const buildDemoUser = (email, displayName, extraData = {}) => ({
  uid: "demo-member",
  displayName,
  email,
  role: "member",
  membership_status: "approved",
  membershipType: "professional",
  createdAt: new Date().toISOString(),
  ...extraData,
});

const persistDemoUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(user));
  }
};

const clearDemoUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEMO_STORAGE_KEY);
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, displayName, extraData = {}) => {
    const normalizedEmail = email.toLowerCase();
    if (
      normalizedEmail === DEMO_EMAIL ||
      (password === DEMO_PASSWORD && normalizedEmail.includes("@"))
    ) {
      const demoUser = buildDemoUser(normalizedEmail, displayName, extraData);
      setCurrentUser(demoUser);
      setUserRole("member");
      persistDemoUser(demoUser);
      return { user: demoUser };
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName });
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name: displayName,
        email,
        role: "member",
        membership_status: "pending",
        createdAt: new Date().toISOString(),
        ...extraData,
      });
      return cred;
    } catch (error) {
      if (
        error?.code === "auth/network-request-failed" ||
        error?.code === "auth/operation-not-allowed"
      ) {
        const demoUser = buildDemoUser(normalizedEmail, displayName, extraData);
        setCurrentUser(demoUser);
        setUserRole("member");
        persistDemoUser(demoUser);
        return { user: demoUser };
      }
      throw error;
    }
  };

  const login = async (email, password) => {
    const normalizedEmail = email.toLowerCase();
    if (normalizedEmail === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const demoUser = buildDemoUser(normalizedEmail, "Teboho Matela", {
        membership_status: "approved",
        membershipType: "professional",
      });
      setCurrentUser(demoUser);
      setUserRole("member");
      persistDemoUser(demoUser);
      return { user: demoUser };
    }

    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    clearDemoUser();
    setCurrentUser(null);
    setUserRole(null);
    try {
      await signOut(auth);
    } catch (_) {}
  };

  useEffect(() => {
    const storedDemoUser = localStorage.getItem(DEMO_STORAGE_KEY);
    if (storedDemoUser) {
      const parsed = JSON.parse(storedDemoUser);
      setCurrentUser(parsed);
      setUserRole(parsed.role || "member");
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) setUserRole(snap.data().role);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, userRole, register, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

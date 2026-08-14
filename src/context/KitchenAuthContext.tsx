"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface KitchenAuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showApkModal: boolean;
  setShowApkModal: (show: boolean) => void;
  authMode: "login" | "register";
  setAuthMode: (mode: "login" | "register") => void;
  loginWithOtp: (phone: string, otp: string) => boolean;
  logout: () => void;
}

const KitchenAuthContext = createContext<KitchenAuthContextType | undefined>(undefined);

export function KitchenAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showApkModal, setShowApkModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const saved = localStorage.getItem("moncradel_kitchen_auth");
    const token = localStorage.getItem("moncradel_kitchen_token");
    if (saved === "true" && token) {
      setIsAuthenticated(true);
    } else {
      // If auth flag is set but token is missing, clean up
      if (saved === "true" && !token) {
        localStorage.removeItem("moncradel_kitchen_auth");
      }
      setIsAuthenticated(false);
    }
    setIsAuthLoading(false);
  }, []);

  const loginWithOtp = (phone: string, otp: string): boolean => {
    if (phone && otp.length >= 4) {
      setIsAuthenticated(true);
      localStorage.setItem("moncradel_kitchen_auth", "true");
      setShowAuthModal(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("moncradel_kitchen_auth");
    localStorage.removeItem("moncradel_kitchen_token");
    localStorage.removeItem("moncradel_kitchen_user");
    localStorage.removeItem("moncradel_splash_seen");
    localStorage.removeItem("token");
    // Clear the auth cookie
    document.cookie = "moncradel_kitchen_token=; path=/; max-age=0; SameSite=Strict";
  };

  return (
    <KitchenAuthContext.Provider
      value={{
        isAuthenticated,
        isAuthLoading,
        showAuthModal,
        setShowAuthModal,
        showApkModal,
        setShowApkModal,
        authMode,
        setAuthMode,
        loginWithOtp,
        logout,
      }}
    >
      {children}
    </KitchenAuthContext.Provider>
  );
}

export function useKitchenAuth() {
  const context = useContext(KitchenAuthContext);
  if (!context) {
    throw new Error("useKitchenAuth must be used within a KitchenAuthProvider");
  }
  return context;
}

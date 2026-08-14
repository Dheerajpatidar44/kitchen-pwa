"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { KitchenAuthProvider, useKitchenAuth } from "@/context/KitchenAuthContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import QuickActionModal from "@/components/QuickActionModal";
import PrintableLabelModal from "@/components/PrintableLabelModal";
import { User, ArrowRight, ShieldCheck } from "lucide-react";

function ProfileIncompleteOverlay() {
  const router = useRouter();

  return (
    <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
      <div className="max-w-md w-full text-center animate-fade-in-up">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-6">
          <User className="w-10 h-10 text-brand" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mb-3">
          Complete Your Profile
        </h1>
        <p className="text-[15px] text-slate-600 font-medium leading-relaxed mb-8 max-w-sm mx-auto">
          Before you can access the dashboard, please complete your kitchen partner profile with all the required details.
        </p>


        {/* CTA Button */}
        <button
          onClick={() => router.push("/profile")}
          className="w-full bg-brand hover:bg-brand-hover text-white font-medium text-[16px] py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          Go to Profile
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function KitchenAppInner({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthLoading, isProfileComplete, isProfileChecking } = useKitchenAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthRoute = pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/forgot-password";
  const isProfileRoute = pathname === "/profile";

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isAuthenticated && !isAuthRoute) {
      router.push("/login");
    }
    // Also handle redirect from root to dashboard for authenticated users
    if (isAuthenticated && pathname === "/") {
      router.push("/dashboard");
    }
  }, [isAuthLoading, isAuthenticated, isAuthRoute, pathname, router]);

  // If on an auth route, just render the auth page (Login/Register)
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Show nothing while checking auth to prevent flash of wrong content
  if (isAuthLoading) {
    return <div className="h-[100dvh] bg-[#F8F9FA]" />;
  }

  // If not authenticated and not on auth route, we are redirecting or showing mobile modal
  if (!isAuthenticated) {
    return null;
  }

  // Determine if we should show the profile incomplete overlay
  const showProfileGate = !isProfileComplete && !isProfileChecking && !isProfileRoute;

  return (
    <>

      {/* AUTHENTICATED: Fixed Shell — Sidebar & Header never scroll */}
        <div className="h-[100dvh] flex bg-[#F8F9FA] text-slate-800 antialiased selection:bg-[#A5D8FF] font-sans overflow-hidden">
          {/* Desktop Navigation Sidebar — Fixed column, never scrolls */}
          <div className="hidden lg:flex shrink-0">
            <Sidebar />
          </div>

          {/* Right Column: Header + Scrollable Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Header — Fixed at top of content column */}
            <div className={`shrink-0 z-30 ${pathname === '/more' ? 'hidden md:block' : ''}`}>
              <Header />
            </div>

            {/* Main Content — ONLY this area scrolls */}
            {showProfileGate ? (
              <ProfileIncompleteOverlay />
            ) : (
              <main className={`flex-1 overflow-y-auto lg:pb-8 ${pathname === '/more' ? 'p-0 md:px-4 md:py-6 md:pb-24' : 'px-4 py-6 pb-24'}`}>
                <div className="w-full">
                  {children}
                </div>
              </main>
            )}
          </div>

          {/* Mobile & Tablet Bottom Navigation Bar */}
          {pathname !== '/more' && !showProfileGate && (
            <div className="lg:hidden">
              <Navigation mode="mobile" />
            </div>
          )}

          <QuickActionModal />
          <PrintableLabelModal />
        </div>
    </>
  );
}

export default function KitchenAppShell({ children }: { children: React.ReactNode }) {
  return (
    <KitchenAuthProvider>
      <KitchenAppInner>{children}</KitchenAppInner>
    </KitchenAuthProvider>
  );
}

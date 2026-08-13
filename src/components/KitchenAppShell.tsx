"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { KitchenAuthProvider, useKitchenAuth } from "@/context/KitchenAuthContext";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import QuickActionModal from "@/components/QuickActionModal";
import PrintableLabelModal from "@/components/PrintableLabelModal";

function KitchenAppInner({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthLoading } = useKitchenAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthRoute = pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/forgot-password";

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
            <main className={`flex-1 overflow-y-auto lg:pb-8 ${pathname === '/more' ? 'p-0 md:px-4 md:py-6 md:pb-24' : 'px-4 py-6 pb-24'}`}>
              <div className="w-full">
                {children}
              </div>
            </main>
          </div>

          {/* Mobile & Tablet Bottom Navigation Bar */}
          {pathname !== '/more' && (
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

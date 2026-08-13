"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  BookOpen,
  Bell,
  ShieldCheck,
  Users,
  BarChart3,
  LogOut,
  ChevronRight,
  Settings,
  HelpCircle
} from "lucide-react";
import { useAuth } from "@/context/KitchenAuthContext";

export default function MoreMenuPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuSections = [
    {
      title: "Account",
      items: [
        { name: "My Profile", href: "/profile", icon: User, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Notifications", href: "/notifications", icon: Bell, color: "text-amber-600", bg: "bg-amber-50" },
      ]
    },
    {
      title: "Kitchen Management",
      items: [
        { name: "Meals Catalog", href: "/meals", icon: BookOpen, color: "text-brand", bg: "bg-brand/10" },
        { name: "Staff Management", href: "/staff-management", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
        { name: "Hygiene & Safety", href: "/hygiene", icon: ShieldCheck, color: "text-teal-600", bg: "bg-teal-50" },
        { name: "Reports & Analytics", href: "/reports", icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50" },
      ]
    },
    {
      title: "App Settings",
      items: [
        { name: "Settings", href: "/settings", icon: Settings, color: "text-slate-600", bg: "bg-slate-100" },
        { name: "Help & Support", href: "/support", icon: HelpCircle, color: "text-rose-600", bg: "bg-rose-50" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F6] pb-24 md:pb-10 font-sans">
      
      {/* Header Profile Section */}
      <div className="bg-[#133F23] pt-12 pb-6 px-5 rounded-b-[32px] shadow-sm relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] bg-white/10 rounded-full blur-xl" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-[#EBF0E7] flex items-center justify-center border-2 border-white">
              <User className="w-8 h-8 text-[#133F23]" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Kitchen Admin</h1>
            <p className="text-white/80 text-[13px] font-medium">Manage your workspace</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        
        {menuSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-[13px] font-bold text-[#6C8A60] uppercase tracking-wider mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-[#EBF0E7] overflow-hidden">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isLast = itemIdx === section.items.length - 1;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors ${!isLast ? 'border-b border-slate-100' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.bg}`}>
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-[15px] font-medium text-[#163C24]">
                        {item.name}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="pt-2 pb-6">
          <button 
            onClick={handleLogout}
            className="w-full bg-white border border-red-100 rounded-[20px] p-4 flex items-center justify-between shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-red-50 group-hover:bg-red-100 transition-colors">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-[15px] font-semibold text-red-600">
                Log Out
              </span>
            </div>
          </button>
        </div>
        
      </div>
    </div>
  );
}

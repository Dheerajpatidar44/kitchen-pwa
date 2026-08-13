"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Mail, Phone, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";

interface MobileRegisterProps {
  onSwitchToLogin: () => void;
}

export default function MobileRegister({ onSwitchToLogin }: MobileRegisterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [regStep, setRegStep] = useState<1 | 2>(1);
  
  const [regEmail, setRegEmail] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regOtp, setRegOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regName || !regPhone || !regPassword) return;
    
    setIsLoading(true);
    setErrorMsg("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/auth/send-register-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: regEmail }),
      });
      const data = await res.json();
      
      if (data.success) {
        setRegStep(2);
      } else {
        setErrorMsg(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error connecting to server.");
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regPhone || !regPassword || !regOtp) return;
    
    setIsLoading(true);
    setErrorMsg("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: regEmail,
          name: regName,
          phone: regPhone,
          password: regPassword,
          otp: regOtp,
          role: "kitchen"
        }),
      });
      const data = await res.json();
      
      if (data.success && data.token) {
        onSwitchToLogin();
      } else {
        setErrorMsg(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error connecting to server.");
    }
    setIsLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#FBF9F6] relative px-6 py-6 overflow-hidden font-sans">
      <div className="w-full flex flex-col h-full max-w-sm mx-auto">
        
        {/* Spacer above logo */}
        <div className="flex-[0.5] min-h-[0.5rem]" />

        {/* Top Section: Logo */}
        <div className="flex-shrink-0 w-full flex items-center justify-center">
          <Image 
            src="/logo.png" 
            alt="Moncradel Logo" 
            width={200} 
            height={50} 
            className="h-14 w-auto object-contain"
            priority
          />
        </div>

        {/* Spacer between logo and titles */}
        <div className="flex-[0.8] min-h-[1.5rem]" />

        {/* Title Section */}
        <div className="flex-shrink-0 w-full text-center mb-8 space-y-2">
          <h2 className="text-[26px] font-semibold text-[#163C24] tracking-tight">
            {regStep === 1 ? "Create Your Account" : "Verify Email"}
          </h2>
          <p className="text-[13px] font-medium text-[#6C8A60]">
            {regStep === 1 
              ? "Join Moncradel and grow your business" 
              : `OTP sent to ${regEmail}`}
          </p>
        </div>

        {/* Form Section */}
        <div className="flex-shrink-0 w-full h-full overflow-y-auto no-scrollbar pb-10">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[12px] font-medium p-2 rounded-xl text-center mb-4">
              {errorMsg}
            </div>
          )}

          {regStep === 1 && (
            <form onSubmit={handleSendOtp} className="flex flex-col space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#163C24] ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-[#6C8A60]" strokeWidth={2} />
                  </div>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[#D5E3D0] rounded-[14px] text-[#163C24] text-[14px] font-medium focus:outline-none focus:ring-1 focus:ring-[#6C8A60] focus:border-[#6C8A60] transition-all placeholder:text-[#A0B09A] placeholder:font-normal"
                    placeholder="e.g., John Doe"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#163C24] ml-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-[#6C8A60]" strokeWidth={2} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[#D5E3D0] rounded-[14px] text-[#163C24] text-[14px] font-medium focus:outline-none focus:ring-1 focus:ring-[#6C8A60] focus:border-[#6C8A60] transition-all placeholder:text-[#A0B09A] placeholder:font-normal"
                    placeholder="e.g., +91 98765 43210"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#163C24] ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-[#6C8A60]" strokeWidth={2} />
                  </div>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[#D5E3D0] rounded-[14px] text-[#163C24] text-[14px] font-medium focus:outline-none focus:ring-1 focus:ring-[#6C8A60] focus:border-[#6C8A60] transition-all placeholder:text-[#A0B09A] placeholder:font-normal"
                    placeholder="e.g., kitchen@moncradel.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#163C24] ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#6C8A60]" strokeWidth={2} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-white border border-[#D5E3D0] rounded-[14px] text-[#163C24] text-[14px] font-medium focus:outline-none focus:ring-1 focus:ring-[#6C8A60] focus:border-[#6C8A60] transition-all placeholder:text-[#A0B09A] placeholder:font-normal"
                    placeholder="Create a strong password"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6C8A60] hover:text-[#163C24] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
                  </button>
                </div>
              </div>

              <div className="pt-2" />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[54px] bg-[#133F23] text-white rounded-full font-medium text-[15px] hover:bg-[#0D2D18] transition-all flex items-center justify-center relative disabled:opacity-70 active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>Create Account</span>
                    <div className="absolute right-2 top-1.5 bottom-1.5 w-10 border border-white/30 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white stroke-[2]" />
                    </div>
                  </>
                )}
              </button>
            </form>
          )}

          {regStep === 2 && (
            <form onSubmit={handleRegisterSubmit} className="space-y-6 pt-2 flex flex-col justify-center">
              <div className="space-y-3 text-center">
                <label className="text-[13px] font-medium text-[#163C24] block mb-3">Enter 4-Digit OTP</label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={regOtp}
                  onChange={(e) => setRegOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full max-w-[180px] mx-auto block px-4 py-3 bg-white border border-[#D5E3D0] rounded-[14px] text-[#163C24] text-2xl font-semibold tracking-[0.5em] text-center focus:outline-none focus:ring-1 focus:ring-[#6C8A60] focus:border-[#6C8A60]"
                  placeholder="0000"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || regOtp.length !== 4}
                className="w-full h-[54px] bg-[#133F23] text-white rounded-full font-medium text-[15px] hover:bg-[#0D2D18] transition-all flex items-center justify-center relative disabled:opacity-70 active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>Verify & Register</span>
                    <div className="absolute right-2 top-1.5 bottom-1.5 w-10 border border-white/30 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white stroke-[2]" />
                    </div>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <button 
              onClick={onSwitchToLogin}
              className="text-[#425044] font-medium text-[13px] flex items-center justify-center mx-auto hover:text-[#163C24] transition-colors gap-1.5"
            >
              Already have an account? <span className="font-semibold text-[#163C24]">Sign In</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

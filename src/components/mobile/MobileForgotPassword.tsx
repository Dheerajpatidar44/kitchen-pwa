"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function MobileForgotPassword() {
  const router = useRouter();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message || "OTP sent successfully!");
        setStep(2);
      } else {
        setErrorMsg(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setErrorMsg("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) return;

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg("Password reset successful! Redirecting...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setErrorMsg(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setErrorMsg("Error connecting to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#FBF9F6] relative px-6 py-6 overflow-hidden font-sans">
      
      {/* Back Button (Absolute Top Left) */}
      <button 
        onClick={() => step === 2 ? setStep(1) : router.push("/login")}
        className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white border border-[#D5E3D0] flex items-center justify-center text-[#163C24] hover:bg-[#EBF0E7] transition-colors z-20"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="w-full flex flex-col h-full max-w-sm mx-auto relative z-10">
        
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
            {step === 1 ? "Reset Password" : "Enter OTP"}
          </h2>
          <p className="text-[13px] font-medium text-[#6C8A60]">
            {step === 1 
              ? "Enter your email to receive an OTP" 
              : "Enter the OTP sent to your email"}
          </p>
        </div>

        {/* Form Section */}
        <div className="flex-shrink-0 w-full">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[12px] font-medium p-2 rounded-xl text-center mb-4">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-[12px] font-medium p-2 rounded-xl text-center mb-4">
              {successMsg}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="flex flex-col space-y-5">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#163C24] ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-[#6C8A60]" strokeWidth={2} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#D5E3D0] rounded-[14px] text-[#163C24] text-[14px] font-medium focus:outline-none focus:ring-1 focus:ring-[#6C8A60] focus:border-[#6C8A60] transition-all placeholder:text-[#A0B09A] placeholder:font-normal"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="pt-2" />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[54px] bg-[#133F23] text-white rounded-full font-medium text-[15px] hover:bg-[#0D2D18] transition-all flex items-center justify-center relative disabled:opacity-70 active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>Send OTP</span>
                    <div className="absolute right-2 top-1.5 bottom-1.5 w-10 border border-white/30 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white stroke-[2]" />
                    </div>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="flex flex-col space-y-5">
              <div className="space-y-1.5 text-center">
                <label className="text-[13px] font-medium text-[#163C24] block mb-3">4-Digit OTP</label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full max-w-[180px] mx-auto block px-4 py-3.5 bg-white border border-[#D5E3D0] rounded-[14px] text-[#163C24] text-2xl font-semibold tracking-[0.5em] text-center focus:outline-none focus:ring-1 focus:ring-[#6C8A60] focus:border-[#6C8A60]"
                  placeholder="0000"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-[#163C24] ml-1">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#6C8A60]" strokeWidth={2} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3.5 bg-white border border-[#D5E3D0] rounded-[14px] text-[#163C24] text-[14px] font-medium focus:outline-none focus:ring-1 focus:ring-[#6C8A60] focus:border-[#6C8A60] transition-all placeholder:text-[#A0B09A] placeholder:font-normal"
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

              <button
                type="submit"
                disabled={isLoading || otp.length !== 4 || !newPassword}
                className="w-full h-[54px] bg-[#133F23] text-white rounded-full font-medium text-[15px] hover:bg-[#0D2D18] transition-all flex items-center justify-center relative disabled:opacity-70 active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>Set New Password</span>
                    <div className="absolute right-2 top-1.5 bottom-1.5 w-10 border border-white/30 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white stroke-[2]" />
                    </div>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Spacer below form */}
        <div className="flex-[1] min-h-[1.5rem]" />

        {/* Footer Link */}
        <div className="flex-shrink-0 text-center pb-2">
          <button 
            onClick={() => router.push("/login")}
            className="text-[#425044] font-medium text-[13px] flex items-center justify-center mx-auto hover:text-[#163C24] transition-colors gap-1.5"
          >
            Remembered your password? <span className="font-semibold text-[#163C24]">Sign In</span> <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGraduationCap } from "react-icons/fa";

const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Both email and password are required.", { autoClose: 3000 });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", formData);
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      toast.success("Login Successful!", { autoClose: 2000 });
      if (onClose) onClose();
      setTimeout(() => {
        if (user.role === "faculty") navigate("/facultydashboard");
        else if (user.role === "student") navigate("/studentsdashboard");
        else navigate("/dashboard");
      }, 2200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
      <ToastContainer theme="dark" />

      {/* Decorative orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-4xl mx-4 flex rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}>

        {/* ── Left Panel: Image + Info ── */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden">
          <img src="/login_illustration.png" alt="Education" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(15,23,42,0.3) 0%,rgba(15,23,42,0.85) 100%)" }} />
          <div className="relative z-10 p-8 flex flex-col h-full justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                <FaGraduationCap className="text-white text-sm" />
              </div>
              <span className="text-white font-bold text-lg">Shampari Edutech</span>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
                Empowering Futures with Quality Education
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Connect with expert tutors, track your progress, and achieve your academic goals.
              </p>
              <div className="flex gap-6">
                {[["500+", "Tutors"], ["10K+", "Students"], ["95%", "Success"]].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-xl font-bold text-gradient">{val}</p>
                    <p className="text-xs text-white/40">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel: Form ── */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col justify-center p-8 sm:p-10"
          style={{ background: "rgba(15,23,42,0.95)", backdropFilter: "blur(24px)" }}>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="text-gradient">Welcome Back</span>
            </h1>
            <p className="text-white/40 mt-2 text-sm">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-4 text-white/25 text-sm" />
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="Email address" required
                className="glass-input pl-11" />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3.5 left-4 text-white/25 text-sm" />
              <input type={showPassword ? "text" : "password"} name="password"
                value={formData.password} onChange={handleChange}
                placeholder="Password" required
                className="glass-input pl-11 pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3.5 right-4 text-white/25 hover:text-white/50 transition-colors">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-indigo-400/60 hover:text-indigo-400 transition-colors">
                Forgot Password?
              </a>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-premium !rounded-xl !py-3.5 text-sm disabled:opacity-50">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span className="text-xs text-white/20">or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          <p className="text-center text-sm text-white/30">
            Don't have an account?{" "}
            <button onClick={() => { if (onClose) onClose(); navigate("/signup"); }}
              className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Create one
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;

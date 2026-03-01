import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaChalkboardTeacher, FaUserGraduate, FaEye, FaEyeSlash, FaGraduationCap } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', role: 'student' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/signup", formData);
            toast.success(response.data.message || "Account created!", { autoClose: 3000 });
            setTimeout(() => navigate("/login"), 3500);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong.", { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
            <ToastContainer theme="dark" />

            {/* Orbs */}
            <div className="absolute top-10 right-20 w-96 h-96 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
            <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }} />

            <div className="relative z-10 w-full max-w-4xl mx-4 flex rounded-2xl overflow-hidden shadow-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>

                {/* ── Left Panel ── */}
                <div className="hidden lg:flex flex-col justify-between w-5/12 relative overflow-hidden">
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
                                Start Your Learning Journey Today
                            </h2>
                            <p className="text-white/50 text-sm leading-relaxed mb-6">
                                Join thousands of students and tutors building brighter futures together.
                            </p>
                            <div className="space-y-3">
                                {[
                                    "Find expert tutors near you",
                                    "Personalized 1-on-1 sessions",
                                    "Flexible online & offline modes",
                                    "AI-powered recommendations"
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#6366f1" }} />
                                        <p className="text-white/50 text-xs">{item}</p>
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

                    <div className="mb-7">
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            <span className="text-gradient">Create Account</span>
                        </h1>
                        <p className="text-white/40 mt-2 text-sm">Find the perfect tutor or share your skills</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <FaUser className="absolute top-3.5 left-4 text-white/25 text-sm" />
                            <input type="text" name="fullName" value={formData.fullName}
                                onChange={handleChange} placeholder="Full Name" required
                                className="glass-input pl-11" />
                        </div>

                        <div className="relative">
                            <FaEnvelope className="absolute top-3.5 left-4 text-white/25 text-sm" />
                            <input type="email" name="email" value={formData.email}
                                onChange={handleChange} placeholder="Email address" required
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

                        {/* Role Selection */}
                        <div>
                            <span className="block text-white/40 text-xs font-semibold mb-2 uppercase tracking-wider">I am a:</span>
                            <div className="flex gap-3">
                                {[
                                    { value: 'student', label: 'Student', icon: <FaUserGraduate className="text-sm" /> },
                                    { value: 'faculty', label: 'Faculty', icon: <FaChalkboardTeacher className="text-sm" /> },
                                ].map((role) => (
                                    <label key={role.value}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium ${formData.role === role.value ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                                        style={{
                                            background: formData.role === role.value
                                                ? 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))'
                                                : 'rgba(255,255,255,0.03)',
                                            border: formData.role === role.value
                                                ? '1px solid rgba(99,102,241,0.4)'
                                                : '1px solid rgba(255,255,255,0.06)',
                                        }}>
                                        <input type="radio" name="role" value={role.value}
                                            checked={formData.role === role.value}
                                            onChange={handleChange} className="sr-only" />
                                        {role.icon} {role.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                            <input id="terms" type="checkbox" required
                                className="mt-1 h-3.5 w-3.5 rounded" />
                            <label htmlFor="terms" className="text-xs text-white/35">
                                I agree to the <a href="#" className="text-indigo-400/70 hover:text-indigo-400">Terms of Service</a> and <a href="#" className="text-indigo-400/70 hover:text-indigo-400">Privacy Policy</a>
                            </label>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full btn-premium !rounded-xl !py-3.5 text-sm disabled:opacity-50">
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating account...
                                </span>
                            ) : "Create Account"}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                        <span className="text-xs text-white/20">or</span>
                        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    </div>

                    <p className="text-center text-sm text-white/30">
                        Already have an account?{" "}
                        <button onClick={() => navigate("/login")}
                            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
                            Sign in
                        </button>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default SignUpPage;

import { motion } from "framer-motion";
import { FaGraduationCap, FaArrowRight, FaUsers, FaChalkboardTeacher, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MainSection({ imageUrl }) {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-[92vh] flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${imageUrl})`, transform: "scale(1.05)" }} />
                <div className="absolute inset-0" style={{
                    background: `linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.75) 45%, rgba(15,23,42,0.4) 100%),
                                 radial-gradient(circle at 20% 80%, rgba(99,102,241,0.18) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, rgba(139,92,246,0.12) 0%, transparent 50%)`
                }} />
            </div>

            {/* Decorative orbs */}
            <div className="absolute top-20 left-1/2 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)' }} />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)' }} />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* ── Left: Text ── */}
                    <div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }} className="mb-6">
                            <span className="badge badge-primary text-sm inline-flex items-center gap-1.5">
                                <FaGraduationCap className="text-indigo-400" /> #1 Edutech Platform in India
                            </span>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                            <span className="text-white">Empowering Futures</span><br />
                            <span className="text-gradient">with Quality</span><br />
                            <span className="text-white">Education</span>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-white/55 leading-relaxed mb-10 max-w-xl">
                            At Shampari Edutech, we bridge knowledge and innovation — providing personalized learning solutions, expert mentorship, and real-world skills to help learners thrive.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate("/signup")}
                                className="btn-premium text-base !py-3.5 !px-8 !rounded-xl group flex items-center justify-center gap-2">
                                Get Started Free
                                <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                            <button className="btn-outline text-base !py-3.5 !px-8 !rounded-xl"
                                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                                Explore Courses
                            </button>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex gap-8 sm:gap-12 mt-14">
                            {[
                                { value: "10K+", label: "Students" },
                                { value: "500+", label: "Expert Tutors" },
                                { value: "98%", label: "Satisfaction" },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
                                    <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: Single image card + mini stats ── */}
                    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="hidden lg:flex flex-col gap-4">
                        {/* Main image card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl"
                            style={{ border: "1px solid rgba(255,255,255,0.09)" }}>
                            <img src="/bgimage.jpg" alt="Education"
                                className="w-full h-72 object-cover" />
                            <div className="absolute inset-0"
                                style={{ background: "linear-gradient(180deg, transparent 45%, rgba(15,23,42,0.92) 100%)" }} />
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-bold">Personalized 1-on-1 Learning</p>
                                <p className="text-white/50 text-sm mt-0.5">Tailored sessions for every student</p>
                            </div>
                        </div>

                        {/* Mini stat cards */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: <FaUsers className="text-indigo-400" />, label: "10K+ Students", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.2)" },
                                { icon: <FaChalkboardTeacher className="text-emerald-400" />, label: "500+ Tutors", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)" },
                                { icon: <FaStar className="text-amber-400" />, label: "98% Success", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
                            ].map((item) => (
                                <div key={item.label} className="rounded-xl p-3 text-center"
                                    style={{ background: item.bg, border: `1px solid ${item.border}`, backdropFilter: "blur(12px)" }}>
                                    <div className="text-lg mb-1 flex justify-center">{item.icon}</div>
                                    <p className="text-white/70 text-xs font-medium leading-tight">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32"
                style={{ background: 'linear-gradient(to top, #0f172a, transparent)' }} />
        </div>
    );
}

export default MainSection;
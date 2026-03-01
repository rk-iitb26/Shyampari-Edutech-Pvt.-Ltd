import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function NavBar({ About, Event, Contact, Feedback }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLoginClick = () => {
        navigate("/login");
        setMenuOpen(false);
    };

    const handleSignUpClick = () => {
        navigate("/signup");
        setMenuOpen(false);
    };

    const navLinks = [
        { label: About, href: "#about" },
        { label: Event, href: "#event" },
        { label: Contact, href: "#contact" },
    ];

    return (
        <nav className={`w-full sticky top-0 z-50 transition-all duration-500 ${scrolled
            ? "nav-premium shadow-lg shadow-black/20"
            : "bg-transparent"
            }`}
            style={{
                background: scrolled
                    ? 'rgba(15, 23, 42, 0.92)'
                    : 'linear-gradient(180deg, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none'
            }}>
            <div className="w-full flex items-center justify-between px-6 md:px-16 py-3">
                {/* Logo Section */}
                <motion.div
                    className="flex items-center gap-3 cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate("/")}
                >
                    <div className="relative flex items-center justify-center p-[2px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#fff0d4] flex items-center justify-center">
                            <img
                                src="/assets/images/logo.jpg"
                                alt="Shampari-logo"
                                className="h-[120%] w-[120%] max-w-none object-cover scale-110"
                                style={{ filter: 'contrast(1.15) saturate(1.1) drop-shadow(0 0 1px rgba(0,0,0,0.1))' }}
                            />
                        </div>
                        <div className="absolute inset-0 rounded-full"
                            style={{ boxShadow: '0 0 15px rgba(99,102,241,0.4)' }} />
                    </div>
                    <div className="text-xl md:text-2xl font-bold tracking-tight">
                        <span className="text-gradient">Shampari</span>
                        <span className="text-white/80 ml-1 font-light">Edutech</span>
                    </div>
                </motion.div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.4 }}
                            className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                                style={{ background: 'var(--gradient-primary)' }} />
                        </motion.a>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <Link to="/feedbacks" className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group">
                            {Feedback}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                                style={{ background: 'var(--gradient-primary)' }} />
                        </Link>
                    </motion.div>
                </div>

                {/* Desktop Buttons */}
                <motion.div
                    className="hidden md:flex gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={handleLoginClick}
                        className="px-5 py-2 rounded-lg text-sm font-semibold text-white/90 border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                    >
                        Login
                    </button>
                    <button
                        onClick={handleSignUpClick}
                        className="btn-premium text-sm !py-2 !px-5 !rounded-lg"
                    >
                        Sign Up
                    </button>
                </motion.div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden text-white/80 z-50 cursor-pointer">
                    {menuOpen ? (
                        <X size={26} onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors" />
                    ) : (
                        <Menu size={26} onClick={() => setMenuOpen(true)} className="hover:text-white transition-colors" />
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden"
                        style={{
                            background: 'rgba(15, 23, 42, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderTop: '1px solid rgba(255,255,255,0.06)'
                        }}
                    >
                        <div className="flex flex-col items-center py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a key={link.label} href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                                    {link.label}
                                </a>
                            ))}
                            <Link to="/feedbacks" onClick={() => setMenuOpen(false)}
                                className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                                {Feedback}
                            </Link>
                            <div className="flex gap-3 pt-3">
                                <button onClick={handleLoginClick}
                                    className="px-5 py-2 rounded-lg text-sm font-semibold text-white/90 border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all">
                                    Login
                                </button>
                                <button onClick={handleSignUpClick}
                                    className="btn-premium text-sm !py-2 !px-5 !rounded-lg">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
}

export default NavBar;

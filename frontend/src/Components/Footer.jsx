import React from 'react';
import { motion } from "framer-motion";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
    const quickLinks = ['Home', 'About Us', 'How It Works', 'Testimonials', 'Courses', 'Contact Us'];

    const socialLinks = [
        { icon: <FaFacebookF />, href: "#", color: "hover:text-blue-400", label: "Facebook" },
        { icon: <FaYoutube />, href: "https://www.youtube.com/@shyampariedutech/featured", color: "hover:text-red-400", label: "YouTube" },
        { icon: <FaInstagram />, href: "#", color: "hover:text-pink-400", label: "Instagram" },
        { icon: <FaLinkedinIn />, href: "https://in.linkedin.com/company/shyampariedutech", color: "hover:text-blue-300", label: "LinkedIn" },
    ];

    return (
        <footer id="contact" className="relative overflow-hidden" style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #0a0f1a 100%)'
        }}>
            {/* Top divider */}
            <div className="divider-gradient" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16 sm:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-bold mb-2">
                            <span className="text-gradient">Shampari</span>
                            <span className="text-white/80 ml-1 font-light">Edutech</span>
                        </h3>
                        <p className="text-sm text-white/30 mb-4">Pvt. Ltd.</p>
                        <p className="text-sm text-white/40 leading-relaxed">
                            Empowering Futures with Quality Education. Bridging knowledge and innovation for learners worldwide.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map(link => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-white/35 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group">
                                        <span className="w-0 h-px bg-indigo-400 transition-all duration-300 group-hover:w-3" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Contact Us</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="tel:+917040272830" className="text-sm text-white/35 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-3">
                                    <FaPhone className="text-indigo-400/50" /> +91 7040272830
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@shampari.com" className="text-sm text-white/35 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-3">
                                    <FaEnvelope className="text-indigo-400/50" /> info@shampari.com
                                </a>
                            </li>
                            <li>
                                <span className="text-sm text-white/35 flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-indigo-400/50 mt-0.5 flex-shrink-0" /> Pune, Maharashtra, India 412307
                                </span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Social & Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Follow Us</h4>
                        <div className="flex gap-3 mb-8">
                            {socialLinks.map(social => (
                                <a key={social.label} href={social.href}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white/40 ${social.color} transition-all duration-300 hover:scale-110`}
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                    aria-label={social.label}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Newsletter</h4>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                            />
                            <button type="submit" className="btn-premium !py-2 !px-4 !rounded-lg text-sm !text-xs">
                                →
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="divider-gradient mt-12 mb-6" />
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-white/20">
                        © {new Date().getFullYear()} Shampari Edutech Pvt. Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
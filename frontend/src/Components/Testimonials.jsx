import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const defaultTestimonials = [
    {
        id: 't1',
        quote: 'Shampari Edutech has been really beneficial in fetching us leads and boosting our business. Their services are really commendable.',
        author: 'Kreative Language Hub',
        designation: 'Languages',
        cardImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80'
    },
    {
        id: 't2',
        quote: 'Shampari has helped us reach more people interested in film making. Applicants get to compare and choose the best workshops.',
        author: 'Goldenagefilmhouse',
        designation: 'Film Making',
        cardImage: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80'
    },
    {
        id: 't3',
        quote: 'A great platform with user-friendly interface, customer friendly executives & reasonable pricing plans for coaching classes.',
        author: 'Success Sutras',
        designation: 'IELTS Coaching',
        cardImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80'
    },
    {
        id: 't4',
        quote: 'Excellent enquiries from Shampari Edutech. Getting students from different universities & multinational companies worldwide.',
        author: 'VG Reddy',
        designation: 'VBA Trainer',
        cardImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80'
    },
];

function Testimonials({ testimonials = defaultTestimonials }) {
    const navigate = useNavigate();

    return (
        <div className="relative w-full py-24 sm:py-32 overflow-hidden" style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
        }}>
            {/* Decorative */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)' }} />
            <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-5 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }} />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <span className="badge badge-info text-sm mb-4 inline-block">Success Stories</span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        What Our <span className="text-gradient">Partners Say</span>
                    </h2>
                    <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
                        Trusted by educators and institutions across India.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative rounded-2xl overflow-hidden flex flex-col"
                            style={{ border: "1px solid rgba(255,255,255,0.07)", minHeight: 320 }}
                        >
                            {/* Card Image */}
                            <div className="relative h-40 overflow-hidden flex-shrink-0">
                                <img
                                    src={testimonial.cardImage}
                                    alt={testimonial.author}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.src = "/bgimage.jpg";
                                    }}
                                />
                                <div className="absolute inset-0"
                                    style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.8) 100%)" }} />
                                {/* Quote icon */}
                                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ background: "rgba(6,182,212,0.2)", border: "1px solid rgba(6,182,212,0.3)" }}>
                                    <FaQuoteLeft className="text-cyan-400 text-xs" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col p-5"
                                style={{ background: "rgba(255,255,255,0.03)" }}>
                                <p className="text-white/60 text-sm leading-relaxed flex-1 mb-4">
                                    "{testimonial.quote}"
                                </p>
                                <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                    <p className="font-bold text-white text-sm">{testimonial.author}</p>
                                    <p className="text-xs mt-0.5" style={{ color: "#22d3ee" }}>{testimonial.designation}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16"
                >
                    <button
                        onClick={() => navigate("/feedback")}
                        className="btn-premium text-base !py-3.5 !px-10 !rounded-xl"
                    >
                        Read All Reviews
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

export default Testimonials;
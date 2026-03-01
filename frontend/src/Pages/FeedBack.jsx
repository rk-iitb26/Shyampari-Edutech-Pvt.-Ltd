import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const successData = [
    { id: 1, name: 'Rohan Sharma', quote: 'The personalized guidance made all the difference!', cardBackgroundImage: '/img1.jpg' },
    { id: 2, name: 'Priya Singh', quote: 'My child\'s grades and confidence have soared!', cardBackgroundImage: '/img2.jpg' },
    { id: 3, name: 'Amit Verma', quote: 'User-friendly interface and reasonable pricing plans!', cardBackgroundImage: '/img3.jpg' },
    { id: 4, name: 'Sneha Gupta', quote: 'Excellent enquiries from Shampari Edutech. Highly recommended!', cardBackgroundImage: '/img4.jpg' },
    { id: 5, name: 'Vivek Kumar', quote: 'Shampari Edutech transformed my understanding of complex subjects.', cardBackgroundImage: '/img5.jpg' },
    { id: 6, name: 'Anjali Desai', quote: 'Finding the right tutor was incredibly easy and efficient.', cardBackgroundImage: '/img6.jpg' },
    { id: 7, name: 'Manish Patel', quote: 'This platform genuinely cares about student success.', cardBackgroundImage: '/img7.jpg' },
    { id: 8, name: 'Kavita Rao', quote: 'The tutors are highly qualified and very supportive.', cardBackgroundImage: '/img8.jpg' },
    { id: 9, name: 'Deepak Sharma', quote: 'I never thought learning could be this engaging.', cardBackgroundImage: '/img9.jpg' },
    { id: 10, name: 'Lakshmi Nair', quote: 'A truly fantastic experience from start to finish.', cardBackgroundImage: '/img10.jpg' },
    { id: 11, name: 'Ravi Kumar', quote: 'Flexible schedules are a real blessing for busy students.', cardBackgroundImage: '/img11.jpg' },
    { id: 12, name: 'Divya Sharma', quote: 'The best investment I made for my academic future.', cardBackgroundImage: '/img12.jpg' },
    { id: 13, name: 'Sanjay Gupta', quote: 'Helped me achieve top scores in my exams!', cardBackgroundImage: '/img13.jpg' },
    { id: 14, name: 'Meena Reddy', quote: 'The tutors are passionate and make learning fun.', cardBackgroundImage: '/img14.jpg' },
    { id: 15, name: 'Vikram Singh', quote: 'I appreciate the deep knowledge and patience of the tutors.', cardBackgroundImage: '/img15.jpg' },
    { id: 16, name: 'Swati Agarwal', quote: 'A very encouraging and supportive learning environment.', cardBackgroundImage: '/img16.jpg' },
    { id: 17, name: 'Ashish Malik', quote: 'The platform connected me with the perfect tutor.', cardBackgroundImage: '/img17.jpg' },
    { id: 18, name: 'Nisha Singh', quote: 'Highly professional and effective tutoring services.', cardBackgroundImage: '/img18.jpg' },
];

const SuccessGrid = ({ data = successData }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative overflow-hidden" style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
        }}>
            {/* Back button */}
            <div className="sticky top-0 z-30 px-6 py-4" style={{
                background: 'rgba(15,23,42,0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
                <button onClick={() => navigate("/")}
                    className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    ← Back to Home
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="badge badge-success text-sm mb-4 inline-block">All Reviews</span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Hear From Our <span className="text-gradient">Happy Learners</span>
                    </h2>
                    <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
                        Stories of transformation and success from our community.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(i * 0.05, 0.5), duration: 0.5 }}
                            className="relative overflow-hidden rounded-2xl h-72 group cursor-pointer"
                        >
                            {/* Background */}
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.cardBackgroundImage})` }} />

                            {/* Overlay */}
                            <div className="absolute inset-0 transition-all duration-500" style={{
                                background: 'linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.8) 50%, rgba(15,23,42,0.95) 100%)'
                            }} />

                            {/* Top glow */}
                            <div className="absolute top-0 left-0 right-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)' }} />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col justify-end h-full p-6">
                                <div className="text-2xl text-indigo-400/20 font-serif mb-1">"</div>
                                <p className="text-white/75 text-sm leading-relaxed mb-4">{item.quote}</p>
                                <div className="divider-gradient mb-3" />
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                                        {item.name?.charAt(0) || "?"}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">{item.name}</p>
                                        <p className="text-xs text-indigo-300/40">{item.designation || 'Learner / Partner'}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessGrid;

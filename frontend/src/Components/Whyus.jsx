import React from 'react';
import { motion } from "framer-motion";
import { FaHome, FaChalkboardTeacher, FaBullseye, FaUsers } from "react-icons/fa";

const whyUsFeatures = [
  {
    id: 'p1',
    icon: <FaHome className="w-7 h-7" />,
    color: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249,115,22,0.25)',
    title: 'Personalized One-on-One at Home',
    description: 'Customized lesson plans tailored to each student\'s learning style, pace, and specific needs. One-on-one sessions help the child gain concepts in a personalized way.',
  },
  {
    id: 'p2',
    icon: <FaChalkboardTeacher className="w-7 h-7" />,
    color: 'from-blue-500 to-indigo-500',
    glowColor: 'rgba(59,130,246,0.25)',
    title: 'Qualified Educators & Coordinator Support',
    description: 'Experienced educators dedicated to making learning enjoyable. A coordinator oversees daily punctuality and class progression on behalf of the institute.',
  },
  {
    id: 'p3',
    icon: <FaBullseye className="w-7 h-7" />,
    color: 'from-violet-500 to-purple-500',
    glowColor: 'rgba(139,92,246,0.25)',
    title: 'Counselling & Career Guidance',
    description: 'Regular counselling sessions to track improvement and understand the child\'s mindset. Expert career guidance to help children excel in their chosen field.',
  },
  {
    id: 'p4',
    icon: <FaUsers className="w-7 h-7" />,
    color: 'from-cyan-500 to-teal-500',
    glowColor: 'rgba(6,182,212,0.25)',
    title: 'Group Tuition (3–5 Students)',
    description: 'Group tuitions where 3–5 students study together with one teacher. Reasonable fees, high-quality education, and flexible timings at your home.',
  },
];

function WhyUs() {
  return (
    <div id="event" className="relative w-full py-24 sm:py-32 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0f172a 0%, #111827 50%, #0f172a 100%)'
    }}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
      <div className="absolute top-20 right-20 w-60 h-60 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="badge badge-warning text-sm mb-4 inline-block">Why Choose Us</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why <span className="text-gradient">Shampari Edutech</span>?
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
            What sets us apart from the rest — quality, care, and commitment.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsFeatures.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="premium-card group text-center relative"
            >
              {/* Icon */}
              <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                style={{ boxShadow: `0 8px 25px ${feature.glowColor}` }}>
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-3 leading-tight">{feature.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
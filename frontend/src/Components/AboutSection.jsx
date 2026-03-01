import React from 'react';
import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
    color: "from-indigo-500 to-purple-500",
    glowColor: "rgba(99,102,241,0.3)",
    title: "Create Free Profile",
    description: "Upload Photos, Portfolio, Certificates. Add Description, Qualifications, and Achievements to help Students Discover You.",
    step: "01"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H2z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
      </svg>
    ),
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6,182,212,0.3)",
    title: "Teach Students Online",
    description: "Use world-class tools for FREE to teach Students across India and globally. Get training & marketing support.",
    step: "02"
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    ),
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245,158,11,0.3)",
    title: "Earn a Steady Income",
    description: "Earn handsomely based on the number of Students you teach. Top Tutors earn ₹40,000 to ₹1,50,000 per month.",
    step: "03"
  },
];

function HowItWorks() {
  return (
    <div id="about" className="relative w-full py-24 sm:py-32 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
    }}>
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' }} />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="badge badge-primary text-sm mb-4 inline-block">How It Works</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            How <span className="text-gradient">Shampari Edutech</span> Works
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
            Get started in three simple steps and transform your teaching career.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="premium-card group text-center relative"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.03] select-none">
                {feature.step}
              </div>

              {/* Icon */}
              <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                style={{ boxShadow: `0 8px 25px ${feature.glowColor}` }}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-2xl sm:text-3xl font-bold text-white/80">
            Tutors <span className="text-gradient">love</span> Shampari Edutech
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default HowItWorks;
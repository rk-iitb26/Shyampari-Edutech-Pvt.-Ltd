// src/Components/WhyUs.jsx
import React from 'react';

// Define default features data for demonstration/fallback
const defaultWhyUsFeatures = [
  {
    id: 'p1',
    iconSvgPath: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1.5-5.5h3v2h-3v-2z"></path>`, // Placeholder for user icon
    iconColor: 'text-orange-500', // Example color
    title: 'Personalized Approached one on one at home',
    description: 'Personalized Approach: We understand that every student is unique. Our tutors craft customized lesson plans to cater to each student\'s learning style, pace, and specific needs. One on one helps the child in gaining concepts of previous class and present class going in schools in personalized way',
  },
  {
    id: 'p2',
    iconSvgPath: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"></path>`, // Placeholder for qualified icon
    iconColor: 'text-blue-500',
    title: 'Qualified educators and coordinator support',
    description: 'Qualified Educators: Our team comprises experienced and passionate educators who are dedicated to making learning enjoyable and Impactful. Coordinator support: a coordinator is appointed on institute behalf to look after the daily punctuality and progression of class .',
  },
  {
    id: 'p3',
    iconSvgPath: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"></path>`, // Placeholder for counselling icon
    iconColor: 'text-purple-500',
    title: 'Counselling session & career guidance',
    description: 'counselling is given to child time to time along with daily session to track improvement and understand the child mindset. career guidance from our expert team of teachers is been given to child to make child exceed in respective field line.',
  },
  {
    id: 'p4',
    iconSvgPath: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"></path>`, // Placeholder for group tuition icon
    iconColor: 'text-teal-500',
    title: 'Group tuition batch 3/5 students',
    description: 'we have introduced group tuitions where 3 students one teacher or 5 students one teacher of same/different class can study together with reasonable fee and high Quality education at your home .flexibility of timings and teacher as per parents need.',
  },
];

function WhyUs({ features = defaultWhyUsFeatures }) {
  return (
    <div className="w-full bg-gray-100 py-16 sm:py-24 text-gray-900"> {/* Light background matching the screenshot */}
      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16">
        Why Shampari Edutech?
      </h2>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div key={feature.id} className="bg-white rounded-lg p-6 flex flex-col items-center text-center">
            {/* Icon */}
            <div className={`w-20 h-20 flex items-center justify-center mb-6`}>
              {/* Replace with your actual SVG icons. Use dangerouslySetInnerHTML with caution. */}
              {/* Better approach: import actual SVG components or use <img> for SVG files */}
              <svg className={`w-full h-full ${feature.iconColor}`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                   dangerouslySetInnerHTML={{ __html: feature.iconSvgPath }}></svg>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">{feature.title}</h3>

            {/* Description */}
            <p className="text-base text-gray-700 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyUs;
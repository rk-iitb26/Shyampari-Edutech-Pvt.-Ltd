// src/Components/Testimonials.jsx
import React, { useState } from 'react'; // Import useState hook

// Define default testimonial data for demonstration/fallback
const defaultTestimonials = [
  {
    id: 't1',
    quote: 'Shampari Edutech has been really beneficial in fetching us leads and boosting our business. Shampari Services are really commendable. We are happy to be a part of Shampari\'s family.',
    author: 'Kreative Language Hub',
    designation: 'Languages',
    image: '/avatars/kreative-language-hub.png'
  },
  {
    id: 't2',
    quote: 'Shampari Edutech has helped us in reaching out to more people interested in film making. Applicants get to know about different film making workshops, compare and choose the best.',
    author: 'Goldenagefilmhouse',
    designation: 'Film making',
    image: '/avatars/goldenagefilmhouse.png'
  },
  {
    id: 't3',
    quote: 'Shampari Edutech is a great platform with its user-friendly interface, customer friendly executives & reasonable pricing plans, which help us in growing our coaching classes.',
    author: 'Success Sutras',
    designation: 'IELTS',
    image: '/avatars/success-sutras.png'
  },
  {
    id: 't4',
    quote: 'Wonderful website. Excellent enquiries from Shampari Edutech. I am getting Students from Different universities outside India, and different Multinational companies.',
    author: 'VG Reddy',
    designation: 'VBA Trainer',
    image: '/avatars/vg-reddy.png'
  },
  // Add more testimonials here if you want to test navigation beyond 4
  {
    id: 't5',
    quote: 'Shampari Edutech transformed my understanding of complex subjects. The personalized guidance made all the difference!',
    author: 'Priya Sharma',
    designation: 'Student',
    image: '/avatars/student1.png' // Make sure you have this image
  },
  {
    id: 't6',
    quote: 'As a parent, I am incredibly impressed with the dedication of Shampari Edutech tutors. My child\'s grades and confidence have soared!',
    author: 'Rajesh Kumar',
    designation: 'Parent',
    image: '/avatars/parent1.png' // Make sure you have this image
  }
];

function Testimonials({ testimonials = defaultTestimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track current testimonial index

  // Function to go to the next testimonial
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % testimonials.length
    );
  };

  // Function to go to the previous testimonial
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // Get the testimonials to display (only 4 at a time for the grid layout)
  // This logic ensures a continuous loop even if testimonials.length is not a multiple of 4
  const displayedTestimonials = [];
  for (let i = 0; i < 4; i++) {
    displayedTestimonials.push(testimonials[(currentIndex + i) % testimonials.length]);
  }

  return (
    <div className="w-full bg-gray-100 py-16 sm:py-24 text-gray-900 relative">


      {/* Title */}
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16">
        What Our Students & Parents Say
      </h2>

      {/* Testimonials Grid Container with Navigation Arrows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 z-20 hidden md:block" // Hidden on small screens
          aria-label="Previous testimonial"
        >
          <i className="fas fa-chevron-left text-xl"></i>
        </button>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              {/* Quote */}
              <p className="text-base mb-4 flex-grow">
                {testimonial.quote}
              </p>

              {/* Author Info */}
              <div className="flex items-center mt-4">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-lg">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 z-20 hidden md:block" // Hidden on small screens
          aria-label="Next testimonial"
        >
          <i className="fas fa-chevron-right text-xl"></i>
        </button>
      </div>
    </div>
  );
}

export default Testimonials;
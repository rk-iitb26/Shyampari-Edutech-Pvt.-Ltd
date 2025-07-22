// src/Components/HowItWorks.jsx
import React from 'react';

// You'll need SVG icons or images for these.
// For now, I'll use placeholders or simple text.
// If you have actual SVG files, you can import them or use them directly.
// Example: import { UserPlusIcon, LaptopIcon, DollarIcon } from '@heroicons/react/24/outline';
// Or if you have them as image files in your public folder:
// const UserProfileIcon = '/icons/user-profile.svg';
// const LaptopTeachingIcon = '/icons/laptop-teaching.svg';
// const MoneyIcon = '/icons/money.svg';


function HowItWorks() {
  return (
    <div className="w-full bg-gray-900 py-16 sm:py-24 text-white">
      {/* Centered Title for the section */}
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16">How Shampari Edutech Works</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Left Column: The three feature blocks */}
        <div className="w-full md:w-1/2 space-y-10 sm:space-y-12">
          {/* Feature 1: Create Free Profile */}
          <div className="flex items-start text-left">
            {/* Icon Placeholder */}
            <div className="flex-shrink-0 mr-4">
              {/* Replace with your actual SVG icon or image */}
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white">Create Free Profile</h3>
              <p className="text-base sm:text-lg text-gray-300">
                Upload Photos, Portfolio, Certificates, Add Description, Qualifications, Achievements to help Students Discover You.
              </p>
            </div>
          </div>

          {/* Feature 2: Teach Students Online */}
          <div className="flex items-start text-left">
            {/* Icon Placeholder */}
            <div className="flex-shrink-0 mr-4">
              {/* Replace with your actual SVG icon or image */}
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H2z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
              </div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white">Teach Students Online</h3>
              <p className="text-base sm:text-lg text-gray-300">
                Use world class tools for FREE to teach Students across India and globally. Get Training support and Marketing support to get steady stream of Students to teach.
              </p>
            </div>
          </div>

          {/* Feature 3: Earn a steady income */}
          <div className="flex items-start text-left">
            {/* Icon Placeholder */}
            <div className="flex-shrink-0 mr-4">
              {/* Replace with your actual SVG icon or image */}
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path></svg>
              </div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white">Earn a steady income</h3>
              <p className="text-base sm:text-lg text-gray-300">
                Earn handsomely based on the number of Students you teach. Top Tutor Partners earn ₹ 40,000 to ₹ 1,50,000 per month.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Empty, or can place a related image/illustration here if desired */}
        <div className="hidden md:block w-full md:w-1/2">
          {/* You can optionally add an image or other content for the right column here */}
          {/* For example, a stylized image related to education or growth */}
        </div>
      </div>
       {/* "Tutors love Shampari Edutech" at the bottom */}
       <h3 className="text-2xl sm:text-3xl font-bold text-center mt-16 sm:mt-24">Tutors love Shampari Edutech</h3>
    </div>
  );
}

export default HowItWorks;
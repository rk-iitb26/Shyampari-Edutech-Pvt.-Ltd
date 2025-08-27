// src/pages/AboutPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Teacher } from '../../types';
import { Link } from 'react-router-dom';
import { Info, BarChart2, BookOpen, Users, MessageSquare, Menu, X, Home, Building } from 'lucide-react';
import ProfileModal from '../common/ProfileModal';

const AboutPage: React.FC = () => {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'Messages', icon: MessageSquare, path: '/messages' },
    { name: 'Organization', icon: Building, path: '/organization' },
    { name: 'AboutPage', icon: Info, path: '/about' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Teacher Portal</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    item.name === 'AboutPage' 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Teacher Info (Profile Button) */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 text-left hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {teacher.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
              <p className="text-xs text-gray-500">Teacher ID: {teacher.teacherId}</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">View Profile</p>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">About EduConnect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Teacher ID: {teacher.teacherId}</span>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About EduConnect</h1>
        <p className="text-gray-600">Your dedicated platform for seamless teaching & learning</p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Platform Introduction */}
        <div className="text-center mb-8">
        <div className="w-40 h-40 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <a href="https://ik.imagekit.io/siddhardha/Shyampari.edu/logo.jpg?updatedAt=1752418460348">
                    <img src="https://ik.imagekit.io/siddhardha/Shyampari.edu/logo.jpg?updatedAt=1752418460348" alt="logo" className="w-40 h-40 rounded-full" />
                  </a>
                </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Empowering Educators with EduConnect
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Welcome to EduConnect, the all-in-one platform designed to streamline your teaching workflow and enhance student engagement. We understand the unique challenges and rewards of education, and our mission is to provide you with intuitive tools that support your dedication to fostering academic growth. Manage classes, track progress, assign tasks, and communicate effortlessly, all from one central hub.
          </p>
        </div>

        {/* Core Value Proposition */}
        <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Info className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-900">
              "Your teaching, simplified. Your impact, amplified."
            </h3>
          </div>
          <p className="text-lg text-gray-700 font-medium">
            Focus on what you do best: inspire and educate. We'll handle the rest.
          </p>
        </div>

        {/* Key Features for Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Class Management */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Class & Student Management</h3>
            </div>
            <p className="text-gray-700">
              Effortlessly organize your classes, manage student rosters, and view individual student profiles to understand their needs better.
            </p>
          </div>

          {/* Performance Tracking */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-500 rounded-lg">
                <BarChart2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Comprehensive Performance Tracking</h3>
            </div>
            <p className="text-gray-700">
              Monitor student progress with detailed performance metrics, assignment statuses, and test results to provide targeted support.
            </p>
          </div>

          {/* Resource Sharing */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-500 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Assignment & Resource Sharing</h3>
            </div>
            <p className="text-gray-700">
              Create, assign, and track homework, projects, and tests with ease. Share course materials and educational resources directly through the platform.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How EduConnect Supports You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enhanced Communication */}
            <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
              <div className="flex flex-col items-center mb-4">
                <div className="p-3 bg-pink-400 rounded-lg mb-3">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">Enhanced Communication Channels</h3>
              </div>
              <p className="text-gray-700 text-center">
                Communicate seamlessly with students, parents, and fellow educators through integrated messaging tools. Foster a collaborative environment for better learning outcomes.
              </p>
            </div>

            {/* Time Saving */}
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
              <div className="flex flex-col items-center mb-4">
                <div className="p-3 bg-teal-400 rounded-lg mb-3">
                  <BarChart2 className="w-8 h-8 text-white" /> {/* Re-using icon for 'Efficiency' */}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">Boost Your Efficiency</h3>
              </div>
              <p className="text-gray-700 text-center">
                Automate routine tasks, organize your schedule, and access all necessary information in one place, saving you valuable time and effort.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Vision for Educators</h3>
          <p className="text-gray-700 text-center leading-relaxed">
            Our vision is to be the leading educational platform that **simplifies teaching**, **maximizes learning potential**, and **builds stronger educational communities**. We are continuously evolving EduConnect to meet your needs and provide an unparalleled teaching experience.
          </p>
        </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={teacher} />
    </div>
  );
};

export default AboutPage;
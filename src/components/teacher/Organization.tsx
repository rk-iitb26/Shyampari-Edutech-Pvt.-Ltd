// src/pages/OrganizationPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Teacher } from '../../types';
import { 
  Building, MapPin, Phone, 
  Menu, X, Home, Users, BookOpen, MessageSquare, Info 
} from 'lucide-react';
import ProfileModal from '../common/ProfileModal';

const OrganizationPage: React.FC = () => {
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
                    item.name === 'Organization' 
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
              <h1 className="text-lg font-semibold text-gray-900">Organization</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Teacher ID: {teacher.teacherId}</span>
            </div>
          </div>
        </div>

        {/* Organization Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Building className="w-8 h-8 mr-3 text-teal-600" />
              Organization Details
            </h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">EduConnect Academy</h2>
              <p className="text-lg text-gray-700 mb-6">
                Dedicated to fostering a vibrant learning environment and empowering educators.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-teal-500" />
                    Address
                  </h3>
                  <p className="text-gray-600">123 Learning Lane</p>
                  <p className="text-gray-600">Knowledge City, KC 12345</p>
                  <p className="text-gray-600">India</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    <Phone className="w-6 h-6 mr-2 text-teal-500" />
                    Contact
                  </h3>
                  <p className="text-gray-600">Phone: +91 123 456 7890</p>
                  <p className="text-gray-600">Email: info@educonnect.com</p>
                  <p className="text-gray-600">Support: support@educonnect.com</p>
                </div>
              </div>

              <div className="mt-8 border-t pt-8 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  EduConnect Academy is committed to delivering high-quality education through innovative teaching methods and a supportive community. We believe in nurturing critical thinking, creativity, and a lifelong love for learning in all our students. Our goal is to bridge the gap between traditional learning and modern digital tools, making education accessible and engaging for everyone.
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

export default OrganizationPage;
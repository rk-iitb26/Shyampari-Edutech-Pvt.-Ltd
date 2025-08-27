// src/pages/CoursesPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Teacher } from '../../types';
import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Edit, Eye, Menu, X, Home, Users, Building, Info, MessageSquare } from 'lucide-react';
import ProfileModal from '../common/ProfileModal';

// Mock data - replace with actual data when available
const mockCourses: any[] = [];

const CoursesPage: React.FC = () => {
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
                    item.name === 'Courses' 
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
              <h1 className="text-lg font-semibold text-gray-900">My Courses</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Teacher ID: {teacher.teacherId}</span>
            </div>
          </div>
        </div>

        {/* Courses Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <BookOpen className="w-8 h-8 mr-3 text-green-600" />
        My Courses
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Course List</h2>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <PlusCircle className="w-5 h-5 mr-2" />
            Create New Course
          </button>
        </div>

        {mockCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <div key={course.id} className="bg-gray-50 p-6 rounded-lg shadow hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>Students Enrolled: {course.studentsEnrolled}</span>
                  <span>Units: {course.units}</span>
                </div>
                <div className="flex space-x-2 mt-4 border-t pt-4 border-gray-200">
                  <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-1" /> View
                  </button>
                  <button className="flex-1 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No courses created yet.</p>
          </div>
        )}
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

export default CoursesPage;
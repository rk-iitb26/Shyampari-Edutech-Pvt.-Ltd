// src/pages/MessagesPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Teacher } from '../../types';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, Menu, X, Home, Users, Briefcase, Building, Info, BookOpen } from 'lucide-react';
import ProfileModal from '../common/ProfileModal';

// Mock data - replace with actual data when available
const mockMessages: any[] = [];

const MessagesPage: React.FC = () => {
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
                    item.name === 'Messages' 
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
              <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Teacher ID: {teacher.teacherId}</span>
            </div>
          </div>
        </div>

        {/* Messages Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <MessageSquare className="w-8 h-8 mr-3 text-purple-600" />
        Messages
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Conversations</h2>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            <MessageSquare className="w-5 h-5 mr-2" />
            New Message
          </button>
        </div>

        {mockMessages.length > 0 ? (
          <div className="space-y-4">
            {mockMessages.map((msg) => (
              <div key={msg.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-gray-900">From: {msg.sender}</span>
                  <span className="text-sm text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-gray-700 mb-2">{msg.subject}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{msg.content}</p>
                <div className="mt-2 text-right">
                  <button className="text-blue-600 hover:underline text-sm">View Thread</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No recent messages.</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Send New Message</h3>
          <input
            type="text"
            placeholder="Recipient (e.g., student name, class ID)"
            className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Your message..."
            rows={4}
            className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <button className="flex items-center justify-center px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </button>
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

export default MessagesPage;
import React, { useState } from 'react';
import { mockAssignments } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { Link } from 'react-router-dom';
import ChatbotWidget from '../common/ChatbotWidget';
import ProfileModal from '../common/ProfileModal';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Star,
  Filter,
  Menu,
  X,
  Home,
  HelpCircle,
  BookOpen,
  User,
  TrendingUp
} from 'lucide-react';

const AssignmentsPage: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', icon: Home, path: '/student-dashboard' },
    { name: 'Assignments', icon: FileText, path: '/assignments' },
    { name: 'Attendance', icon: TrendingUp, path: '/attendance' },
    { name: 'Doubts', icon: HelpCircle, path: '/doubts' },
    { name: 'Tutor Section', icon: User, path: '/tutor' },
    { name: 'About Us', icon: BookOpen, path: '/aboutus' },
  ];

  const filteredAssignments = mockAssignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const handleFileUpload = (assignmentId: string, file: File) => {
    setSelectedFile(file);
    // In a real app, this would upload the file to the server
    console.log(`Uploading file ${file.name} for assignment ${assignmentId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Student Portal</h2>
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
                    item.name === 'Assignments' 
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

        {/* Student Info (Profile Button) */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 text-left hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {student.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{student.name}</p>
              <p className="text-xs text-gray-500">{student.class} - {student.section}</p>
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
              <h1 className="text-lg font-semibold text-gray-900">Assignments</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Roll No: {student.rollNo}</span>
            </div>
          </div>
        </div>

        {/* Assignments Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Assignments</option>
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="graded">Graded</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredAssignments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
                  <p className="text-gray-500">
                    {filter === 'all' 
                      ? "You don't have any assignments yet." 
                      : `No ${filter} assignments found.`}
                  </p>
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
      <ChatbotWidget />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={student} />
    </div>
  );
};

export default AssignmentsPage;
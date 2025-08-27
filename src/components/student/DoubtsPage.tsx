import React, { useState } from 'react';
import { mockDoubts } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { Link } from 'react-router-dom';
import ProfileModal from '../common/ProfileModal';
import ChatbotWidget from '../common/ChatbotWidget';
import { 
  HelpCircle, 
  Plus, 
  BookOpen,
  CheckCircle2,
  Menu,
  X,
  Home,
  FileText,
  TrendingUp,
  User
} from 'lucide-react';

const DoubtsPage: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewDoubtForm, setShowNewDoubtForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [newDoubt, setNewDoubt] = useState({
    question: '',
    subject: 'Mathematics'
  });

  const navigationItems = [
    { name: 'Home', icon: Home, path: '/student-dashboard' },
    { name: 'Assignments', icon: FileText, path: '/assignments' },
    { name: 'Attendance', icon: TrendingUp, path: '/attendance' },
    { name: 'Doubts', icon: HelpCircle, path: '/doubts' },
    { name: 'Tutor Section', icon: User, path: '/tutor' },
    { name: 'About Us', icon: BookOpen, path: '/aboutus' },
  ];

  const handleSubmitDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the server
    console.log('Submitting doubt:', newDoubt);
    setNewDoubt({ question: '', subject: 'Mathematics' });
    setShowNewDoubtForm(false);
    setShowSuccessMessage(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const subjects = ['Mathematics', 'Science', 'English', 'History'];

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
                    item.name === 'Doubts' 
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
              <h1 className="text-lg font-semibold text-gray-900">Doubts & Questions</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Roll No: {student.rollNo}</span>
            </div>
          </div>
        </div>

        {/* Doubts Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Doubts & Questions</h1>
              <button 
                onClick={() => setShowNewDoubtForm(true)}
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ask a Question
              </button>
            </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Doubt Submitted Successfully!</h3>
              <p className="text-sm text-green-700 mt-1">
                Your doubt will be resolved by our experts soon. You'll receive a notification when an answer is available.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* New Doubt Form */}
      {showNewDoubtForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ask a New Question</h2>
          <form onSubmit={handleSubmitDoubt} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                id="subject"
                value={newDoubt.subject}
                onChange={(e) => setNewDoubt({ ...newDoubt, subject: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                Your Question
              </label>
              <textarea
                id="question"
                value={newDoubt.question}
                onChange={(e) => setNewDoubt({ ...newDoubt, question: e.target.value })}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Describe your question in detail..."
                required
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Submit Question
              </button>
              <button
                type="button"
                onClick={() => setShowNewDoubtForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Doubts List */}
      <div className="space-y-4">
        {mockDoubts.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
            <p className="text-gray-500 mb-4">
              Ask your first question to get help from teachers and classmates.
            </p>
            <button 
              onClick={() => setShowNewDoubtForm(true)}
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ask a Question
            </button>
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

export default DoubtsPage;
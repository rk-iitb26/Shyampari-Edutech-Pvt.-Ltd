import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import { Link } from 'react-router-dom';
import ChatbotWidget from '../common/ChatbotWidget';
import ProfileModal from '../common/ProfileModal';
import { Home, Users, Award, BookOpen, UserCheck, Handshake, Briefcase, Users as GroupUsers, Menu, X, FileText, TrendingUp, HelpCircle, User } from 'lucide-react';

const Aboutus: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', icon: Home, path: '/student-dashboard' },
    { name: 'Assignments', icon: FileText, path: '/assignments' },
    { name: 'Attendance', icon: TrendingUp, path: '/attendance' },
    { name: 'Doubts', icon: HelpCircle, path: '/doubts' },
    { name: 'Tutor Section', icon: User, path: '/tutor' },
    { name: 'About Us', icon: BookOpen, path: '/aboutus' },
  ];

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
                    item.name === 'About Us' 
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
              <h1 className="text-lg font-semibold text-gray-900">About Us</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Roll No: {student.rollNo}</span>
            </div>
          </div>
        </div>

        {/* About Us Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">About Us</h1>
              <p className="text-gray-600">Discover our story and mission</p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* Company Introduction */}
              <div className="text-center mb-8">
                <div className="w-40 h-40 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <a href="https://ik.imagekit.io/siddhardha/Shyampari.edu/logo.jpg?updatedAt=1752418460348">
                    <img src="https://ik.imagekit.io/siddhardha/Shyampari.edu/logo.jpg?updatedAt=1752418460348" alt="logo" className="w-40 h-40 rounded-full" />
                  </a>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to Shyampari Edutech Pvt Ltd
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  Your trusted partner in providing exceptional home tutoring services. We believe in nurturing a love for learning and fostering academic excellence right in the comfort of your own home. Our team of dedicated educators is committed to tailoring educational experiences that inspire, empower, and guide students towards their full potential.
                </p>
              </div>

              {/* Tagline Section */}
              <div className="bg-gradient-to-r from-orange-100 to-purple-100 rounded-xl p-8 mb-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">
                    "Pune's No. 1 Home Tuition Provider"
                  </h3>
                </div>
                <p className="text-lg text-gray-700 font-medium">
                  Your learning, your space, our expertise
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Home Tutoring */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-orange-500 rounded-lg">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">Home Tutoring</h3>
                  </div>
                  <p className="text-gray-700">
                    Personalized learning experience in the comfort of your own home, ensuring maximum focus and convenience.
                  </p>
                </div>

                {/* Expert Educators */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-500 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">Expert Educators</h3>
                  </div>
                  <p className="text-gray-700">
                    Our team of dedicated and qualified educators is committed to your academic success and personal growth.
                  </p>
                </div>

                {/* Academic Excellence */}
                <div className="bg-gradient-to-br from-orange-50 to-purple-50 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">Academic Excellence</h3>
                  </div>
                  <p className="text-gray-700">
                    Tailored educational experiences that inspire, empower, and guide students towards their full potential.
                  </p>
                </div>
              </div>

              {/* Additional Offerings Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Distinct Advantages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personalized Approach */}
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <div className="flex flex-col items-center mb-4">
                      <div className="p-3 bg-pink-400 rounded-lg mb-3">
                        <UserCheck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 text-center">Personalized Approach & One-on-One at Home</h3>
                    </div>
                    <p className="text-gray-700 text-center">
                      We understand that every student is unique. Our tutors craft customized lesson plans to cater to each student's learning style, pace, and specific needs. This one-on-one attention helps children grasp concepts from previous and current classes in a personalized way.
                    </p>
                  </div>

                  {/* Qualified Educators & Coordinator Support */}
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex flex-col items-center mb-4">
                      <div className="p-3 bg-blue-400 rounded-lg mb-3">
                        <Handshake className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 text-center">Qualified Educators & Coordinator Support</h3>
                    </div>
                    <p className="text-gray-700 text-center">
                      Our team comprises experienced and passionate educators dedicated to making learning enjoyable and impactful. Additionally, an institute-appointed coordinator oversees daily punctuality and class progression, ensuring a seamless learning experience.
                    </p>
                  </div>

                  {/* Counselling Session & Career Guidance */}
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex flex-col items-center mb-4">
                      <div className="p-3 bg-blue-400 rounded-lg mb-3">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 text-center">Counselling Session & Career Guidance</h3>
                    </div>
                    <p className="text-gray-700 text-center">
                      Regular counseling sessions are provided to track improvement and understand the child's mindset. Our expert team of teachers also offers valuable career guidance, helping children excel in their chosen fields.
                    </p>
                  </div>

                  {/* Group Tuition */}
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                    <div className="flex flex-col items-center mb-4">
                      <div className="p-3 bg-pink-400 rounded-lg mb-3">
                        <GroupUsers className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 text-center">Group Tuition (3-5 Students)</h3>
                    </div>
                    <p className="text-gray-700 text-center">
                      We offer group tuitions where 3 to 5 students of the same or different classes can study together with one teacher. This provides reasonable fees and high-quality education at your home, with flexible timings and teacher selection as per parents' needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Mission</h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  To provide exceptional home tutoring services that nurture a love for learning and foster academic excellence.
                  We believe every student deserves personalized attention and guidance to reach their full potential in a comfortable,
                  familiar environment.
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
      <ChatbotWidget />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={student} />
    </div>
  );
};

export default Aboutus;
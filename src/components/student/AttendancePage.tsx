import React, { useState } from 'react';
import { mockAttendance } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import ChatbotWidget from '../common/ChatbotWidget';
import ProfileModal from '../common/ProfileModal';
import { Student } from '../../types';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  BarChart3,
  Menu,
  X,
  Home,
  FileText,
  HelpCircle,
  BookOpen,
  User
} from 'lucide-react';

const AttendancePage: React.FC = () => {
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

  // Calculate attendance for each subject
  const subjectAttendance = student.subjects.map(subject => {
    const subjectEntries = mockAttendance.filter(entry => entry.subject === subject);
    const presentCount = subjectEntries.filter(entry => entry.status === 'present').length;
    const totalCount = subjectEntries.length;
    const percentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
    
    return {
      subject,
      present: presentCount,
      total: totalCount,
      percentage,
      classAverage: 0 // No data available
    };
  });

  // Overall attendance
  const totalPresent = mockAttendance.filter(entry => entry.status === 'present').length;
  const totalEntries = mockAttendance.length;
  const overallPercentage = totalEntries > 0 ? Math.round((totalPresent / totalEntries) * 100) : 0;

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
                    item.name === 'Attendance' 
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
              <h1 className="text-lg font-semibold text-gray-900">Attendance</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Roll No: {student.rollNo}</span>
            </div>
          </div>
        </div>

        {/* Attendance Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Overall Attendance</div>
                  <div className="text-2xl font-bold text-gray-900">{overallPercentage}%</div>
                </div>
              </div>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{totalPresent}</div>
                    <div className="text-sm text-gray-500">Days Present</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{totalEntries - totalPresent}</div>
                    <div className="text-sm text-gray-500">Days Absent</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{totalEntries}</div>
                    <div className="text-sm text-gray-500">Total Days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject-wise Attendance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                  Subject-wise Attendance
                </h2>
              </div>
              <div className="p-6">
                {student.subjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subjectAttendance.map((subject) => (
                      <div key={subject.subject} className="p-6 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                          <span className="text-2xl font-bold text-gray-900">{subject.percentage}%</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Your Attendance</span>
                            <span className="font-medium">{subject.present}/{subject.total}</span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${subject.percentage}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Class Average: {subject.classAverage}%</span>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-600">No data</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects enrolled</h3>
                    <p className="text-gray-500">You haven't been enrolled in any subjects yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Attendance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  Recent Attendance
                </h2>
              </div>
              <div className="p-6">
                {mockAttendance.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Subject</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Marked By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockAttendance.slice().reverse().map((entry) => (
                          <tr key={entry.id} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-gray-900">
                              {new Date(entry.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </td>
                            <td className="py-3 px-4 text-gray-700">{entry.subject}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                entry.status === 'present' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {entry.status === 'present' ? (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <XCircle className="w-3 h-3 mr-1" />
                                )}
                                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-500">Teacher</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance records</h3>
                    <p className="text-gray-500">Your attendance records will appear here once teachers start marking attendance.</p>
                  </div>
                )}
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

export default AttendancePage;
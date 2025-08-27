import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockClasses, mockAssignments, mockTests } from '../../data/mockData';
import { Teacher } from '../../types';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Home,        // New icon for Home
  Info,        // New icon for About
  Building,    // New icon for Organization
  Briefcase,   // New icon for My Tutors (or another suitable icon)
  BookOpen,    // New icon for Courses (example additional feature)
  MessageSquare // New icon for Messages (example additional feature)
} from 'lucide-react';
import Sidebar from './SideBar';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const teacher = user as Teacher;

  const totalStudents = mockClasses.reduce((acc, cls) => acc + cls.students.length, 0);
  const activeAssignments = mockAssignments.filter(a => a.status === 'pending').length;
  const upcomingTests = mockTests.filter(t => t.status === 'scheduled').length;

  // Sidebar navigation items
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Courses', path: '/courses', icon: BookOpen }, 
    { name: 'Messages', path: '/messages', icon: MessageSquare }, 
    { name: 'Organization', path: '/organization', icon: Building },
    { name: 'AboutPage', path: '/about', icon: Info },
  ];

  return (
    <div className="flex"> {/* Flex container for sidebar and main content */}
      <Sidebar navItems={navItems} /> {/* Pass navItems to Sidebar */}
      <div className="flex-1 p-8 space-y-8 ml-64"> {/* Main content area with left margin for sidebar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {teacher.name}!</h1>
            <p className="text-gray-600 mt-1">Teacher ID: {teacher.teacherId}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Classes</div>
            <div className="text-lg font-semibold text-gray-900">{teacher.classes.length}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{totalStudents}</div>
                <div className="text-sm text-gray-500">Total Students</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{activeAssignments}</div>
                <div className="text-sm text-gray-500">Active Assignments</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{upcomingTests}</div>
                <div className="text-sm text-gray-500">Upcoming Tests</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">--</div>
                <div className="text-sm text-gray-500">Avg. Class Performance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Classes Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              My Classes
            </h2>
          </div>
          <div className="p-6">
            {teacher.classes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacher.classes.map((classId) => (
                  <div key={classId} className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{classId}</h3>
                      {/* You'd likely fetch student count for this specific class */}
                      <span className="text-sm text-gray-500">0 students</span> 
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Attendance Rate</span>
                        <span className="font-medium text-green-600">--%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg. Performance</span>
                        <span className="font-medium text-blue-600">--%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Pending Submissions</span>
                        <span className="font-medium text-orange-600">0</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {teacher.subjects.slice(0, 3).map((subject) => (
                          <span 
                            key={subject}
                            className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 border"
                          >
                            {subject}
                          </span>
                        ))}
                        {teacher.subjects.length > 3 && (
                          <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-500 border">
                            +{teacher.subjects.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No classes assigned</h3>
                <p className="text-gray-500">You haven't been assigned to any classes yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-600" />
                Recent Assignments
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No assignments created yet</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Upcoming Tests
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No tests scheduled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
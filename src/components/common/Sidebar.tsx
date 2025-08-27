import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Calendar, 
  HelpCircle, 
  Users, 
  User,
  ClipboardList,
  BarChart3
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const studentNavItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/subjects', label: 'Subjects', icon: BookOpen },
    { path: '/assignments', label: 'Assignments', icon: FileText },
    { path: '/tests', label: 'Tests', icon: Calendar },
    { path: '/attendance', label: 'Attendance', icon: ClipboardList },
    { path: '/doubts', label: 'Doubts', icon: HelpCircle },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const teacherNavItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/classes', label: 'Classes', icon: Users },
    { path: '/assignments', label: 'Assignments', icon: FileText },
    { path: '/tests', label: 'Tests', icon: Calendar },
    { path: '/attendance', label: 'Attendance', icon: ClipboardList },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const navItems = user?.role === 'student' ? studentNavItems : teacherNavItems;

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen">
      <nav className="mt-8">
        <div className="space-y-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-orange-700 border-r-2 border-orange-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
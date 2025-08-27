import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming you are using react-router-dom
import { LucideIcon } from 'lucide-react'; // Import LucideIcon type
import { useAuth } from '../../context/AuthContext';
import { Teacher } from '../../types';
import ProfileModal from '../common/ProfileModal';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon; // Use LucideIcon type for the icon component
}

interface SidebarProps {
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const location = useLocation();

  const { user } = useAuth();
  const teacher = user as Teacher;
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        EduConnect
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 
              ${location.pathname === item.path 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => setIsProfileOpen(true)}
        className="m-4 mt-0 mb-2 flex items-center p-3 rounded-md bg-gray-700 hover:bg-gray-600 text-left"
      >
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white text-sm font-medium">{teacher.name.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-white">{teacher.name}</p>
          <p className="text-xs text-gray-300">Teacher ID: {teacher.teacherId}</p>
        </div>
      </button>
      <div className="p-4 pt-0 border-t border-gray-700 text-sm text-gray-400">
        © {new Date().getFullYear()} EduConnect. All rights reserved.
      </div>
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={teacher} />
    </div>
  );
};

export default Sidebar;
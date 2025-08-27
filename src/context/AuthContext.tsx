import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Student, Teacher } from '../types';
import { mockCurrentUser, mockCurrentTeacher } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'student' | 'teacher') => Promise<void>;
  logout: () => void;
  switchRole: (role: 'student' | 'teacher') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, userType?: 'student' | 'teacher') => {
    // Mock login - in real app, this would authenticate with backend
    // For demo purposes, accept any email/password and use userType or email to determine role
    if (userType === 'student' || email.includes('student')) {
      setUser(mockCurrentUser);
    } else if (userType === 'teacher' || email.includes('teacher')) {
      setUser(mockCurrentTeacher);
    } else {
      // Default to student if no clear indication
      setUser(mockCurrentUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: 'student' | 'teacher') => {
    if (role === 'student') {
      setUser(mockCurrentUser);
    } else {
      setUser(mockCurrentTeacher);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
// import Layout from './components/common/Layout';
import LoginPage from './components/common/LoginPage';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import AssignmentsPage from './components/student/AssignmentsPage';
import AttendancePage from './components/student/AttendancePage';
import DoubtsPage from './components/student/DoubtsPage';
import TutorPage from './components/student/TutorPage';
import AboutUsPage from './components/student/AboutUsPage';
import SideBar from './components/teacher/SideBar';
import StudentsPage from './components/teacher/Students';
import CoursesPage from './components/teacher/Courses';
import ProfileModal from './components/common/ProfileModal';
import MessagesPage from './components/teacher/Messages';
import OrganizationPage from './components/teacher/Organization';
import AboutPage from './components/teacher/About';
import ChatbotWidget from './components/common/ChatbotWidget';
import CompleteProfile from './components/common/completeprofile';




// Auth-protected wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Decide dashboard by role
const DashboardRoute: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return user.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />;
};

const AppRoutes: React.FC = () => (
  <Routes>
    {/* Public Route */}
    <Route path="/login" element={<LoginPage />} />

    {/* Student Routes */}
    <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
    <Route path="/assignments" element={<ProtectedRoute><AssignmentsPage /></ProtectedRoute>} />
    <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
    <Route path="/doubts" element={<ProtectedRoute><DoubtsPage /></ProtectedRoute>} />
    <Route path="/tutor" element={<ProtectedRoute><TutorPage /></ProtectedRoute>} />
    <Route path="/aboutus" element={<ProtectedRoute><AboutUsPage /></ProtectedRoute>} />
    <Route path="/sidebar" element={<ProtectedRoute><SideBar navItems={[]} /></ProtectedRoute>} />
    <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
    <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
    <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
    <Route path="/organization" element={<ProtectedRoute><OrganizationPage /></ProtectedRoute>} />
    <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><ProfileModal /></ProtectedRoute>} />
    <Route path="/chatbot" element={<ChatbotWidget />} />
    <Route path="/completeprofile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />

    {/* Teacher Routes */}
    <Route path="/teacher-dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />

    {/* Legacy Dashboard Route */}
    <Route path="/dashboard" element={<ProtectedRoute><DashboardRoute /></ProtectedRoute>} />

    {/* Default and Fallback Routes - redirect to login */}
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App; 
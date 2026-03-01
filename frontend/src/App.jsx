import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import SignUpPage from "./Pages/SignUp";
import LoginPage from "./Pages/Login";
import SuccessGrid from "./Pages/FeedBack";
import FacultyDashboard from "./Pages/FacultyDashboard";
import StudentsDashboard from "./Pages/StudentsDashboard";
import Chatbot from "./Pages/Chatbot";
import { MessageProvider } from "./context/MessageContext";

const ProtectedRoute = ({ element, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <LoginPage />;
  if (role && user.role !== role) return <LoginPage />;
  return element;
};

function App() {
  return (
    <Router>
      <MessageProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/feedbacks" element={<SuccessGrid />} />
          <Route
            path="/facultydashboard"
            element={<ProtectedRoute element={<FacultyDashboard />} role="faculty" />}
          />
          <Route
            path="/studentsdashboard"
            element={<ProtectedRoute element={<StudentsDashboard />} role="student" />}
          />
        </Routes>
        <Chatbot />
      </MessageProvider>
    </Router>
  );
}

export default App;

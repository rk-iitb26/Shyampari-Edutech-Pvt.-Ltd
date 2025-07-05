import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './Pages/Main';
import SignupPage from './Pages/Signup';
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <ProtectedRoute> */}
                 <Route path="/dashboard" element={<Dashboard/>} />
        {/* </ProtectedRoute> */}
        
      </Routes>
    </Router>
  );
}

export default App;

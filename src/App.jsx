import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './Pages/Main';
import SignupPage from './Pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;

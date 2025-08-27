import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignup) {
        // Handle signup
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            firstName,
            lastName,
            role: userType
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // Show success message and switch to login
        setError('');
        setIsSignup(false);
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setUsername('');
        alert('Registration successful! Please sign in.');
        return;
      } else {
        // Handle login
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            // FIX: The backend expects 'role', but the frontend was sending 'userType'.
            // This has been corrected below.
            role: userType
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Call the login function from AuthContext
        await login(email, password, userType);

        // Redirect based on user type
        if (userType === 'student') {
          navigate('/student-dashboard');
        } else {
          navigate('/teacher-dashboard');
        }
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Operation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
    if (isSignup) {
      // Switching to login, clear signup fields
      setFirstName('');
      setLastName('');
      setUsername('');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: 'url(https://ik.imagekit.io/siddhardha/Shyampari.edu/login.bg.png?updatedAt=1752418460870)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Login Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md opacity-1200 rounded-2xl p-20 bg-white bg-opacity-0 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-40 h-40 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <a href="https://ik.imagekit.io/siddhardha/Shyampari.edu/logo.jpg?updatedAt=1752418460348">
                <img src="https://ik.imagekit.io/siddhardha/Shyampari.edu/logo.jpg?updatedAt=1752418460348" alt="logo" className="w-40 h-40 rounded-full" />
              </a>
            </div>
            <h1 className="text-3xl font-bold text-gray-1200 mb-2">EduFlow</h1>
            <p className="font-bold text-gray-1000">Modern Learning Management System</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  userType === 'student'
                    ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
                    : 'bg-pink-100 text-pink-700 hover:bg-pink-200 border-2 border-pink-300'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('teacher')}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  userType === 'teacher'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-300'
                }`}
              >
                Teacher
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Signup fields - only show when in signup mode */}
            {isSignup && (
              <>
                <div>
                  <label htmlFor="username" className="block text-lg font-bold text-gray-1200 mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your username"
                      required={isSignup}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-lg font-bold text-gray-1200 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="First Name"
                      required={isSignup}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-lg font-bold text-gray-1200 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Last Name"
                      required={isSignup}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-lg font-bold text-gray-1200 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-bold text-gray-1200 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Signup Button */}
            {isSignup && (
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-teal-700'
                }`}
              >
                {isLoading ? 'Creating Account...' : `Sign Up as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
              </button>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-orange-600 hover:to-purple-700'
              }`}
            >
              {isLoading ? 'Signing In...' : `Sign In as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
            </button>

            {/* Toggle Mode Button */}
            <button
              type="button"
              onClick={toggleMode}
              disabled={isLoading}
              className="w-full text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200"
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </form>

          {/* Backend Connection Status */}
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-500">
              Backend: localhost:5000
            </div>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className="mt-12 bg-white bg-opacity-95 backdrop-blur-sm border-t border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Cities */}
          <div className="text-center mb-6">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Bangalore</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Chennai</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Delhi</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Hyderabad</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Mumbai</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Pune</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Kolkata</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Gurgaon</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Ahmedabad</span>
              <span className="hover:text-orange-600 cursor-pointer transition-colors">Noida</span>
            </div>
          </div>
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
            {/* Description */}
            <div className="lg:col-span-2">
              <p className="text-gray-700 leading-relaxed mb-4">
                EduConnect by Shyampari Education is a fast-growing platform connecting learners with trusted tutors and training institutes across India. Thousands of students rely on EduConnect to meet their learning needs across 100+ categories.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                With EduConnect, students and parents can easily explore and compare multiple Tutors and Institutes, selecting the one that aligns best with their goals. Over 10,000 verified tutors and institutes are already using EduConnect to empower learners and grow their teaching presence.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you're seeking a math tutor, a German language coach, or a tech upskilling institute, EduConnect offers a curated list of learning professionals to help you succeed.
              </p>
            </div>
            {/* Social Media */}
            <div className="flex flex-col items-center lg:items-end space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/shyampari-education/" className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          {/* Tagline and Copyright */}
          <div className="text-center border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">EduConnect – Learn. Connect. Grow.</h2>
            <p className="text-sm text-gray-600">© 2025 Shyampari Education. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
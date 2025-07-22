import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-lg p-8 w-[90%] max-w-md animate-slide-down">
        <h2 className="text-center text-2xl font-semibold text-black mb-6">
          Shampari Edutech Pvt. Ltd
        </h2>

        <div className="space-y-4">
          {/* Username */}
          <div className="flex items-center bg-black rounded-full px-4 py-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter user name"
              className="outline-none bg-transparent flex-1"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-black rounded-full px-4 py-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Enter password"
              className="outline-none bg-transparent flex-1"
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-black text-white rounded-full py-2 font-semibold hover:bg-gray-900">
            LOGIN
          </button>

          {/* Links */}
          <div className="text-center text-sm text-black">
            <p>
              Don’t have an account?{' '}
              <a href="#" className="underline hover:text-blue-300">
                Signup now
              </a>
            </p>
            <p className="mt-1 text-gray-300">
              <a href="#" className="hover:text-blue-300">Forgot Password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

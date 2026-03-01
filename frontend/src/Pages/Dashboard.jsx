import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
    }}>
      {/* Top Navbar */}
      <div className="sticky top-0 z-20 flex justify-between items-center px-6 py-4"
        style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h1 className="text-xl font-bold text-gradient">Dashboard</h1>
        <div className="relative">
          <FaUserCircle
            size={35}
            className="cursor-pointer text-white/50 hover:text-white transition-colors"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 mt-2 w-64 rounded-xl overflow-hidden shadow-2xl z-10"
              style={{ background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <p className="font-semibold text-white text-sm">{user.fullName}</p>
                <p className="text-xs text-white/40">{user.email}</p>
                <p className="text-xs text-indigo-400/60 mt-1 capitalize">{user.role}</p>
              </div>
              <button onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/5 text-sm font-medium flex items-center gap-2 transition-all">
                <FaSignOutAlt /> Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Welcome back, <span className="text-gradient">{user.fullName}</span>!</h2>
          <p className="text-white/40 text-sm max-w-lg">
            This is your personal dashboard. Manage your profile, explore courses, and stay up to date with your progress.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="premium-card">
              <h3 className="font-semibold text-white mb-3">Profile Info</h3>
              <div className="space-y-2">
                <p className="text-sm text-white/40"><span className="text-white/60 font-medium">Name:</span> {user.fullName}</p>
                <p className="text-sm text-white/40"><span className="text-white/60 font-medium">Email:</span> {user.email}</p>
                <p className="text-sm text-white/40"><span className="text-white/60 font-medium">Role:</span> <span className="capitalize">{user.role}</span></p>
              </div>
            </div>

            <div className="premium-card">
              <h3 className="font-semibold text-white mb-3">Recent Activity</h3>
              <p className="text-sm text-white/40">No recent activity yet. Start exploring courses!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

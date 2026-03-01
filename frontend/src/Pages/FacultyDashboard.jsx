import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacultyForm from "./TutorForm";
import api from "../utils/api";
import { useMessages } from "../context/MessageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle, FaFilter, FaSignOutAlt, FaSearch,
  FaMapMarkerAlt, FaEdit, FaTimes, FaUsers, FaStar,
  FaChalkboardTeacher, FaEnvelope, FaPhone, FaGraduationCap,
  FaCheck, FaBan, FaHourglass, FaUserCheck, FaBell, FaComments
} from "react-icons/fa";
import ChatWindow from "../Components/ChatWindow";

const TABS = [
  { id: "browse", label: "All Students", icon: <FaUsers /> },
  { id: "requests", label: "Requests", icon: <FaBell /> },
  { id: "students", label: "My Students", icon: <FaUserCheck /> },
];

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("browse");
  const [showProfile, setShowProfile] = useState(false);
  const [facultyExists, setFacultyExists] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [requests, setRequests] = useState([]);   // incoming requests
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ standard: "", board: "", gender: "" });
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [facultyData, setFacultyData] = useState(null);
  const [updatingRequest, setUpdatingRequest] = useState(null);
  const [chatConfig, setChatConfig] = useState({ isOpen: false, targetUser: null, targetName: "" });
  const { totalUnread } = useMessages();

  const user = React.useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const fetchAll = useCallback(async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const [facultyRes, studentRes] = await Promise.all([
        api.get("/api/faculty"),
        api.get("/api/student"),
      ]);
      const existing = facultyRes.data.find((f) => f.user?.email === user.email);
      if (existing) {
        setFacultyExists(true);
        setFacultyData(existing);
        const reqRes = await api.get(`/api/requests?facultyEmail=${user.email}`);
        setRequests(reqRes.data || []);
      }
      setAllStudents(studentRes.data || []);
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const openChat = (targetId, targetName) => {
    setChatConfig({ isOpen: true, targetUser: targetId, targetName: targetName });
  };

  useEffect(() => {
    if (!user || user.role !== "faculty") { navigate("/login"); return; }
    fetchAll();
  }, [user?.email, user?.role, navigate, fetchAll]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRequestAction = async (requestId, status) => {
    setUpdatingRequest(requestId);
    try {
      await api.put(`/api/requests/${requestId}`, { status });
      setRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, status } : r))
      );
      toast.success(status === "accepted" ? "Request accepted! Student connected." : "Request rejected.");
      if (status === "accepted") setActiveTab("students");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update request.");
    } finally {
      setUpdatingRequest(null);
    }
  };

  // Derived
  const pendingRequests = requests.filter((r) => r.status === "pending");
  const acceptedStudents = requests.filter((r) => r.status === "accepted");

  const filteredStudents = allStudents.filter((student) => {
    const fullName = student.user?.fullName || "";
    const email = student.user?.email || "";
    const subjects = student.subjects || [];
    const matchSearch =
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchFilter =
      (!filter.standard || student.standard === filter.standard) &&
      (!filter.board || student.board === filter.board) &&
      (!filter.gender || student.gender === filter.gender);
    return matchSearch && matchFilter;
  });

  const badgeColors = [
    { bg: "rgba(99,102,241,0.1)", color: "#818cf8", border: "rgba(99,102,241,0.2)" },
    { bg: "rgba(16,185,129,0.1)", color: "#34d399", border: "rgba(16,185,129,0.2)" },
    { bg: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "rgba(245,158,11,0.2)" },
    { bg: "rgba(239,68,68,0.1)", color: "#f87171", border: "rgba(239,68,68,0.2)" },
    { bg: "rgba(6,182,212,0.1)", color: "#22d3ee", border: "rgba(6,182,212,0.2)" },
  ];

  if (!user) return null;

  /* ─── Student card (reused in Browse & My Students) ─── */
  const StudentCard = ({ student, showActions = false, requestId = null, reqStatus = null, studentUserId = null }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: reqStatus === "accepted"
          ? "1px solid rgba(16,185,129,0.3)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}>
      {/* Card image top */}
      <div className="h-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.9))" }}>
        <div className="absolute inset-0 bg-[url('/edu_hero.png')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.user?.fullName || "S")}&background=6366f1&color=fff&size=64`}
            alt={student.user?.fullName}
            className="w-14 h-14 rounded-2xl border-2 shadow-lg"
            style={{ borderColor: "rgba(99,102,241,0.5)" }} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-white text-sm text-center mb-1 truncate px-2">{student.user?.fullName || "Student"}</h4>
        <div className="flex justify-center gap-1 mb-3">
          {student.standard && (
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}>
              Std {student.standard}
            </span>
          )}
          {student.board && (
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(6,182,212,0.1)", color: "#22d3ee" }}>
              {student.board}
            </span>
          )}
        </div>

        <div className="space-y-1.5 mb-3">
          {student.user?.email && <p className="text-xs text-white/40 flex items-center gap-1.5 truncate"><FaEnvelope className="flex-shrink-0" />{student.user.email}</p>}
          {student.mobile && <p className="text-xs text-white/40 flex items-center gap-1.5"><FaPhone />{student.mobile}</p>}
          {student.gender && <p className="text-xs text-white/40 flex items-center gap-1.5"><FaUsers />{student.gender}</p>}
          {student.mode && <p className="text-xs text-white/40 flex items-center gap-1.5"><FaGraduationCap />{student.mode}</p>}
          {student.location?.state && (
            <p className="text-xs text-white/40 flex items-center gap-1.5">
              <FaMapMarkerAlt />{student.location.state}{student.location.district ? `, ${student.location.district}` : ""}
            </p>
          )}
        </div>

        {(student.subjects || []).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {student.subjects.map((s, idx) => {
              const c = badgeColors[idx % badgeColors.length];
              return (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                  {s}
                </span>
              );
            })}
          </div>
        )}

        {/* Accept / Reject for Requests tab */}
        {showActions && reqStatus === "pending" && (
          <div className="flex gap-2 pt-3 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button onClick={() => handleRequestAction(requestId, "accepted")}
              disabled={updatingRequest === requestId}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white transition-all disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
              {updatingRequest === requestId
                ? <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                : <FaCheck className="text-xs" />}
              Accept
            </button>
            <button onClick={() => handleRequestAction(requestId, "rejected")}
              disabled={updatingRequest === requestId}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
              style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
              <FaBan className="text-xs" /> Reject
            </button>
          </div>
        )}

        {showActions && reqStatus === "accepted" && (
          <div className="pt-3 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex gap-2">
              <span className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold"
                style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}>
                <FaCheck className="text-xs" /> Connected
              </span>
              {(studentUserId || student.user?._id) && (
                <button
                  onClick={() => openChat(studentUserId?._id || studentUserId || student.user?._id, student.user?.fullName)}
                  className="px-3 py-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <FaComments /> Chat
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      <ToastContainer theme="dark" position="top-right" />

      {/* ─── Navbar ─── */}
      <div className="sticky top-0 z-40 flex justify-between items-center px-6 py-4"
        style={{ background: "rgba(15,23,42,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            <FaChalkboardTeacher className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-none">Faculty Dashboard</h1>
            <p className="text-xs text-white/30 mt-0.5">Welcome back, {user.fullName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {facultyExists && (
            <button onClick={() => setEditProfileOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white/50 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <FaEdit /> Edit Profile
            </button>
          )}
          {totalUnread > 0 && (
            <button onClick={() => setActiveTab("students")}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 transition-all">
              <FaBell className="animate-bounce" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-[#0f172a]">
                {totalUnread}
              </span>
            </button>
          )}
          {pendingRequests.length > 0 && (
            <button onClick={() => setActiveTab("requests")}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-amber-400/80 transition-all"
              style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
              <FaBell /> {pendingRequests.length} Request{pendingRequests.length !== 1 ? "s" : ""}
            </button>
          )}
          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <FaUserCircle size={20} />
            </button>
            <AnimatePresence>
              {showProfile && (
                <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 rounded-xl overflow-hidden z-50"
                  style={{ background: "rgba(15,23,42,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                  <div className="relative h-20 overflow-hidden">
                    <img src="/faculty_hero.png" alt="" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 flex items-center px-4 gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                        {user.fullName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm leading-tight">{user.fullName}</p>
                        <p className="text-xs text-white/40 truncate max-w-[140px]">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="badge badge-primary text-xs">Faculty</span>
                    {facultyData?.experience && <span className="ml-2 text-xs text-white/40">{facultyData.experience}</span>}
                  </div>
                  <button onClick={() => { setShowProfile(false); setEditProfileOpen(true); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-indigo-400/70 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all">
                    <FaEdit /> Edit Profile
                  </button>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all">
                    <FaSignOutAlt /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─── Main ─── */}
      <div className="flex flex-1 p-5 gap-5 max-w-screen-2xl mx-auto w-full">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: "#6366f1" }} />
              <p className="text-white/30 text-sm">Loading your dashboard…</p>
            </div>
          </div>
        ) : !facultyExists ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
            <div className="dashboard-hero mb-6" style={{ minHeight: 180 }}>
              <img src="/faculty_hero.png" alt="Faculty" />
              <div className="dashboard-hero-content">
                <h2 className="text-2xl font-extrabold text-white">Set Up Your Profile</h2>
                <p className="text-white/50 text-sm mt-1">Tell students about yourself so they can find and connect with you.</p>
              </div>
            </div>
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <FacultyForm defaultName={user.fullName} defaultEmail={user.email} defaultRole={user.role}
                onSuccess={(data) => { setFacultyData(data); setFacultyExists(true); toast.success("Profile created!"); }} />
            </div>
          </motion.div>
        ) : (
          <>
            {/* ── Sidebar ── */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0 rounded-2xl overflow-hidden h-fit sticky top-24"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="img-card h-32 relative">
                <img src="/faculty_hero.png" alt="Faculty" />
                <div className="absolute inset-0 flex items-end p-3"
                  style={{ background: "linear-gradient(180deg,transparent 30%,rgba(15,23,42,0.92) 100%)" }}>
                  <span className="text-xs font-semibold text-white/80">Manage Your Students</span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                {TABS.map((tab) => {
                  const count = tab.id === "requests" ? pendingRequests.length
                    : tab.id === "students" ? acceptedStudents.length
                      : allStudents.length;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: activeTab === tab.id ? "rgba(99,102,241,0.15)" : "transparent",
                        color: activeTab === tab.id ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                        border: activeTab === tab.id ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent",
                      }}>
                      <span className="flex items-center gap-2">{tab.icon} {tab.label}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Filters (only for browse tab) */}
              <AnimatePresence>
                {activeTab === "browse" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="px-4 pb-4 space-y-3">
                    <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <FaFilter className="text-indigo-400/60" /> Filters
                      </span>
                      <button onClick={() => { setSearchTerm(""); setFilter({ standard: "", board: "", gender: "" }); }}
                        className="text-xs text-white/25 hover:text-white/50 transition-colors">Clear</button>
                    </div>
                    <div className="relative">
                      <FaSearch className="absolute top-3 left-3 text-white/20 text-xs" />
                      <input type="text" placeholder="Search students…" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} className="glass-input pl-8" />
                    </div>
                    {[
                      { key: "standard", label: "Standard", options: ["1st to 5th", "6th to 10th", "11th & 12th", "College"] },
                      { key: "board", label: "Board", options: ["CBSE", "ICSE", "State Board", "IGCSE", "IB"] },
                      { key: "gender", label: "Gender", options: ["Male", "Female", "Other"] },
                    ].map(({ key, label, options }) => (
                      <select key={key} value={filter[key]}
                        onChange={(e) => setFilter({ ...filter, [key]: e.target.value })}
                        className="glass-select">
                        <option value="">All {label}s</option>
                        {options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ))}
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center justify-between rounded-lg px-3 py-1.5" style={{ background: "rgba(99,102,241,0.06)" }}>
                        <span className="text-xs text-white/40">Total</span>
                        <span className="text-sm font-bold text-indigo-300">{allStudents.length}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg px-3 py-1.5" style={{ background: "rgba(16,185,129,0.06)" }}>
                        <span className="text-xs text-white/40">Filtered</span>
                        <span className="text-sm font-bold text-emerald-300">{filteredStudents.length}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Main Content Area ── */}
            <div className="flex-1 space-y-5">

              {/* Hero Banner */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="dashboard-hero" style={{ minHeight: 140 }}>
                <img src="/faculty_hero.png" alt="Faculty" />
                <div className="dashboard-hero-content w-full flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">
                      {activeTab === "browse" && "All Students"}
                      {activeTab === "requests" && "Incoming Requests"}
                      {activeTab === "students" && "My Connected Students"}
                    </h2>
                    <p className="text-white/50 text-sm mt-1">
                      {activeTab === "browse" && `${filteredStudents.length} student${filteredStudents.length !== 1 ? "s" : ""} registered on the platform`}
                      {activeTab === "requests" && `${pendingRequests.length} student${pendingRequests.length !== 1 ? "s" : ""} requesting tutoring from you`}
                      {activeTab === "students" && `${acceptedStudents.length} student${acceptedStudents.length !== 1 ? "s" : ""} connected with you`}
                    </p>
                  </div>
                  <span className="badge badge-primary text-xs hidden sm:block">Faculty Active</span>
                </div>
              </motion.div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total Students", value: allStudents.length, color: "#818cf8" },
                  { label: "New Requests", value: pendingRequests.length, color: "#fbbf24" },
                  { label: "Connected", value: acceptedStudents.length, color: "#34d399" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl px-4 py-3 text-center"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="font-bold text-base" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-white/30 text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* ─── TAB: Browse All Students ─── */}
              {activeTab === "browse" && (
                filteredStudents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredStudents.map((student, i) => (
                      <motion.div key={student._id || i}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.04, 0.4) }}>
                        <StudentCard student={student} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={<FaUsers />} message="No students match your filters"
                    onClear={() => { setSearchTerm(""); setFilter({ standard: "", board: "", gender: "" }); }} />
                )
              )}

              {/* ─── TAB: Requests ─── */}
              {activeTab === "requests" && (
                pendingRequests.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {pendingRequests.map((req, i) => (
                      <motion.div key={req._id}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.05, 0.3) }}>
                        <StudentCard student={req.student} showActions={true}
                          requestId={req._id} reqStatus={req.status}
                          studentUserId={req.studentUser?._id} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <EmptyState icon={<FaBell />}
                    message="No pending requests"
                    sub="When students send requests, they'll appear here." />
                )
              )}

              {/* ─── TAB: My Students (accepted) ─── */}
              {activeTab === "students" && (
                acceptedStudents.length > 0 ? (
                  <>
                    <div className="rounded-2xl p-4 flex items-center gap-3"
                      style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.08))", border: "1px solid rgba(16,185,129,0.2)" }}>
                      <FaUserCheck className="text-emerald-400 text-lg" />
                      <p className="text-emerald-300/90 text-sm font-medium">
                        These students have been accepted and are now connected with you.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {acceptedStudents.map((req, i) => (
                        <motion.div key={req._id}
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(i * 0.05, 0.3) }}>
                          <StudentCard student={req.student} showActions={true}
                            requestId={req._id} reqStatus={req.status}
                            studentUserId={req.studentUser?._id} />
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <EmptyState icon={<FaUserCheck />}
                    message="No connected students yet"
                    sub="Accept requests from the Requests tab to see students here." />
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* ─── Edit Profile Modal ─── */}
      <AnimatePresence>
        {editProfileOpen && facultyData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setEditProfileOpen(false); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-2xl overflow-hidden"
              style={{ background: "rgba(15,23,42,0.98)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 30px 60px rgba(0,0,0,0.6)", maxHeight: "90vh", overflowY: "auto" }}>
              <div className="img-card h-24">
                <img src="/faculty_hero.png" alt="" />
                <div className="absolute inset-0 flex items-center justify-between px-6"
                  style={{ background: "rgba(15,23,42,0.6)" }}>
                  <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                  <button onClick={() => setEditProfileOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white"
                    style={{ background: "rgba(255,255,255,0.1)" }}>
                    <FaTimes />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <FacultyForm defaultName={facultyData.user?.fullName || ""}
                  defaultEmail={facultyData.user?.email || ""}
                  defaultRole={facultyData.user?.role || ""}
                  defaultOtherData={facultyData}
                  onSuccess={(data) => { setFacultyData(data); setEditProfileOpen(false); toast.success("Profile updated!"); }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Chat Window */}
      <ChatWindow
        isOpen={chatConfig.isOpen}
        onClose={() => setChatConfig({ ...chatConfig, isOpen: false })}
        currentUser={user}
        targetUser={chatConfig.targetUser}
        targetName={chatConfig.targetName}
      />
    </div>
  );
};

/* ─── Empty State Helper ─── */
const EmptyState = ({ icon, message, sub, onClear }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-xl"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.15)" }}>
      {icon}
    </div>
    <p className="text-white/30 font-medium">{message}</p>
    {sub && <p className="text-white/20 text-sm mt-1">{sub}</p>}
    {onClear && (
      <button onClick={onClear} className="mt-4 text-sm text-indigo-400/60 hover:text-indigo-400 transition-colors">
        Clear all filters
      </button>
    )}
  </div>
);

export default FacultyDashboard;

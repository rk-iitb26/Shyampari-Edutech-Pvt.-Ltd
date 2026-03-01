import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentForm from "./StudentForm";
import api from "../utils/api";
import { useMessages } from "../context/MessageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle, FaFilter, FaSignOutAlt, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaChalkboard, FaTimes, FaSearch,
  FaStar, FaCheck, FaBan, FaHourglass, FaBook, FaGraduationCap, FaComments,
  FaSearchPlus, FaUserTie, FaClipboardList
} from "react-icons/fa";
import ChatWindow from "../Components/ChatWindow";

const TABS = [
  { id: "browse", label: "Browse Tutors", icon: <FaSearchPlus /> },
  { id: "requests", label: "My Requests", icon: <FaClipboardList /> },
  { id: "tutors", label: "My Tutors", icon: <FaUserTie /> },
];

const StudentsDashboard = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [studentExists, setStudentExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [filters, setFilters] = useState({ subject: "", mode: "", state: "" });
  const [aiEnabled, setAiEnabled] = useState(false);
  // request state: { [facultyId]: 'pending' | 'accepted' | 'rejected' | null }
  const [requestStatuses, setRequestStatuses] = useState({});
  const [sendingRequest, setSendingRequest] = useState(null);
  const [chatConfig, setChatConfig] = useState({ isOpen: false, targetUser: null, targetName: "" });
  const [activeTab, setActiveTab] = useState("browse");
  const { totalUnread } = useMessages();

  const user = React.useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const fetchData = useCallback(async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const [studentRes, teacherRes] = await Promise.all([
        api.get("/api/student"),
        api.get("/api/faculty"),
      ]);
      const existingStudent = studentRes.data.find((s) => s.user?.email === user.email);
      setStudentExists(!!existingStudent);
      setProfileData(existingStudent || null);
      setTeachers(teacherRes.data);
      setFilteredTeachers(teacherRes.data);

      if (existingStudent) {
        try {
          const reqRes = await api.get(`/api/requests?studentEmail=${user.email}`);
          const statusMap = {};
          reqRes.data.forEach((r) => {
            statusMap[r.faculty?._id] = { status: r.status, requestId: r._id };
          });
          setRequestStatuses(statusMap);
        } catch (_) { }
      }
    } catch (err) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (!user || user.role !== "student") { navigate("/login"); return; }
    fetchData();
  }, [user?.email, user?.role, navigate, fetchData]);

  useEffect(() => {
    const filtered = teachers.filter((t) => {
      const subjects = t.subjects || [];
      const mode = t.mode || "";
      const state = t.location?.state || "";
      return (
        (!filters.subject || subjects.some((s) => s.toLowerCase().includes(filters.subject.toLowerCase()))) &&
        (!filters.mode || mode.toLowerCase().includes(filters.mode.toLowerCase())) &&
        (!filters.state || state.toLowerCase().includes(filters.state.toLowerCase()))
      );
    });
    setFilteredTeachers(filtered);
  }, [filters, teachers]);

  const handleRequestAction = async (teacher, action) => {
    if (!studentExists) {
      toast.warning("Please complete your profile before sending requests.");
      return;
    }
    setSendingRequest(teacher._id);
    try {
      if (action === "accept") {
        const res = await api.post("/api/requests", {
          studentUserEmail: user.email,
          facultyId: teacher._id,
        });
        setRequestStatuses((prev) => ({
          ...prev,
          [teacher._id]: { status: "pending", requestId: res.data.request._id },
        }));
        toast.info("Request sent! Waiting for faculty to connect.");
      } else if (action === "withdraw") {
        const requestId = requestStatuses[teacher._id]?.requestId;
        if (requestId) {
          await api.delete(`/api/requests/${requestId}`);
          setRequestStatuses((prev) => ({ ...prev, [teacher._id]: null }));
          toast.info("Request withdrawn.");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed.");
    } finally {
      setSendingRequest(null);
    }
  };

  const openChat = (targetId, targetName) => {
    setChatConfig({ isOpen: true, targetUser: targetId, targetName: targetName });
  };

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/login"); };

  if (!user) return null;

  const StatusBadge = ({ status }) => {
    const config = {
      pending: { icon: <FaHourglass className="text-xs" />, label: "Pending", color: "#fbbf24", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
      accepted: { icon: <FaCheck className="text-xs" />, label: "Accepted", color: "#34d399", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.25)" },
      rejected: { icon: <FaBan className="text-xs" />, label: "Rejected", color: "#f87171", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)" },
    }[status] || null;
    if (!config) return null;
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}` }}>
        {config.icon} {config.label}
      </span>
    );
  };

  const acceptedTutors = teachers.filter(t => requestStatuses[t._id]?.status === "accepted");
  const pendingRequests = teachers.filter(t => requestStatuses[t._id]?.status === "pending" || requestStatuses[t._id]?.status === "rejected");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>
      <ToastContainer theme="dark" position="top-right" />

      {/* ─── Navbar ─── */}
      <div className="sticky top-0 z-40 flex justify-between items-center px-6 py-4"
        style={{ background: "rgba(15,23,42,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
            <FaChalkboard className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-none">Student Dashboard</h1>
            <p className="text-xs text-white/30 mt-0.5">Welcome back, {user.fullName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          {totalUnread > 0 && (
            <button onClick={() => setActiveTab("tutors")}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 transition-all">
              <FaBell className="animate-bounce text-sm" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-[#1e293b]">
                {totalUnread}
              </span>
            </button>
          )}
          <button onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <FaUserCircle size={20} />
          </button>
          <AnimatePresence>
            {showProfile && (
              <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden z-50"
                style={{ background: "rgba(15,23,42,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                <div className="relative h-20 overflow-hidden">
                  <img src="/student_hero.png" alt="" className="w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 flex items-center px-4 gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
                      {user.fullName?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm leading-tight">{user.fullName}</p>
                      <p className="text-xs text-white/40 truncate max-w-[140px]">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="badge badge-success text-xs">Student</span>
                  {profileData?.standard && <span className="text-xs text-white/40">Std: {profileData.standard}</span>}
                </div>
                {studentExists && (
                  <button onClick={() => { setShowProfile(false); setShowEdit(true); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-emerald-400/70 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all">
                    Edit Profile
                  </button>
                )}
                <button onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 transition-colors text-sm font-medium">
                  <FaSignOutAlt size={14} />
                  Logout Account
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="flex flex-1 p-5 gap-5 max-w-screen-2xl mx-auto w-full">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-transparent animate-spin"
                style={{ borderTopColor: "#10b981" }} />
              <p className="text-white/30 text-sm">Loading your dashboard…</p>
            </div>
          </div>
        ) : !studentExists ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
            <div className="dashboard-hero mb-6" style={{ minHeight: 180 }}>
              <img src="/student_hero.png" alt="Students" />
              <div className="dashboard-hero-content">
                <h2 className="text-2xl font-extrabold text-white">Complete Your Profile</h2>
                <p className="text-white/50 text-sm mt-1">Fill in your details to connect with the best tutors.</p>
              </div>
            </div>
            <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <StudentForm defaultName={user.fullName} defaultEmail={user.email} defaultRole={user.role}
                onSuccess={() => window.location.reload()} />
            </div>
          </motion.div>
        ) : showEdit && profileData ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
              <button onClick={() => setShowEdit(false)} className="text-white/40 hover:text-white transition-colors"><FaTimes /></button>
            </div>
            <StudentForm existingData={profileData} defaultName={user.fullName} defaultEmail={user.email}
              defaultRole={user.role}
              onSuccess={() => { setShowEdit(false); fetchData(); }} />
          </motion.div>
        ) : (
          <>
            {/* ── Sidebar (Tabs & Filters) ── */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0 space-y-4 h-fit sticky top-24">

              {/* Tab Navigation */}
              <div className="rounded-2xl overflow-hidden p-1.5 space-y-1"
                style={{ background: "rgba(15,23,42,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {TABS.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "text-white shadow-lg" : "text-white/40 hover:text-white/60 hover:bg-white/5"
                      }`}
                    style={activeTab === tab.id ? { background: "linear-gradient(135deg,#10b981,#06b6d4)" } : {}}>
                    <div className="relative">
                      {tab.icon}
                      {tab.id === "tutors" && totalUnread > 0 && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1e293b] animate-pulse" />
                      )}
                    </div>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filters (only show on browse) */}
              <AnimatePresence>
                {activeTab === "browse" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="img-card h-24 relative">
                      <img src="/student_hero.png" alt="Students" />
                      <div className="absolute inset-0 flex items-end p-3"
                        style={{ background: "linear-gradient(180deg,transparent 30%,rgba(15,23,42,0.92) 100%)" }}>
                        <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">Search Tutors</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-white uppercase tracking-widest opacity-40">Filters</h3>
                        <button onClick={() => setFilters({ subject: "", mode: "", state: "" })}
                          className="text-[10px] text-white/30 hover:text-white/60 transition-colors">Clear All</button>
                      </div>
                      <div className="relative">
                        <FaSearch className="absolute top-3 left-3 text-white/20 text-xs" />
                        <input type="text" placeholder="Subject" value={filters.subject}
                          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                          className="glass-input emerald pl-8 !py-2 !text-xs" />
                      </div>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute top-3 left-3 text-white/20 text-xs" />
                        <input type="text" placeholder="State/City" value={filters.state}
                          onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                          className="glass-input emerald pl-8 !py-2 !text-xs" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status summary */}
              <div className="rounded-2xl p-4 space-y-2"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { label: "Connected", color: "#34d399", count: acceptedTutors.length },
                  { label: "Requests", color: "#fbbf24", count: pendingRequests.length },
                ].map(({ label, color, count }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[11px] text-white/30 font-medium">{label}</span>
                    <span className="text-[11px] font-bold" style={{ color }}>{count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Main View Area ── */}
            <div className="flex-1 space-y-6">

              {/* Banner */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="dashboard-hero" style={{ minHeight: 140 }}>
                <img src="/student_hero.png" alt="Students" />
                <div className="dashboard-hero-content w-full flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">
                      {activeTab === "browse" && "Find Expert Tutors"}
                      {activeTab === "requests" && "My Requests"}
                      {activeTab === "tutors" && "My Connected Tutors"}
                    </h2>
                    <p className="text-white/50 text-sm mt-1">
                      {activeTab === "browse" && `Discover from ${teachers.length} qualified educators`}
                      {activeTab === "requests" && `Managing ${pendingRequests.length} outgoing applications`}
                      {activeTab === "tutors" && `Learning with ${acceptedTutors.length} expert tutors`}
                    </p>
                  </div>
                  <span className="badge badge-success text-[10px] uppercase tracking-wider hidden sm:block">Status: Active</span>
                </div>
              </motion.div>

              {/* ─── TAB: Browse ─── */}
              {activeTab === "browse" && (
                <>
                  <AnimatePresence>
                    {aiEnabled && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        className="p-5 rounded-2xl mb-6 relative overflow-hidden group"
                        style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)" }}>
                        <div className="relative z-10 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#34d39922] text-emerald-400">
                            <FaBook />
                          </div>
                          <div>
                            <h3 className="font-bold text-emerald-300 mb-1">AI Recommendations</h3>
                            <p className="text-white/50 text-sm">Our AI suggests top teachers based on your learning preferences.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {filteredTeachers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredTeachers.map((teacher, i) => {
                        const reqInfo = requestStatuses[teacher._id];
                        const reqStatus = reqInfo?.status || null;
                        const isLoading = sendingRequest === teacher._id;

                        return (
                          <motion.div key={teacher._id || i}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(i * 0.04, 0.4) }}
                            className="rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.07)",
                              boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                            }}>
                            {/* Card top image */}
                            <div className="h-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.9))" }}>
                              <div className="absolute inset-0 bg-[url('/tutor_card_bg.png')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.user?.fullName || "T")}&background=10b981&color=fff&size=64`}
                                  alt={teacher.user?.fullName}
                                  className="w-14 h-14 rounded-2xl border-2 shadow-lg"
                                  style={{ borderColor: "rgba(16,185,129,0.5)" }} />
                              </div>
                            </div>

                            <div className="p-4 flex flex-col flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-white text-sm truncate pr-2 max-w-[70%] text-emerald-400">{teacher.user?.fullName || "Tutor"}</h4>
                                {reqStatus && reqStatus !== null && <StatusBadge status={reqStatus} />}
                              </div>

                              <div className="flex justify-center mb-3">
                                <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-widest"
                                  style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}>
                                  {teacher.mode || "Online"}
                                </span>
                              </div>

                              <div className="space-y-1.5 mb-3">
                                <p className="text-[11px] text-white/40 flex items-center gap-1.5 truncate"><FaEnvelope className="flex-shrink-0" />{teacher.user?.email}</p>
                                <p className="text-[11px] text-white/40 flex items-center gap-1.5"><FaMapMarkerAlt />{teacher.location?.state || "India"}</p>
                              </div>

                              {(teacher.subjects || []).length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-8">
                                  {teacher.subjects.slice(0, 3).map((s) => (
                                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded"
                                      style={{ background: "rgba(16,185,129,0.08)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.12)" }}>
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="mt-auto pt-3">
                                {!reqStatus || reqStatus === "rejected" ? (
                                  <button
                                    onClick={() => handleRequestAction(teacher, "accept")}
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200 disabled:opacity-50"
                                    style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }}>
                                    {isLoading ? "Sending..." : "Request Tutor"}
                                  </button>
                                ) : (
                                  <div className="text-center py-2 px-3 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Request {reqStatus}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <FaFilter className="text-white/20 text-xl" />
                      </div>
                      <h3 className="text-white font-bold text-lg">No Tutors Found</h3>
                      <p className="text-white/40 text-sm max-w-xs mt-2">Try adjusting your subject or location filters to find more tutors.</p>
                    </div>
                  )}
                </>
              )}

              {/* ─── TAB: Requests ─── */}
              {activeTab === "requests" && (
                pendingRequests.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {pendingRequests.map((teacher, i) => {
                      const reqStatus = requestStatuses[teacher._id]?.status;
                      const isLoading = sendingRequest === teacher._id;
                      return (
                        <motion.div key={teacher._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                          className="rounded-2xl p-5 space-y-4"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 p-1 border border-white/10">
                              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.user?.fullName)}&background=10b981&color=fff`}
                                className="w-full h-full rounded-lg" />
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-sm">{teacher.user?.fullName}</h4>
                              <p className="text-[10px] text-white/30">{teacher.mode}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                            <StatusBadge status={reqStatus} />
                            {reqStatus === "pending" && (
                              <button onClick={() => handleRequestAction(teacher, "withdraw")} disabled={isLoading}
                                className="text-[10px] text-red-400/70 hover:text-red-400 font-bold uppercase tracking-wider px-2 py-1">
                                Withdraw
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 text-center text-white/20 italic text-sm">No active requests.</div>
                )
              )}

              {/* ─── TAB: Tutors ─── */}
              {activeTab === "tutors" && (
                acceptedTutors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {acceptedTutors.map((teacher, i) => (
                      <motion.div key={teacher._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl overflow-hidden group border border-emerald-500/20 shadow-lg shadow-emerald-500/5"
                        style={{ background: "rgba(16,185,129,0.03)" }}>
                        <div className="p-5">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500/30 p-1">
                              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.user?.fullName)}&background=10b981&color=fff`}
                                className="w-full h-full rounded-xl" />
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-base">{teacher.user?.fullName}</h4>
                              <p className="text-xs text-emerald-400/70 font-medium">Verified Tutor</p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-5">
                            <div className="flex items-center gap-2 text-[11px] text-white/50">
                              <FaEnvelope size={10} /> {teacher.user?.email}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-white/50">
                              <FaPhone size={10} /> {teacher.mobile || "Private"}
                            </div>
                          </div>

                          <button onClick={() => openChat(teacher.user?._id, teacher.user?.fullName)}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/40">
                            <FaComments /> Send Message
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-white/20 italic text-sm mb-4">You haven't connected with any tutors yet.</p>
                    <button onClick={() => setActiveTab("browse")} className="btn-premium !py-2 !px-6 !text-xs">Browse Tutors</button>
                  </div>
                )
              )}

            </div>
          </>
        )}
      </div>
      {/* Chat Window */}
      <ChatWindow
        isOpen={chatConfig.isOpen}
        onClose={() => setChatConfig({ ...chatConfig, isOpen: false })}
        currentUser={user}
        targetUser={chatConfig.targetUser}
        targetName={chatConfig.targetName}
      />
    </div >
  );
};

export default StudentsDashboard;

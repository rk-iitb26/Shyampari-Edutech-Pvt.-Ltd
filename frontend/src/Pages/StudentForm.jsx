import { useState, useEffect } from "react";
import { FaUser, FaPhone, FaBook, FaMapMarkerAlt, FaGlobe, FaCheckCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { indiaStates } from "./IndiaStatesData";

const subjects = ["Math", "Science", "English", "Social Science", "Computer", "Hindi", "Sanskrit", "Physics", "Chemistry", "Biology"];

function StudentForm({ defaultName, defaultEmail, defaultRole, existingData, onSuccess }) {
  const [mode, setMode] = useState(existingData?.mode || "");
  const [selectedState, setSelectedState] = useState(existingData?.location?.state || "");
  const [districts, setDistricts] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState(existingData?.subjects || []);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: defaultName || "",
    mobile: existingData?.mobile || "",
    email: defaultEmail || "",
    gender: existingData?.gender || "",
    standard: existingData?.standard || "",
    board: existingData?.board || "",
    district: existingData?.location?.district || "",
    role: defaultRole || "student",
  });

  useEffect(() => {
    if (selectedState) setDistricts(indiaStates[selectedState] || []);
    else setDistricts([]);
  }, [selectedState]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleSubmit = async () => {
    if (!formData.mobile || !formData.standard || !mode || !formData.gender) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);
    const studentData = {
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender,
      standard: formData.standard,
      board: formData.board,
      mode,
      subjects: selectedSubjects,
      location: { country: "India", state: selectedState, district: formData.district },
    };

    const method = existingData ? "PUT" : "POST";
    const url = existingData
      ? `/api/student/${existingData._id}`
      : "/api/student/register-student";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(existingData ? "Profile updated!" : "Registered successfully!");
        setTimeout(() => onSuccess?.(), 1200);
      } else {
        toast.error(data.message || "Server error");
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl text-white text-sm placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all";
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" };
  const sectionStyle = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "18px" };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: "#1e293b", color: "#f8fafc", border: "1px solid rgba(255,255,255,0.1)" } }} />
      <div className="space-y-5">

        {/* Personal Info */}
        <div style={sectionStyle}>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaUser className="text-emerald-400 text-xs" /> Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="name" value={formData.name} disabled
              className={`${inputClass} opacity-50 cursor-not-allowed`} style={inputStyle} placeholder="Full Name" />
            <div className="relative">
              <FaPhone className="absolute top-3 left-3 text-white/20 text-xs" />
              <input name="mobile" value={formData.mobile} onChange={handleChange}
                className={`${inputClass} pl-8`} style={inputStyle} placeholder="Mobile Number *" />
            </div>
            <input name="email" value={formData.email} disabled
              className={`${inputClass} opacity-50 cursor-not-allowed sm:col-span-2`} style={inputStyle} />
            <select name="gender" value={formData.gender} onChange={handleChange}
              className={`${inputClass}`} style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Select Gender *</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Academic Info */}
        <div style={sectionStyle}>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaBook className="text-emerald-400 text-xs" /> Academic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select name="standard" value={formData.standard} onChange={handleChange}
              className={inputClass} style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Select Standard *</option>
              <option>1st to 5th</option>
              <option>6th to 10th</option>
              <option>11th &amp; 12th</option>
              <option>College</option>
              <option>Competitive Exams</option>
            </select>
            <select name="board" value={formData.board} onChange={handleChange}
              className={inputClass} style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Select Board</option>
              <option>CBSE</option>
              <option>ICSE</option>
              <option>State Board</option>
              <option>IGCSE</option>
              <option>IB</option>
            </select>
          </div>
        </div>

        {/* Subjects */}
        <div style={sectionStyle}>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaBook className="text-emerald-400 text-xs" /> Subjects Required
            {selectedSubjects.length > 0 && (
              <span className="ml-auto text-xs text-emerald-400/60">{selectedSubjects.length} selected</span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => {
              const active = selectedSubjects.includes(subject);
              return (
                <button key={subject} type="button" onClick={() => handleSubjectChange(subject)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    background: active ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.04)",
                    border: active ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.07)",
                    color: active ? "#34d399" : "rgba(255,255,255,0.4)",
                  }}>
                  {active && <FaCheckCircle className="inline mr-1.5 text-xs" />}
                  {subject}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode & Location */}
        <div style={sectionStyle}>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaGlobe className="text-emerald-400 text-xs" /> Mode & Location
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={mode} onChange={(e) => setMode(e.target.value)}
              className={inputClass} style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Select Mode *</option>
              <option>Online</option>
              <option>Offline</option>
              <option>Both</option>
            </select>

            {(mode === "Offline" || mode === "Both") && (
              <>
                <select value={selectedState}
                  onChange={(e) => { setSelectedState(e.target.value); setFormData({ ...formData, district: "" }); }}
                  className={inputClass} style={{ ...inputStyle, appearance: "none" }}>
                  <option value="">Select State *</option>
                  {Object.keys(indiaStates).sort().map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <select name="district" value={formData.district} onChange={handleChange}
                  className={inputClass} style={{ ...inputStyle, appearance: "none" }}
                  disabled={!selectedState}>
                  <option value="">Select District</option>
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt />
              {existingData ? "Update Profile" : "Submit Registration"}
            </span>
          )}
        </button>
      </div>
    </>
  );
}

export default StudentForm;

import { useState, useEffect } from "react";
import { FaUser, FaPhone, FaBook, FaMapMarkerAlt, FaGlobe, FaGraduationCap, FaCheckCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { indiaStates } from "./IndiaStatesData";

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "Computer Science", "Economics", "History", "Geography",
  "Accountancy", "Business Studies", "Hindi", "Sanskrit"
];

function TutorForm({ defaultName, defaultEmail, defaultRole, defaultOtherData, onSuccess }) {
  const isEdit = !!defaultOtherData;

  const [mode, setMode] = useState(defaultOtherData?.mode || "");
  const [selectedState, setSelectedState] = useState(defaultOtherData?.location?.state || "");
  const [districts, setDistricts] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState(defaultOtherData?.subjects || []);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: defaultName || "",
    mobile: defaultOtherData?.mobile || "",
    email: defaultEmail || "",
    gender: defaultOtherData?.gender || "",
    experience: defaultOtherData?.experience || "",
    district: defaultOtherData?.location?.district || "",
    education: defaultOtherData?.education || {
      twelfth: "",
      graduation: "",
      postGraduation: "",
    },
  });

  useEffect(() => {
    if (selectedState) setDistricts(indiaStates[selectedState] || []);
    else setDistricts([]);
  }, [selectedState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mobile || !formData.gender || !mode) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    const payload = {
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender,
      experience: formData.experience,
      education: formData.education,
      subjects: selectedSubjects,
      mode,
      location: (mode === "Offline" || mode === "Both")
        ? { state: selectedState, district: formData.district }
        : {},
    };

    try {
      if (isEdit) {
        await axios.put(`/api/faculty/${defaultOtherData._id}`, payload);
        toast.success("Profile updated successfully!");
      } else {
        await axios.post("/api/faculty/register-teacher", payload);
        toast.success("Teacher registered successfully!");
      }
      if (onSuccess) onSuccess(payload);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl text-white text-sm placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all";
  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" };
  const sectionStyle = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "18px" };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: "#1e293b", color: "#f8fafc", border: "1px solid rgba(255,255,255,0.1)" } }} />
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Personal Info */}
        <div style={sectionStyle}>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaUser className="text-indigo-400 text-xs" /> Personal Information
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
              className={inputClass} style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Select Gender *</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <select name="experience" value={formData.experience} onChange={handleChange}
              className={inputClass} style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Years of Experience</option>
              <option>Less than 1 year</option>
              <option>1–3 years</option>
              <option>3–5 years</option>
              <option>5–10 years</option>
              <option>10+ years</option>
            </select>
          </div>
        </div>

        {/* Education */}
        <div style={sectionStyle}>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaGraduationCap className="text-indigo-400 text-xs" /> Education Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input name="education.twelfth" placeholder="12th (e.g. MPC, BiPC)"
              value={formData.education.twelfth} onChange={handleChange}
              className={inputClass} style={inputStyle} />
            <input name="education.graduation" placeholder="Graduation (e.g. B.Sc, B.Tech)"
              value={formData.education.graduation} onChange={handleChange}
              className={inputClass} style={inputStyle} />
            <input name="education.postGraduation" placeholder="Post Graduation (if any)"
              value={formData.education.postGraduation} onChange={handleChange}
              className={inputClass} style={inputStyle} />
          </div>
        </div>

        {/* Subjects */}
        <div style={sectionStyle}>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FaBook className="text-indigo-400 text-xs" /> Subjects You Teach
            {selectedSubjects.length > 0 && (
              <span className="ml-auto text-xs text-indigo-400/60">{selectedSubjects.length} selected</span>
            )}
          </h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => {
              const active = selectedSubjects.includes(subject);
              return (
                <button key={subject} type="button" onClick={() => handleSubjectChange(subject)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    background: active ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                    border: active ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
                    color: active ? "#a5b4fc" : "rgba(255,255,255,0.4)",
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
            <FaGlobe className="text-indigo-400 text-xs" /> Teaching Mode & Location
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={mode} onChange={(e) => setMode(e.target.value)}
              className={inputClass} style={{ ...inputStyle, appearance: "none" }}>
              <option value="">Select Teaching Mode *</option>
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
        <button type="submit" disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
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
              {isEdit ? "Update Profile" : "Register as Faculty"}
            </span>
          )}
        </button>
      </form>
    </>
  );
}

export default TutorForm;

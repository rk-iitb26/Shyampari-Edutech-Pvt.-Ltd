import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TutorForm() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [mode, setMode] = useState("");
  const [city, setCity] = useState("");
  const [areaOptions, setAreaOptions] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    gender: '',
    standard: '',
    board: '',
    education: {
      twelfth: '',
      graduation: '',
      postGraduation: ''
    },
    country: '',
    state: '',
    locationArea: ''
  });

  const subjects = ["Math", "Science", "English", "Physics", "Chemistry", "Biology"];

  const handleSubjectChange = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleModeChange = (value) => {
    setMode(value);
    setCity("");
    setAreaOptions([]);
  };

  const handleCityChange = (value) => {
    setCity(value);
    if (value === "Pune") {
      setAreaOptions(["Kharadi", "Magarpatta", "Hadapsar"]);
    } else {
      setAreaOptions([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      role,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      country: formData.country,
      state: formData.state,
      mode: mode.toLowerCase(),
      location: {
        city: (mode === "Offline" || mode === "Both") ? city : undefined,
        area: (mode === "Offline" || mode === "Both") ? formData.locationArea : undefined
      },
      subjects: selectedSubjects,
    };

    if (role === 'student') {
      payload.standard = formData.standard;
      payload.board = formData.board;
    }

    if (role === 'teacher') {
      payload.education = {
        twelfth: formData.education.twelfth,
        graduation: formData.education.graduation,
        postGraduation: formData.education.postGraduation
      };
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/signup", payload);
      console.log("Signup successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">🎓 Tutor Registration</h2>

          {/* Role */}
          <div>
            <label className="font-semibold block mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" required placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border p-2 rounded" />
            <input type="text" required placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="border p-2 rounded" />
            <input type="email" required placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border p-2 rounded" />
            <input type="password" required placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="border p-2 rounded" />
          </div>

          {/* Gender + Subjects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <label key={subject} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                  />
                  {subject}
                </label>
              ))}
            </div>
          </div>

          {/* Student Fields */}
          {role === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Standard"
                value={formData.standard}
                onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Board"
                value={formData.board}
                onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                className="border p-2 rounded"
                required
              />
            </div>
          )}

          {/* Teacher Fields */}
          {role === 'teacher' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="12th (e.g. PCM)"
                value={formData.education.twelfth}
                onChange={(e) =>
                  setFormData({ ...formData, education: { ...formData.education, twelfth: e.target.value } })}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Graduation"
                value={formData.education.graduation}
                onChange={(e) =>
                  setFormData({ ...formData, education: { ...formData.education, graduation: e.target.value } })}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Post Graduation"
                value={formData.education.postGraduation}
                onChange={(e) =>
                  setFormData({ ...formData, education: { ...formData.education, postGraduation: e.target.value } })}
                className="border p-2 rounded"
                required
              />
            </div>
          )}

          {/* Location & Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" required placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="border p-2 rounded" />
            <input type="text" required placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="border p-2 rounded" />

            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value)}
              required
              className="border p-2 rounded"
            >
              <option value="">Select Mode</option>
              <option>Online</option>
              <option>Offline</option>
              <option>Both</option>
            </select>

            {(mode === "Offline" || mode === "Both") && (
              <>
                <select
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="border p-2 rounded"
                  required
                >
                  <option value="">Select City</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Oman">Oman</option>
                </select>

                {areaOptions.length > 0 && (
                  <select
                    value={formData.locationArea}
                    onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                    className="border p-2 rounded"
                    required
                  >
                    <option value="">Select Area</option>
                    {areaOptions.map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                )}
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            🚀 Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default TutorForm;

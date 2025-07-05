import { useState } from "react";

function StudentForm() {
  const [mode, setMode] = useState("");
  const [location, setLocation] = useState("");
  const [subLocation, setSubLocation] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const subjects = [
    "Math",
    "Science",
    "English",
    "Social Science",
    "Computer",
    "Hindi",
    "Sanskrit"
  ];

  const handleModeChange = (value) => {
    setMode(value);
    setLocation("");
    setSubLocation([]);
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    if (value === "Pune") {
      setSubLocation(["Kharadi", "Magarpatta", "Hadapsar"]);
    } else if (value === "Mumbai") {
      setSubLocation(["Andheri", "Bandra", "Powai", "Thane"]);
    } else if (value === "Dubai") {
      setSubLocation(["Dubai Marina", "Downtown", "Jumeirah", "Deira"]);
    } else if (value === "Oman") {
      setSubLocation(["Muscat", "Salalah", "Nizwa", "Sur"]);
    } else {
      setSubLocation([]);
    }
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = () => {
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
          <div className="min-h-screen w-1/2  bg-gray-100 py-4 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎓 Student Registration
          </h1>
          <p className="text-gray-600">Find your perfect tutor and start learning!</p>
        </div>

        {/* Form Container */}
        <div className="bg-transparent p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-5">
            
            {/* Personal Information Section */}
            <div className="bg-transparent p-4 rounded-xl border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="text-xl mr-2">👤</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="Student Name" 
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm"
                />
                <input 
                  type="text" 
                  placeholder="Mobile Number" 
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm"
                />
                <input 
                  type="email" 
                  placeholder="Email ID" 
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm md:col-span-2 text-sm"
                />
                <select className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm">
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-transparent p-4 rounded-xl border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="text-xl mr-2">📚</span>
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <select className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm">
                  <option value="">Select Standard</option>
                  <option>1st to 5th</option>
                  <option>6th to 10th</option>
                  <option>11th & 12th</option>
                  <option>College</option>
                </select>
                <select className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm">
                  <option value="">Select Board</option>
                  <option>CBSE</option>
                  <option>ICSE</option>
                  <option>State Board</option>
                </select>
              </div>
            </div>

            {/* Subject Selection */}
            <div className="bg-transparent p-4 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="text-xl mr-2">📖</span>
                Subject Requirements
              </h3>
              <div className="mb-3">
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Select Subjects you need help with:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {subjects.map((subject) => (
                    <label 
                      key={subject} 
                      className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 text-sm ${
                        selectedSubjects.includes(subject)
                          ? 'bg-yellow-500 text-white border-yellow-500 shadow-md'
                          : 'bg-white/80 backdrop-blur-sm border-gray-300 hover:border-yellow-300 hover:bg-yellow-50/90'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={selectedSubjects.includes(subject)}
                        onChange={() => handleSubjectChange(subject)}
                        className="sr-only"
                      />
                      <span className="font-medium">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Location & Mode */}
            <div className="bg-transparent p-4 rounded-xl border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="text-xl mr-2">🌍</span>
                Location & Mode Preference
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="Country / State" 
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm"
                />
                <select 
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm" 
                  value={mode} 
                  onChange={(e) => handleModeChange(e.target.value)}
                >
                  <option value="">Select Mode</option>
                  <option value="Online">🌐 Online</option>
                  <option value="Offline">🏠 Offline</option>
                  <option value="Both">🔄 Both</option>
                </select>

                {(mode === "Offline" || mode === "Both") && (
                  <>
                    <select 
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm" 
                      value={location} 
                      onChange={(e) => handleLocationChange(e.target.value)}
                    >
                      <option value="">Select Location</option>
                      <option value="Pune">🏙️ Pune</option>
                      <option value="Mumbai">🌆 Mumbai</option>
                      <option value="Dubai">🏗️ Dubai</option>
                      <option value="Oman">🕌 Oman</option>
                    </select>

                    {subLocation.length > 0 && (
                      <select className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors duration-200 bg-white/80 backdrop-blur-sm text-sm">
                        <option value="">Select {location} Area</option>
                        {subLocation.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 pb-6">
              <button 
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 border-2 border-green-400 sticky bottom-4 z-10"
              >
                🚀 Find My Tutor
              </button>
            </div>
             {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Ready to start your learning journey? Let's find you the perfect tutor! ✨
          </p>
        </div>
          </div>
        </div>

       
      </div>
     </div> 
    </div>
  
  );
}

export default StudentForm;
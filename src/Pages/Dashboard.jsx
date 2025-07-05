import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// Simulated logged-in user from localStorage or fallback
const user = JSON.parse(localStorage.getItem("user")) || {
  name: "Mr. Sharma",
  subjects: ["Math", "Science", "English"],
  email: "sharma@example.com",
  role: "teacher",
  gender: "Male",
  mode: "offline",
  location: { city: "Pune", area: "Hadapsar" },
};

// Dummy students
const dummyStudents = Array.from({ length: 20 }, (_, i) => ({
  name: `Student ${i + 1}`,
  grade: `${9 + (i % 4)}th`,
  board: ["CBSE", "ICSE", "State Board"][i % 3],
  subjects: ["Math", "Science", "English"],
  photo: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
}));

function Dashboard() {
  const navigate = useNavigate();
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const matches = dummyStudents.filter((student) =>
      student.subjects.some((sub) => user.subjects.includes(sub))
    );
    setFilteredStudents(matches);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          🎓 Welcome, {user.name}!
        </h1>
        <p className="text-gray-600 mb-6">
          Click through students who match your subjects:
        </p>

        {/* Carousel Section */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation]}
          className="student-swiper"
        >
          {filteredStudents.map((student, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-blue-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow"
                />
                <h3 className="text-xl font-semibold text-blue-700">
                  {student.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {student.grade} - {student.board}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  Subjects: {student.subjects.join(", ")}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Profile Info */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">📄 Your Profile Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Mode:</strong> {user.mode}
            </p>
            <p>
              <strong>Location:</strong> {user.location.city} (
              {user.location.area})
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-right">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            🔒 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

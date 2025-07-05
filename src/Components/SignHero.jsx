import { useState } from "react";
import { FaUserCircle, FaPhoneAlt, FaEnvelope, FaKey } from "react-icons/fa";
import TutorForm from "./TutorForm";
import StudentForm from "./StudentForm";

function SignupBox() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [showTutorForm, setShowTutorForm] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSignup = () => {
    if (role === "Tutor") {
      setShowTutorForm(true);
    } else if (role === "Student/Parent") {
      setShowStudentForm(true);
    } else {
      alert("Please select a valid role.");
    }
  };

  return (
    <>
      {showTutorForm ? (
        <div
          className="h-screen w-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/background.jpg')" }}
        >
          <TutorForm />
        </div>
      ) : showStudentForm ? (
        <div
          className="h-screen w-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/background.jpg')" }}
        >
          <StudentForm />
        </div>
      ) : (
        <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
          style={{ backgroundImage: "url('/background.jpg')" }}
        >
          <div className="relative bg-white w-full max-w-sm rounded-xl border-2 border-black px-6 pt-10 pb-6 shadow-xl">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 border-2 border-black">
              <FaUserCircle className="text-red-500 text-5xl" />
            </div>

            {step === 1 && (
              <div className="text-center mt-6">
                <h2 className="text-xl font-bold mb-4 text-black">Sign Up As</h2>
                <button
                  onClick={() => handleRoleSelect("Tutor")}
                  className="mb-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md border-2 border-black"
                >
                  Tutor
                </button>
                <button
                  onClick={() => handleRoleSelect("Student/Parent")}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-md border-2 border-black"
                >
                  Student / Parent
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-6">
                <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
                  {role} Sign Up
                </h2>

                <div className="flex items-center border-b-2 border-black py-2 mb-4">
                  {contact.includes("@") ? (
                    <FaEnvelope className="text-black mr-2" />
                  ) : (
                    <FaPhoneAlt className="text-black mr-2" />
                  )}
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone or Email"
                    className="outline-none bg-transparent w-full"
                  />
                </div>

                <div className="flex items-center border-b-2 border-black py-2 mb-4">
                  <FaKey className="text-black mr-2" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="outline-none bg-transparent w-full"
                  />
                </div>

                <button
                  onClick={handleSignup}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md border-2 border-black"
                >
                  Sign Up
                </button>

                <p
                  onClick={() => setStep(1)}
                  className="text-center mt-4 text-sm underline text-gray-700 cursor-pointer"
                >
                  ⬅ Back to role selection
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SignupBox;

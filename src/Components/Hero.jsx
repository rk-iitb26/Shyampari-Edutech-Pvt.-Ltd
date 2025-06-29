import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUser, FaLock } from "react-icons/fa";

function LoginBox() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <div className="relative bg-white w-72 rounded-xl border-2 border-black px-6 pt-10 pb-6 shadow-xl">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 border-2 border-black">
                    <FaUserCircle className="text-red-500 text-5xl" />
                </div>

                <div className="mt-6 flex items-center border-b-2 border-black py-2">
                    <FaUser className="text-black mr-2" />
                    <input
                        type="text"
                        placeholder="Username"
                        className="outline-none bg-transparent w-full"
                    />
                </div>

                <div className="mt-4 flex items-center border-b-2 border-black py-2">
                    <FaLock className="text-black mr-2" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="outline-none bg-transparent w-full"
                    />
                </div>

                <button className="mt-6 w-full bg-[#ff4d6d] border-2 border-black text-white font-semibold py-1 rounded-md">
                    LOGIN
                </button>

                <p
                    onClick={() => navigate("/signup")}
                    className="text-center mt-3 text-sm underline text-black cursor-pointer"
                >
                    Sign up now
                </p>
            </div>
        </div>
    );
}

export default LoginBox;
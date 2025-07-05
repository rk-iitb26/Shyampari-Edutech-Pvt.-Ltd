import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUser, FaLock } from "react-icons/fa";
import axios from "axios";

function LoginBox() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/users/signin", {
                email,
                password
            });

            const { token, user } = response.data;

            // Store token in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Navigate to dashboard
            navigate("/dashboard");

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <div className="relative bg-white w-72 rounded-xl border-2 border-black px-6 pt-10 pb-6 shadow-xl">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 border-2 border-black">
                    <FaUserCircle className="text-red-500 text-5xl" />
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mt-6 flex items-center border-b-2 border-black py-2">
                        <FaUser className="text-black mr-2" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="outline-none bg-transparent w-full"
                        />
                    </div>

                    <div className="mt-4 flex items-center border-b-2 border-black py-2">
                        <FaLock className="text-black mr-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="outline-none bg-transparent w-full"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="mt-6 w-full bg-[#ff4d6d] border-2 border-black text-white font-semibold py-1 rounded-md"
                    >
                        LOGIN
                    </button>
                </form>

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

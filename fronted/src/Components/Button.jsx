import { useState } from "react";

function RoundedButton({ label, hasDropdown }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="bg-white text-black px-4 py-2 rounded-full font-medium flex items-center gap-1 shadow-md"
            >
                {label}
                {hasDropdown && <span>▼</span>}
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 mt-2 w-40 space-y-2 transition-all duration-300 transform
        ${showDropdown ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        bg-neutral-900 p-3 rounded-xl shadow-xl z-20`}
            >
                <a
                    href="/signup/student"
                    className="block text-white text-center hover:underline"
                >
                    As a Student
                </a>
                <a
                    href="/signup/tutor"
                    className="block text-white text-center hover:underline"
                >
                    As a Tutor
                </a>
            </div>
        </div>
    );
}

export default RoundedButton;

import { useState } from "react";
import { Menu, X } from "lucide-react";
import RoundedButton from "./Button"; // Adjust path if needed
import LoginModal from "./LoginButton";

function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="w-full bg-black text-white sticky top-0 font-Ubuntu z-50">
      <div className="w-full flex items-center justify-between p-4 md:px-16 h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.jpg"
            alt="shyamparilogo"
            className="h-14 w-auto object-contain rounded-sm"
          />
          <div className="text-2xl md:text-3xl font-semibold text-white">
            Shampari Edutech Pvt.Ltd
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-10 text-lg font-medium text-white">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#event" className="hover:underline">Event</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={handleLoginClick}
            className="bg-white text-black px-4 py-2 rounded-full"
          >
            Login
          </button>
          <RoundedButton label="Sign Up" hasDropdown />
        </div>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden text-white z-50">
          {menuOpen ? (
            <X size={28} onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu size={28} onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-center bg-black text-white p-4 space-y-4 md:hidden">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#event" onClick={() => setMenuOpen(false)}>Event</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

          {/* Mobile Login Button */}
          <button
            onClick={handleLoginClick}
            className="bg-white text-black px-4 py-2 rounded-full"
          >
            Login
          </button>

          <RoundedButton label="Sign Up" hasDropdown />
        </div>
      )}

      {/* Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
}

export default NavBar;

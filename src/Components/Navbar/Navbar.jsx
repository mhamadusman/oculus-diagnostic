import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../Auth/AuthContext/AuthContext'; // Update this path as needed

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    // Threshold for significant scroll (in pixels)
    const scrollThreshold = 300;
    let lastKnownScrollY = 0;
    let ticking = false;
  
    const handleScroll = () => {
      lastKnownScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only hide navbar if user has scrolled down significantly
          if (lastKnownScrollY > lastScrollY.current + scrollThreshold) {
            setVisible(false);
            lastScrollY.current = lastKnownScrollY;
          } 
          // Only show navbar if user has scrolled up significantly
          else if (lastScrollY.current > lastKnownScrollY + scrollThreshold) {
            setVisible(true);
            lastScrollY.current = lastKnownScrollY;
          }
  
          // Set scrolled state for styling purposes (e.g., background color change)
          setScrolled(lastKnownScrollY > 50);
          
          ticking = false;
        });
      }
      ticking = true;
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
 
    window.location.href = '/home';
  };

  return (
    <header
      className={`hidden lg:inline fixed top-0 left-1/2 -translate-x-1/2 w-10/12 transition-transform duration-700 z-50 ${
        visible ? "translate-y-0" : "-translate-y-96"
      }`}
    >
      <nav className="w-full rounded-full transition-all duration-300">
        <div className={`flex items-center justify-between px-3 rounded-full transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0 w-48">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 60"
                className="w-full"
              >
                <defs>
                  <linearGradient
                    id="grayGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#111827" />
                    <stop offset="50%" stopColor="#4B5563" />
                    <stop offset="100%" stopColor="#9CA3AF" />
                  </linearGradient>
                </defs>

                <text
                  x="100"
                  y="28"
                  fontFamily="Poppins, Arial, sans-serif"
                  fontSize="24"
                  fill="url(#grayGradient)"
                  textAnchor="middle"
                  fontWeight="750"
                  letterSpacing="7"
                >
                  OCULUS
                </text>

                <text
                  x="100"
                  y="45"
                  fontFamily="Poppins, Arial, sans-serif"
                  fontSize="10"
                  fill="url(#grayGradient)"
                  textAnchor="middle"
                  letterSpacing="6"
                >
                  DIAGNOSTICS
                </text>
              </svg>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 font-serif text-sm text-[#8A929E] ">
            <Link to="/home" className="hover:underline hover:text-gray-700">
              Home
            </Link>
            <Link to="/upload" className="hover:underline hover:text-gray-700">
              Upload
            </Link>
            <Link to="/records" className="hover:underline hover:text-gray-700">
              Records
            </Link>
            <Link to="/result" className="hover:underline hover:text-gray-700">
              Results
            </Link>
          </div>

          {/* Auth Buttons - Conditionally rendered based on auth status */}
          <div className="flex space-x-2">
            {currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  className="px-4 py-2 text-center rounded-full text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200 font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-800 rounded-full bg-gray-100 hover:bg-gray-500 transition-all duration-200 font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-center rounded-full text-white bg-gray-800 hover:bg-gray-700 transition-all duration-200 font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-gray-800 rounded-full bg-gray-100 hover:bg-gray-500 transition-all duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
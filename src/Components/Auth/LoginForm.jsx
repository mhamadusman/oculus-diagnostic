import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  // React State to Store Form Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-200 to-white px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {/* Logo */}
        <Link to="/" className="mb-6 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 60"
            className="w-40"
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

        {/* Form Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log In</h2>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          {/* Login Button with Gradient */}
          <button
            type="submit"
            className="w-full py-2 text-white font-semibold rounded-md bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 hover:from-gray-700 hover:via-gray-500 hover:to-gray-300"
          >
            Sign In
          </button>
        </form>

        {/* Footer Text */}
        <p className="mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

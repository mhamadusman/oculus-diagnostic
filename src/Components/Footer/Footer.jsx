import { NavLink, Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between items-center lg:items-start">
        {/* Logo */}
        <Link to="/" className="mb-6 lg:mb-0 lg:mr-8 flex-shrink-0">
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
              fontSize="40"
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

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center lg:justify-start space-x-6 mb-6 lg:mb-0 flex-1">
          {["Pricing", "About us", "Features", "Help Center", "Contact us", "FAQs", "Careers"].map((name, index) => (
            <NavLink
              key={index}
              to={`/${name.toLowerCase().replace(/ /g, "")}`}
              className="hover:text-gray-400"
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="w-full lg:w-auto flex-shrink-0">
          <p className="text-center lg:text-left mb-2">Subscribe to our newsletter</p>
          <div className="flex items-center border border-gray-600 rounded-full overflow-hidden w-full max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white px-4 py-2 outline-none flex-1"
            />
            <button className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 hover:from-gray-700 hover:via-gray-500 hover:to-gray-300 text-white px-4 py-2">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-700 mt-6 pt-6 px-6 text-center lg:text-left">
        {/* Copyright & Social Media */}
        <p className="text-gray-400 font-poppin">&copy; 2024 Brand, Inc. • Privacy • Terms • Sitemap</p>
        <div className="flex space-x-4 mt-4 lg:mt-0">
          <FaTwitter className="hover:text-gray-400 cursor-pointer" />
          <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
          <FaLinkedinIn className="hover:text-gray-400 cursor-pointer" />
          <FaYoutube className="hover:text-gray-400 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

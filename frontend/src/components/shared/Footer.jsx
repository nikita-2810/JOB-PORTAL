import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left - Copyright */}
        <p className="text-sm text-center md:text-left mb-3 md:mb-0">
          © 2025 Your Company. All rights reserved.
        </p>

        {/* Right - Social Icons */}
        <div className="flex space-x-5 text-xl">
          <a href="#" className="hover:text-[#6A38C2] transition-colors duration-200">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-[#6A38C2] transition-colors duration-200">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-[#6A38C2] transition-colors duration-200">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-[#6A38C2] transition-colors duration-200">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

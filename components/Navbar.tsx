"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to scroll to a section smoothly
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white text-black shadow-md transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={120} height={120} />
          {/* <span className="text-2xl font-bold text-gray-800">
            Infinity Coders
          </span> */}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links & Mobile Menu */}
        <div
          className={`absolute md:relative bg-white md:bg-transparent w-full md:w-auto top-0 left-0 h-screen md:h-auto transform ${
            isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          } md:translate-x-0 md:opacity-100 transition-all duration-500 ease-in-out flex flex-col md:flex-row md:items-center md:space-x-6 p-6 md:p-0 shadow-lg md:shadow-none`}
        >
          {/* Close Button Inside Menu */}
          <button
            className="md:hidden text-2xl self-end mb-4 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>

          <button
            onClick={() => scrollToSection("eventsSection")}
            className="nav-link"
          >
            Events
          </button>
          <button
            onClick={() => scrollToSection("aboutSection")}
            className="nav-link"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contactSection")}
            className="nav-link"
          >
            Contact
          </button>

          {/* Bell Icon (Moves inside mobile menu on small screens) */}
          <div
            className="relative items-center mt-4 md:mt-0 md:ml-4"
            ref={dropdownRef}
          >
            <button
              className="text-gray-700 text-xl focus:outline-none transition-all hover:scale-110"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaBell />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg transform origin-top transition-all duration-300 scale-95 hover:scale-100">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Login
                </Link>
                <a
                  href="https://chat.whatsapp.com/YOUR_WHATSAPP_COMMUNITY_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                >
                  Join Us
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Styles for Navigation Links */}
      <style jsx>{`
        .nav-link {
          display: block;
          padding: 8px 16px;
          font-size: 18px;
          font-weight: 500;
          color: #333;
          transition: all 0.3s ease-in-out;
          position: relative;
        }
        .nav-link::after {
          content: "";
          display: block;
          width: 0;
          height: 2px;
          background: #007bff;
          transition: width 0.3s;
          margin: auto;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}

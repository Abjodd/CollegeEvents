import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-white shadow-lg px-4 md:px-6 py-4 sticky top-0 z-50">
      {/* Left Section: Logo */}
      <Link href="/" className="flex items-center ml-10">
        <img
          src="/logo.png"
          alt="College Logo"
          className="h-12 w-auto transform hover:scale-105 transition-transform duration-200"
        />
      </Link>

      {/* Center Section: Title */}
      <h1 className="text-lg md:text-2xl font-bold text-yellow-500 hover:text-yellow-600 transition-colors duration-200 font-sans text-center flex-1">
        COLLEGE EVENT TRACKER
      </h1>

      {/* Right Section: Search + Buttons */}
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full md:w-72 text-yellow-500 border-2 border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
        />
        <div className="flex space-x-2">
          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-200"
            onClick={() => (window.location.href = "/admin")}
          >
            Login
          </button>
          <button
            className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-200"
            onClick={() => (window.location.href = "/event")}
          >
            Events
          </button>
        </div>
      </div>
    </nav>
  );
}

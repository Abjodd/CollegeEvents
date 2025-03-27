import React, { useState, useEffect } from 'react';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is a mobile phone
  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 640; // 640px is Tailwind's `sm` breakpoint
      setIsMobile(isMobileDevice);

      // Set sidebar state based on screen size
      if (isMobileDevice) {
        setIsSidebarOpen(false); // Hide sidebar by default on mobile
      } else {
        setIsSidebarOpen(true); // Show sidebar by default on larger screens
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
  className="fixed top-4 left-4 z-[1100] bg-yellow-500 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
  onClick={toggleSidebar}
>
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside className={`w-64 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 shadow-lg rounded-r-lg overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-200 h-screen transition-transform duration-200 ease-in-out z-[1000] fixed top-0 left-0 ${
          isMobile
            ? `fixed z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
            : `static ${isSidebarOpen ? 'block' : 'hidden'}`
        }`}
      >
        <h2 className="bg-yellow-400 p-4 text-xl font-bold text-gray-900 uppercase tracking-wider shadow-md sticky top-0">
          Departments
        </h2>
        <ul className="p-4 space-y-3">
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Artificial Intelligence and Machine Learning
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Aeronautical Engineering
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Automobile Engineering
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Biotechnology
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Computer Science and Engineering
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Cyber Security
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Data Science
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Mechanical Engineering
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Robotics and AI
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Civil Engineering
            </button>
          </li>
          <li>
            <button className="w-full text-left p-3 text-gray-800 hover:bg-yellow-100 hover:text-yellow-700 rounded-lg transition-all duration-200 ease-in-out transform hover:translate-x-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50">
              Computer Science and Design
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}
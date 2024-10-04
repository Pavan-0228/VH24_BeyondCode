import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  return (
    <nav className="bg-gray-800 sticky top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="text-white text-xl font-bold"></div>
          </div>

          {/* Center Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              
            </div>
          </div>

          {/* Right Section - Search & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 text-gray-300 px-1 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A4.992 4.992 0 0112 15a4.992 4.992 0 016.879 2.804M12 7a4 4 0 110-8 4 4 0 010 8zm0 6a5 5 0 00-5 5v1h10v-1a5 5 0 00-5-5z" />
                </svg>
              </button>

              {profileMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

     
    </nav>
  );
};

export default Navbar;

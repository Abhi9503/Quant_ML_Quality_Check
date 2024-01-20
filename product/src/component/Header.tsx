
import React, { useState } from "react";
import "tailwindcss/tailwind.css"; 
import { Link } from "react-router-dom";
import erpdata from "./../assets/erpdata.png";
import Loginpage from "./Loginpage";


const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="lg:pb-0  bg-white border border-gray-200 rounded-md shadow-md">
      <div className="px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
          <img
            className="w-28 h-10 md:w-40 md:h-14"
            src={erpdata}
            alt="Predict"
          />
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md md:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
                <>
                <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                </svg>

                <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </>
            )}
          </button>

          <div className="hidden md:flex md:items-center md:ml-auto md:space-x-10">
            <Link to="/">
                <span className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                    Home
                </span>
            </Link>
            <Link to="/Uploadproduct">
                <span className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                    Upload Product
                </span>
            </Link>
            <Link to="/Cheakquality">
                <span className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                    Check Quality
                </span>
            </Link>
            <Link to="/Loginpage">
              <span className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md items-center hover:bg-blue-700 focus:bg-blue-700" role="button"> Get started now </span>
            </Link>
          </div>
        </nav>

        <nav className={`display: inline-block pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md md:hidden ${isMenuOpen ? "" : "hidden"}`}>
          <div className="flow-root">
            <div className="flex flex-col px-6 -my-2 space-y-1">
              <Link to="/">
                  <span className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                  Home
                  </span>
              </Link>
              <Link to="/Uploadproduct">
                  <span className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                  Upload Product
                  </span>
              </Link>
              <Link to="/Cheakquality">
                  <span className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
                  Check Quality
                  </span>
              </Link>
            </div>
            <div className="px-6 mt-6">
              <a href="#" title="" className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md items-center hover:bg-blue-800 focus:bg-blue-700" role="button"> Get started now </a>
            </div>
          </div>
        </nav>

      </div>
    </header>
  );
}

export default Header;
           
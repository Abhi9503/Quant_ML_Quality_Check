
import React, { useState } from "react";
import "tailwindcss/tailwind.css"; 
import { Link } from "react-router-dom";
import { useFrappeAuth } from "frappe-react-sdk";
import {Bounce,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfileMenu from "./LogoutMenu";
// import Loginpage from "./Loginpage";


const Header = () => {
  
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const { currentUser } = useFrappeAuth();
  const { logout } = useFrappeAuth();

  function showError(){
    toast.error('Please Sign In', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }


  return (
      <header className="lg:pb-0 bg-white border border-gray-200 rounded-md shadow-md h-28">
        <div className="h-28  px-4 mx-auto max-w-screen-xl flex items-center justify-center  md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <nav className="w-full h-auto flex items-center md:justify-center justify-between ">          
          <div className="flex-shrink-0 justify-center text-center">
            <div id="Title" className="font-medium lg:text-2xl md:text-2xl text-lg text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600">
              QUANT INNOVATION
            </div>
            <div className="inline-block m-auto text-sm">
              www.quantbit.io
            </div>
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

          <div className="hidden md:flex md:items-center md:ml-auto md:space-x-3 lg:space-x-10">
          <Link to="/">
              <span className="md:m-2 md:font-medium lg:text-lg lg:font-medium group transition-all duration-300 ease-in-out text-black flex items-center justify-center text-xl mx-3 cursor-pointer hover:text-teal-700">
                <span className="bg-left-bottom bg-gradient-to-r  from-pink-400 to-pink-900 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                  Home
                </span>
              </span>
            </Link>
            {currentUser ? (
                <Link to="/Uploadproduct" className="m-0">
                  <span className="md:m-2 md:font-medium lg:text-lg lg:font-medium group transition-all duration-300 ease-in-out text-black flex items-center justify-center text-xl mx-3 cursor-pointer hover:text-teal-700">
                    <span className="bg-left-bottom bg-gradient-to-r  from-pink-400 to-pink-900 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                    Upload Product
                    </span>
                  </span>
                </Link>
            ):(
              <Link to="/">
                  <button className="md:m-2 md:font-medium lg:text-lg lg:font-medium group transition-all duration-300 ease-in-out text-black flex items-center justify-center text-xl mx-3 cursor-pointer hover:text-teal-700"
                  onClick={showError}
                  >
                    <span className="bg-left-bottom bg-gradient-to-r  from-pink-400 to-pink-900 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                      Upload Product
                    </span>
                  </button>
                </Link>
            )}
            {currentUser ?(
              <Link to="/Checkquality">
                <span className="md:m-2 md:font-medium lg:text-lg lg:font-medium group transition-all duration-300 ease-in-out text-black flex items-center justify-center text-xl mx-3 cursor-pointer hover:text-teal-700">
                  <span className="bg-left-bottom bg-gradient-to-r  from-pink-400 to-pink-900 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                    Check Quality
                  </span>
                </span>
              </Link>
            ):(
              <Link to="/">
                  <button className="md:m-2 md:font-medium lg:text-xl lg:font-medium group transition-all duration-300 ease-in-out text-black flex items-center justify-center text-xl mx-3 cursor-pointer hover:text-teal-700"
                  onClick={showError}
                  >
                    <span className="bg-left-bottom bg-gradient-to-r  from-pink-400 to-pink-900 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                      Check Quality
                    </span>
                  </button>
                </Link>
            )}
             {currentUser ? (
                        <div>
                          <UserProfileMenu/>
                        </div>
                    ) : (
                <><Link to="/Loginpage">
                  <span className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-pink-500 border border-transparent rounded-md items-center hover:bg-pink-600 focus:bg-pink-700" role="button">
                  <p>Get started now</p>
                  </span>
                </Link></>        
              )}
          </div>
        </nav>

        

      </div>
      <nav className={`z-50  inline-block right-0 fixed pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md md:hidden ${isMenuOpen ? "" : "hidden"}`}>  
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
    </header>
  );
}

export default Header;
           


{/* <Link to="/">
<span className="md:m-2 md:font-bold lg:text-xl lg:font-bold text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">
    Home
</span>
</Link> */}
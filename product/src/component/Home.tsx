import React, { useState } from "react";
// import Header from "./Header";
import "tailwindcss/tailwind.css"; 
import upload from "./../assets/upload.png";
import train from "./../assets/Train.png";
import Predict from "./../assets/Predict.png";
import Header from "./Header";
const Home = () => {
    return (
        <>
        <Header/>
            <div className=" mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                <div className="text-center mx-auto mt-6 text-4xl ">
                    <span className="">Welcome,</span>
                    <span className="ml-2"></span>
                </div>
                <div className="mx-auto mt-8 h-96 w-96 border border-gray-900">

                </div>
            </div>
            <div className="border border-black w-full mt-10 bg-blue-100">
                <div className="mt-9 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl border border-black">
                    <div className="mt-10 ml-10 text-4xl">Steps</div>
                    <div className="mt-5 grid  sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            <img
                                className=" mx-auto mb-4 w-28 h-28 rounded-full"
                                src={upload}
                                alt="Upload"
                            />
                            <h3 className="mb-1 text-2xl font-bold tracking-tight text-Black">
                                Upload
                            </h3>
                        </div>
                        <div className="mt-20 md:mt-0 text-center text-gray-500 dark:text-gray-400">
                            <img
                                className=" mx-auto mb-4 w-28 h-28 rounded-full"
                                src={train}
                                alt="Train"
                            />
                            <h3 className="mb-1 text-2xl font-bold tracking-tight text-Black">
                                Train
                            </h3>
                        </div>
                        <div className="mt-20 md:mt-0 text-center text-gray-500 dark:text-gray-400">
                            <img
                                className=" mx-auto mb-4 w-28 h-28 rounded-full"
                                src={Predict}
                                alt="Predict"
                            />
                            <h3 className="mb-1 text-2xl font-bold tracking-tight text-Black">
                                Predict
                            </h3>
                        </div>
                        <div className="mt-20 md:mx-auto md:my-auto text-center ">
                            <a href="#_" className="relative inline-flex items-center justify-center p-4 px-16 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-900 rounded-full shadow-md group">
                                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">Ready to Build</span>
                                <span className="relative invisible">Button Text</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Home;
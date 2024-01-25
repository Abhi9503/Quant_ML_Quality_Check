import React, { useState,useEffect } from "react";
// import Header from "./Header";
import "tailwindcss/tailwind.css"; 
import upload from "./../assets/upload.png";
import train from "./../assets/Train.png";
import Predict from "./../assets/Predict.png";
import Header from "./Header";
import Automobile from "./../assets/Automobile.jpg";
import Casting from "./../assets/casting.jpg";
import Food from "./../assets/tamato.jpg";
import Electronics from "./../assets/PCB.jpg";
import Packaging from "./../assets/packaging.jpg"
// import { useFrappeAuth } from "frappe-react-sdk";
const Home = () => {
    const items = [
        { text: "Automobile", image: Automobile},
        { text: "Casting", image:Casting},
        { text: "Food and Beverages", image:  Food},
        { text: "Electronics", image: Electronics },
        { text: "Packaging", image:  Packaging}
      ];
    
      const [textIndex, setTextIndex] = useState(0);
    
      useEffect(() => {
        const intervalId = setInterval(() => {
          setTextIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 2000);
    
        return () => clearInterval(intervalId);
      }, []);
    return (
        <>
        <Header/>
            <div className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                <div className="text-center mx-auto mt-6 text-4xl ">
                    <span className="">Welcome,</span>
                    <span className="ml-2"></span>
                </div>

                <div className=" w-auto h-2/4 md:flex mt-5">
                    <div className=" w-auto md:w-1/2">
                        <div className="m-5 md:m-12 w-auto text-xl md:text-3xl lg:text-5xl font-extrabold flex items-center justify-center">
                            Quality Inspection
                        </div>
                        <div className="">
                            <div className="flex text-center justify-center ">
                                <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600 transition-all duration-[500ms] ease-out">
                                {items[textIndex].text}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-auto md:w-1/2">
                        <div className="flex items-center justify-center w-full">
                            <img
                                src={items[textIndex].image}
                                alt={`Image for ${items[textIndex].text}`}
                                className="w-auto md:w-auto h-40 mt-10 md:mt-0 md:h-60 lg:h-96 object-cover mx-auto rounded-3xl"
                            />
                        </div>
                    </div>
                </div>


                 {/* <div className="border border-red-950 w-auto h-96 md:flex">
                    <div className="border border-green-950 w-auto md:w-1/2">
                        <div className="m-5 md:m-12 border border-green-950 w-auto text-xl md:text-5xl font-extrabold flex items-center justify-center">
                            Quality inspection:
                        </div>
                        <div className="border border-yellow-400">
                        <div className="flex text-center justify-center ">
                            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600 transition-all duration-[500ms] ease-out">
                            {items[textIndex].text}
                            </h1>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                    <img
                        src={items[textIndex].image}
                        alt={`Image for ${items[textIndex].text}`}
                        className="w-full h-full object-cover"
                        />
                    </div>
                </div> */}


            </div>
            <div className="w-full mt-20">
                <div className="mt-9 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
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
                                className="mx-auto mb-4 w-28 h-28 rounded-full spin"
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
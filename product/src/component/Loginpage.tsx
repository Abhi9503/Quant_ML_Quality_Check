// import React from "react";
import Header from "./Header";
const Loginpage = () => {
    return (
        <>
        <Header/>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="w-full md:w-1/2 mx-auto hover:bg-gray-100 rounded-lg lg:rounded-full">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome Back..!</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb-10">
                    <form className="space-y-6" action="#" method="POST">
                    <div className="text-xl relative z-0 mt-10 group">
                            <input
                                type="email"
                                name="email"
                                id="email-id"
                                className="text-xl block pt-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                autoComplete="off"
                            />
                            <label
                                htmlFor="email-id"
                                className="text-xl peer-focus:font-medium absolute text-gray-400 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email address
                            </label>
                        </div>
                        <div className="text-xl relative z-0 mt-10 group">
                            <input
                                type="password"
                                name="email-p"
                                id="email-password"
                                className="text-xl block pt-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                required
                                autoComplete="off"
                            />
                            <label
                                htmlFor="email-p"
                                className="text-xl peer-focus:font-medium absolute text-gray-400 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>
                            <div className="flex flex-wrap justify-between text-sm">
                                <div className="cursor-pointer mt-1 md:m-3 text-indigo-800 hover:text-indigo-500 font-semibold">Show Password</div>
                                <div className="cursor-pointer mt-1 md:m-3 font-semibold text-indigo-800 hover:text-indigo-500">Forgot password?</div>
                                
                            </div>
                        </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500 ">
                    Not a member? 
                    <a href="#" className="ml-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Loginpage;
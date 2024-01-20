import React, { useState } from 'react';
import Header from "./Header";
// import Camera from "./../component/Camera"
import Pic from "./../assets/pic.jpeg";

import { Link } from "react-router-dom";
const Cheakquality = () =>{
    const data = [
        { id: '001', name:'Bottel'},
        { id: '002', name:'Cap'},
        { id: '003', name:'Nut'},
        { id: '004', name:'Bolt'}
    ];
    
    const [isDropdownVisible, setIsDropdownVisible] = useState("");
    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedProductName, setSelectedProductName] = useState("");

    const handleInputClick = () => {
        setIsDropdownVisible('true');
    };
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedProductId(event.target.value);
        const selectedProduct = data.find((item) => item.id === selectedId);
        if (selectedProduct) {
            setSelectedProductName(selectedProduct.name);
        }
        setIsDropdownVisible('false');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        // Combine product ID and name
        const productInfo = {
            id: selectedProductId,
            name: selectedProductName
        };

        // Log the combined information
        console.log(productInfo);
    };
    
    return(
        <>
            <Header/>
            <div className="mt-10 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl ">
                <div className="mx-auto w-3/4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="w-auto md:w-1/2">
                        <div className="text-center mt-10 lg:mt-0">
                            <h1 className="font-extrabold text-xl md:text-2xl lg:text-3xl xl:text-4xl  inline-block my-auto">QUALITY CHECK</h1>
                        </div>
                        <div className="flex flex-col justify-between p-4 leading-normal w-auto md-w-1/2">
                            <form onSubmit={handleSubmit}>
                                <div className="text-xl relative z-0 m-10 group">
                                    <input
                                        type="text"
                                        name="product_id"
                                        id="product_id"
                                        className="text-xl block pt-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                        autoComplete="off"
                                        readOnly
                                        onClick={handleInputClick}
                                        value={selectedProductId}
                                    />
                                    <label
                                        htmlFor="product_id"
                                        className="text-xl md:text-2xl font-extrabold absolute text-blue-500 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Product ID
                                    </label>
                                    {isDropdownVisible && (
                                        <select
                                            name="product_id"
                                            id="product_id"
                                            className="text-xl block pt-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            required
                                            value={selectedProductId}

                                        onChange={handleDropdownChange}
                                        >
                                            <option value="" disabled>Select Product ID</option>
                                        {data.map((item) => (
                                            <option>
                                                {item.id}
                                            </option>
                                        ))}
                                        </select>
                                        )
                                    }
                                </div>
                                <div className="text-xl relative z-0 m-10 group">
                                    <input
                                        type="text"
                                        name="product_name"
                                        id="product_name"
                                        className="text-xl block pt-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        required
                                        autoComplete="off"
                                        readOnly
                                        value={selectedProductName}
                                    />
                                    <label
                                        htmlFor="product_name"
                                        className="font-sans text-xl md:text-2xl font-extrabold peer-focus:font-medium absolute text-blue-500 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Product Name
                                    </label>
                                </div>
                                <div className="mt-5 ml-10">
                                    <Link to="/Camera">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Cheak Quality
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    <img className="mt-10 md:mt-0 object-cover w-1/2 rounded-t-lg h-auto md:h-1/2 md:rounded-none md:rounded-s-lg" src={Pic} alt=""/>
                </div>
            </div>
        </>
    );
}

export default Cheakquality;
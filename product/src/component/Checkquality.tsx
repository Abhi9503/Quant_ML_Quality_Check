import React, { useState } from 'react';
import Header from "./Header";
import {useFrappeGetDocList } from "frappe-react-sdk";
import { useNavigate } from 'react-router-dom';
// import { MyAuthComponent } from './Login';
// import TransitionExample from './LoginDialog';

const Cheakquality = () => {
  const navigate = useNavigate();

  type ProductList = {
    name: string;
    product_name: string;
    product_group: string;
    status: string;
    image: string;
  };

  const { data } = useFrappeGetDocList<ProductList>('Product Information', {
    fields: ["name", "product_name", "product_group", "status", "image"]
  });

     

  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectImage, setSelectImage] = useState("");
  const [status, setStatus] = useState('');

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedProductId(event.target.value);
    const selectedProduct = data.find((item) => item.name === selectedId);
    if (selectedId === "Select Product ID") {
      setSelectedProductName("");
      setSelectImage("");
    } else if (selectedProduct) {
      setSelectedProductName(selectedProduct.product_name);
      setSelectImage(selectedProduct.image);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProductId || selectedProductId === "Select Product ID") {
      setStatus('True');
      return;
    } else {
      const productInfo = {
        id: selectedProductId,
        name: selectedProductName
      };
      console.log(productInfo);
      navigate("/Camera");
    }
  };

//   const { currentUser } = useFrappeAuth();

  return (
    <>
      <Header />
            <div className="mt-10 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl ">
            <div className="mx-auto w-3/4 flex flex-col items-center bg-white border border-pink-200 rounded-lg shadow md:flex-row  hover:bg-pink-50">
                <div className="w-auto md:w-1/2">
                    <div className="text-center mt-10 lg:mt-0">
                        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl  inline-block my-auto mt-10 text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-pink-600">QUALITY CHECK</h1>
                    </div>
                    <div className="flex flex-col justify-between p-4 leading-normal w-auto md-w-1/2">
                        <form onSubmit={handleSubmit}>
                        <div className="text-xl relative z-0 m-10 group">
                            {/* <select
                                name="product_id"
                                id="product_id"
                                className="text-xl block pt-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                                autoComplete="off"
                                value={selectedProductId}
                                onClick={handleInputClick}
                            >
                                {data && data.map((item) => (
                                    <option key={item.name} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <label
                                htmlFor="product_id"
                                className="text-xl md:text-2xl font-bold absolute text-blue-500 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Product ID
                            </label> */}
                            <select id="product_id" name="dropdown"
                            className="text-xl block pt-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required
                            // value={selectedProductId}
                            // onClick={handleInputClick}
                            onChange={handleDropdownChange}
                            >
                                <option className="text-pink-300">Select Product ID</option>
                                {data && data.map((item) => (
                                    <option key={item.name} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
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
                                    className="font-sans text-xl md:text-2xl font-bold peer-focus:font-medium absolute text-blue-500 dark:text-blue-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Product Name
                                </label>
                            </div>
                            {status && (
                                <div className="text-red-800 font-semibold flex items-center justify-center">Please enter Product ID</div>
                            )}
                            <div className="mt-5 ml-10">
                                {/* <Link to="/Camera"> */}
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Check Quality
                                    </button>
                                {/* </Link> */}
                            </div>
                            
                        </form>
                    </div>
                </div>
                {selectImage.trim() !== "" && (
                    <img data-aos="zoom-in" className="mt-10 md:mt-0 object-cover w-1/2 rounded-t-lg h-auto md:h-1/2 md:rounded-none md:rounded-s-lg" src={selectImage} alt="Product Image" />
                )}
            </div>
            
        </div>
    </>
  );
}

export default Cheakquality;

// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState, useEffect } from "react";
// import { ProductList } from "../component/ProductList";
import { useFrappeDocTypeEventListener, useFrappeGetDocList } from "frappe-react-sdk"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, HStack, Heading, Spinner, Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
// import { useFrappeDocTypeEventListener, useFrappeGetDocList } from "frappe-react-sdk"
import AddProduct  from "./../component/AddProduct"

import { Link } from "react-router-dom";
interface ProductList{
    name:string,
    product_name:string,
    product_group:string,
    status:string, 
    image:String
}

const searchID = (idSearch: string, productList: ProductList[]) => {
    const searchedIds = productList.filter((item) =>
        item.name.includes(idSearch)
    );
    return searchedIds;
};


export const Product=() =>{
    
    const {data, isLoading,error,mutate}= useFrappeGetDocList<ProductList>('Product Information',{fields:["name","product_name","product_group","status","image"]})
    // const {isOpen,onOpen,onClose}= useDisclosure()  
    // console.log(data);
    useFrappeDocTypeEventListener('Product Information', async (d) => {
        if (d.doctype === "Product Information") {
          try {
            await mutate();
          } catch (error) {
            console.error("Error while mutating:", error);
          }
        }
      }); 

      const[newList, setNewList] = useState<ProductList[]>([]);
      const[idSearch,setIsSearch]=useState("");
      const[nameSearch,setNameSearch]=useState("");
      console.log(newList);
      // Update newList when data changes
    useEffect(() => {
        if (data) {
        setNewList(data);
        setClickedRows(new Array(data.length).fill(false));
        }
    }, [data]);

    const [clickedRows, setClickedRows] = useState<Array<boolean>>([]);


    const handleButtonClick = (index: number) => {
        console.log(`Clicked on row ${index + 1}`);
        // Create a copy of the array and toggle the clicked status for the current row
        const updatedClickedRows = [...clickedRows];
        updatedClickedRows[index] = !updatedClickedRows[index];
    
        // Update the state with the modified array
        setClickedRows(updatedClickedRows);
      };

    return(
        <div className="mt-5 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            <div className=" h-auto w-full md:flex">
                <div className="h-auto md:w-1/2 w-full ml-5 md:ml-0">
                <Link to="/Addproductdetails">
                    <button className="text-white my-auto h-14 bg-pink-500 hover:bg-pink-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                        Add New Product
                    </button>
                </Link>
                </div>
                <div className="h-auto md:w-1/2 md:flex mt-5 md:mt-0">
                    <div className="h-auto md:w-1/2 w-4/5 mx-auto">
                        <div className="relative flex w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" 
                                value={nameSearch}
                                    onChange={(e)=>{
                                    setNameSearch(e.target.value)
                                }}
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:text-xs lg:text-sm" placeholder="Search by Name" required/>
                            <button 
                                className="text-white absolute end-2.5 bottom-2.5 bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 md:px-2 lg:px-4 lg:py-2 md:end-0 lg:end-2.5"
                                onClick={()=>{
                                    const filterdata = searchID(nameSearch, data || []);
                                    setNewList(filterdata)
                                    }}>
                                    Search
                            </button>
                        </div>
                    </div>
                    <div className="h-auto md:w-1/2 w-4/5 mx-auto">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" 
                                value={idSearch}
                                    onChange={(e)=>{
                                    setIsSearch(e.target.value)
                                }}
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 md:text-xs lg:text-sm" placeholder="Search by ID" required/>
                            <button 
                                className="text-white absolute end-2.5 bottom-2.5 bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 md:px-2 lg:px-4 lg:py-2 md:end-0 lg:end-2.5"
                                onClick={()=>{
                                    const filterdata = searchID(idSearch, newList);
                                    setNewList(filterdata)
                                    }}>
                                    Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
                
                <div className="mt-10 overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Group
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    File
                                </th>
                            </tr>
                        </thead>
                        {newList &&  <tbody>
                            {newList.map((d,index) =>
                            <>
                            <tr key={d.name} className="bg-white font-medium border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {d.name}
                                </th>
                                <button onClick={() => handleButtonClick(index)}>
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {d.product_name}
                      </th>
                    </button>
                    {(
                    // {clickedRows[index] && (
                      <>
                        <div className="border border-black w-3/4">
                            <form>
                                <input className="mt-3 w-full p-1 px-2" placeholder="Edit name"/>
                                <button 
                                    className="mt-3 relative mx-auto text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 md:px-2 lg:px-4 lg:py-2 md:end-0 lg:end-2.5"
                                    type="submit"
                                >
                                    Save
                                </button>
                          </form>
                        </div>
                      </>
                    )}
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {d.product_group}
                                </td>
                                <td className="px-6 py-4">
                                    {d.status}
                                </td>
                                <td className="px-6 py-4">
                                </td>
                            </tr>
                            </>
                            )}
                        </tbody>}
                    </table>
                </div>
        </div>
    )
}
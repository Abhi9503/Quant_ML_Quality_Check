

import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
// import Folderinput from "./../component/";
import { Product } from "../pages/product";
import { useFrappeAuth } from "frappe-react-sdk";

// import XLSX from "xlsx";


const Uploadproduct = () =>{

  return(
      <>
        <Header />
         <Product/>
      </>
  );
}
export default Uploadproduct;

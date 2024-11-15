import React, {useState} from "react";
import LoadProduct from "./LoadProduct";
import '../styles/ScanProduct.css'

const ScanProduct=({setBarcode})=>{

    const [prod_barcode, setProdBarcode]=useState("");

    const handleScan=()=>{
        setBarcode(prod_barcode)
    }

    return (
        <div>
      <input className="InputBarcode"
      type="number"
      value={prod_barcode}
      onChange={(e)=>setProdBarcode(e.target.value)}
      placeholder="Enter Barcode:"
      />
      <button className="SearchProduct" onClick={handleScan}>Search Product</button>
      </div>
    )
    
}

export default ScanProduct;
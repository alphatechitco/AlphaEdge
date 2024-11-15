//App.js main App Export Root
import React, { useState } from "react";
import LoadProduct from "./components/LoadProduct";
import ScanProduct from "./components/ScanProduct";
import MakeSale from "./components/MakeSale";
import Billing from "./components/Billing";
import LoadClothingProduct from "./components/LoadClothingProduct";
import ScanClothingItem from "./components/ScanClothingItem";
import ClothingBilling from "./components/ClothingBilling";
import './styles/App.css';
import logo from './assets/logo.png'; // Import your logo image

const App = () => {
  const [storeType, setStoreType] = useState("general"); // "general" or "clothing"
  const [barcode, setBarcode] = useState("");
  const [billDetails, setBill] = useState([]);
  const [SaleData, setSaleData] = useState({});

  // Function to handle store type change
  const handleStoreTypeChange = (event) => {
    setStoreType(event.target.value);
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <img src={logo} alt="AlphaEdge Logo" className="app-logo" />
        <h1 className="app-title">AlphaEdge POS</h1>
      </header>

      {/* Store Type Selector */}
      <div className="store-type-selector">
        <label>Select Store Type: </label>
        <select value={storeType} onChange={handleStoreTypeChange}>
          <option value="general">General Store</option>
          <option value="clothing">Clothing Brand</option>
        </select>
      </div>

      {/* Render Modules Based on Store Type */}
      <div className="app-layout">
        {storeType === "general" ? (
          <>
            <div className="right-panel">
              <ScanProduct setBarcode={setBarcode} />
              <MakeSale SaleData={SaleData} />
            </div>
            <div className="center-panel">
              <LoadProduct barcode={barcode} setBill={setBill} />
            </div>
            <div className="right-panel">
              <Billing billDetails={billDetails} setSaleData={setSaleData} />
            </div>
          </>
        ) : (
          <>
            <div className="right-panel">
              <ScanClothingItem setBarcode={setBarcode} />
              <MakeSale SaleData={SaleData} />
            </div>
            <div className="center-panel">
              <LoadClothingProduct barcode={barcode} setBill={setBill} />
            </div>
            <div className="right-panel">
              <ClothingBilling billDetails={billDetails} setSaleData={setSaleData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import supabase from "../database/dbconfig";
import "../styles/MakeSales.css";

const MakeSale = ({ SaleData }) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (SaleData && SaleData.items) {
      recordSale();
    }
  }, [SaleData]);

  const recordSale = async () => {
    try {
      // Prepare data for insertion
      const saleItems = SaleData.items.map((item) => ({
        prod_barcode: item.prod_barcode, // Make sure you have the right keys
        sale_quantity: 1, // Adjust quantity if needed
        sale_price: item.prod_price,
        discount: SaleData.discountPercentage,
        tax: SaleData.taxPercentage,
        salesperson_id: SaleData.salesPersonId,
        total_amount: SaleData.totalAmount,
      }));

      // Insert data into Supabase
      const { data, error } = await supabase.from("sales").insert(saleItems);

      if (error) {
        setError("Error recording sale: " + error.message);
      } else {
        setSuccessMessage("Sale recorded successfully!");
        setError(null);
      }
    } catch (err) {
      setError("Unexpected error: " + err.message);
    }
  };

  return (
    <div className="sale-container">
      <h2>Record Sale</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default MakeSale;

import React, { useState, useEffect } from "react";
import supabase from "../database/dbconfig";
import '../styles/LoadProduct.css'; // Add a CSS file for styling

const LoadProduct = ({barcode, setBill}) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [billDetails, setBillDetails]=useState([]);

  const makeBill=()=>{
    setBill(billDetails)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('prod_barcode', barcode);
        if (error) {
          setError("Error fetching products!");
          console.error("Error:", error);
        } else {
          setProducts(data);
          setBillDetails((prevBillDetails) => [...prevBillDetails, ...data]); // Append new items to bill
        }
      } catch (err) {
        setError("Unexpected error fetching products!");
        console.error("Unexpected error:", err);
      }
    };
    fetchProducts();
  }, [barcode]);

  return (
    <div className="product-container">
      <h1>Product Inventory</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="product-list">
        {products.map((prod) => (
          <div key={prod.prod_id} className="product-card">
            <h2>{prod.prod_name}</h2>
            <p><strong>Brand:</strong> {prod.prod_co}</p>
            <p><strong>Barcode:</strong> {prod.prod_barcode}</p>
            <p><strong>Price:</strong> Rs. {prod.prod_price}</p>
            <p><strong>Cost Price:</strong> Rs. {prod.cost_price}</p>
            <p><strong>Discount:</strong> {prod.discount_percentage}%</p>
            <p><strong>Stock:</strong> {prod.stock_quantity} units</p>
            <p><strong>Placement:</strong> {prod.placement}</p>
            <div className="product-actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
              <button className="add-to-cart-btn" onClick={makeBill}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadProduct;

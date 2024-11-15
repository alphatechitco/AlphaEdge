// LoadProduct.js
import React, { useState, useEffect } from "react";
import supabase from "../database/dbconfig";
import '../styles/LoadClothingProduct.css'; // Add a CSS file for styling

const LoadProduct = ({ barcode, setBill }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [billDetails, setBillDetails] = useState("");

  const makeBill = () => {
    setBill(billDetails);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('wear')
          .select('*')
          .eq('prod_barcode', barcode);
        if (error) {
          setError("Error fetching product details!");
          console.error("Error:", error);
        } else {
          setProducts(data);
          setBillDetails(data);
        }
      } catch (err) {
        setError("Unexpected error fetching product details!");
        console.error("Unexpected error:", err);
      }
    };
    fetchProducts();
  }, [barcode]);

  return (
    <div className="product-container">
      <h1>Clothing Inventory</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="product-list">
        {products.map((prod) => (
          <div key={prod.article_no} className="product-card">
            <h2>{prod.name}</h2>
            <p><strong>Clothing Type:</strong> {prod.clothing_type}</p>
            <p><strong>Material:</strong> {prod.material}</p>
            <p><strong>Size:</strong> {prod.size}</p>
            <p><strong>Color:</strong> {prod.color}</p>
            <p><strong>Season:</strong> {prod.season}</p>
            <p><strong>Brand:</strong> {prod.brand}</p>
            <p><strong>Price:</strong> PKR {prod.price}</p>
            <p><strong>Cost Price:</strong> PKR {prod.cost}</p>
            <p><strong>Stock:</strong> {prod.stock_quantity} units</p>
            <p><strong>SKU:</strong> {prod.sku}</p>
            <p><strong>Barcode:</strong> {prod.prod_barcode}</p>
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

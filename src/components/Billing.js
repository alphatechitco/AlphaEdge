import React, { useState, useEffect } from 'react';
import '../styles/Billing.css';
import MakeSale from './MakeSale';

const Billing = ({ billDetails }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cashReceived, setCashReceived] = useState(0);
  const [balance, setBalance] = useState(0);
  const [showSaleMessage, setShowSaleMessage] = useState(false); // To display success/error messages from MakeSale

  const taxRate = 0.08; // 8% tax rate

  useEffect(() => {
    const updatedItems = [];
    billDetails.forEach((product) => {
      const existingProduct = updatedItems.find(item => item.prod_id === product.prod_id);
      const priceAfterDiscount = product.prod_price * (1 - product.discount_percentage / 100);

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.subtotal = existingProduct.quantity * existingProduct.discountedPrice;
      } else {
        updatedItems.push({
          ...product,
          quantity: 1,
          discountedPrice: priceAfterDiscount,
          subtotal: priceAfterDiscount,
        });
      }
    });
    setItems(updatedItems);
  }, [billDetails]);

  const handleQuantityChange = (index, newQuantity) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity;
      updatedItems[index].subtotal = newQuantity * updatedItems[index].discountedPrice;
      return updatedItems;
    });
  };

  const handleDeleteItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((total, item) => total + item.subtotal, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const totals = calculateTotal();

  const handleCashReceivedChange = (e) => {
    const receivedAmount = parseFloat(e.target.value) || 0;
    setCashReceived(receivedAmount);
    setBalance(receivedAmount - totals.total);
  };

  const handleRecordSale = () => {
    // Prepare sale data
    const saleData = {
      items: items.map(item => ({
        prod_barcode: item.prod_barcode,
        prod_price: item.prod_price,
        discount_percentage: item.discount_percentage,
        quantity: item.quantity,
      })),
      discountPercentage: 0, // Update with actual discount if needed
      taxPercentage: taxRate * 100,
      salesPersonId: 1, // Replace with the actual salesperson ID if available
      totalAmount: totals.total,
    };
    setShowSaleMessage(true); // Trigger MakeSale component
  };

  const filteredItems = items.filter(item =>
    item.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="billing-container">
      <h1>Billing Summary</h1>
      <input
        type="text"
        placeholder="Search product by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <table className="billing-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Price (Rs.)</th>
            <th>Discount (%)</th>
            <th>Discounted Price (Rs.)</th>
            <th>Quantity</th>
            <th>Subtotal (Rs.)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={item.prod_id}>
              <td>{index + 1}</td>
              <td>{item.prod_name}</td>
              <td>{item.prod_co}</td>
              <td>{item.prod_price}</td>
              <td>{item.discount_percentage}</td>
              <td>{item.discountedPrice.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                  className="quantity-input"
                />
              </td>
              <td>{item.subtotal.toFixed(2)}</td>
              <td>
                <button onClick={() => handleDeleteItem(index)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="billing-footer">
        <div className="summary-line">
          <span>Subtotal:</span>
          <span>Rs. {totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Tax (8%):</span>
          <span>Rs. {totals.tax.toFixed(2)}</span>
        </div>
        <div className="summary-line total">
          <span>Total:</span>
          <span>Rs. {totals.total.toFixed(2)}</span>
        </div>
        <div className="cash-received-line">
          <label>Cash Received: </label>
          <input
            type="number"
            value={cashReceived}
            onChange={handleCashReceivedChange}
            className="cash-input"
          />
        </div>
        <div className="summary-line balance">
          <span>Balance:</span>
          <span>Rs. {balance.toFixed(2)}</span>
        </div>
        <button onClick={handleRecordSale} className="record-sale-button">
          Record Sale
        </button>
        {showSaleMessage && <MakeSale SaleData={{
          items,
          discountPercentage: 0, // Update as needed
          taxPercentage: taxRate * 100,
          //salesPersonId: 1, // Replace with actual ID
          totalAmount: totals.total
        }} />}
      </div>
    </div>
  );
};

export default Billing;

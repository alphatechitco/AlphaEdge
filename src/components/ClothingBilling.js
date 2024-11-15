import React, { useState, useEffect } from "react";
import '../styles/ClothingBilling.css';

const Billing = ({ billDetails, setSaleData, salesPersonId }) => {
  const [invoiceNo, setInvoiceNo] = useState(generateInvoiceNo());
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const discountPercentage = 10; // Example discount
  const taxPercentage = 5; // Example tax

  // Auto-generate unique invoice number
  function generateInvoiceNo() {
    return `CSV-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  // Recalculate totals when bill details change
  useEffect(() => {
    if (Array.isArray(billDetails) && billDetails.length > 0) {
      calculateTotals();
    }
  }, [billDetails]);

  const calculateTotals = () => {
    let total = 0;
    let qtyTotal = 0;

    billDetails.forEach(item => {
      total += item.price;
      qtyTotal += 1; // Assume qty as 1 for now; update if multiple quantities are added
    });

    // Apply discount and tax
    const discountAmount = (total * discountPercentage) / 100;
    const taxAmount = ((total - discountAmount) * taxPercentage) / 100;
    total = total - discountAmount + taxAmount;

    setTotalAmount(total);
    setQuantityTotal(qtyTotal);
  };

  const makeSale = () => {
    setSaleData({
      items: billDetails,
      totalAmount,
      quantityTotal,
      salesPersonId,
      discountPercentage,
      taxPercentage
    });
  };

  return (
    <div className="bill-container">
      <h1 className="bill-heading">Cash Sale:</h1>
      <div className="bill">
        <p><strong>Invoice No:</strong> {invoiceNo}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
        <p><strong>Salesperson ID:</strong> {salesPersonId}</p>

        <table className="bill-table">
          <thead>
            <tr>
              <th>Sr</th>
              <th>Item</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Rate (PKR)</th>
              <th>Amt (PKR)</th>
            </tr>
          </thead>
          <tbody>
            {billDetails && billDetails.length > 0 ? (
              billDetails.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.clothing_type}</td>
                  <td>1</td> {/* Update if quantity support is added */}
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.price.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No items added to the bill</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="totals">
          <p><strong>Total Quantity:</strong> {quantityTotal}</p>
          <p><strong>Discount Applied:</strong> {discountPercentage}%</p>
          <p><strong>Tax Applied:</strong> {taxPercentage}%</p>
          <p><strong>Total Amount:</strong> PKR {totalAmount.toFixed(2)}</p>
        </div>

        <button className="make-sale-btn" onClick={makeSale}>Make Sale</button>
      </div>
    </div>
  );
};

export default Billing;

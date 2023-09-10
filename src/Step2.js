// Step2.js
import React, { useState } from "react";
import Papa from "papaparse";

function Step2({ handleNextStep }) {
  const [product, setProduct] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch and parse the CSV data just like in Step1 if needed

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handleSubmit = () => {
    // Filter data based on selected product
    let filtered = filteredData;

    if (product) {
      filtered = filtered.filter((row) => row.product === product);
    }

    // You can handle the filtered data or submit it to the backend here
    // handleFilteredData(filtered);

    handleNextStep(); // Move to the next step
  };

  return (
    <div>
      <h2>Step 2</h2>
      <div>
        <label>Select Product:</label>
        <select value={product} onChange={handleProductChange}>
          <option value="">All</option>
          {/* Add options dynamically based on CSV data */}
          {filteredData.map((row) => (
            <option key={row.product} value={row.product}>
              {row.product}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Step2;

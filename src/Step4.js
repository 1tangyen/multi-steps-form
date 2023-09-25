import React from "react";
import Button from "@mui/material/Button";

export default function Step4({
  selectedCountry,
  selectedCity,
  fullNames,
  restaurants,
  selectedDates,
  selectedDatesSecond,
  handleBack,
}) {
  // Render the selected options
  const renderSelectedOptions = (label, options) => {
    if (!Array.isArray(options) || options.length === 0) {
      return null; // Don't render anything if options are not an array or empty
    }

    return (
      <div>
        <h2>{label}</h2>
        <ul>
          {options.map((option, index) => (
            <li key={index}>{option.label}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Render the selected dates
  // const renderSelectedDates = (label, dates) => {
  //   if (!selectedDates || !selectedDates.startDate || !selectedDates.endDate) {
  //     return null; // Don't render anything if dates are missing
  //   }
  //   console.log(dates);
  //   const startDate = dates.startDate;
  //   const endDate = dates.endDate;
  //   console.log(startDate);
  //   return (
  //     <div>
  //       <h2>{label}</h2>
  //       <p>Start Date: {startDate}</p>
  //       <p>End Date: {endDate}</p>
  //     </div>
  //   );
  // };

  // Handle the submit button click
  const handleSubmit = () => {
    // You can perform any final actions here, such as sending data to the server.
    // For example, you can create an object to hold all selected data.
    const selectedData = {
      selectedCountry,
      selectedCity,
      fullNames,
      restaurants,
      selectedDates,
      selectedDatesSecond,
    };

    // Perform any necessary actions with selectedData, e.g., send it to the server.

    // Display a success message or perform any other actions.
    alert("Data submitted successfully!");
  };

  return (
    <div>
      {renderSelectedOptions("Selected Country:", selectedCountry)}
      {renderSelectedOptions("Selected City:", selectedCity)}
      {renderSelectedOptions("Selected Names:", fullNames)}
      {renderSelectedOptions("Selected Restaurants:", restaurants)}
      {/* {renderSelectedDates("Selected Dates:", selectedDates)} */}
      {/* {renderSelectedOptions("Second Selected Dates:", selectedDatesSecond)} */}

      <div>
        <h2>Confirmation</h2>
        <p>Please review your selections and click "Submit" to confirm.</p>
      </div>
      <Button
        variant="text"
        onClick={handleBack}
        style={{
          borderRadius: 55,
          backgroundColor: "#fff",
          color: "#282B28",
        }}
      >
        Back
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

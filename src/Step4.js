import React from "react";
import { Box, Button, Typography } from "@mui/material";

function Step4({ formData, handleBack, fullQuery, dateData }) {
  // Check if the dateData property exists in formData before accessing startDate
  const startDate = formData.dateData ? formData.dateData.startDate : "N/A";
  const endDate = formData.dateData ? formData.dateData.endDate : "N/A";

  // Check if selectedCountry and selectedCity arrays are empty
  const selectedCountries =
    formData.selectedCountry.length > 0
      ? formData.selectedCountry.map((country) => country.label).join(", ")
      : "N/A";
  const selectedCities =
    formData.selectedCity.length > 0
      ? formData.selectedCity.map((city) => city.label).join(", ")
      : "N/A";
  // Check if selectedFullNames, selectedRestaurants, and selectedTried arrays are empty
  const selectedFullNames =
    formData.fullNames.length > 0
      ? formData.fullNames.map((fullName) => fullName.label).join(", ")
      : "N/A";

  const selectedRestaurants =
    formData.restaurants.length > 0
      ? formData.restaurants.map((restaurant) => restaurant.label).join(", ")
      : "N/A";

  const selectedTried =
    formData.tried.length > 0
      ? formData.tried.map((tried) => tried.label).join(", ")
      : "N/A";

  return (
    <div>
      <Typography variant="body1" paragraph>
        Please review your selections before submitting.
      </Typography>

      {dateData.prevStartDate && dateData.prevEndDate && (
        <Box>
          <Typography variant="subtitle1">Previous Dates:</Typography>
          <ul>
            <li> Selected Start Date: {startDate}</li>
            <li> Selected End Date: {endDate}</li>
            <li>Previous Start Date: {dateData.prevStartDate}</li>
            <li>Previous End Date: {dateData.prevEndDate}</li>
          </ul>
        </Box>
      )}
      <Typography variant="body1" paragraph>
        Selected Countries: {selectedCountries}
      </Typography>
      <Typography variant="body1" paragraph>
        Selected Cities: {selectedCities}
      </Typography>
      <Typography variant="body1" paragraph>
        Selected Full Names: {selectedFullNames}
      </Typography>
      <Typography variant="body1" paragraph>
        Selected Restaurants: {selectedRestaurants}
      </Typography>
      <Typography variant="body1" paragraph>
        Selected Tried Options: {selectedTried}
      </Typography>

      {/* Rest of your confirmation content */}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          // Handle your form submission logic here
          onClick={() => {
            // Handle form submission here
          }}
          style={{
            borderRadius: 55,
            backgroundColor: "#83BCA9",
          }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default Step4;

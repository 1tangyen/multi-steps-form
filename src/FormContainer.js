import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Step1 from "./Step1";
import Step2 from "./Step2";
import "./App.css";

const steps = [
  "Choose a Location",
  "Choose a Restaurant",
  "Choose Review Dates Period",
  "Review and Confirm",
];

export default function ParentComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFullName, setSelectedFullName] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [fullNames, setFullNames] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [tried, setTried] = useState([]);

  // Function to handle navigation and data filtering
  const handleNavigation = (action, selectedOptions) => {
    if (action === "next") {
      // Move to the next step
      if (activeStep === 0) {
        // If in Step 1, filtered data is already set by Step1 component
        setSelectedCountry(selectedOptions.selectedCountry);
        setSelectedCity(selectedOptions.selectedCity);
        setFilteredData(selectedOptions.filteredData);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (action === "back") {
      // Move to the previous step
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  // Function to update the stepper label based on Step1 and Step2 selections
  const updateStepperLabel = () => {
    let newLabel = "Selected things: ";

    if (selectedCountry.length > 0) {
      newLabel += "Selected Country: ";
      newLabel += selectedCountry.map((country) => country.label).join(", ");
    }

    if (selectedCity.length > 0) {
      newLabel += "Selected City: ";
      newLabel += selectedCity.map((city) => city.label).join(", ");
    }

    if (fullNames.length > 0) {
      newLabel += "Selected Name: ";
      newLabel += fullNames.map((name) => name.label).join(", ");
    }

    if (restaurants.length > 0) {
      newLabel += "Selected Restaurant: ";
      newLabel += restaurants.map((restaurant) => restaurant.label).join(", ");
    }

    return newLabel;
  };

  return (
    <div className="card-container">
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ backgroundColor: "#fff", padding: "1rem" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    sx={{
                      color: index === activeStep ? "#83BCA9" : "#E0E0E0",
                      "& .MuiStepIcon-root.Mui-active": { color: "#83BCA9" },
                      "& .MuiStepIcon-root.Mui-completed": { color: "#83BCA9" },
                    }}
                  >
                    {label}
                    {index === 0 && (
                      <Typography variant="body2" color="textSecondary">
                        {updateStepperLabel()}
                      </Typography>
                    )}
                    {index === 1 && (
                      <Typography variant="body2" color="textSecondary">
                        {updateStepperLabel()}
                      </Typography>
                    )}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>

        <Grid item xs={12} sm={8}>
          <Box sx={{ p: 2 }}>
            {activeStep === 0 && (
              <Step1
                handleNavigation={handleNavigation}
                selectedCountry={selectedCountry}
                selectedCity={selectedCity}
                setSelectedCountry={setSelectedCountry}
                setSelectedCity={setSelectedCity}
              />
            )}
            {activeStep === 1 && (
              <Step2
                handleNavigation={handleNavigation}
                selectedCountry={selectedCountry}
                selectedCity={selectedCity}
                filteredStep1Data={filteredData}
                fullNames={fullNames}
                setSelectedFullName={setFullNames} // Pass the setter function
                restaurants={restaurants}
                setSelectedRestaurant={setRestaurants} // Pass the setter function
                tried={tried}
                setSelectedTried={setTried} // Pass the setter function
                updateStepperLabel={updateStepperLabel}
              />
            )}

            {/* Add conditions for Step3 and Step4 rendering here */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

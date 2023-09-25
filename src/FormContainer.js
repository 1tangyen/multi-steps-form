import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import "./App.css";

const steps = [
  "Choose a Location",
  "Choose a Restaurant",
  "Choose Review Dates Period",
  "Review and Confirm",
];

export default function FormContainer() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFullName, setSelectedFullName] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [fullNames, setFullNames] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [tried, setTried] = useState([]);

  // State variable to hold selected dates
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedDatesSecond, setSelectedDatesSecond] = useState({});

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateStep1Label = () => {
    const labels = [];

    if (selectedCountry.length > 0) {
      labels.push("Selected Country:");
      selectedCountry.forEach((country) => {
        labels.push(country.label);
      });
    }

    if (selectedCity.length > 0) {
      labels.push("Selected City:");
      selectedCity.forEach((city) => {
        labels.push(city.label);
      });
    }

    // Join the labels with line breaks
    const labelString = labels.join("\n");

    return (
      <div>
        {labelString.split("\n").map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    );
  };

  const updateStep2Label = () => {
    const labels = [];

    if (fullNames.length > 0) {
      labels.push("Selected Name:");
      fullNames.forEach((name) => {
        labels.push(name.label);
      });
    }

    if (restaurants.length > 0) {
      labels.push("Selected Restaurant:");
      restaurants.forEach((restaurant) => {
        labels.push(restaurant.label);
      });
    }

    return labels.join("\n");
  };

  console.log("selectedDates", selectedDates);
  const updateStep3Label = () => {
    const labels = [];

    if (
      selectedDates.firstRange &&
      selectedDates.firstRange.startDate &&
      selectedDates.firstRange.endDate
    ) {
      const formattedStartDate = new Date(
        selectedDates.firstRange.startDate
      ).toLocaleDateString();
      const formattedEndDate = new Date(
        selectedDates.firstRange.endDate
      ).toLocaleDateString();

      labels.push(`Selected Start Date: ${formattedStartDate}`);
      labels.push(`Selected End Date: ${formattedEndDate}`);
    }

    if (
      selectedDates.secondRangeEnabled &&
      selectedDates.secondRange &&
      selectedDates.secondRange.startDate &&
      selectedDates.secondRange.endDate
    ) {
      const formattedSecondStartDate = new Date(
        selectedDates.secondRange.startDate
      ).toLocaleDateString();
      const formattedSecondEndDate = new Date(
        selectedDates.secondRange.endDate
      ).toLocaleDateString();

      labels.push(`Second Start Date: ${formattedSecondStartDate}`);
      labels.push(`Second End Date: ${formattedSecondEndDate}`);
    }

    // Join the labels with line breaks
    const labelString = labels.join("\n");

    return (
      <div>
        {labelString.split("\n").map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="card-container">
      <Grid
        container
        alignItems="center"
        style={{
          backgroundColor: "#fff",
          padding: "1rem",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
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
                        {updateStep1Label()}
                      </Typography>
                    )}
                    {index === 1 && (
                      <Typography variant="body2" color="textSecondary">
                        {updateStep2Label()}
                      </Typography>
                    )}
                    {index === 2 && (
                      <Typography variant="body2" color="textSecondary">
                        {updateStep3Label()}
                      </Typography>
                    )}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>

        <Box
          sx={{
            p: 2,
            flexGrow: 2,
          }}
        >
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
              setSelectedFullName={setFullNames}
              restaurants={restaurants}
              setSelectedRestaurant={setRestaurants}
              tried={tried}
              setSelectedTried={setTried}
              handleBack={handleBack}
            />
          )}
          {activeStep === 2 && (
            <Step3
              handleNavigation={handleNavigation}
              handleBack={handleBack}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />
          )}
          {activeStep === 3 && (
            <Step4
              handleBack={handleBack}
              selectedCountry={selectedCountry}
              selectedCity={selectedCity}
              fullNames={fullNames}
              restaurants={restaurants}
              selectedDates={selectedDates}
              selectedDatesSecond={selectedDatesSecond}
            />
          )}
        </Box>
      </Grid>
    </div>
  );
}

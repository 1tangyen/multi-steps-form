import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
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
  const [fullQuery, setFullQuery] = useState({});

  // Define state for the form data
  const [formData, setFormData] = useState({
    selectedCountry: [],
    selectedCity: [],
    filteredData: [],
    fullNames: [],
    restaurants: [],
    tried: [],
    dateData: [{}],
    // startDate: dayjs(new Date()).subtract(1, "year"),
    // endDate: dayjs(new Date()),
    // prevStartDate: dayjs(new Date()).subtract(2, "year"),
    // prevEndDate: dayjs(new Date()),
  });

  const handleNavigation = (action, selectedOptions) => {
    if (action === "next") {
      if (activeStep === 0) {
        setFormData({
          ...formData,
          selectedCountry: selectedOptions.selectedCountry,
          selectedCity: selectedOptions.selectedCity,
          filteredData: selectedOptions.filteredData,
        });
      } else if (activeStep === 1) {
        setFormData({
          ...formData,
          fullNames: selectedOptions.fullNames,
          restaurants: selectedOptions.restaurants,
          tried: selectedOptions.tried,
        });
      } else if (activeStep === 2) {
        setFormData({
          ...formData,
          dateData: selectedOptions,
        });
      } else if (activeStep === 3) {
        setFormData({
          ...formData,
        });
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (action === "back") {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1
            handleNavigation={handleNavigation}
            formData={formData}
            setFormData={setFormData}
            selectedCountry={formData.selectedCountry}
            selectedCity={formData.selectedCity}
            setSelectedCountry={(selectedOptions) =>
              setFormData({
                ...formData,
                selectedCountry: selectedOptions,
              })
            }
            setSelectedCity={(selectedOptions) =>
              setFormData({
                ...formData,
                selectedCity: selectedOptions,
              })
            }
            filteredData={formData.filteredData}
            fullNames={formData.fullNames}
            restaurants={formData.restaurants}
            tried={formData.tried}
          />
        );
      case 1:
        return (
          <Step2
            handleBack={handleBack}
            handleNavigation={handleNavigation}
            selectedCountry={formData.selectedCountry}
            selectedCity={formData.selectedCity}
            formData={formData}
            setFormData={setFormData}
            fullNames={formData.fullNames}
            setFullNames={(selectedOptions) =>
              setFormData({
                ...formData,
                fullNames: selectedOptions,
              })
            }
            restaurants={formData.restaurants}
            setRestaurants={(selectedOptions) =>
              setFormData({
                ...formData,
                restaurants: selectedOptions,
              })
            }
            tried={formData.tried}
            setTried={(selectedOptions) =>
              setFormData({
                ...formData,
                tried: selectedOptions,
              })
            }
            setFullQuery={setFullQuery} // Pass setFullQuery function
          />
        );
      case 2:
        return (
          <Step3
            handleNavigation={handleNavigation}
            handleBack={handleBack}
            formData={formData}
            setFormData={setFormData}
            dateData={formData.dateData}
            setDateData={(selectedOptions) =>
              setFormData({
                ...formData,
                dateData: selectedOptions,
              })
            }
          />
        );
      case 3:
        return (
          <Step4
            formData={formData}
            handleBack={handleBack}
            fullQuery={fullQuery} // Pass fullQuery to Step4
          />
        );
      default:
        return "Unknown step";
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // console.log("fullQuery", fullQuery);

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
        <div
          style={{ flex: "0 0 250px", marginRight: "20px", marginLeft: "30px" }}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              // Check if the step is active or completed
              const isStepActive = index === activeStep;
              const isStepCompleted = index < activeStep;

              // Define custom styles for active and completed steps
              const activeStepStyles = {
                color: "#83BCA9",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              };

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    {...labelProps}
                    sx={{
                      color: isStepActive
                        ? "#83BCA9"
                        : isStepCompleted
                        ? "#83BCA9"
                        : "#E0E0E0",

                      "& .MuiStepIcon-root.Mui-active": { color: "#83BCA9" },
                      "& .MuiStepIcon-root.Mui-completed": { color: "#83BCA9" },
                      "& .MuiStepLabel-label.Mui-active": isStepActive
                        ? activeStepStyles
                        : { color: "inherit" }, // Use custom styles for active steps
                      "& .MuiStepLabel-label.Mui-completed": isStepCompleted
                        ? activeStepStyles
                        : { color: "inherit" }, // Use custom styles for completed steps
                      "& .MuiStepLabel-label": {
                        "&:hover": isStepActive
                          ? activeStepStyles
                          : { color: "inherit" }, // Use custom styles for hover on active steps
                      },
                    }}
                  >
                    {label}
                    {index === 0 && (
                      <Typography variant="body2" color="textSecondary">
                        {/* Display relevant data for Step 1 */}
                      </Typography>
                    )}
                    {index === 1 && (
                      <Typography variant="body2" color="textSecondary">
                        {/* Display relevant data for Step 2 */}
                      </Typography>
                    )}
                    {index === 2 && (
                      <Typography variant="body2" color="textSecondary">
                        {/* Display relevant data for Step 3 */}
                      </Typography>
                    )}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 3 && (
            <React.Fragment>
              <Typography
                variant="h5"
                style={{
                  color: "#A24936",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  margin: "1rem 0",
                }}
              >
                All steps completed - you're finished
              </Typography>
              <Button
                variant="contained"
                onClick={handleReset}
                style={{
                  borderRadius: 55,
                  backgroundColor: "#D36135",
                  color: "#fff",
                  marginLeft: "1rem",
                }}
                color="primary"
              >
                Start Over
              </Button>
            </React.Fragment>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {getStepContent(activeStep)}
          </Box>
        </div>
      </Grid>
    </div>
  );
}

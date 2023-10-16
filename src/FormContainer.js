import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  Step,
  Stepper,
  StepLabel,
  Typography,
} from "@mui/material";
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
  const [fullQuery, setFullQuery] = useState({
    selectedCountry: [],
    selectedCity: [],
    fullNames: [],
    restaurants: [],
    tried: [],
    dateData: [{}],
  });

  const [formData, setFormData] = useState({
    selectedCountry: [],
    selectedCity: [],
    filteredData: [],
    fullNames: [],
    restaurants: [],
    tried: [],
    dateData: [{}],
  });

  const handleNavigation = (action, selectedOptions) => {
    if (action === "next") {
      setFormData((prevData) => ({
        ...prevData,
        ...selectedOptions,
      }));
      setActiveStep((prevStep) => prevStep + 1);
    } else if (action === "back") {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFullQuery({
      selectedCountry: [],
      selectedCity: [],
      fullNames: [],
      restaurants: [],
      tried: [],
      dateData: [{}],
    });
    setFormData({
      selectedCountry: [],
      selectedCity: [],
      filteredData: [],
      fullNames: [],
      restaurants: [],
      tried: [],
      dateData: [{}],
    });
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
              setFormData((prevData) => ({
                ...prevData,
                selectedCountry: selectedOptions,
              }))
            }
            setSelectedCity={(selectedOptions) =>
              setFormData((prevData) => ({
                ...prevData,
                selectedCity: selectedOptions,
              }))
            }
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
              setFormData((prevData) => ({
                ...prevData,
                fullNames: selectedOptions,
              }))
            }
            restaurants={formData.restaurants}
            setRestaurants={(selectedOptions) =>
              setFormData((prevData) => ({
                ...prevData,
                restaurants: selectedOptions,
              }))
            }
            tried={formData.tried}
            setTried={(selectedOptions) =>
              setFormData((prevData) => ({
                ...prevData,
                tried: selectedOptions,
              }))
            }
            setFullQuery={setFullQuery}
          />
        );
      case 2:
        return (
          <Step3
            handleNavigation={handleNavigation}
            handleBack={handleBack}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <Step4
            formData={formData}
            fullQuery={fullQuery}
            dateData={formData.dateData}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const content = getStepContent(activeStep);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        color: "#424242",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            const isStepActive = index === activeStep;
            const isStepCompleted = index < activeStep;

            const activeStepStyles = {
              color: "#FEC5BB",
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
                      : { color: "inherit" },
                    "& .MuiStepLabel-label.Mui-completed": isStepCompleted
                      ? activeStepStyles
                      : { color: "inherit" },
                    "& .MuiStepLabel-label": {
                      "&:hover": isStepActive
                        ? activeStepStyles
                        : { color: "inherit" },
                    },
                  }}
                >
                  {label}
                  {isStepActive && activeStep > 0 && (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      style={{
                        borderRadius: 55,
                        backgroundColor: "#D36135",
                        color: "#fff",
                        marginLeft: "1rem",
                      }}
                      color="primary"
                    >
                      Back
                    </Button>
                  )}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", px: [2, 4] }}
      >
        <Grid item xs={12} sm={10} md={9} lg={8} xl={6}>
          <Box
            sx={{
              maxWidth: "100%",
              width: "100%",
              p: [2, 4],
              bgcolor: "#fff",
              color: "#424242",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>
              Step {activeStep + 1}: {steps[activeStep]}
            </Typography>

            {content}

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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

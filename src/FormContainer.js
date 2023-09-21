import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Step1 from "./Step1";
import { Row, Col } from "react-bootstrap";
import "./App.css";
import Papa from "papaparse";

const steps = [
  {
    label: "Choose a Location",
  },
  {
    label: "Choose a Restaurant",
  },
  {
    label: "Choose Review Dates Period",
  },
  {
    label: "Review and Confirm",
  },
];

// Lazy-loaded child components
const LazyLoadedChildComponent1 = React.lazy(() => import("./Step1"));
const LazyLoadedChildComponent2 = React.lazy(() => import("./Step2"));
const LazyLoadedChildComponent3 = React.lazy(() => import("./Step3"));

export default function ParentComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    // Fetch the data here and filter it
    fetch("/example.csv") // Adjust the path to your data source
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        // Parse the CSV data and filter it
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            if (results.data) {
              const countries = [
                ...new Set(results.data.map((row) => row.Country)),
              ];
              const cities = [...new Set(results.data.map((row) => row.City))];
              setCountryList(countries);
              setCityList(cities);
              setDataLoaded(true); // Set dataLoaded to true when data is loaded
              // console.log("CSV data loaded:", results.data);
            } else {
              console.error("CSV data parsing failed.");
            }
          },
          error: function (error) {
            console.error("CSV parsing error:", error.message);
          },
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container>
      <Row style={{ mx: "auto", margin: 0 }}>
        <Col>
          <Paper style={{ boxShadow: "none" }}>
            <div>
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                classes={{ circle: "red-stepper-icon-circle" }}
              >
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      sx={{
                        color: index === activeStep ? "#FF6B6B" : "#E0E0E0", // Red for active step, grey for inactive steps
                        "& .MuiStepIcon-root.Mui-active": {
                          color: "#FF6B6B", // Light red color for active step icon
                        },
                        "& .MuiStepIcon-root.Mui-completed": {
                          color: "#FF6B6B", // Light red color for completed step icon
                        },
                      }}
                    >
                      {step.label}
                      <div>
                        {index === activeStep && (
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{
                                ml: 1,
                                backgroundColor: "#FF6B6B", // Light red color for button
                                color: "white",
                              }}
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{
                                ml: 1,
                                backgroundColor: "#FF6B6B", // Light red color for back button
                                color: "white", // White font color
                              }}
                            >
                              Back
                            </Button>
                          </div>
                        )}
                      </div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} style={{ padding: "16px" }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} style={{ marginTop: "8px" }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </div>
          </Paper>
        </Col>
        <Col>
          <Box p={1}>
            {dataLoaded ? (
              <React.Suspense fallback={<div>Loading...</div>}>
                <LazyLoadedChildComponent1
                  countryList={countryList}
                  cityList={cityList}
                />
              </React.Suspense>
            ) : (
              <Typography>Loading data...</Typography>
            )}
          </Box>
        </Col>
      </Row>
    </Grid>
  );
}

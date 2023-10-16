import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Form, Row, Alert, Button } from "react-bootstrap";
import { Typography, Paper, Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Container } from "react-bootstrap";

export default function Step3({
  handleNavigation,
  handleBack,
  dateData,
  setDateData,
}) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [startDate, setStartDate] = useState(
    dayjs(new Date()).subtract(1, "year")
  );
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [prevStartDate, setPrevStartDate] = useState(null);
  const [prevEndDate, setPrevEndDate] = useState(null);

  const handleToggle = () => setIsSwitchOn(!isSwitchOn);

  const formatAsDateString = (date) => {
    return date ? date.format("MM/DD/YYYY") : ""; // Format the date as a string if it exists
  };

  useEffect(() => {
    // Initialize startDate and endDate with default values
    const defaultStartDate = dayjs().subtract(1, "year");

    setStartDate(defaultStartDate);
    setEndDate(dayjs());
  }, []);

  useEffect(() => {
    // Initialize prevStartDate and prevEndDate with default values
    const defaultPrevStartDate = dayjs().subtract(2, "year");
    const defaultPrevEndDate = dayjs().subtract(1, "year");

    setPrevStartDate(defaultPrevStartDate);
    setPrevEndDate(defaultPrevEndDate);
  }, [isSwitchOn]);

  const validate = () => {
    const errors = [];

    if (!startDate || !endDate) {
      errors.push("Please select both start and end dates.");
    } else if (
      dayjs(startDate).isAfter(dayjs(endDate)) ||
      dayjs(startDate).isSame(dayjs(endDate))
    ) {
      errors.push("Start date must be before end date.");
    }

    if (isSwitchOn) {
      if (!prevStartDate || !prevEndDate) {
        errors.push("Please select both previous start and end dates.");
      } else if (
        dayjs(prevStartDate).isAfter(dayjs(prevEndDate)) ||
        dayjs(prevStartDate).isSame(dayjs(prevEndDate))
      ) {
        errors.push("Previous start date must be before previous end date.");
      } else if (
        dayjs(prevStartDate).isAfter(dayjs(startDate)) ||
        dayjs(prevStartDate).isSame(dayjs(startDate))
      ) {
        errors.push(
          "Previous start date must be before the formDateData start date."
        );
      } else if (
        dayjs(prevEndDate).isAfter(dayjs(endDate)) ||
        dayjs(prevEndDate).isSame(dayjs(endDate))
      ) {
        errors.push(
          "Previous end date must be before the formDateData end date."
        );
      }
    }

    setErrorMessages(errors);

    return errors.length === 0;
  };

  const clearSelectedOptions = () => {
    setStartDate(dayjs());
    setEndDate(dayjs());
    setPrevStartDate(dayjs());
    setPrevEndDate(dayjs());
  };

  const handleNext = () => {
    if (validate()) {
      const dateData = {
        startDate: formatAsDateString(startDate),
        endDate: formatAsDateString(endDate),
      };

      if (isSwitchOn) {
        dateData.prevStartDate = formatAsDateString(prevStartDate);
        dateData.prevEndDate = formatAsDateString(prevEndDate);
      }

      // Pass dateData to FormContainer
      console.log("dateData", dateData);
      handleNavigation("next", { dateData });
    }
  };

  return (
    <div className="form-content">
      <Container>
        <div className="form">
          {errorMessages.length > 0 && (
            <Alert variant="danger">
              {errorMessages.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </Alert>
          )}
          <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Start date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    format="MM/DD/YYYY"
                  />
                  <DatePicker
                    label="End date"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    format="MM/DD/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="switch"
              label="Add a review data from the previous date"
              onClick={handleToggle}
            />
            {isSwitchOn && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Previous start date"
                    value={prevStartDate}
                    onChange={(newValue) => {
                      setPrevStartDate(newValue);
                    }}
                    format="MM/DD/YYYY"
                  />
                  <DatePicker
                    label="Previous end date"
                    value={prevEndDate}
                    onChange={(newValue) => {
                      setPrevEndDate(newValue);
                    }}
                    format="MM/DD/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}
          </Form.Group>
          <div className="mb-3">
            <Button
              variant="text"
              onClick={() => {
                handleBack();
              }}
              style={{
                borderRadius: 55,
                backgroundColor: "#fff",
                color: "#282B28",
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              style={{
                size: "",
                borderRadius: 55,
                backgroundColor: "#83BCA9",
              }}
              type="submit"
              onClick={handleNext}
            >
              Next Step
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Box from "@mui/material/Box";

function Step3({
  handleNavigation,
  handleBack,
  selectedDates,
  setSelectedDates,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [secondRangeEnabled, setSecondRangeEnabled] = useState(false);
  const [secondStartDate, setSecondStartDate] = useState("");
  const [secondEndDate, setSecondEndDate] = useState("");
  const [error, setError] = useState("");
  console.log(startDate);
  const handleNext = () => {
    setError(""); // Clear any existing error message

    if (!startDate || !endDate) {
      setError(
        "Please select both a start date and an end date for the first range."
      );
      return;
    }

    const today = new Date();
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    if (selectedStartDate > today || selectedEndDate > today) {
      setError(
        "Start date and end date for the first range cannot be later than today."
      );
      return;
    }

    if (selectedStartDate > selectedEndDate) {
      setError(
        "End date for the first range cannot be earlier than the start date."
      );
      return;
    }

    let dataToLog = {
      firstRange: { startDate, endDate },
    };

    if (secondRangeEnabled) {
      if (!secondStartDate || !secondEndDate) {
        setError(
          "Please select both a start date and an end date for the second range."
        );
        return;
      }

      const selectedSecondStartDate = new Date(secondStartDate);
      const selectedSecondEndDate = new Date(secondEndDate);

      if (selectedSecondStartDate > today || selectedSecondEndDate > today) {
        setError(
          "Start date and end date for the second range cannot be later than today."
        );
        return;
      }

      if (selectedSecondStartDate > selectedSecondEndDate) {
        setError(
          "End date for the second range cannot be earlier than the start date."
        );
        return;
      }

      dataToLog = {
        ...dataToLog,
        secondRange: { startDate: secondStartDate, endDate: secondEndDate },
      };
    }

    // Call setSelectedDates to pass the selected dates to the parent component
    setSelectedDates(dataToLog);

    // Continue with navigation
    handleNavigation("next", dataToLog);
  };
  console.log(selectedDates.firstRange);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setError(""); // Clear error when start date is changed
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setError(""); // Clear error when end date is changed
  };

  const handleSecondRangeToggle = () => {
    setSecondRangeEnabled((prev) => !prev);

    // Clear the second range date fields when disabling the toggle
    if (!secondRangeEnabled) {
      setSecondStartDate("");
      setSecondEndDate("");
    }
  };

  const handleSecondStartDateChange = (e) => {
    setSecondStartDate(e.target.value);
    setError(""); // Clear error when second start date is changed
  };

  const handleSecondEndDateChange = (e) => {
    setSecondEndDate(e.target.value);
    setError(""); // Clear error when second end date is changed
  };

  return (
    <Container>
      <h4 className="mb-4">Step 3: Choose Review Dates Period</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="secondRangeToggle"
            label="Enable Second Date Range"
            checked={secondRangeEnabled}
            onChange={handleSecondRangeToggle}
          />
        </Form.Group>
        {secondRangeEnabled && (
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Second Start Date:</Form.Label>
              <Form.Control
                type="date"
                value={secondStartDate}
                onChange={handleSecondStartDateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Second End Date:</Form.Label>
              <Form.Control
                type="date"
                value={secondEndDate}
                onChange={handleSecondEndDateChange}
              />
            </Form.Group>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
          <Button
            variant="contained"
            style={{
              size: "",
              borderRadius: 55,
              backgroundColor: "#83BCA9",
              marginLeft: "1rem",
            }}
            type="button"
            onClick={handleNext}
          >
            Next Step
          </Button>
        </Box>
      </Form>
    </Container>
  );
}

export default Step3;

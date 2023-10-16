import React, { useState, useEffect, memo } from "react";
import { Container, Form, Button, Row, Alert } from "react-bootstrap";
import Select from "react-select";
import { Box } from "@mui/material";

function Step2({
  handleBack,
  handleNavigation,
  selectedCountry,
  selectedCity,
  setFormData,
  formData,
  fullNames,
  setFullNames,
  restaurants,
  setRestaurants,
  tried,
  setTried,
  setFullQuery,
}) {
  const [errorMessages, setErrorMessages] = useState([]);
  const [options, setOptions] = useState({
    fullNames: [],
    restaurants: [],
    tried: [],
  });
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [triedOptions, setTriedOptions] = useState([]);

  useEffect(() => {
    if (formData.filteredData && formData.filteredData.length > 0) {
      const uniqueValues = (fieldName) => [
        ...new Set(formData.filteredData.map((item) => item[fieldName])),
      ];

      setOptions({
        fullNames: uniqueValues("full_name").map((value) => ({
          label: value,
          value,
        })),
        restaurants: uniqueValues("Restaurant").map((value) => ({
          label: value,
          value,
        })),
        tried: uniqueValues("Tried").map((value) => ({
          label: value,
          value,
        })),
      });
    }
  }, [formData.filteredData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    // Ensure that fullNames, restaurants, and tried are not undefined
    const selectedFullNames = fullNames ?? [];
    const selectedRestaurants = restaurants ?? [];
    const selectedTried = tried ?? [];

    if (!selectedFullNames.length && !selectedRestaurants.length) {
      errors.push("Please select at least one Full Name or Restaurant.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    const selectedOptionsToValues = (selectedOptions) =>
      selectedOptions.map((option) => option.value);

    const fullQuery = {
      fullNames: selectedOptionsToValues(selectedFullNames),
      restaurants: selectedOptionsToValues(selectedRestaurants),
      tried: selectedOptionsToValues(selectedTried),
      country: selectedCountry.map((country) => country.value),
      city: selectedCity.map((city) => city.value),
    };

    // Update the fullQuery state in FormContainer
    console.log("fullQuery in Step2.js", fullQuery);
    setFullQuery(fullQuery);

    // Proceed to the next step
    handleNavigation("next", { fullQuery });
  };

  const clearSelectedOptions = () => {
    setFormData({
      ...formData,
      fullNames: [],
      restaurants: [],
      tried: [],
    });
  };

  const handleSelectChange = (selectedOptions, setter, fieldName) => {
    if (selectedOptions && selectedOptions.length > 0) {
      setErrorMessages([]);
      const selectedValues = selectedOptions.map((option) => option.value);
      setter(selectedOptions);

      const fieldForSelectedValues = [
        ...new Set(
          formData.filteredData
            .filter((item) => selectedValues.includes(item[fieldName]))
            .map((item) => item[fieldName])
        ),
      ];

      const setOptionsFunction =
        fieldName === "full_name"
          ? setOptions
          : fieldName === "Restaurant"
          ? setRestaurantOptions
          : setTriedOptions;

      setOptionsFunction(
        fieldForSelectedValues.map((value) => ({
          label: value,
          value,
        }))
      );
    } else {
      const fieldValues = [
        ...new Set(formData.filteredData.map((row) => row[fieldName])),
      ];
      setOptions(fieldValues.map((value) => ({ label: value, value })));
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
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              {Object.keys(options).map((fieldName) => (
                <Form.Group md={6} key={fieldName}>
                  <Form.Label
                    htmlFor={`${fieldName}Select`}
                    className="form-label"
                  >
                    {fieldName === "fullNames" ? "Full Name" : fieldName}:
                  </Form.Label>
                  <Select
                    id={`${fieldName}Select`}
                    isClearable
                    options={options[fieldName]}
                    value={
                      fieldName === "fullNames"
                        ? fullNames
                        : fieldName === "restaurants"
                        ? restaurants
                        : tried
                    }
                    onChange={(selectedOptions) => {
                      handleSelectChange(
                        selectedOptions,
                        fieldName === "fullNames"
                          ? setFullNames
                          : fieldName === "restaurants"
                          ? setRestaurants
                          : setTried,
                        fieldName
                      );
                    }}
                    isMulti
                    placeholder={`Select ${fieldName}`}
                  />
                </Form.Group>
              ))}
            </Row>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                variant="text"
                onClick={() => {
                  handleBack();
                  clearSelectedOptions();
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
              >
                Next Step
              </Button>
            </Box>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default memo(Step2);

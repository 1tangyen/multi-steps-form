import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Alert } from "react-bootstrap";
import Select from "react-select";
import Box from "@mui/material/Box";

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
  const [query, setQuery] = useState("");
  const [fullNameOptions, setFullNameOptions] = useState([]);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [triedOptions, setTriedOptions] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (formData.filteredData && formData.filteredData.length > 0) {
      const uniqueTried = [
        ...new Set(formData.filteredData.map((item) => item.Tried)),
      ];
      const fullNames = [
        ...new Set(formData.filteredData.map((row) => row.full_name)),
      ];
      const restaurants = [
        ...new Set(formData.filteredData.map((row) => row.Restaurant)),
      ];

      setFullNameOptions(fullNames.map((value) => ({ label: value, value })));
      setRestaurantOptions(
        restaurants.map((value) => ({ label: value, value }))
      );
      setTriedOptions(uniqueTried.map((value) => ({ label: value, value })));
    }
  }, [formData.filteredData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = [];

    if (!fullNames.length && !restaurants.length) {
      errors.push("Please select at least one Full Name or Restaurant.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    let fullQuery = {};

    if (fullNames.length > 0) {
      fullQuery.fullNames = fullNames.map((name) => name.value);
    }

    if (restaurants.length > 0) {
      fullQuery.restaurants = restaurants.map((restaurant) => restaurant.value);
    }

    if (tried.length > 0) {
      fullQuery.tried = tried.map((option) => option.value);
    }

    if (selectedCountry) {
      fullQuery.country = selectedCountry.map((country) => country.value);
    }

    if (selectedCity) {
      fullQuery.city = selectedCity.map((city) => city.value);
    }

    // Update the fullQuery state in FormContainer
    setFullQuery(fullQuery);

    // Proceed to the next step
    handleNavigation("next", {
      fullQuery,
    });
  };

  const clearSelectedOptions = () => {
    setFormData({
      ...formData,
      fullNames: [],
      restaurants: [],
      tried: [],
    });
  };

  const handleFullNameChange = (selectedOptions) => {
    const selectedFullNames = selectedOptions.map((option) => option.value);
    setFullNames(selectedOptions);
    const restaurantsForSelectedFullNames = [
      ...new Set(
        formData.filteredData
          .filter((item) => selectedFullNames.includes(item.full_name))
          .map((item) => item.Restaurant)
      ),
    ];

    setRestaurantOptions(
      restaurantsForSelectedFullNames.map((value) => ({
        label: value,
        value: value,
      }))
    );

    const triedForSelectedFullNames = [
      ...new Set(
        formData.filteredData
          .filter((item) => selectedFullNames.includes(item.full_name))
          .map((item) => item.Tried)
      ),
    ];

    setTriedOptions(
      triedForSelectedFullNames.map((value) => ({
        label: value,
        value: value,
      }))
    );
  };

  const handleRestaurantChange = (selectedOptions) => {
    const selectedRestaurantNames = selectedOptions.map(
      (option) => option.value
    );
    setRestaurants(selectedOptions);
    const fullNamesForSelectedRestaurants = [
      ...new Set(
        formData.filteredData
          .filter((item) => selectedRestaurantNames.includes(item.Restaurant))
          .map((item) => item.full_name)
      ),
    ];

    setFullNameOptions(
      fullNamesForSelectedRestaurants.map((value) => ({
        label: value,
        value: value,
      }))
    );

    const triedForSelectedRestaurants = [
      ...new Set(
        formData.filteredData
          .filter((item) => selectedRestaurantNames.includes(item.Restaurant))
          .map((item) => item.Tried)
      ),
    ];

    setTriedOptions(
      triedForSelectedRestaurants.map((value) => ({
        label: value,
        value: value,
      }))
    );
  };

  return (
    <Container>
      <h4 className="mb-4">Step 2: Create Your Query</h4>
      {errorMessages.length > 0 && (
        <Alert variant="danger">
          {errorMessages.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group md={6}>
            <Form.Label htmlFor="fullNameSelect" className="form-label">
              Full Name:
            </Form.Label>
            <Select
              id="fullNameSelect"
              isClearable
              options={fullNameOptions}
              value={fullNames}
              onChange={handleFullNameChange}
              isMulti
              placeholder="Select Full Name"
            />
          </Form.Group>
          <Form.Group md={6}>
            <Form.Label htmlFor="restaurantSelect" className="form-label">
              Restaurant:
            </Form.Label>
            <Select
              id="restaurantSelect"
              isClearable
              options={restaurantOptions}
              value={restaurants}
              onChange={handleRestaurantChange}
              isMulti
              placeholder="Select Restaurant"
            />
          </Form.Group>
          <Form.Group md={6}>
            <Form.Label htmlFor="restaurantSelect" className="form-label">
              Tried:
            </Form.Label>
            <Select
              id="restaurantSelect"
              isClearable
              options={triedOptions}
              value={tried}
              onChange={(selectedOptions) => setTried(selectedOptions)}
              isMulti
              placeholder="Select Restaurant"
            />
          </Form.Group>
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
    </Container>
  );
}

export default Step2;

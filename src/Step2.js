import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import Select from "react-select";

function Step2({
  handleNavigation,
  selectedCountry,
  selectedCity,
  filteredStep1Data,
  fullNames,
  setSelectedFullName,
  restaurants,
  setSelectedRestaurant,
  tried,
  setSelectedTried,
}) {
  const [query, setQuery] = useState("");
  const [fullNameOptions, setFullNameOptions] = useState([]);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [triedOptions, setTriedOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (filteredStep1Data && filteredStep1Data.length > 0) {
      // Populate options based on filtered data
      const uniqueTried = [
        ...new Set(filteredStep1Data.map((item) => item.Tried)),
      ];
      const fullNames = [
        ...new Set(filteredStep1Data.map((row) => row.full_name)),
      ];
      const restaurants = [
        ...new Set(filteredStep1Data.map((row) => row.Restaurant)),
      ];

      setFullNameOptions(fullNames.map((value) => ({ label: value, value })));
      setRestaurantOptions(
        restaurants.map((value) => ({ label: value, value }))
      );
      setTriedOptions(uniqueTried.map((value) => ({ label: value, value })));
    }
  }, [filteredStep1Data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if at least one of Full Name or Restaurant is selected
    if (fullNames.length === 0 && restaurants.length === 0) {
      setError("Please select at least one Full Name or Restaurant.");
      return;
    } else {
      setError("");
    }

    let fullQuery = query;

    if (fullNames.length > 0) {
      fullQuery += ` Full Name: ${fullNames
        .map((name) => name.label)
        .join(", ")}`;
    }

    if (restaurants.length > 0) {
      fullQuery += ` Restaurant: ${restaurants
        .map((restaurant) => restaurant.label)
        .join(", ")}`;
    }

    if (tried.length > 0) {
      fullQuery += ` Tried: ${tried.map((option) => option.label).join(", ")}`;
    }

    handleNavigation("next", {
      selectedCountry,
      selectedCity,
      fullQuery,
    });
  };

  const handleFullNameChange = (selectedOptions) => {
    setSelectedFullName(selectedOptions);

    if (selectedOptions.length > 0) {
      const selectedFullNames = selectedOptions.map((option) => option.value);
      const restaurantsForSelectedFullNames = [
        ...new Set(
          filteredStep1Data
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
          filteredStep1Data
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
    } else {
      setRestaurantOptions([]);
      setTriedOptions([]);
    }
  };

  const handleRestaurantChange = (selectedOptions) => {
    setSelectedRestaurant(selectedOptions);

    if (selectedOptions.length > 0) {
      const selectedRestaurantNames = selectedOptions.map(
        (option) => option.value
      );
      const fullNamesForSelectedRestaurants = [
        ...new Set(
          filteredStep1Data
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
          filteredStep1Data
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
    } else {
      setFullNameOptions([]);
      setTriedOptions([]);
    }
  };

  return (
    <Container>
      <h4 className="mb-4">Step 2: Create Your Query</h4>
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
        </Row>
        <Row className="mb-3">
          <Form.Group md={12}>
            <Form.Label htmlFor="triedSelect" className="form-label">
              Tried (optional):
            </Form.Label>
            <Select
              id="triedSelect"
              isMulti
              options={triedOptions}
              value={tried}
              onChange={(selectedOptions) => setSelectedTried(selectedOptions)}
              placeholder="Select Tried options"
            />
          </Form.Group>
        </Row>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Row>
          <Button
            variant="contained"
            style={{
              borderRadius: 55,
              backgroundColor: "#83BCA9",
            }}
            type="submit"
          >
            Next Step
          </Button>
        </Row>
        <Row className="mt-3">
          <div>
            <p>
              Selected Full Names:{" "}
              {fullNames.map((name) => name.label).join(", ")}
            </p>
            <p>
              Selected Restaurants:{" "}
              {restaurants.map((restaurant) => restaurant.label).join(", ")}
            </p>
          </div>
        </Row>
      </Form>
    </Container>
  );
}

export default Step2;

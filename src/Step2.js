import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import Select from "react-select";

function Step2({
  handleNavigation,
  selectedCountry,
  selectedCity,
  filteredStep1Data,
}) {
  const [query, setQuery] = useState("");
  const [fullNameOptions, setFullNameOptions] = useState([]);
  const [fullName, setFullName] = useState(null);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [triedOptions, setTriedOptions] = useState([]);
  const [tried, setTried] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (filteredStep1Data && filteredStep1Data.length > 0) {
      const uniqueTried = Array.from(
        new Set(filteredStep1Data.map((item) => item.Tried))
      ).map((value) => ({ label: value, value: value }));

      const fullNames = Array.from(
        new Set(filteredStep1Data.map((row) => row.full_name))
      ).map((value) => ({ label: value, value: value }));

      const restaurants = Array.from(
        new Set(filteredStep1Data.map((row) => row.Restaurant))
      ).map((value) => ({ label: value, value: value }));

      setFullNameOptions(fullNames);
      setRestaurantOptions(restaurants);
      setTriedOptions(uniqueTried);
    }
  }, [filteredStep1Data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if at least one of Full Name or Restaurant is selected
    if (!fullName && !restaurant) {
      setError("Please select at least one of Full Name or Restaurant.");
      return;
    } else {
      setError("");
    }

    let fullQuery = query;

    if (fullName) {
      fullQuery += ` Full Name: ${fullName.label}`;
    }

    if (restaurant) {
      fullQuery += ` Restaurant: ${restaurant.label}`;
    }

    if (tried && tried.length > 0) {
      fullQuery += ` Tried: ${tried.map((option) => option.label).join(", ")}`;
    }

    handleNavigation("next", {
      selectedCountry,
      selectedCity,
      fullQuery,
    });
  };

  const handleFullNameChange = (selectedOption) => {
    setFullName(selectedOption);

    if (selectedOption) {
      const selectedFullNames = [selectedOption.value];
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

  const handleRestaurantChange = (selectedOption) => {
    setRestaurant(selectedOption);

    if (selectedOption) {
      const selectedRestaurantName = [selectedOption.value];
      const fullNamesForSelectedRestaurant = [
        ...new Set(
          filteredStep1Data
            .filter((item) => selectedRestaurantName.includes(item.Restaurant))
            .map((item) => item.full_name)
        ),
      ];

      setFullNameOptions(
        fullNamesForSelectedRestaurant.map((value) => ({
          label: value,
          value: value,
        }))
      );

      if (tried) {
        const triedForSelectedRestaurant = [
          ...new Set(
            filteredStep1Data
              .filter((item) =>
                selectedRestaurantName.includes(item.Restaurant)
              )
              .map((item) => item.Tried)
          ),
        ];

        setTriedOptions(
          triedForSelectedRestaurant.map((value) => ({
            label: value,
            value: value,
          }))
        );
      }
    } else {
      setFullNameOptions([]);
      if (!tried) {
        setTriedOptions([]);
      }
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
              options={fullNameOptions}
              value={fullName}
              onChange={handleFullNameChange}
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
              value={restaurant}
              onChange={handleRestaurantChange}
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
              onChange={(selectedOptions) => setTried(selectedOptions)}
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
              Selected Countries:{" "}
              {selectedCountry.map((country) => country.label).join(", ")}
            </p>
            <p>
              Selected Cities:{" "}
              {selectedCity.map((city) => city.label).join(", ")}
            </p>
          </div>
        </Row>
      </Form>
    </Container>
  );
}

export default Step2;

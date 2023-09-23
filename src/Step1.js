import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import Select from "react-select";
import Papa from "papaparse";

function Step1({
  handleNavigation,
  selectedCountry,
  selectedCity,
  setSelectedCountry,
  setSelectedCity,
}) {
  const [fetchedData, setFetchedData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [formErrors, setFormErrors] = useState({
    country: "",
    city: "",
  });

  // Function to reset selections and errors
  const handleReset = () => {
    setSelectedCountry([]);
    setSelectedCity([]);
    setFormErrors({
      country: "",
      city: "",
    });
  };

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
              setFetchedData(results.data);
              const countries = [
                ...new Set(results.data.map((row) => row.Country)),
              ];
              const cities = [...new Set(results.data.map((row) => row.City))];

              setCountryList(countries); // Initialize countryList
              setCityList(cities); // Initialize cityList
              // console.log("CSV data loaded:", results.data);
              setDataLoaded(true); // Set dataLoaded to true when data is loaded
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

  const handleCountryChange = (selectedOptions) => {
    setSelectedCountry(selectedOptions);
    if (selectedOptions.length > 0) {
      // Filter city options based on selected countries
      const selectedCountries = selectedOptions.map((option) => option.value);
      const citiesForSelectedCountries = [
        ...new Set(
          fetchedData
            .filter((item) => selectedCountries.includes(item.Country))
            .map((item) => item.City)
        ),
      ];
      setCityList(citiesForSelectedCountries);
    } else {
      // Reset city options when no countries are selected
      setCityList([]);
    }
  };

  const handleCityChange = (selectedOptions) => {
    setSelectedCity(selectedOptions);
    if (selectedOptions.length > 0) {
      // Filter country options based on selected cities
      const selectedCities = selectedOptions.map((option) => option.value);
      const countriesForSelectedCities = [
        ...new Set(
          fetchedData
            .filter((item) => selectedCities.includes(item.City))
            .map((item) => item.Country)
        ),
      ];
      setCountryList(countriesForSelectedCities);
    } else {
      // Reset country options when no cities are selected
      setCountryList([]);
    }
  };

  const formattedCountryList = countryList.map((country) => ({
    label: country,
    value: country,
  }));

  const formattedCityList = cityList.map((city) => ({
    label: city,
    value: city,
  }));

  // Function to filter data based on selected options
  const filterData = (selectedOptions) => {
    const filteredData = fetchedData.filter((item) => {
      if (
        selectedOptions.selectedCountry.length > 0 &&
        selectedOptions.selectedCity.length > 0
      ) {
        // Check if the item's Country and City are included in the selected options
        return (
          selectedOptions.selectedCountry.some(
            (country) => country.label === item.Country
          ) &&
          selectedOptions.selectedCity.some((city) => city.label === item.City)
        );
      } else if (selectedOptions.selectedCountry.length > 0) {
        // Check if the item's Country is included in the selected options
        return selectedOptions.selectedCountry.some(
          (country) => country.label === item.Country
        );
      } else if (selectedOptions.selectedCity.length > 0) {
        // Check if the item's City is included in the selected options
        return selectedOptions.selectedCity.some(
          (city) => city.label === item.City
        );
      }
      return true;
    });
    return filteredData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormErrors = {};
    if (!selectedCountry.length && !selectedCity.length) {
      newFormErrors.country = "Please select at least one option";
      newFormErrors.city = "Please select at least one option";
    } else {
      newFormErrors.country = "";
      newFormErrors.city = "";
    }

    setFormErrors(newFormErrors);

    const hasErrors = Object.values(newFormErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      // Filter the data based on selected options
      const filteredStep1Data = filterData({
        selectedCountry,
        selectedCity,
      });
      // Log the filtered data
      console.log("Filtered Data:", filteredStep1Data);
      // Pass the selected options and filtered data to the parent component
      handleNavigation("next", {
        selectedCountry,
        selectedCity,
        filteredData: filteredStep1Data,
      });
    }
  };

  // Display the selected options in the stepper label
  const selectedCountryLabels =
    selectedCountry.length > 0 &&
    selectedCountry.map((option) => option.label).join(", ");

  const selectedCityLabels =
    selectedCity.length > 0 &&
    selectedCity.map((option) => option.label).join(", ");

  const stepperLabel = (
    <div>
      Step 1: Choose One or Both
      {selectedCountry.length > 0 && (
        <div>Selected Countries: {selectedCountryLabels}</div>
      )}
      {selectedCity.length > 0 && (
        <div>Selected Cities: {selectedCityLabels}</div>
      )}
    </div>
  );

  return (
    <Container>
      {/* <h4 className="mb-4">{stepperLabel}</h4> */}
      <p>Enter countries and/or cities to continue.</p>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group md={6}>
            <Form.Label htmlFor="countrySelect" className="form-label">
              Enter a country name:
            </Form.Label>
            <Select
              id="countrySelect"
              isMulti
              className={`mb-2 ${formErrors.country ? "is-invalid" : ""}`}
              options={formattedCountryList}
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder="Select countries"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.country}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group md={6}>
            <Form.Label htmlFor="citySelect" className="form-label">
              Enter a city name:
            </Form.Label>
            <Select
              id="citySelect"
              isMulti
              className={`mb-2 ${formErrors.city ? "is-invalid" : ""}`}
              options={formattedCityList}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Select cities"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
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
          <Button
            variant="outlined"
            style={{
              borderRadius: 55,
              marginLeft: "10px",
            }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default Step1;

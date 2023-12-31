import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import Select from "react-select";
import Papa from "papaparse";

import { Container, Button, Typography, Paper, Box } from "@mui/material";

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

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  // Function to fetch data and populate options

  const fetchDataAndPopulateOptions = async () => {
    try {
      const response = await fetch("/example.csv"); // Adjust the path to your data source
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const csvText = await response.text();
      const results = await new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: resolve,
          error: reject,
        });
      });

      if (results.data.length > 0) {
        setFetchedData(results.data);
        const countries = [...new Set(results.data.map((row) => row.Country))];
        const cities = [...new Set(results.data.map((row) => row.City))];

        setCountryList(countries);
        setCityList(cities);
        setCountryOptions(
          countries.map((country) => ({ label: country, value: country }))
        );
        setCityOptions(cities.map((city) => ({ label: city, value: city })));
        setDataLoaded(true);
      } else {
        console.error("CSV data parsing failed.");
      }
    } catch (error) {
      console.error("Data loading error:", error);
    }
  };

  useEffect(() => {
    fetchDataAndPopulateOptions();
  }, []);

  // Function to reset selections and errors
  const handleReset = () => {
    setSelectedCountry([]);
    setSelectedCity([]);
    setFormErrors({
      country: "",
      city: "",
    });
    // Refetch data to populate options again
    fetchDataAndPopulateOptions();
  };

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

      setCityOptions(
        citiesForSelectedCountries.map((city) => ({ label: city, value: city }))
      );
    } else {
      // Reset city options when no countries are selected
      setCityOptions([]);
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
      setCountryOptions(
        countriesForSelectedCities.map((country) => ({
          label: country,
          value: country,
        }))
      );
    } else {
      // Reset country options when no cities are selected
      setCountryList([]);
    }
  };

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
      // console.log("selectedCountry:", selectedCountry);
      // console.log("selectedCity:", selectedCity);

      handleNavigation("next", {
        selectedCountry,
        selectedCity,
        filteredData: filteredStep1Data,
      });
    }
  };

  return (
    <div className="form-content">
      <Container>
        <div className="form">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group md={6} className="label-align-left">
                {" "}
                {/* Add custom class for label alignment */}
                <Form.Label htmlFor="countrySelect">
                  Enter a country name:
                </Form.Label>
                <Select
                  id="countrySelect"
                  isClearable={false}
                  isMulti
                  className={`mb-2 select ${
                    formErrors.country ? "is-invalid" : ""
                  }`}
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  placeholder="Select countries"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.country}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group md={6} className="label-align-left">
                {" "}
                {/* Add custom class for label alignment */}
                <Form.Label htmlFor="citySelect">Enter a city name:</Form.Label>
                <Select
                  id="citySelect"
                  isClearable={false}
                  isMulti
                  className={`mb-2 select ${
                    formErrors.city ? "is-invalid" : ""
                  }`}
                  options={cityOptions}
                  value={selectedCity}
                  onChange={handleCityChange}
                  placeholder="Select cities"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Box className="buttons">
              <Button
                variant="text"
                onClick={handleReset}
                style={{
                  borderRadius: 55,
                  backgroundColor: "#fff",
                  color: "#282B28",
                }}
              >
                Reset
              </Button>
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
            </Box>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Step1;

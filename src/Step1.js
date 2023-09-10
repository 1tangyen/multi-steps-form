import React, { useState, useEffect } from "react";
import Papa from "papaparse";

function Step1({ initialValues, onSubmit, onReset }) {
  const [country, setCountry] = useState(initialValues.country);
  const [city, setCity] = useState(initialValues.city);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);

  useEffect(() => {
    // Fetch the CSV file asynchronously
    fetch("/example.csv") // Adjust the path to the CSV file
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        // Parse the CSV text using Papaparse
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: function (results) {
            if (results.data) {
              setFilteredData(results.data);
              const countries = [
                ...new Set(results.data.map((row) => row.Country)),
              ];
              const cities = [...new Set(results.data.map((row) => row.City))];
              setUniqueCountries(countries);
              setUniqueCities(cities);
              console.log("CSV data loaded:", results.data);
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
  }, []); // Empty dependency array ensures this effect runs only once

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);

    if (selectedCountry) {
      const filteredCities = uniqueCities.filter((cityName) =>
        filteredData.some(
          (row) => row.Country === selectedCountry && row.City === cityName
        )
      );
      setUniqueCities(filteredCities);
    } else {
      setUniqueCities([...new Set(filteredData.map((row) => row.City))]);
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    if (selectedCity) {
      const filteredCountries = uniqueCountries.filter((countryName) =>
        filteredData.some(
          (row) => row.City === selectedCity && row.Country === countryName
        )
      );
      setUniqueCountries(filteredCountries);
    } else {
      setUniqueCountries([...new Set(filteredData.map((row) => row.Country))]);
    }
  };

  const generateUniqueKey = (id, type) => {
    return `${type}_${id}`;
  };

  const handleSubmit = () => {
    let filtered = filteredData;

    if (country) {
      filtered = filtered.filter((row) => row.Country === country);
    }

    if (city) {
      filtered = filtered.filter((row) => row.City === city);
    }

    setFilteredData(filtered);
    onSubmit({ country, city });
  };

  const handleReset = () => {
    setCountry(""); // Reset country selection
    setCity(""); // Reset city selection
    setUniqueCountries([...new Set(filteredData.map((row) => row.Country))]); // Reset uniqueCountries
    setUniqueCities([...new Set(filteredData.map((row) => row.City))]); // Reset uniqueCities
    onReset();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Step 1</h2>
      <p className="text-muted">
        You can choose either or both of the following inputs: Country and City.
      </p>
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="countrySelect" className="form-label">
            Select Country:
          </label>
          <select
            id="countrySelect"
            className="form-select"
            value={country}
            onChange={handleCountryChange}
          >
            <option value="">All</option>
            {uniqueCountries.map((countryName) => (
              <option
                key={generateUniqueKey(countryName, "country")}
                value={countryName}
              >
                {countryName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="citySelect" className="form-label">
            Select City:
          </label>
          <select
            id="citySelect"
            className="form-select"
            value={city}
            onChange={handleCityChange}
          >
            <option value="">All</option>
            {uniqueCities.map((cityName) => (
              <option
                key={generateUniqueKey(cityName, "city")}
                value={cityName}
              >
                {cityName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-danger me-3"
          disabled={!country && !city}
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="btn btn-outline-danger "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Step1;

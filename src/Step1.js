//search bar with ListGroups for selection

// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";
// import { Container, Form, Button, ListGroup } from "react-bootstrap";

// export default function Step1() {
//   const [filteredData, setFilteredData] = useState([]);
//   const [fullName, setFullName] = useState("");
//   const [country, setCountry] = useState("");
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [filteredCountryResults, setFilteredCountryResults] = useState([]);
//   const [selectionMade, setSelectionMade] = useState(false); // State to track selection

//   useEffect(() => {
//     // Fetch the CSV file asynchronously
//     fetch("/example.csv") // Adjust the path to the CSV file
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.text();
//       })
//       .then((csvText) => {
//         // Parse the CSV text using Papaparse
//         Papa.parse(csvText, {
//           header: true,
//           dynamicTyping: true,
//           complete: function (results) {
//             if (results.data) {
//               setFilteredData(results.data);
//               console.log("CSV data loaded:", results.data);
//             } else {
//               console.error("CSV data parsing failed.");
//             }
//           },
//           error: function (error) {
//             console.error("CSV parsing error:", error.message);
//           },
//         });
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//       });
//   }, []); // Empty dependency array ensures this effect runs only once

//   const onChangeFullName = (event) => {
//     const searchTerm = event.target.value;
//     setFullName(searchTerm);
//     setSelectionMade(false); // Reset selection when typing

//     // Filter data based on the search term for full name
//     const filteredResults = filteredData.filter((item) => {
//       const fullName = item.full_name.toLowerCase();
//       return fullName.startsWith(searchTerm.toLowerCase());
//     });

//     setFilteredResults(filteredResults);
//   };

//   const onChangeCountry = (event) => {
//     const searchTerm = event.target.value;
//     setCountry(searchTerm);
//     setSelectionMade(false); // Reset selection when typing

//     // Filter data based on the search term for country
//     const filteredCountryResults = filteredData
//       .filter((item) => {
//         const countryName = item.Country.toLowerCase();
//         return countryName.startsWith(searchTerm.toLowerCase());
//       })
//       .reduce((uniqueResults, item) => {
//         if (!uniqueResults.some((result) => result.Country === item.Country)) {
//           uniqueResults.push(item);
//         }
//         return uniqueResults;
//       }, []);

//     setFilteredCountryResults(filteredCountryResults);
//   };

//   const onSearch = (searchTerm, isFullName) => {
//     if (isFullName) {
//       setFullName(searchTerm);
//     } else {
//       setCountry(searchTerm);
//     }
//     setSelectionMade(true); // Set selection flag to true

//     // Your API call to fetch search results can go here
//     console.log("Search Term:", searchTerm);
//   };

//   return (
//     <div className="mt-4">
//       <Container className="mt-4">
//         <div className="mb-3">
//           <h2 className="mb-3">Step 1</h2>
//           <Form.Label htmlFor="fullNameSearch" className="form-label">
//             Search for a full name:
//           </Form.Label>
//           <Form.Control
//             type="text"
//             id="fullNameSearch"
//             placeholder="Search for a full name"
//             value={fullName}
//             onChange={onChangeFullName}
//             className="mb-3"
//           />
//           {filteredResults.length > 0 && !selectionMade && (
//             <ListGroup>
//               {filteredResults.slice(0, 10).map((item, index) => (
//                 <ListGroup.Item
//                   key={index}
//                   action
//                   active={item.full_name === fullName}
//                   onClick={() => onSearch(item.full_name, true)}
//                 >
//                   {item.full_name}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//           <Form.Label htmlFor="countrySearch" className="form-label">
//             Search for a country:
//           </Form.Label>
//           <Form.Control
//             type="text"
//             id="countrySearch"
//             placeholder="Search for a country"
//             value={country}
//             onChange={onChangeCountry}
//           />
//           {filteredCountryResults.length > 0 && !selectionMade && (
//             <ListGroup>
//               {filteredCountryResults.slice(0, 10).map((item, index) => (
//                 <ListGroup.Item
//                   key={index}
//                   action
//                   active={item.Country === country}
//                   onClick={() => onSearch(item.Country, false)}
//                 >
//                   {item.Country}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </div>
//         <Button variant="primary" onClick={() => onSearch(fullName, true)}>
//           Search
//         </Button>
//       </Container>
//     </div>
//   );
// }

//dropdown menu disabled manul input

// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";

// function Step1({ initialValues, onSubmit, onReset }) {
//   const [country, setCountry] = useState(initialValues.country);
//   const [city, setCity] = useState(initialValues.city);
//   const [filteredData, setFilteredData] = useState([]);
//   const [uniqueCountries, setUniqueCountries] = useState([]);
//   const [uniqueCities, setUniqueCities] = useState([]);

//   useEffect(() => {
//     // Fetch the CSV file asynchronously
//     fetch("/example.csv") // Adjust the path to the CSV file
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.text();
//       })
//       .then((csvText) => {
//         // Parse the CSV text using Papaparse
//         Papa.parse(csvText, {
//           header: true,
//           dynamicTyping: true,
//           complete: function (results) {
//             if (results.data) {
//               setFilteredData(results.data);
//               const countries = [
//                 ...new Set(results.data.map((row) => row.Country)),
//               ];
//               const cities = [...new Set(results.data.map((row) => row.City))];
//               setUniqueCountries(countries);
//               setUniqueCities(cities);
//               console.log("CSV data loaded:", results.data);
//             } else {
//               console.error("CSV data parsing failed.");
//             }
//           },
//           error: function (error) {
//             console.error("CSV parsing error:", error.message);
//           },
//         });
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//       });
//   }, []); // Empty dependency array ensures this effect runs only once

//   const handleCountryChange = (e) => {
//     const selectedCountry = e.target.value;
//     setCountry(selectedCountry);

//     if (selectedCountry) {
//       const filteredCities = uniqueCities.filter((cityName) =>
//         filteredData.some(
//           (row) => row.Country === selectedCountry && row.City === cityName
//         )
//       );
//       setUniqueCities(filteredCities);
//     } else {
//       setUniqueCities([...new Set(filteredData.map((row) => row.City))]);
//     }
//   };

//   const handleCityChange = (e) => {
//     const selectedCity = e.target.value;
//     setCity(selectedCity);

//     if (selectedCity) {
//       const filteredCountries = uniqueCountries.filter((countryName) =>
//         filteredData.some(
//           (row) => row.City === selectedCity && row.Country === countryName
//         )
//       );
//       setUniqueCountries(filteredCountries);
//     } else {
//       setUniqueCountries([...new Set(filteredData.map((row) => row.Country))]);
//     }
//   };

//   const generateUniqueKey = (id, type) => {
//     return `${type}_${id}`;
//   };

//   const handleSubmit = () => {
//     let filtered = filteredData;

//     if (country) {
//       filtered = filtered.filter((row) => row.Country === country);
//     }

//     if (city) {
//       filtered = filtered.filter((row) => row.City === city);
//     }

//     setFilteredData(filtered);
//     onSubmit({ country, city });
//   };

//   const handleReset = () => {
//     setCountry(""); // Reset country selection
//     setCity(""); // Reset city selection
//     setUniqueCountries([...new Set(filteredData.map((row) => row.Country))]); // Reset uniqueCountries
//     setUniqueCities([...new Set(filteredData.map((row) => row.City))]); // Reset uniqueCities
//     onReset();
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">Step 1</h2>
//       <p className="text-muted">
//         You can choose either or both of the following inputs: Country and City.
//       </p>
//       <div className="row mb-3">
//         <div className="col-md-6">
//           <label htmlFor="countrySelect" className="form-label">
//             Select Country:
//           </label>
//           <select
//             id="countrySelect"
//             className="form-select"
//             value={country}
//             onChange={handleCountryChange}
//           >
//             <option value="">All</option>
//             {uniqueCountries.map((countryName) => (
//               <option
//                 key={generateUniqueKey(countryName, "country")}
//                 value={countryName}
//               >
//                 {countryName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="citySelect" className="form-label">
//             Select City:
//           </label>
//           <select
//             id="citySelect"
//             className="form-select"
//             value={city}
//             onChange={handleCityChange}
//           >
//             <option value="">All</option>
//             {uniqueCities.map((cityName) => (
//               <option
//                 key={generateUniqueKey(cityName, "city")}
//                 value={cityName}
//               >
//                 {cityName}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="d-flex justify-content-center">
//         <button
//           type="button"
//           className="btn btn-outline-danger me-3"
//           disabled={!country && !city}
//           onClick={handleReset}
//         >
//           Reset
//         </button>
//         <button
//           type="button"
//           className="btn btn-outline-danger "
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Step1;

//Manual input, with filtered result

// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";
// import { Container, Form, ListGroup, Button, Row, Col } from "react-bootstrap";

// function Step1({ onSubmit }) {
//   const [filteredData, setFilteredData] = useState([]);
//   const [countryList, setCountryList] = useState([]);
//   const [cityList, setCityList] = useState([]);
//   const [country, setCountry] = useState("");
//   const [city, setCity] = useState("");
//   const [filteredStep1Data, setFilteredStep1Data] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null); // Track selected item
//   const [countryError, setCountryError] = useState(false);
//   const [cityError, setCityError] = useState(false);

//   useEffect(() => {
//     // Fetch the CSV file asynchronously
//     fetch("/example2.csv") // Adjust the path to the CSV file
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.text();
//       })
//       .then((csvText) => {
//         // Parse the CSV text using Papaparse
//         Papa.parse(csvText, {
//           header: true,
//           dynamicTyping: true,
//           complete: function (results) {
//             if (results.data) {
//               setFilteredData(results.data);

//               const countries = [
//                 ...new Set(results.data.map((row) => row.Country)),
//               ];
//               setCountryList(countries);

//               const cities = [...new Set(results.data.map((row) => row.City))];
//               setCityList(cities);
//               console.log("CSV data loaded:", results.data);
//             } else {
//               console.error("CSV data parsing failed.");
//             }
//           },
//           error: function (error) {
//             console.error("CSV parsing error:", error.message);
//           },
//         });
//       })
//       .catch((error) => {
//         console.error("Fetch error:", error);
//       });
//   }, []);

//   useEffect(() => {
//     // Update input fields when a selection is made
//     if (selectedItem) {
//       setCountry(selectedItem.Country);
//       setCity(selectedItem.City);
//     }
//   }, [selectedItem]);

//   const handleCountrySearch = (e) => {
//     const searchTerm = e.target.value;
//     setCountry(searchTerm);
//     // Reset city input
//     setCity("");
//     setCityError(false); // Reset city error

//     // Filter data based on selected country
//     const filteredStep1 = filteredData.filter((row) =>
//       row.Country.toLowerCase().startsWith(searchTerm.toLowerCase())
//     );

//     setFilteredStep1Data(filteredStep1);
//   };

//   const handleCitySearch = (e) => {
//     const searchTerm = e.target.value;
//     setCity(searchTerm);
//     // Reset country input
//     setCountry("");
//     setCountryError(false); // Reset country error

//     // Filter data based on selected city
//     const filteredStep1 = filteredData.filter((row) =>
//       row.City.toLowerCase().startsWith(searchTerm.toLowerCase())
//     );
//     setFilteredStep1Data(filteredStep1);
//   };

//   const handleItemSelect = (item) => {
//     setSelectedItem(item); // Set the selected item
//   };

//   const handleReset = () => {
//     setSelectedItem(null); // Reset the selected item
//     setCity("");
//     setCountry("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Gather selected options from checkboxes
//     const selectedOptions = filteredStep1Data
//       .filter((item, index) => {
//         const checkbox = document.getElementById(`checkbox-${index}`);
//         return checkbox && checkbox.checked;
//       })
//       .map((item) => ({
//         Country: item.Country,
//         City: item.City,
//       }));

//     // Validate country and city inputs
//     if (!country && !city) {
//       setCountryError(true);
//       setCityError(true);
//       return;
//     }

//     // You can perform further actions with the selected options here
//     console.log("Selected Options:", selectedOptions);

//     // Pass the selected options to the next step
//     // onSubmit(selectedOptions);
//   };

//   return (
//     <Container className="mt-4">
//       <h4 className="mb-4">Step 1: Choose One or Both</h4>
//       <Form onSubmit={handleSubmit}>
//         <Row className="justify-content-center">
//           <Col md={6}>
//             <div className="mb-5">
//               <Form.Label htmlFor="countrySearch" className="form-label">
//                 Enter a country name:
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 className={`form-control mb-2 ${
//                   countryError ? "is-invalid" : ""
//                 }`}
//                 id="countrySearch"
//                 placeholder="Country"
//                 value={country}
//                 onChange={handleCountrySearch}
//               />
//             </div>
//           </Col>
//           <Col md={6}>
//             <div className="mb-5">
//               <Form.Label htmlFor="citySearch" className="form-label">
//                 Enter a city name:
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 className={`form-control mb-2 ${cityError ? "is-invalid" : ""}`}
//                 id="citySearch"
//                 placeholder="City"
//                 value={city}
//                 onChange={handleCitySearch}
//               />
//             </div>
//           </Col>
//           <div className="mb-5">
//             {country || city ? (
//               filteredStep1Data.length === 0 ? (
//                 <p>No results found.</p>
//               ) : selectedItem ? null : (
//                 <ListGroup>
//                   {filteredStep1Data.map((item, index) => (
//                     <ListGroup.Item
//                       key={index}
//                       action
//                       id={`checkbox-${index}`}
//                       active={item === selectedItem}
//                       onClick={() => handleItemSelect(item)}
//                     >
//                       {`Country: ${item.Country}, City: ${item.City}`}
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )
//             ) : null}
//           </div>
//           <div className="d-flex justify-content-center mt-3">
//             <Button type="submit" variant="danger" className="me-2">
//               Search
//             </Button>
//             <Button
//               type="button"
//               variant="danger"
//               onClick={handleReset}
//               disabled={!selectedItem}
//             >
//               Reset
//             </Button>
//           </div>
//         </Row>
//       </Form>
//     </Container>
//   );
// }

// export default Step1;

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Container, Form, ListGroup, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";

function Step1({ countryList, cityList }) {
  console.log("step1 props", countryList);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredStep1Data, setFilteredStep1Data] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item
  const [formErrors, setFormErrors] = useState({
    country: "",
    city: "",
  });

  useEffect(() => {
    // Update input fields when a selection is made
    if (selectedItem) {
      setSelectedCountry({
        label: selectedItem.Country,
        value: selectedItem.Country,
      });
      setSelectedCity({ label: selectedItem.City, value: selectedItem.City });
    }
  }, [selectedItem]);

  const handleItemSelect = (item) => {
    setSelectedItem(item); // Set the selected item
  };

  const handleReset = () => {
    setSelectedItem(null); // Reset the selected item
    setSelectedCountry(null);
    setSelectedCity(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate country and city selections
    const newFormErrors = {};
    if (!selectedCountry && !selectedCity) {
      newFormErrors.country = "Please select a country";
      newFormErrors.city = "Please select a city";
    } else {
      // You can reset errors if selections are valid
      newFormErrors.country = "";
      newFormErrors.city = "";
    }

    // Update form errors
    setFormErrors(newFormErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newFormErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      // If no errors, continue to the next step
      // Gather selected options from checkboxes
      const selectedOptions = filteredStep1Data
        .filter((item, index) => {
          const checkbox = document.getElementById(`checkbox-${index}`);
          return checkbox && checkbox.checked;
        })
        .map((item) => ({
          Country: item.Country,
          City: item.City,
        }));

      // You can perform further actions with the selected options here
      console.log("Selected Options:", selectedOptions);

      // Pass the selected options to the next step
      // onSubmit(selectedOptions);
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Step 1: Choose One or Both</h4>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="mb-5">
              <Form.Label htmlFor="countrySearch" className="form-label">
                Enter a country name:
              </Form.Label>
              <Select
                className={`mb-2 ${formErrors.country ? "is-invalid" : ""}`}
                options={countryList}
                value={selectedCountry}
                onChange={(selectedOption) =>
                  setSelectedCountry(selectedOption)
                }
                placeholder="Select a country"
              />
              <Form.Control.Feedback>
                {formErrors.country}
              </Form.Control.Feedback>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-5">
              <Form.Label htmlFor="citySearch" className="form-label">
                Enter a city name:
              </Form.Label>
              <Select
                className={`mb-2 ${formErrors.city ? "is-invalid" : ""}`}
                options={cityList}
                value={selectedCity}
                onChange={(selectedOption) => setSelectedCity(selectedOption)}
                placeholder="Select a city"
              />
              <Form.Control.Feedback>{formErrors.city}</Form.Control.Feedback>
            </div>
          </Col>

          {/* ... */}
        </Row>
      </Form>
    </Container>
  );
}

export default Step1;

import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function FormContainer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    period: "",
  });
  const [isInputSelected, setIsInputSelected] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData({ ...formData, ...data });
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
    // Check if any input is selected
    setIsInputSelected(Object.values(data).some((value) => !!value));
  };

  const handleFormReset = () => {
    setFormData({
      country: "",
      city: "",
      period: "",
    });
    setCurrentStep(1);
    setIsInputSelected(false);
  };

  const containerStyle = {
    backgroundColor: "#f9f9fb", // Background color
    padding: "30px", // Padding for inner content
    borderRadius: "10px", // Rounded corners
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)", // Box shadow for the container
    width: "100%", // Width of the container
    height: "100vh", // Full viewport height
    margin: "0 auto", // Center the container horizontally
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const stepTitles = [
    "Step 1: Choose Location",
    "Step 2: Choose Period",
    "Step 3: Review & Submit",
  ];

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#fff" }}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="p-4 rounded" style={containerStyle}>
          <h2 className="mb-4">{stepTitles[currentStep - 1]}</h2>
          <div className="progress mb-4">
            <div
              className={`progress-bar bg-primary`}
              role="progressbar"
              style={{ width: `${(currentStep - 1) * 50}%` }}
            ></div>
          </div>
          {currentStep === 1 && (
            <Step1
              initialValues={formData}
              onSubmit={handleFormSubmit}
              onReset={handleFormReset}
            />
          )}
          {currentStep === 2 && (
            <Step2
              initialValues={formData}
              onSubmit={handleFormSubmit}
              setIsInputSelected={setIsInputSelected}
            />
          )}
          {currentStep === 3 && (
            <Step3 data={formData} onSubmit={handleFormSubmit} />
          )}
          {currentStep > 1 && (
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </button>
              {currentStep < 3 && (
                <button
                  type="button"
                  className={`btn btn-primary ${
                    !isInputSelected ? "disabled" : ""
                  }`}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormContainer;

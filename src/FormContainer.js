import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default function FormContainer() {
  const [goSteps, setGoSteps] = useState(0);

  // Define initial values for Step1
  const initialValuesStep1 = {
    country: "", // Set initial country value here
    city: "", // Set initial city value here
  };

  return (
    <div>
      <Stepper activeStep={goSteps}>
        <Step onClick={() => setGoSteps(0)} label="Choose Location" />
        <Step onClick={() => setGoSteps(1)} label="Choose Period" />
        <Step onClick={() => setGoSteps(2)} label="Review & Submit" />
      </Stepper>
      {goSteps === 0 && (
        <div>
          <div>
            {/* Pass 'active' prop as true and 'initialValues' prop to Step1 */}
            <Step1 active={true} initialValues={initialValuesStep1} />
          </div>
        </div>
      )}
      {goSteps === 1 && (
        <div>
          Addreess
          <button onClick={() => setGoSteps(2)}>Next</button>
        </div>
      )}
      {goSteps === 2 && (
        <div>
          Payment
          <button onClick={() => setGoSteps(3)}>Submit</button>
        </div>
      )}
    </div>
  );
}

import React from "react";
import StepZilla from "react-stepzilla";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const ProgressBar = ({ currentStep, stepNames }) => {
  return (
    <div className="progress mb-4">
      {stepNames.map((stepName, index) => (
        <div
          key={index}
          className={`progress-bar bg-primary ${
            currentStep === index + 1 ? "active" : ""
          }`}
          role="progressbar"
          style={{ width: `${(100 / stepNames.length) * index}%` }}
        >
          {stepName}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;

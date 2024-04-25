import { useState, useEffect } from "react";
import "../../styles/style.scss";
import "./survey.scss";
import { StepOptions } from "../../models";
import { surveyErrors } from "./errors";

export const Options = (props: StepOptions) => {
  const { handleStep, setStepValid, stepInfo, currentValue } = props;

  const [clickedButton, setClickedButton] = useState<string | null>(
    currentValue
  );
  useEffect(() => {
    setClickedButton(currentValue);
    if (currentValue !== null) {
      setStepValid({ state: true, error: "" });
    }
  }, [currentValue]);

  const handleClick = (name: string, value: string) => {
    if (clickedButton === null) {
      setClickedButton(value);
      setStepValid({ state: true, error: "" });
    } else if (clickedButton === value) {
      setClickedButton(null);
      setStepValid({ state: false, error: surveyErrors.optionsMsg });
    } else {
      setClickedButton(value);
      setStepValid({ state: true, error: "" });
    }
    if (clickedButton !== "") {
      handleStep(name, value);
    }
  };

  return (
    <>
      <div className="step">
        <p>{stepInfo.question}</p>
        {stepInfo.options.length < 8 ? (
          stepInfo.options.map((option, index) => (
            <label key={index} className="step__option gradient-border">
              <input
                type="checkbox"
                checked={clickedButton === option}
                onChange={() => handleClick(stepInfo.fieldName, option)}
              />
              {option}
            </label>
          ))
        ) : (
          <div className="two-columns">
            <div className="column">
              {stepInfo.options
                .slice(0, Math.ceil(stepInfo.options.length / 2))
                .map((option, index) => (
                  <label key={index} className="step__option gradient-border">
                    <input
                      type="checkbox"
                      checked={clickedButton === option}
                      onChange={() => handleClick(stepInfo.fieldName, option)}
                    />
                    {option}
                  </label>
                ))}
            </div>
            <div className="column">
              {stepInfo.options
                .slice(Math.ceil(stepInfo.options.length / 2))
                .map((option, index) => (
                  <label key={index} className="step__option gradient-border">
                    <input
                      type="checkbox"
                      checked={clickedButton === option}
                      onChange={() => handleClick(stepInfo.fieldName, option)}
                    />
                    {option}
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Options;

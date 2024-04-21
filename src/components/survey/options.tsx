import { useState, useEffect } from "react";
import "./survey.scss";
import { StepOptions } from "../../models";

function Options(props: StepOptions) {
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
      setStepValid({ state: false, error: "Select a field" });
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
            <button
              type="button"
              key={index}
              className={`step__btn ${
                clickedButton === option ? "disabled" : ""
              }`}
              onClick={() => handleClick(stepInfo.fieldName, option)}
            >
              {option}
            </button>
          ))
        ) : (
          <div className="two-columns">
            <div className="column">
              {stepInfo.options
                .slice(0, Math.ceil(stepInfo.options.length / 2))
                .map((option, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`step__btn ${
                      clickedButton === option ? "disabled" : ""
                    }`}
                    onClick={() => handleClick(stepInfo.fieldName, option)}
                  >
                    {option}
                  </button>
                ))}
            </div>
            <div className="column">
              {stepInfo.options
                .slice(Math.ceil(stepInfo.options.length / 2))
                .map((option, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`step__btn ${
                      clickedButton === option ? "disabled" : ""
                    }`}
                    onClick={() => handleClick(stepInfo.fieldName, option)}
                  >
                    {option}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Options;

import { useState, useEffect } from "react";
import "../../styles/style.scss";
import "./survey.scss";
import { StepOptions } from "../../models";
import { surveyErrors } from "./errors";
import classNames from "classnames";

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
        <h4 className="step__question">{stepInfo.question}</h4>
        {stepInfo.options.length < 7 ? (
          <div className="one_column">
            {stepInfo.options.map((option, index) => (
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
        ) : (
          <div className="columns">
            {stepInfo.options.map((_option, index) =>
              index % 6 === 0 ? (
                <div className="column" key={index}>
                  {stepInfo.options
                    .slice(index, index + 6)
                    .map((option, innerIndex) => (
                      <label
                        key={innerIndex}
                        className="step__option gradient-border"
                      >
                        <input
                          type="checkbox"
                          checked={clickedButton === option}
                          onChange={() =>
                            handleClick(stepInfo.fieldName, option)
                          }
                        />
                        {option}
                      </label>
                    ))}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Options;

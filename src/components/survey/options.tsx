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
        {stepInfo.options.length < 4 ? (
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
          <div
            className={classNames("columns", {
              columns_horizontal: stepInfo.options.length > 6,
            })}
          >
            {stepInfo.options.map((_option, index) =>
              index % 3 === 0 ? (
                <div
                  className={classNames("column", {
                    column_horizontal: stepInfo.options.length > 6,
                  })}
                  key={index}
                >
                  {stepInfo.options
                    .slice(index, index + 3)
                    .map((option, innerIndex) => (
                      <label
                        key={innerIndex}
                        className={classNames("step__option gradient-border", {
                          step__option_horizontal: stepInfo.options.length > 6,
                        })}
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

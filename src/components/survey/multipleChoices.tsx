import { useState, useEffect } from "react";
import "./survey.scss";
import { StepMultipleChoices } from "../../models";
import { surveyErrors } from "./errors";

export const MultipleChoices = (props: StepMultipleChoices) => {
  const { handleStep, setStepValid, stepInfo, currentValue } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentValue !== null ? [currentValue] : []
  );

  useEffect(() => {
    if (currentValue) {
      setSelectedOptions(currentValue.split(","));
      setStepValid({ state: true, error: "" });
    } else {
      setStepValid({ state: false, error: surveyErrors.optionsMsg });
    }
  }, [currentValue]);

  const handleExclusiveOption = (value: string) => {
    const isSelected = selectedOptions.includes(stepInfo.exclusiveOption);
    setSelectedOptions(isSelected ? [] : [value]);
    setStepValid({
      state: !isSelected,
      error: isSelected ? surveyErrors.optionsMsg : "",
    });
    handleStep(stepInfo.fieldName, isSelected ? "" : stepInfo.exclusiveOption);
  };

  const handleNotAlreadySelected = (
    newSelectedOptions: string[],
    value: string
  ): string[] => {
    if (!selectedOptions.includes(stepInfo.exclusiveOption)) {
      if (value !== stepInfo.exclusiveOption) {
        newSelectedOptions.push(value);
        return newSelectedOptions;
      }
    } else {
      return [value];
    }
    return [];
  };

  const handleOption = (name: string, value: string) => {
    const index = selectedOptions.indexOf(value);
    let newSelectedOptions = [...selectedOptions];

    if (index === -1) {
      // If not already selected, add it to the selectedOptions
      newSelectedOptions = handleNotAlreadySelected(newSelectedOptions, value);
    } else {
      // If already selected, remove it from the selectedOptions
      newSelectedOptions.splice(index, 1);
    }

    setSelectedOptions(newSelectedOptions);
    if (newSelectedOptions.length > 0) {
      setStepValid({ state: true, error: "" });
    } else {
      setStepValid({ state: false, error: surveyErrors.optionsMsg });
    }
    handleStep(name, newSelectedOptions.toString());
  };

  const handleClick = (name: string, value: string) => {
    if (value === stepInfo.exclusiveOption) {
      // If "Ninguna de las anteriores" is selected, disable all other options
      handleExclusiveOption(value);
    } else {
      handleOption(name, value);
    }
  };

  return (
    <>
      <div className="step">
        <h4 className="step__question">{stepInfo.question}</h4>
        {stepInfo.options.length < 4 ? (
          stepInfo.options.map((option, index) => (
            <label key={index} className="step__option gradient-border">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleClick(stepInfo.fieldName, option)}
              />
              {option}
            </label>
          ))
        ) : (
          <div className="columns">
            {stepInfo.options.map((_option, index) =>
              index % 3 === 0 ? (
                <div className="column" key={index}>
                  {stepInfo.options
                    .slice(index, index + 3)
                    .map((option, innerIndex) => (
                      <label
                        key={innerIndex}
                        className="step__option gradient-border"
                      >
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option)}
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

export default MultipleChoices;

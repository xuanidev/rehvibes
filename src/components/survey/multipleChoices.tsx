import { useState, useEffect } from "react";
import "./survey.scss";
import { StepMultipleChoices } from "../../models";

function MultipleChoices(props: StepMultipleChoices) {
  const { handleStep, setStepValid, stepInfo, currentValue } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentValue !== null ? [currentValue] : []
  );

  useEffect(() => {
    if (currentValue) {
      setSelectedOptions(currentValue.split(","));
      setStepValid({ state: true, error: "" });
    } else {
      setStepValid({ state: false, error: "Select a field" });
    }
  }, [currentValue]);

  const handleExclusiveOption = (value: string) => {
    const isSelected = selectedOptions.includes(stepInfo.exclusiveOption);
    setSelectedOptions(isSelected ? [] : [value]);
    setStepValid({
      state: !isSelected,
      error: isSelected ? "Select a field" : "",
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
      setStepValid({ state: false, error: "Select a field" });
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
        <p>{stepInfo.question}</p>
        {stepInfo.options.length < 8 ? (
          stepInfo.options.map((option, index) => (
            <button
              type="button"
              key={index}
              className={`step__btn ${
                selectedOptions.includes(option) ? "disabled" : ""
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
                      selectedOptions.includes(option) ? "disabled" : ""
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
                      selectedOptions.includes(option) ? "disabled" : ""
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

export default MultipleChoices;
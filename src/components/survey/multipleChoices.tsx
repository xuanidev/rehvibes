import { useState, useEffect } from "react";
import "./survey.scss";
import { StepMultipleChoices } from "../../models";

function MultipleChoices(optionsData: StepMultipleChoices) {
  const {
    handleStep,
    setStepValid,
    fieldName,
    options,
    question,
    exclusiveOption,
    currentValue,
  } = optionsData;
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

  const handleClick = (name: string, value: string) => {
    if (value === exclusiveOption) {
      // If "Ninguna de las anteriores" is selected, disable all other options
      const isSelected = selectedOptions.includes(exclusiveOption);
      setSelectedOptions(isSelected ? [] : [value]);
      setStepValid({
        state: !isSelected,
        error: isSelected ? "Select a field" : "",
      });
      handleStep(fieldName, isSelected ? "" : exclusiveOption);
    } else {
      const index = selectedOptions.indexOf(value);
      let newSelectedOptions = [...selectedOptions];

      if (index === -1) {
        // If not already selected, add it to the selectedOptions
        if (!selectedOptions.includes(exclusiveOption)) {
          if (value !== exclusiveOption) {
            newSelectedOptions.push(value);
          }
        } else {
          newSelectedOptions = [value];
        }
      } else {
        // If already selected, remove it from the selectedOptions
        newSelectedOptions.splice(index, 1);
      }
      setSelectedOptions(newSelectedOptions);

      // If there are selected options, set step as valid
      if (newSelectedOptions.length > 0) {
        setStepValid({ state: true, error: "" });
      } else {
        setStepValid({ state: false, error: "Select a field" });
      }
      // Pass selected options to handleStep
      handleStep(name, newSelectedOptions.toString());
    }
  };

  return (
    <>
      <div className="step">
        <p>{question}</p>
        {options.length < 8 ? (
          options.map((option, index) => (
            <button
              key={index}
              className={`step__btn ${
                selectedOptions.includes(option) ? "disabled" : ""
              }`}
              onClick={() => handleClick(fieldName, option)}
            >
              {option}
            </button>
          ))
        ) : (
          <div className="two-columns">
            <div className="column">
              {options
                .slice(0, Math.ceil(options.length / 2))
                .map((option, index) => (
                  <button
                    key={index}
                    className={`step__btn ${
                      selectedOptions.includes(option) ? "disabled" : ""
                    }`}
                    onClick={() => handleClick(fieldName, option)}
                  >
                    {option}
                  </button>
                ))}
            </div>
            <div className="column">
              {options
                .slice(Math.ceil(options.length / 2))
                .map((option, index) => (
                  <button
                    key={index}
                    className={`step__btn ${
                      selectedOptions.includes(option) ? "disabled" : ""
                    }`}
                    onClick={() => handleClick(fieldName, option)}
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

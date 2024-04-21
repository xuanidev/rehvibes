import { useState, useEffect } from "react";
import "./survey.scss";
import { StepMultipleChoicesInput } from "../../models";

function MultipleChoicesAndInput(props: StepMultipleChoicesInput) {
  const { handleStep, setStepValid, stepInfo, currentValue } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentValue !== null ? [currentValue] : []
  );
  const [other, setOther] = useState<string>("");

  useEffect(() => {
    if (!currentValue || currentValue === "") {
      setSelectedOptions([]);
      setStepValid({ state: false, error: "Fill all the fields" });

      return;
    }

    const values = currentValue
      .split(",")
      .filter((value) => stepInfo.options.includes(value.trim()));
    if (values.length > 0) {
      setSelectedOptions(values);
      setStepValid({ state: true, error: "" });
    } else {
      setOther(currentValue);
      setStepValid({ state: true, error: "" });
    }
  }, [currentValue]);

  const handleInput = (value: string) => {
    setSelectedOptions([]);
    if (value === "") {
      setStepValid({ state: false, error: "Fill all the fields" });
    } else if (value.length < 4) {
      setStepValid({
        state: false,
        error: "Other field must be larger than 3 characters",
      });
    } else {
      setStepValid({ state: true, error: "" });
      handleStep(stepInfo.fieldName, value, undefined);
    }
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
      return [];
    } else {
      return [value];
    }
  };
  const hanleAlreadySelected = (
    index: number,
    newSelectedOptions: string[]
  ): string[] => {
    if (newSelectedOptions.length > 1) {
      newSelectedOptions.splice(index, 1);
      return newSelectedOptions;
    } else {
      setStepValid({ state: false, error: "Fill all the fieldss" });
      return [];
    }
  };

  const handleOption = (name: string, value: string) => {
    const index = selectedOptions.indexOf(value);
    let newSelectedOptions = [...selectedOptions];
    if (index === -1) {
      // If not already selected, add it to the selectedOptions
      newSelectedOptions = handleNotAlreadySelected(newSelectedOptions, value);
    } else {
      // If already selected, remove it from the selectedOptions
      newSelectedOptions = hanleAlreadySelected(index, newSelectedOptions);
    }

    setSelectedOptions(newSelectedOptions);
    if (newSelectedOptions.length > 0) {
      setStepValid({ state: true, error: "" });
    } else {
      setStepValid({ state: false, error: "Select a field" });
    }
    handleStep(name, newSelectedOptions.toString());
  };

  const handleExclusiveOption = (name: string) => {
    if (!selectedOptions.includes(stepInfo.exclusiveOption)) {
      setSelectedOptions([stepInfo.exclusiveOption]);
      setStepValid({ state: true, error: "" });
      handleStep(name, stepInfo.exclusiveOption);
    } else {
      setSelectedOptions([]);
      setStepValid({ state: false, error: "Fill all the fields" });
    }
  };

  const handleClick = (name: string, value: string, input: boolean) => {
    if (input) {
      handleInput(value);
    } else {
      setOther("");
      if (value === stepInfo.exclusiveOption) {
        // If "Ninguna de las anteriores" is selected, disable all other options
        handleExclusiveOption(name);
      } else {
        //If a option is selected
        handleOption(name, value);
      }
    }
  };

  const onClickInput = () => {
    if (other.length < 3) {
      setStepValid({
        state: false,
        error: "Other field must be larger than 3 characters",
      });
    }
    setSelectedOptions([]);
  };

  return (
    <>
      <div className="step">
        <p>{stepInfo.question}</p>
        {stepInfo.options.length < 8 ? (
          <div className="column">
            {stepInfo.options.map((option, index) => (
              <button
                type="button"
                key={index}
                className={`step__btn ${
                  selectedOptions.includes(option) ? "disabled" : ""
                }`}
                onClick={() => handleClick(stepInfo.fieldName, option, false)}
              >
                {option}
              </button>
            ))}
            <input
              type="text"
              className={`step__btn step__input`}
              value={other}
              onChange={(e) => {
                setOther(e.target.value);
                handleClick(stepInfo.fieldName, e.target.value, true);
              }}
              onClick={onClickInput}
              placeholder={stepInfo.otherText}
            />
          </div>
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
                    onClick={() =>
                      handleClick(stepInfo.fieldName, option, false)
                    }
                  >
                    {option}
                  </button>
                ))}
              <input
                type="text"
                className={`step__btn step__input`}
                value={other}
                onChange={(e) => {
                  setOther(e.target.value);
                  handleClick(stepInfo.fieldName, e.target.value, true);
                }}
                onClick={onClickInput}
                placeholder={stepInfo.otherText}
              />
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
                    onClick={() =>
                      handleClick(stepInfo.fieldName, option, false)
                    }
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

export default MultipleChoicesAndInput;

import { useState, useEffect } from "react";
import "./survey.scss";
import { StepMultipleChoicesInput } from "../../models";

function MultipleChoicesInput(optionsData: StepMultipleChoicesInput) {
  const {
    handleStep,
    setStepValid,
    fieldName,
    options,
    question,
    exclusiveOption,
    otherText,
    currentValue,
  } = optionsData;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    currentValue !== null ? [currentValue] : []
  );
  const [other, setOther] = useState<string>("");

  useEffect(() => {
    if (!currentValue || currentValue === "") {
      setStepValid({ state: false, error: "Fill all the fields" });
      return;
    }
    const values = currentValue
      .split(",")
      .filter((value) => options.includes(value.trim()));
    if (values.length > 0) {
      setSelectedOptions(values);
      setStepValid({ state: true, error: "" });
    } else {
      setOther(currentValue);
      setStepValid({ state: true, error: "" });
    }
  }, [currentValue]);

  const handleClick = (name: string, value: string, input: boolean) => {
    if (input) {
      setSelectedOptions([]);
      if (value === "") {
        setStepValid({ state: false, error: "Fill all the fields" });
        handleStep(fieldName, value, undefined);
      } else if (value.length < 4) {
        setStepValid({
          state: false,
          error: "Other field must be larger than 3 characters",
        });
      } else {
        setStepValid({ state: true, error: "" });
        handleStep(fieldName, value, undefined);
      }
    } else {
      setOther("");
      if (value === exclusiveOption) {
        // If "Ninguna de las anteriores" is selected, disable all other options
        setSelectedOptions([]);
        setStepValid({ state: false, error: "Fill all the fields" });
        handleStep(name, exclusiveOption);
      } else {
        // If any other option is selected, handle it normally
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
          if (newSelectedOptions.length > 1) {
            newSelectedOptions.splice(index, 1);
          } else {
            newSelectedOptions = [];
            setStepValid({ state: false, error: "Fill all the fieldss" });
          }
        }

        setSelectedOptions(newSelectedOptions);

        if (newSelectedOptions.length > 0) {
          setStepValid({ state: true, error: "" });
        } else {
          setStepValid({ state: false, error: "Select a field" });
        }

        handleStep(name, newSelectedOptions.toString());
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
        <p>{question}</p>
        {options.length < 8 ? (
          <div className="column">
            {options.map((option, index) => (
              <button
                key={index}
                className={`step__btn ${
                  selectedOptions.includes(option) ? "disabled" : ""
                }`}
                onClick={() => handleClick(fieldName, option, false)}
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
                handleClick(fieldName, e.target.value, true);
              }}
              onClick={onClickInput}
              placeholder={otherText}
            />
          </div>
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
                    onClick={() => handleClick(fieldName, option, false)}
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
                  handleClick(fieldName, e.target.value, true);
                }}
                onClick={onClickInput}
                placeholder={otherText}
              />
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
                    onClick={() => handleClick(fieldName, option, false)}
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

export default MultipleChoicesInput;

import { useEffect, useState } from "react";
import "./survey.scss";
import { StepOptionsAndInput } from "../../models";

function OptionsAndInput({
  setStepValid,
  handleStep,
  inputs,
  question,
  otherText,
  fieldName,
  currentValue,
}: StepOptionsAndInput) {
  const [clickedButton, setClickedButton] = useState<string | null>(
    currentValue
  );
  const [other, setOther] = useState<string>("");

  useEffect(() => {
    if (currentValue !== null && currentValue !== "") {
      if (inputs.includes(currentValue)) {
        setClickedButton(currentValue);
        setStepValid({ state: true, error: "" });
      } else {
        setOther(currentValue !== null ? currentValue : "");
        setStepValid({ state: true, error: "" });
      }
    } else {
      setStepValid({ state: false, error: "Fill all the fields" });
    }
  }, [currentValue]);

  const handleButtonClick = (value: string) => {
    if (clickedButton === value) {
      setClickedButton(null);
      setStepValid({ state: false, error: "Fill all fields" });
    } else {
      setOther("");
      setStepValid({ state: true, error: "" });
      setClickedButton(value);
      handleStep(fieldName, value, undefined);
    }
  };

  const handleOtherInputChange = (value: string) => {
    if (value === "") {
      setStepValid({ state: false, error: "Fill all the fields" });
    } else if (value.length < 4) {
      setStepValid({
        state: false,
        error: "Other field must be larger than 3 characters",
      });
    } else {
      setStepValid({ state: true, error: "" });
      handleStep(fieldName, value, undefined);
    }
  };

  return (
    <>
      <div className="step">
        <p>{question}</p>
        {inputs.map((input, index) => (
          <div
            key={index}
            className={`step__btn ${clickedButton === input ? "disabled" : ""}`}
            onClick={() => handleButtonClick(input)}
          >
            {input}
          </div>
        ))}
        <input
          type="text"
          className={`step__btn step__input`}
          value={other}
          onChange={(e) => {
            setOther(e.target.value);
            handleOtherInputChange(e.target.value);
          }}
          onClick={() => setClickedButton(null)}
          placeholder={otherText}
        />
      </div>
    </>
  );
}

export default OptionsAndInput;

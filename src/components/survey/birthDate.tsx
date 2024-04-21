import React, { useState, useEffect } from "react";
import { Step } from "../../models";

function BirthDate(props: Step) {
  const { setStepValid, handleStep, stepInfo, currentValue } = props;
  const [currentDate, setCurrentDate] = useState("0000-00-00");

  useEffect(() => {
    if (currentValue !== null) {
      setCurrentDate(currentValue);
      setStepValid({ state: true, error: "" });
    } else {
      setStepValid({ state: false, error: "Fill all the fields" });
    }
  }, [currentDate]);

  const validateDateOfBirth = (dateOfBirth: string): boolean => {
    const enteredDateOfBirth = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - enteredDateOfBirth.getFullYear();
    return (
      age >= 18 ||
      (age === 18 &&
        currentDate >=
          new Date(
            currentDate.getFullYear(),
            enteredDateOfBirth.getMonth(),
            enteredDateOfBirth.getDate()
          ))
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateOfBirth = e.target.value;
    setCurrentDate(newDateOfBirth);

    if (!validateDateOfBirth(newDateOfBirth)) {
      setStepValid({ state: false, error: "You must be 18 years or older." });
      return;
    }

    setStepValid({ state: true, error: "" });
    handleStep(stepInfo.fieldName || "birthDate", newDateOfBirth);
  };

  return (
    <>
      <div>
        <label htmlFor="dateOfBirth">Date of Birth: </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          onChange={handleChange}
          value={currentDate}
        />
      </div>
    </>
  );
}

export default BirthDate;

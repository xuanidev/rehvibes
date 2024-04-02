import { useState, useEffect } from "react";
import { StepWeigthAndHeigth } from "../../models";

function BirthDate({
  setStepValid,
  handleStep,
  currentValueWeigth,
  currentValueHeigth,
}: StepWeigthAndHeigth) {
  const [formData, setFormData] = useState({ weight: 0, height: 0 });

  useEffect(() => {
    if (currentValueWeigth !== null && currentValueHeigth !== null) {
      setFormData({
        weight: parseInt(currentValueWeigth),
        height: parseInt(currentValueHeigth),
      });
      setStepValid({ state: true, error: "" });
    } else {
      setStepValid({ state: false, error: "Fill all the fields" });
    }
  }, [currentValueWeigth, currentValueHeigth]);

  const handleChange = (name: string, value: number) => {
    setFormData((prevData) => ({ ...prevData, [name]: value || 0 }));
    const updatedFormData = { ...formData, [name]: value || 0 };
    let validated = validate(updatedFormData);
    if (validated) {
      handleStep("weigth", undefined, updatedFormData.weight);
      handleStep("heigth", undefined, updatedFormData.height);
    }
  };

  const validate = (formData: { weight: number; height: number }): boolean => {
    const { weight, height } = formData;
    if (weight < 20 || weight > 350) {
      setStepValid({ state: false, error: "Write a valid weight" });
      return false;
    } else if (height < 20 || height > 250) {
      setStepValid({ state: false, error: "Write a valid height" });
      return false;
    } else {
      setStepValid({ state: true, error: "" });
      return true;
    }
  };

  return (
    <>
      <div>
        <label htmlFor="peso">Weight (Kg): </label>
        <input
          type="number"
          id="peso"
          name="weight"
          value={formData.weight.toString()}
          onChange={(event) =>
            handleChange(event.target.name, parseInt(event.target.value))
          }
        />
      </div>
      <div>
        <label htmlFor="height">Height (Cm): </label>
        <input
          type="number"
          id="height"
          name="height"
          value={formData.height.toString()}
          onChange={(event) =>
            handleChange(event.target.name, parseInt(event.target.value))
          }
          pattern="[0-9]+([.,][0-9]+)?"
          title="Enter a valid number with decimals (e.g., 175)"
        />
      </div>
    </>
  );
}

export default BirthDate;

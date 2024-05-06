import { useState, useEffect, useRef } from "react";
import { StepWeightAndHeight } from "../../models";
import "./weigthAndHeight.scss";
import { surveyErrors } from "./errors";

export const WeightAndHeight = (props: StepWeightAndHeight) => {
  const { setStepValid, handleStep, currentValueWeigth, currentValueHeigth } =
    props;
  const [formData, setFormData] = useState({ weight: 0, height: 0 });
  const [imc, setImc] = useState(0);

  const calculateImc = (weight: number, height: number) => {
    console.log(weight);
    const heightInMeters = height / 100;
    console.log(heightInMeters);
    const imcValue = weight / (heightInMeters * heightInMeters);
    console.log(imcValue);
    setImc(imcValue);
  };

  useEffect(() => {
    if (currentValueWeigth !== null && currentValueHeigth !== null) {
      setFormData({
        weight: parseInt(currentValueWeigth),
        height: parseInt(currentValueHeigth),
      });
      calculateImc(Number(currentValueWeigth), Number(currentValueHeigth));
      setStepValid({ state: true, error: "" });
    } else {
      setStepValid({ state: false, error: surveyErrors.generalMsg });
      setImc(0);
    }
  }, [currentValueWeigth, currentValueHeigth]);

  const handleChange = (name: string, value: number) => {
    setFormData((prevData) => ({ ...prevData, [name]: value || 0 }));
    const updatedFormData = { ...formData, [name]: value || 0 };
    let validated = validate(updatedFormData);
    if (validated) {
      handleStep("weigth", undefined, updatedFormData.weight);
      handleStep("heigth", undefined, updatedFormData.height);
      calculateImc(updatedFormData.weight, updatedFormData.height);
    } else {
      setImc(0);
    }
  };

  const validate = (formData: { weight: number; height: number }): boolean => {
    const { weight, height } = formData;
    if (weight < 20 || weight > 350) {
      setStepValid({ state: false, error: surveyErrors.pesoMsg });
      return false;
    } else if (height < 20 || height > 250) {
      setStepValid({ state: false, error: surveyErrors.alturaMsg });
      return false;
    } else {
      setStepValid({ state: true, error: "" });
      return true;
    }
  };

  return (
    <>
      <div className="weight_and_height">
        <div className="weight_and_height__field">
          <label className="weight_and_height__question">Peso</label>
          <div className="weight_and_height__input">
            <input
              type="text"
              name="weight"
              max={350}
              value={formData.weight.toString()}
              onChange={(event) =>
                handleChange(event.target.name, parseInt(event.target.value))
              }
            />
            <p>kg</p>
          </div>
        </div>
        <div className="weight_and_height__field">
          <label className="weight_and_height__question">
            ¿Cuál es tu estatura?
          </label>
          <div className="weight_and_height__input">
            <input
              type="text"
              name="height"
              max={250}
              value={formData.height.toString()}
              onChange={(event) =>
                handleChange(event.target.name, parseInt(event.target.value))
              }
            />
            <p>cm</p>
          </div>
        </div>
        <div className="weight_and_height__imc">
          <p>IMC ( Índice de Masa Corporal ): {imc.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};

export default WeightAndHeight;

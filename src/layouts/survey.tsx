import { useState, useRef } from "react";
import { SurveyStep } from "../components/survey/SurveyStep";
import { useNavigate } from "react-router-dom";
import {
  genero,
  birthDate,
  weigthAndHeigth,
  operationCuello,
  operationHombro,
  operationEspalda,
  operationCadera,
  operationCodo,
  operationColumna,
  operationMuneca,
  operationPie,
  operationRodilla,
  operationTobillo,
  goals,
  desire,
  zones,
  lastOperation,
  lesionZones,
  lesionBeforeZones,
  rehabilitation,
  nivel,
  lugar,
  objetivos,
  tipoEjercicios,
  equipamiento,
  condiciones,
  condicionRespiratoria,
  dolor,
  enfermedadCardiovascular,
  estres,
  movilidad,
  nivelActividadActual,
  practicaRegular,
  rehabilitacionPreviamente,
  trabajoSentado,
  toastError,
} from "../optionsData";
import { surveyErrors } from "../components/survey/errors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Survey = () => {
  const [data, setData] = useState<SurveyData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState({
    state: false,
    error: surveyErrors.generalMsg,
  });
  const [toastId, setToastId] = useState<any>("");
  const navigate = useNavigate();
  const handleStep = (name: string, value?: string, num?: number) => {
    if (!num) {
      if (name === "desire") {
        const { dateOfBirth, genero, goals, weigth, heigth } = data;
        setData({
          dateOfBirth,
          genero,
          goals,
          weigth,
          heigth,
          [name]: value,
        });
      } else {
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: num,
      }));
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setIsStepValid({ state: true, error: "" });
  };

  const nextStep = () => {
    if (isStepValid.state) {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsStepValid({ state: false, error: "Rellena todos los campos" });
      toast.dismiss(toastId);
    } else {
      const toastIdAux = toast.error(isStepValid.error, toastError);
      setToastId(toastIdAux);
    }
  };

  const handleSubmit = () => {
    console.log(data);
    navigate("/app");
  };

  const steps = [goals, genero, birthDate, weigthAndHeigth, desire];
  const lesionComponents = {
    Cuello: operationCuello,
    Hombro: operationHombro,
    Espalda: operationEspalda,
    Cadera: operationCadera,
    Codo: operationCodo,
    Muñeca: operationMuneca,
    Rodilla: operationRodilla,
    Pie: operationPie,
    Tobillo: operationTobillo,
    "Columna vertebral": operationColumna,
  };

  if (data.desire === desire.conditionOption) {
    steps.push(lesionZones);

    const isValidLesionKey = (
      key: string
    ): key is keyof typeof lesionComponents => {
      return key in lesionComponents;
    };
    if (
      data.desire === desire.conditionOption &&
      data.lesionZones &&
      isValidLesionKey(data.lesionZones)
    ) {
      const component = lesionComponents[data.lesionZones];
      if (component) {
        steps.push(component);
      }
    }

    steps.push(rehabilitation);
  } else {
    steps.push(
      zones,
      lastOperation,
      lesionBeforeZones,
      objetivos,
      tipoEjercicios,
      nivel
    );
  }
  steps.push(
    lugar,
    equipamiento,
    condiciones,
    movilidad,
    enfermedadCardiovascular,
    condicionRespiratoria,
    nivelActividadActual,
    practicaRegular,
    trabajoSentado,
    estres,
    rehabilitacionPreviamente,
    dolor
  );
  interface SurveyData {
    [key: string]: any;
  }
  const currentStepInfo = steps[currentStep] as SurveyData;
  return (
    <div className="survey">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          event.stopPropagation();
          handleSubmit();
        }}
        className="survey__form"
      >
        <SurveyStep
          key={currentStepInfo.fieldName}
          handleStep={handleStep}
          setStepValid={setIsStepValid}
          stepInfo={currentStepInfo}
          currentValue={
            currentStepInfo.fieldName && data[currentStepInfo.fieldName]
              ? data[currentStepInfo.fieldName]
              : null
          }
          currentValueWeigth={
            currentStepInfo.fieldName === "weigthAndHeigth" && data["weigth"]
              ? data["weigth"]
              : null
          }
          currentValueHeigth={
            currentStepInfo.fieldName === "weigthAndHeigth" && data["heigth"]
              ? data["heigth"]
              : null
          }
        />
        <div className="survey__actions">
          {currentStep > 0 && (
            <button
              type="button"
              className="survey__btn survey__btn--back"
              onClick={prevStep}
            >
              Volver
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              type="button"
              className="survey__btn survey__btn--right"
              onClick={nextStep}
            >
              Siguiente
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button
              type="submit"
              className="survey__btn survey__btn--right"
              disabled={!isStepValid.state}
            >
              Enviar
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

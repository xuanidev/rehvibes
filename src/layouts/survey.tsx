import { useState } from "react";
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
} from "../optionsData";
import { toastError } from "../constants";
import { surveyErrors } from "../components/survey/errors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImgDefault from "../assets/ImgDefault.png";
import { Information } from "../components/icons";
import { Logo } from "../components/branding";

const preloadImage = (url: string) => {
  return new Promise((resolve, reject) => {
    if (url) {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    }
  });
};

export const Survey = () => {
  const [data, setData] = useState<SurveyData>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isStepValid, setIsStepValid] = useState({
    state: false,
    error: surveyErrors.generalMsg,
  });
  const [toastId, setToastId] = useState<any>("");
  const [numSteps, setNumSteps] = useState<number>(20);
  const [percentage, setPercentage] = useState<number>(0);
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
    setPercentage(((currentStep - 1) / numSteps) * 100);
  };

  const calculatePercentage = () => {
    if (data.desire === desire.conditionOption) {
      setNumSteps(numSteps + 3);
      setPercentage(((currentStep + 1) / (numSteps + 3)) * 100);
    } else {
      setPercentage(((currentStep + 1) / numSteps) * 100);
    }
  };

  const nextStep = () => {
    if (isStepValid.state) {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsStepValid({ state: false, error: surveyErrors.generalMsg });
      toast.dismiss(toastId);
      calculatePercentage();
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

  if (steps.length > currentStep + 1) {
    const nextStepInfo = steps[currentStep + 1] as SurveyData;
    const imgSrc = nextStepInfo.src;
    preloadImage(imgSrc ?? undefined);
  }

  const currentStepInfo = steps[currentStep] as SurveyData;
  return (
    <div className="survey">
      <img
        style={{
          backgroundImage: `url(${currentStepInfo.src ?? ImgDefault})`,
        }}
        className="background_image"
      />
      <div className="progress_bar_container">
        <div
          className="progress_bar__bar"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="survey__content">
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
      </div>
      <div className="information_icon">
        <Information fill="white" height={25} width={25} />
      </div>
      <div className="logo_icon">
        <Logo
          fill="white"
          height={40}
          width={40}
          style={{ filter: "brightness(3)" }}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

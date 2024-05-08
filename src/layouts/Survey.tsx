import { useState, useEffect } from "react";
import { SurveyStep, SurveyActions } from "../components/survey/index";
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
import Cookies from "js-cookie";
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
  const [numSteps, setNumSteps] = useState<number>(22);
  const [percentage, setPercentage] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const hasData =
      Cookies.get("data") !== undefined && Cookies.get("data") !== null;
    const hasCurrentStep =
      Cookies.get("currentStep") !== undefined &&
      Cookies.get("currentStep") !== null;
    if (hasData && hasCurrentStep) {
      const dataObject = Cookies.get("data");
      setData(JSON.parse(dataObject));
      let step = Cookies.get("currentStep");
      setPercentage(((Number(step) + 1) / numSteps) * 100);
      setCurrentStep(Number(step) + 1);
    }
  }, []);

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
      console.log(currentStep + 1);
      console.log(numSteps + 3);
      console.log(((currentStep + 1) / (numSteps + 3)) * 100);
      setPercentage(((currentStep + 1) / (numSteps + 3)) * 100);
    } else {
      setPercentage(((currentStep + 1) / numSteps) * 100);
      console.log(currentStep + 1);
      console.log(numSteps);
      console.log(((currentStep + 1) / numSteps) * 100);
    }
  };

  const nextStep = () => {
    if (isStepValid.state) {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsStepValid({ state: false, error: surveyErrors.generalMsg });
      toast.dismiss(toastId);
      calculatePercentage();
      Cookies.set("data", JSON.stringify(data), { path: "" });
      Cookies.set("currentStep", currentStep, { path: "" });
    } else {
      const toastIdAux = toast.error(isStepValid.error, toastError);
      setToastId(toastIdAux);
    }
  };

  const handleSubmit = () => {
    Cookies.remove("currentStep");
    Cookies.remove("data");
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
    <div
      className="survey"
      style={{
        backgroundImage: `url(${currentStepInfo.src ?? ImgDefault})`,
      }}
    >
      <div className="survey__top">
        <div className="progress_bar_container">
          <div
            className="progress_bar__bar"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="information_icon">
          <Information fill="white" height={25} width={25} />
        </div>
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
          <SurveyActions
            currentStep={currentStep}
            nextStep={nextStep}
            prevStep={prevStep}
            length={steps.length}
            isStepValid={isStepValid}
          />
        </form>
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

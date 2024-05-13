import { useState, useEffect } from 'react';
import { SurveyStep, SurveyActions } from '../components/survey/index';
import { useNavigate } from 'react-router-dom';
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
} from '../optionsData';
import { toastError } from '../constants';
import { surveyErrors } from '../components/survey/errors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImgDefault from '../assets/ImgDefault.png';
import { Information } from '../components/icons';
import { Logo } from '../components/branding';

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
  const [toastId, setToastId] = useState<any>('');
  const [numSteps, setNumSteps] = useState<number[]>([5, 0, 12]);
  const [percentage, setPercentage] = useState<number[]>([0, 0, 0]);
  const navigate = useNavigate();

  useEffect(() => {
    const hasData = localStorage.getItem('data') !== null;
    const hasCurrentStep = localStorage.getItem('currentStep') !== null;

    if (hasData && hasCurrentStep) {
      const dataObject = localStorage.getItem('data');

      if (!dataObject) {
        return;
      }

      setData(JSON.parse(dataObject));
      let step = localStorage.getItem('currentStep');
      setCurrentStep(Number(step) + 1);
    }
  }, []);

  const handleStep = (name: string, value?: string, num?: number) => {
    if (!num) {
      if (name === 'desire') {
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
        setData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setData(prevData => ({
        ...prevData,
        [name]: num,
      }));
    }
  };

  const prevStep = () => {
    localStorage.setItem('currentStep', (currentStep - 1).toString());
    setCurrentStep(prevStep => prevStep - 1);
    setIsStepValid({ state: true, error: '' });
    //setPercentage(((currentStep - 1) / numSteps) * 100);
  };

  const calculatePercentage = () => {
    if (data.desire && !(data.nivel || data.rehabilitation)) {
      const auxSteps = data.desire === desire.conditionOption ? 3 : 6;
      console.log(auxSteps);
      if (numSteps[1] === 0) {
        setNumSteps(prevState => {
          const updatedNumSteps = [...prevState];
          updatedNumSteps[1] = auxSteps;
          return updatedNumSteps;
        });
        setPercentage(prevState => {
          const updatedPercentage = [...prevState];
          updatedPercentage[0] = 100;
          return updatedPercentage;
        });
      }
      setPercentage(prevState => {
        const updatedPercentage = [...prevState];
        updatedPercentage[1] = ((currentStep - numSteps[0] + 1) / auxSteps) * 100;
        return updatedPercentage;
      });
    } else {
      console.log(numSteps);
      if (currentStep < 6) {
        setPercentage(prevState => {
          const updatedPercentage = [...prevState];
          updatedPercentage[0] = ((currentStep + 1) / numSteps[0]) * 100;
          return updatedPercentage;
        });
      } else {
        if (percentage[1] !== 100) {
          setPercentage(prevState => {
            const updatedPercentage = [...prevState];
            updatedPercentage[1] = 100;
            return updatedPercentage;
          });
        }
        setPercentage(prevState => {
          const updatedPercentage = [...prevState];
          updatedPercentage[2] = ((currentStep - numSteps[0] - numSteps[1] + 1) / numSteps[2]) * 100;
          console.log(numSteps[0] + numSteps[1] + numSteps[2]);
          console.log(updatedPercentage[2]);

          return updatedPercentage;
        });
      }
    }
  };

  const nextStep = () => {
    if (isStepValid.state) {
      setCurrentStep(prevStep => prevStep + 1);
      setIsStepValid({ state: false, error: surveyErrors.generalMsg });
      toast.dismiss(toastId);
      calculatePercentage();
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('currentStep', currentStep.toString());
    } else {
      const toastIdAux = toast.error(isStepValid.error, toastError);
      setToastId(toastIdAux);
    }
  };

  const handleSubmit = () => {
    localStorage.removeItem('currentStep');
    localStorage.removeItem('data');
    navigate('/app');
  };

  const steps = [goals, genero, birthDate, weigthAndHeigth, desire];
  const lesionComponents = {
    'Cuello': operationCuello,
    'Hombro': operationHombro,
    'Espalda': operationEspalda,
    'Cadera': operationCadera,
    'Codo': operationCodo,
    'Muñeca': operationMuneca,
    'Rodilla': operationRodilla,
    'Pie': operationPie,
    'Tobillo': operationTobillo,
    'Columna vertebral': operationColumna,
  };

  if (data.desire === desire.conditionOption) {
    steps.push(lesionZones);
    const isValidLesionKey = (key: string): key is keyof typeof lesionComponents => {
      return key in lesionComponents;
    };
    if (data.desire === desire.conditionOption && data.lesionZones && isValidLesionKey(data.lesionZones)) {
      const component = lesionComponents[data.lesionZones];
      if (component) {
        steps.push(component);
      }
    }

    steps.push(rehabilitation);
  } else {
    steps.push(zones, lastOperation, lesionBeforeZones, objetivos, tipoEjercicios, nivel);
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
    dolor,
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
          <div className="progress_bar__bar" style={{ width: `${percentage[0]}%` }}></div>
        </div>
        <div className="progress_bar_container">
          <div className="progress_bar__bar" style={{ width: `${percentage[1]}%` }}></div>{' '}
        </div>
        <div className="progress_bar_container">
          <div className="progress_bar__bar" style={{ width: `${percentage[2]}%` }}></div>
        </div>
        <div className="information_icon">
          <Information fill="white" height={25} width={25} />
        </div>
      </div>
      <div className="survey__content">
        <form
          id="formSurvey"
          onSubmit={async event => {
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
              currentStepInfo.fieldName && data[currentStepInfo.fieldName] ? data[currentStepInfo.fieldName] : null
            }
            currentValueWeigth={
              currentStepInfo.fieldName === 'weigthAndHeigth' && data['weigth'] ? data['weigth'] : null
            }
            currentValueHeigth={
              currentStepInfo.fieldName === 'weigthAndHeigth' && data['heigth'] ? data['heigth'] : null
            }
          />
        </form>
        <SurveyActions
          currentStep={currentStep}
          nextStep={nextStep}
          prevStep={prevStep}
          length={steps.length}
          isStepValid={isStepValid}
          form="surveyForm"
        />
      </div>
      <div className="logo_icon">
        <Logo fill="white" height={40} width={40} style={{ filter: 'brightness(3)' }} />
      </div>
      <ToastContainer />
    </div>
  );
};

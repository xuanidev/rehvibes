import { useState, useEffect } from 'react';
import { SurveyStep, SurveyActions } from '../components/survey/index';
import { useNavigate } from 'react-router-dom';
import { toastError } from '../constants';
import { surveyErrors } from '../components/survey/errors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Isotype } from '../components/branding';
import { callToAssistant } from '../api/openai';
import { calculateDecrementPercentage, calculatePercentage, checkPercentage } from '../utils/survey';
import { removeFromLocalStorage } from '../utils/helpers';
import LoaderContainer from '../components/LoaderContainer';
import { getSurveySteps } from '../components/survey/surveySteps';
import SurveyTop from '../components/survey/SurveyTop';
import { generateProgram } from '../api/programs';

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
  const [loading, setLoading] = useState<boolean>(false);
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
    checkPercentage({ numSteps, percentage, setNumSteps, setPercentage });
  }, []);

  const handleStep = (name: string, value?: string, num?: number) => {
    if (!num) {
      if (name === 'desire') {
        const { birth_date, genero, motivaciones, weigth, heigth } = data;
        setData({
          birth_date,
          genero,
          motivaciones,
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
    calculateDecrementPercentage({ currentStep, numSteps, setPercentage, data });
  };

  const nextStep = () => {
    if (isStepValid.state) {
      setCurrentStep(prevStep => prevStep + 1);
      setIsStepValid({ state: false, error: surveyErrors.generalMsg });
      toast.dismiss(toastId);
      calculatePercentage({ data, numSteps, setNumSteps, currentStep, setPercentage, percentage });
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('currentStep', currentStep.toString());
    } else {
      const toastIdAux = toast.error(isStepValid.error, toastError);
      setToastId(toastIdAux);
    }
  };

  const handleSubmit = async () => {
    console.log(data);
    removeFromLocalStorage('currentStep');
    removeFromLocalStorage('data');
    removeFromLocalStorage('numSteps');
    removeFromLocalStorage('percentage');
    setLoading(true);
    try {
      const resultGPT = await callToAssistant(JSON.stringify(data));
      let program = [];
      program = JSON.parse(resultGPT);
      const rehabilitationProgram = {
        rehabilitation_program: program,
        patient_profile: data,
      };
      await generateProgram(rehabilitationProgram);
      navigate('/');
    } catch (error) {
      const toastIdAux = toast.error((error as Error).message, toastError);
      setToastId(toastIdAux);
    }
    setLoading(false);
  };

  const steps = getSurveySteps(data);

  interface SurveyData {
    [key: string]: any;
  }

  const currentStepInfo = steps[currentStep] as SurveyData;
  return (
    <div className="survey">
      <SurveyTop percentage={percentage} />
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
          form="formSurvey"
        />
      </div>
      <div className="logo_icon">
        <Isotype fill="white" height={40} width={40} style={{ filter: 'brightness(3)' }} />
      </div>
      <LoaderContainer text="Generando rehabilitación" isLoaded={loading} />
      <ToastContainer />
    </div>
  );
};

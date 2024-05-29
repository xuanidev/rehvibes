import { SurveyData } from '../../models';
import { SurveyStep } from './SurveyStep';

interface FormSurveyProps {
  handleStep: (name: string, value?: string, num?: number) => void;
  setIsStepValid: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      error: string;
    }>
  >;
  currentStepInfo: { [key: string]: string };
  handleSubmit: () => Promise<void>;
  data: SurveyData;
}

export const FormSurvey = (props: FormSurveyProps) => {
  const { handleStep, handleSubmit, currentStepInfo, setIsStepValid, data } = props;
  const fieldName = currentStepInfo.fieldName as keyof SurveyData;
  return (
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
        currentValue={data[fieldName]}
        currentValueWeigth={
          currentStepInfo.fieldName === 'weigthAndHeigth' && data['weigth'] ? data['weigth'] : undefined
        }
        currentValueHeigth={
          currentStepInfo.fieldName === 'weigthAndHeigth' && data['heigth'] ? data['heigth'] : undefined
        }
      />
    </form>
  );
};
export default FormSurvey;

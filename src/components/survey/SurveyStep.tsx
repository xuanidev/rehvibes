import Options from "./Options";
import OptionsAndInput from "./OptionsAndInput";
import MultipleChoices from "./MultipleChoices";
import MultipleChoicesAndInput from "./MultipleChoicesAndInput";
import BirthDate from "./BirthDate";
import WeigthAndHeigth from "./WeigthAndHeigth";

interface SurveyStepsProps {
  setStepValid: (value: { state: boolean; error: string }) => void;
  handleStep: (name: string, value?: string, num?: number) => void;
  stepInfo: any;
  currentValue?: string;
  currentValueWeigth?: string;
  currentValueHeigth?: string;
}

export const SurveyStep = (props: SurveyStepsProps) => {
  const { stepInfo, currentValue, currentValueWeigth, currentValueHeigth } =
    props;
  switch (stepInfo.fieldType) {
    case "Options": {
      return <Options {...props} currentValue={currentValue ?? null} />;
    }
    case "OptionsAndInput": {
      return <OptionsAndInput currentValue={currentValue ?? null} {...props} />;
    }
    case "MultipleChoices": {
      return <MultipleChoices currentValue={currentValue ?? null} {...props} />;
    }
    case "MultipleChoicesAndInput": {
      return (
        <MultipleChoicesAndInput
          currentValue={currentValue ?? null}
          {...props}
        />
      );
    }
    case "BirthDate": {
      return <BirthDate currentValue={currentValue ?? null} {...props} />;
    }
    case "WeigthAndHeigth": {
      return (
        <WeigthAndHeigth
          currentValueHeigth={currentValueHeigth ?? null}
          currentValueWeigth={currentValueWeigth ?? null}
          {...props}
        />
      );
    }
  }
};

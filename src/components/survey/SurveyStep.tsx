import {
  Options,
  OptionsAndInput,
  MultipleChoices,
  MultipleChoicesAndInput,
  BirthDate,
  WeightAndHeight,
} from "./index";

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
        <WeightAndHeight
          currentValueHeigth={currentValueHeigth ?? null}
          currentValueWeigth={currentValueWeigth ?? null}
          {...props}
        />
      );
    }
  }
};

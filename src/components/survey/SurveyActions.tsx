interface SurveyActionsProps {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
  length: number;
  isStepValid: {
    state: boolean;
    error: string;
  };
  form?: string;
}

export const SurveyActions = (props: SurveyActionsProps) => {
  const { currentStep, prevStep, nextStep, length, isStepValid, form } = props;
  return (
    <div className="survey__actions">
      {currentStep > 0 && (
        <button type="button" className="survey__btn survey__btn--back" onClick={prevStep}>
          Volver
        </button>
      )}
      {currentStep < length - 1 && (
        <button type="button" className="survey__btn survey__btn--right" onClick={nextStep}>
          Siguiente
        </button>
      )}
      {currentStep === length - 1 && (
        <button form={form} type="submit" className="survey__btn survey__btn--right" disabled={!isStepValid.state}>
          Enviar
        </button>
      )}
    </div>
  );
};

export default SurveyActions;

import { useEffect, useState } from 'react';
import './survey.scss';
import { StepOptionsAndInput } from '../../models';
import { surveyErrors } from './errors';

export const OptionsAndInput = (props: StepOptionsAndInput) => {
  const { setStepValid, handleStep, stepInfo, currentValue } = props;
  const [clickedButton, setClickedButton] = useState<string | null>(currentValue);
  const [other, setOther] = useState<string>('');

  useEffect(() => {
    if (currentValue !== null && currentValue !== '') {
      if (stepInfo.inputs.includes(currentValue)) {
        setClickedButton(currentValue);
        setStepValid({ state: true, error: '' });
      } else {
        setOther(currentValue !== null ? currentValue : '');
        setStepValid({ state: true, error: '' });
      }
    } else {
      setStepValid({ state: false, error: surveyErrors.generalMsg });
    }
  }, [currentValue]);

  const handleButtonClick = (value: string) => {
    if (clickedButton === value) {
      setClickedButton(null);
      setStepValid({ state: false, error: surveyErrors.generalMsg });
    } else {
      setOther('');
      setStepValid({ state: true, error: '' });
      setClickedButton(value);
      handleStep(stepInfo.fieldName, value, undefined);
    }
  };

  const handleOtherInputChange = (value: string) => {
    if (value === '') {
      setStepValid({ state: false, error: surveyErrors.generalMsg });
    } else if (value.length < 4) {
      setStepValid({
        state: false,
        error: surveyErrors.inputMsg,
      });
    } else {
      setStepValid({ state: true, error: '' });
      handleStep(stepInfo.fieldName, value, undefined);
    }
  };

  return (
    <>
      <label className="step__question" form="formSurvey">
        {stepInfo.question}
      </label>
      <div className="step">
        {stepInfo.inputs.map((input, index) => (
          <button type="button" key={index} className="step__btn" onClick={() => handleButtonClick(input)}>
            {input}
          </button>
        ))}
        <input
          type="text"
          className="step__btn step__input"
          value={other}
          onChange={e => {
            setOther(e.target.value);
            handleOtherInputChange(e.target.value);
          }}
          onClick={() => setClickedButton(null)}
          placeholder={stepInfo.otherText}
        />
      </div>
    </>
  );
};

export default OptionsAndInput;

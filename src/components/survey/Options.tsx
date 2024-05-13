import { useState, useLayoutEffect } from 'react';
import '../../styles/style.scss';
import './survey.scss';
import { StepOptions } from '../../models';
import { surveyErrors } from './errors';

export const Options = (props: StepOptions) => {
  const { handleStep, setStepValid, stepInfo, currentValue } = props;
  const [clickedButton, setClickedButton] = useState<string | null>(currentValue);
  const midpoint = Math.ceil(stepInfo.options.length / 2);
  const firstHalf = stepInfo.options.slice(0, midpoint);
  const secondHalf = stepInfo.options.slice(midpoint);

  useLayoutEffect(() => {
    setClickedButton(currentValue);
    if (currentValue !== null) {
      setStepValid({ state: true, error: '' });
    }
    updateOverflowShadow();
  }, [currentValue]);

  function isOverflowing(element: HTMLElement): boolean {
    return element.scrollHeight > element.clientHeight;
  }

  // Add box-shadow class if overflowing
  function updateOverflowShadow() {
    const form = document.querySelector('.step') as HTMLElement | null;
    console.log(form);
    if (form) {
      if (isOverflowing(form)) {
        form.classList.add('overflowing');
      } else {
        form.classList.remove('overflowing');
      }
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateOverflowShadow);
    window.addEventListener('DOMContentLoaded', updateOverflowShadow);

    return () => {
      window.removeEventListener('resize', updateOverflowShadow);
      window.removeEventListener('DOMContentLoaded', updateOverflowShadow);
    };
  }, []);

  const handleClick = (name: string, value: string) => {
    if (clickedButton === null) {
      setClickedButton(value);
      setStepValid({ state: true, error: '' });
    } else if (clickedButton === value) {
      setClickedButton(null);
      setStepValid({ state: false, error: surveyErrors.optionsMsg });
    } else {
      setClickedButton(value);
      setStepValid({ state: true, error: '' });
    }
    if (clickedButton !== '') {
      handleStep(name, value);
    }
  };

  return (
    <>
      <label className="step__question" form="formSurvey">
        {stepInfo.question}
      </label>
      <div className="step">
        {stepInfo.options.length < 7 ? (
          <div className="column">
            {stepInfo.options.map((option, index) => (
              <label key={index} className="step__option gradient-border">
                <input
                  type="checkbox"
                  checked={clickedButton === option}
                  onChange={() => handleClick(stepInfo.fieldName, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ) : (
          <div className="columns">
            <div className="column">
              {firstHalf.map((option, index) => (
                <label key={index} className="step__option gradient-border">
                  <input
                    type="checkbox"
                    checked={clickedButton === option}
                    onChange={() => handleClick(stepInfo.fieldName, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="column">
              {secondHalf.map((option, index) => (
                <label key={index} className="step__option gradient-border">
                  <input
                    type="checkbox"
                    checked={clickedButton === option}
                    onChange={() => handleClick(stepInfo.fieldName, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Options;

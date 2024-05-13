import { useState, useEffect } from 'react';
import './survey.scss';
import { StepMultipleChoicesInput } from '../../models';
import { surveyErrors } from './errors';

export const MultipleChoicesAndInput = (props: StepMultipleChoicesInput) => {
  const { handleStep, setStepValid, stepInfo, currentValue } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(currentValue !== null ? [currentValue] : []);
  const [other, setOther] = useState<string>('');
  const midpoint = Math.ceil(stepInfo.options.length / 2);
  const firstHalf = stepInfo.options.slice(0, midpoint);
  const secondHalf = stepInfo.options.slice(midpoint);

  useEffect(() => {
    if (!currentValue || currentValue === '') {
      setSelectedOptions([]);
      setStepValid({ state: false, error: surveyErrors.generalMsg });

      return;
    }

    const values = currentValue.split(',').filter(value => stepInfo.options.includes(value.trim()));
    if (values.length > 0) {
      setSelectedOptions(values);
      setStepValid({ state: true, error: '' });
    } else {
      setOther(currentValue);
      setStepValid({ state: true, error: '' });
    }
  }, [currentValue]);

  const handleInput = (value: string) => {
    setSelectedOptions([]);
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
  const handleNotAlreadySelected = (newSelectedOptions: string[], value: string): string[] => {
    if (!selectedOptions.includes(stepInfo.exclusiveOption)) {
      if (value !== stepInfo.exclusiveOption) {
        newSelectedOptions.push(value);
        return newSelectedOptions;
      }
      return [];
    } else {
      return [value];
    }
  };
  const hanleAlreadySelected = (index: number, newSelectedOptions: string[]): string[] => {
    if (newSelectedOptions.length > 1) {
      newSelectedOptions.splice(index, 1);
      return newSelectedOptions;
    } else {
      setStepValid({ state: false, error: surveyErrors.generalMsg });
      return [];
    }
  };

  const handleOption = (name: string, value: string) => {
    const index = selectedOptions.indexOf(value);
    let newSelectedOptions = [...selectedOptions];
    if (index === -1) {
      // If not already selected, add it to the selectedOptions
      newSelectedOptions = handleNotAlreadySelected(newSelectedOptions, value);
    } else {
      // If already selected, remove it from the selectedOptions
      newSelectedOptions = hanleAlreadySelected(index, newSelectedOptions);
    }

    setSelectedOptions(newSelectedOptions);
    if (newSelectedOptions.length > 0) {
      setStepValid({ state: true, error: '' });
    } else {
      setStepValid({ state: false, error: surveyErrors.generalMsg });
    }
    handleStep(name, newSelectedOptions.toString());
  };

  const handleExclusiveOption = (name: string) => {
    if (!selectedOptions.includes(stepInfo.exclusiveOption)) {
      setSelectedOptions([stepInfo.exclusiveOption]);
      setStepValid({ state: true, error: '' });
      handleStep(name, stepInfo.exclusiveOption);
    } else {
      setSelectedOptions([]);
      setStepValid({ state: false, error: surveyErrors.generalMsg });
    }
  };

  const handleClick = (name: string, value: string, input: boolean) => {
    if (input) {
      handleInput(value);
    } else {
      setOther('');
      if (value === stepInfo.exclusiveOption) {
        // If "Ninguna de las anteriores" is selected, disable all other options
        handleExclusiveOption(name);
      } else {
        //If a option is selected
        handleOption(name, value);
      }
    }
  };

  const onClickInput = () => {
    if (other.length < 3) {
      setStepValid({
        state: false,
        error: surveyErrors.inputMsg,
      });
    }
    setSelectedOptions([]);
  };

  return (
    <>
      <label className="step__question" form="formSurvey">
        {stepInfo.question}
      </label>
      <div className="step">
        {stepInfo.options.length < 6 ? (
          <div className="column">
            {stepInfo.options.map((option, index) => (
              <label key={index} className="step__option gradient-border">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleClick(stepInfo.fieldName, option, false)}
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
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleClick(stepInfo.fieldName, option, false)}
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
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleClick(stepInfo.fieldName, option, false)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
        <input
          type="text"
          className="step__input"
          value={other}
          onChange={e => {
            setOther(e.target.value);
            handleClick(stepInfo.fieldName, e.target.value, true);
          }}
          onClick={onClickInput}
          placeholder={stepInfo.otherText}
        />
      </div>
    </>
  );
};

export default MultipleChoicesAndInput;

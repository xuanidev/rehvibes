import { useState, useLayoutEffect } from 'react';
import './survey.scss';
import { StepMultipleChoices } from '../../models';
import { surveyErrors } from './errors';

export const MultipleChoices = (props: StepMultipleChoices) => {
  const { handleStep, setStepValid, stepInfo, currentValue } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(currentValue !== null ? [currentValue] : []);
  const midpoint = Math.ceil(stepInfo.options.length / 2);
  const firstHalf = stepInfo.options.slice(0, midpoint);
  const secondHalf = stepInfo.options.slice(midpoint);

  useLayoutEffect(() => {
    if (currentValue) {
      setSelectedOptions(currentValue.split(','));
      setStepValid({ state: true, error: '' });
    } else {
      setStepValid({ state: false, error: surveyErrors.optionsMsg });
    }
  }, [currentValue]);

  const handleExclusiveOption = (value: string) => {
    const isSelected = selectedOptions.includes(stepInfo.exclusiveOption);
    setSelectedOptions(isSelected ? [] : [value]);
    setStepValid({
      state: !isSelected,
      error: isSelected ? surveyErrors.optionsMsg : '',
    });
    handleStep(stepInfo.fieldName, isSelected ? '' : stepInfo.exclusiveOption);
  };

  const handleNotAlreadySelected = (newSelectedOptions: string[], value: string): string[] => {
    if (!selectedOptions.includes(stepInfo.exclusiveOption)) {
      if (value !== stepInfo.exclusiveOption) {
        newSelectedOptions.push(value);
        return newSelectedOptions;
      }
    } else {
      return [value];
    }
    return [];
  };

  const handleOption = (name: string, value: string) => {
    const index = selectedOptions.indexOf(value);
    let newSelectedOptions = [...selectedOptions];

    if (index === -1) {
      // If not already selected, add it to the selectedOptions
      newSelectedOptions = handleNotAlreadySelected(newSelectedOptions, value);
    } else {
      // If already selected, remove it from the selectedOptions
      newSelectedOptions.splice(index, 1);
    }

    setSelectedOptions(newSelectedOptions);
    if (newSelectedOptions.length > 0) {
      setStepValid({ state: true, error: '' });
    } else {
      setStepValid({ state: false, error: surveyErrors.optionsMsg });
    }
    handleStep(name, newSelectedOptions.toString());
  };

  const handleClick = (name: string, value: string) => {
    if (value === stepInfo.exclusiveOption) {
      // If "Ninguna de las anteriores" is selected, disable all other options
      handleExclusiveOption(value);
    } else {
      handleOption(name, value);
    }
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
                    checked={selectedOptions.includes(option)}
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
                    checked={selectedOptions.includes(option)}
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

export default MultipleChoices;

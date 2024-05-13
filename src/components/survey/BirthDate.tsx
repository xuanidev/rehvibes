import React, { useState, useEffect } from 'react';
import { Step } from '../../models';
import './birthdate.scss';
import { getYear } from 'date-fns';
import range from 'lodash.range';
import { surveyErrors } from './errors';

export const BirthDate = (props: Step) => {
  const { setStepValid, handleStep, stepInfo, currentValue } = props;
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (currentValue !== null) {
      setCurrentDate(new Date(currentValue).toISOString().slice(0, 10));
      setStepValid({ state: true, error: '' });
    } else {
      setStepValid({ state: false, error: surveyErrors.generalMsg });
    }
  }, [currentValue]);

  const validateDateOfBirth = (dateOfBirth: Date): boolean => {
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    console.log(age);
    return (
      age >= 18 ||
      (age === 18 && currentDate >= new Date(currentDate.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate()))
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setCurrentDate(dateValue);

    if (!validateDateOfBirth(new Date(dateValue))) {
      setStepValid({ state: false, error: surveyErrors.olderMsg });
      return;
    }

    setStepValid({ state: true, error: '' });
    handleStep(stepInfo.fieldName || 'birthDate', dateValue);
  };

  return (
    <>
      <div className="birth_date">
        <label className="birth_date__title">Fecha de nacimiento:</label>
        <div className="birth_date__date">
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={currentDate}
            onChange={handleChange}
            max={new Date().toISOString().slice(0, 10)}
          />
        </div>
      </div>
    </>
  );
};

export default BirthDate;

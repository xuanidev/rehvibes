import { useState, useEffect } from "react";
import { Step } from "../../models";
import "./birthdate.scss";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash.range";
import "react-datepicker/dist/react-datepicker.css";
import { days, months } from "../../constants";
import { surveyErrors } from "./errors";
import { Calendar } from "../icons";

export const BirthDate = (props: Step) => {
  const { setStepValid, handleStep, stepInfo, currentValue } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const years = range(1950, getYear(new Date()) + 1, 1);

  useEffect(() => {
    if (currentValue !== null) {
      setCurrentDate(new Date(currentValue));
      setStepValid({ state: true, error: "" });
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
      (age === 18 &&
        currentDate >=
          new Date(
            currentDate.getFullYear(),
            dateOfBirth.getMonth(),
            dateOfBirth.getDate()
          ))
    );
  };

  const handleChange = (date: Date | null) => {
    if (!date) return;
    setCurrentDate(date);

    if (!validateDateOfBirth(date)) {
      setStepValid({ state: false, error: surveyErrors.olderMsg });
      return;
    }

    setStepValid({ state: true, error: "" });
    handleStep(
      stepInfo.fieldName || "birthDate",
      date.toISOString().slice(0, 10)
    );
  };

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };
  return (
    <>
      <div className="birth_date">
        <label className="birth_date__title">Fecha de nacimiento:</label>
        <div className="birth_date__date">
          <label htmlFor="dateOfBirth" className="birth_date__input">
            <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }: any) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      decreaseMonth();
                    }}
                    disabled={prevMonthButtonDisabled}
                    className="datepicker__btn"
                  >
                    {"<"}
                  </button>
                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                    className="datepicker__btn"
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                    className="datepicker__btn"
                  >
                    {years.map((option: any) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      increaseMonth();
                    }}
                    disabled={nextMonthButtonDisabled}
                    className="datepicker__btn"
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={currentDate}
              onChange={handleChange}
              locale={locale}
              popperPlacement="bottom"
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default BirthDate;

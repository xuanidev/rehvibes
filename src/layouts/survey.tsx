import { useState } from "react";
import Options from "../components/survey/options";
import BirthDate from "../components/survey/birthDate";
import WeigthAndHeigth from "../components/survey/weigthAndHeigth";
import OptionsAndInput from "../components/survey/optionsAndInput";
import MultipleChoices from "../components/survey/multipleChoices";
import MultipleChoicesInput from "../components/survey/multipleChoicesInput";
import { SurveyData } from "../models";
import {
  genero,
  operationCuello,
  operationHombro,
  operationEspalda,
  operationCadera,
  operationCodo,
  operationColumna,
  operationMuneca,
  operationPie,
  operationRodilla,
  operationTobillo,
  goals,
  desire,
  zones,
  lastOperation,
  lesionZones,
  lesionBeforeZones,
  rehabilitation,
  nivel,
  lugar,
  objetivos,
  tipoEjercicios,
  equipamiento,
  condiciones,
  condicionRespiratoria,
  dolor,
  enfermedadCardiovascular,
  estres,
  movilidad,
  nivelActividadActual,
  practicaRegular,
  rehabilitacionPreviamente,
  trabajoSentado,
} from "../optionsData";

export const Survey = () => {
  const [data, setData] = useState<SurveyData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState({
    state: false,
    error: "Fill all the fields",
  });

  const handleStep = (name: string, value?: string, num?: number) => {
    if (!num) {
      if (name === "desire") {
        console.log(name);
        const { dateOfBirth, genero, goals, weigth, heigth } = data;
        setData({
          dateOfBirth,
          genero,
          goals,
          weigth,
          heigth,
          [name]: value,
        });
      } else {
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: num,
      }));
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setIsStepValid({ state: true, error: "" });
  };

  const nextStep = () => {
    if (isStepValid.state) {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsStepValid({ state: false, error: "Fill all the fields" });
    } else {
      alert(isStepValid.error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Datos de la encuesta:", data);
  };

  const steps = [
    <Options
      key={goals.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={goals.fieldName}
      options={goals.options}
      question={goals.question}
      currentValue={
        goals.fieldName in data
          ? data[goals.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <OptionsAndInput
      key={genero.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      inputs={genero.options}
      question={genero.question}
      otherText="Otro"
      fieldName={genero.fieldName}
      currentValue={
        genero.fieldName in data
          ? data[genero.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <BirthDate
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={"dateOfBirth"}
      currentValue={
        "dateOfBirth" in data
          ? data["dateOfBirth" as keyof SurveyData] ?? null
          : null
      }
    />,
    <WeigthAndHeigth
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      currentValueWeigth={
        "weigth" in data ? data["weigth" as keyof SurveyData] ?? null : null
      }
      currentValueHeigth={
        "heigth" in data ? data["heigth" as keyof SurveyData] ?? null : null
      }
    />,
    <Options
      key={desire.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={desire.fieldName}
      options={desire.options}
      question={desire.question}
      currentValue={
        desire.fieldName in data
          ? data[desire.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
  ];
  const lesionComponents = {
    Cuello: (
      <OptionsAndInput
        key={operationCuello.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationCuello.options}
        question={operationCuello.question}
        otherText="Otro"
        fieldName={operationCuello.fieldName}
        currentValue={
          operationCuello.fieldName in data
            ? data[operationCuello.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    Hombro: (
      <OptionsAndInput
        key={operationHombro.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationHombro.options}
        question={operationHombro.question}
        otherText="Otro"
        fieldName={operationHombro.fieldName}
        currentValue={
          operationHombro.fieldName in data
            ? data[operationHombro.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    Espalda: (
      <OptionsAndInput
        key={operationEspalda.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationEspalda.options}
        question={operationEspalda.question}
        otherText="Otro"
        fieldName={operationEspalda.fieldName}
        currentValue={
          operationEspalda.fieldName in data
            ? data[operationEspalda.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    Cadera: (
      <OptionsAndInput
        key={operationCadera.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationCadera.options}
        question={operationCadera.question}
        otherText="Otro"
        fieldName={operationCadera.fieldName}
        currentValue={
          operationCadera.fieldName in data
            ? data[operationCadera.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    Codo: (
      <OptionsAndInput
        key={operationCodo.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationCodo.options}
        question={operationCodo.question}
        otherText="Otro"
        fieldName={operationCodo.fieldName}
        currentValue={
          operationCodo.fieldName in data
            ? data[operationCodo.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    Muñeca: (
      <OptionsAndInput
        key={operationMuneca.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationMuneca.options}
        question={operationMuneca.question}
        otherText="Otro"
        fieldName={operationMuneca.fieldName}
        currentValue={
          operationMuneca.fieldName in data
            ? data[operationMuneca.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    Rodilla: (
      <OptionsAndInput
        key={operationRodilla.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationRodilla.options}
        question={operationRodilla.question}
        otherText="Otro"
        fieldName={operationRodilla.fieldName}
        currentValue={
          operationRodilla.fieldName in data
            ? data[operationRodilla.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    Pie: (
      <OptionsAndInput
        key={operationPie.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationPie.options}
        question={operationPie.question}
        otherText="Otro"
        fieldName={operationPie.fieldName}
        currentValue={
          operationPie.fieldName in data
            ? data[operationPie.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    Tobillo: (
      <OptionsAndInput
        key={operationTobillo.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        inputs={operationTobillo.options}
        question={operationTobillo.question}
        otherText="Otro"
        fieldName={operationTobillo.fieldName}
        currentValue={
          operationTobillo.fieldName in data
            ? data[operationTobillo.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
    "Columna vertebral": (
      <OptionsAndInput
        key={operationColumna.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        question={operationColumna.question}
        inputs={operationColumna.options}
        otherText="Otro"
        fieldName={operationColumna.fieldName}
        currentValue={
          operationColumna.fieldName in data
            ? data[operationColumna.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    ),
  };

  if (data.desire == "Recuperarme de una lesión o cirugía") {
    steps.push(
      <Options
        key={lesionZones.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        fieldName={lesionZones.fieldName}
        question={lesionZones.question}
        options={lesionZones.options}
        currentValue={
          lesionZones.fieldName in data
            ? data[lesionZones.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    );

    const isValidLesionKey = (
      key: string
    ): key is keyof typeof lesionComponents => {
      return key in lesionComponents;
    };
    if (
      data.desire === "Recuperarme de una lesión o cirugía" &&
      data.lesionZones &&
      isValidLesionKey(data.lesionZones)
    ) {
      const Component = lesionComponents[data.lesionZones];
      if (Component && !steps.some((step) => step.type === Component)) {
        steps.push(Component);
      }
    }

    steps.push(
      <Options
        key={rehabilitation.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        fieldName={rehabilitation.fieldName}
        question={rehabilitation.question}
        options={rehabilitation.options}
        currentValue={
          rehabilitation.fieldName in data
            ? data[rehabilitation.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    );
  } else {
    steps.push(
      <Options
        key={zones.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        fieldName={zones.fieldName}
        question={zones.question}
        options={zones.options}
        currentValue={
          zones.fieldName in data
            ? data[zones.fieldName as keyof SurveyData] ?? null
            : null
        }
      />,
      <Options
        key={lastOperation.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        fieldName={lastOperation.fieldName}
        question={lastOperation.question}
        options={lastOperation.options}
        currentValue={
          lastOperation.fieldName in data
            ? data[lastOperation.fieldName as keyof SurveyData] ?? null
            : null
        }
      />,
      <MultipleChoices
        key={lesionBeforeZones.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        fieldName={lesionBeforeZones.fieldName}
        question={lesionBeforeZones.question}
        options={lesionBeforeZones.options}
        exclusiveOption={lesionBeforeZones.exclusiveOption}
        currentValue={
          lesionBeforeZones.fieldName in data
            ? data[lesionBeforeZones.fieldName as keyof SurveyData] ?? null
            : null
        }
      />,
      <Options
        key={objetivos.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        fieldName={objetivos.fieldName}
        question={objetivos.question}
        options={objetivos.options}
        currentValue={
          objetivos.fieldName in data
            ? data[objetivos.fieldName as keyof SurveyData] ?? null
            : null
        }
      />,
      <Options
        key={tipoEjercicios.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        fieldName={tipoEjercicios.fieldName}
        question={tipoEjercicios.question}
        options={tipoEjercicios.options}
        currentValue={
          tipoEjercicios.fieldName in data
            ? data[tipoEjercicios.fieldName as keyof SurveyData] ?? null
            : null
        }
      />,
      <Options
        key={nivel.fieldName}
        handleStep={handleStep}
        setStepValid={setIsStepValid}
        fieldName={nivel.fieldName}
        question={nivel.question}
        options={nivel.options}
        currentValue={
          nivel.fieldName in data
            ? data[nivel.fieldName as keyof SurveyData] ?? null
            : null
        }
      />
    );
  }
  steps.push(
    <Options
      key={lugar.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={lugar.fieldName}
      question={lugar.question}
      options={lugar.options}
      currentValue={
        lugar.fieldName in data
          ? data[lugar.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <MultipleChoices
      key={equipamiento.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={equipamiento.fieldName}
      question={equipamiento.question}
      options={equipamiento.options}
      exclusiveOption={equipamiento.exclusiveOption}
      currentValue={
        equipamiento.fieldName in data
          ? data[equipamiento.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <MultipleChoicesInput
      key={condiciones.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={condiciones.fieldName}
      question={condiciones.question}
      options={condiciones.options}
      exclusiveOption={condiciones.exclusiveOption}
      otherText="Otro"
      currentValue={
        condiciones.fieldName in data
          ? data[condiciones.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <MultipleChoices
      key={movilidad.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={movilidad.fieldName}
      question={movilidad.question}
      options={movilidad.options}
      exclusiveOption={movilidad.exclusiveOption}
      currentValue={
        movilidad.fieldName in data
          ? data[movilidad.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <MultipleChoicesInput
      key={enfermedadCardiovascular.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={enfermedadCardiovascular.fieldName}
      question={enfermedadCardiovascular.question}
      options={enfermedadCardiovascular.options}
      exclusiveOption={enfermedadCardiovascular.exclusiveOption}
      otherText="Otro"
      currentValue={
        enfermedadCardiovascular.fieldName in data
          ? data[enfermedadCardiovascular.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <MultipleChoicesInput
      key={condicionRespiratoria.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={condicionRespiratoria.fieldName}
      question={condicionRespiratoria.question}
      options={condicionRespiratoria.options}
      exclusiveOption={condicionRespiratoria.exclusiveOption}
      otherText="Otro"
      currentValue={
        condicionRespiratoria.fieldName in data
          ? data[condicionRespiratoria.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <Options
      key={nivelActividadActual.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={nivelActividadActual.fieldName}
      question={nivelActividadActual.question}
      options={nivelActividadActual.options}
      currentValue={
        nivelActividadActual.fieldName in data
          ? data[nivelActividadActual.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <Options
      key={practicaRegular.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={practicaRegular.fieldName}
      question={practicaRegular.question}
      options={practicaRegular.options}
      currentValue={
        practicaRegular.fieldName in data
          ? data[practicaRegular.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <Options
      key={trabajoSentado.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={trabajoSentado.fieldName}
      question={trabajoSentado.question}
      options={trabajoSentado.options}
      currentValue={
        trabajoSentado.fieldName in data
          ? data[trabajoSentado.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <Options
      key={estres.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={estres.fieldName}
      question={estres.question}
      options={estres.options}
      currentValue={
        estres.fieldName in data
          ? data[estres.fieldName as keyof SurveyData] ?? null
          : null
      }
    />,
    <Options
      key={rehabilitacionPreviamente.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={rehabilitacionPreviamente.fieldName}
      question={rehabilitacionPreviamente.question}
      options={rehabilitacionPreviamente.options}
      currentValue={
        rehabilitacionPreviamente.fieldName in data
          ? data[rehabilitacionPreviamente.fieldName as keyof SurveyData] ??
            null
          : null
      }
    />,
    <Options
      key={dolor.fieldName}
      handleStep={handleStep}
      setStepValid={setIsStepValid}
      fieldName={dolor.fieldName}
      question={dolor.question}
      options={dolor.options}
      currentValue={
        dolor.fieldName in data
          ? data[dolor.fieldName as keyof SurveyData] ?? null
          : null
      }
    />
  );

  return (
    <div className="survey">
      <form onSubmit={handleSubmit} className="survey__form">
        {steps[currentStep]}
        <div className="survey__actions">
          {currentStep > 0 && (
            <button type="button" className="btn__survey" onClick={prevStep}>
              Atrás
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button type="button" className="btn__survey" onClick={nextStep}>
              Siguiente
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button type="submit" disabled={!isStepValid.state}>
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

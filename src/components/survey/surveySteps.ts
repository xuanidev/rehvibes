// surveySteps.ts

import { SurveyData } from '../../models';
import {
    genero,
    birthDate,
    weigthAndHeigth,
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
  } from '../../optionsData'
  
  const getSurveySteps = (data: SurveyData) => {
    const steps = [goals, genero, birthDate, weigthAndHeigth, desire];
    const lesionComponents = {
        'Cuello': operationCuello,
        'Hombro': operationHombro,
        'Espalda': operationEspalda,
        'Cadera': operationCadera,
        'Codo': operationCodo,
        'Muñeca': operationMuneca,
        'Rodilla': operationRodilla,
        'Pie': operationPie,
        'Tobillo': operationTobillo,
        'Columna vertebral': operationColumna,
    };

    if (data.desire === desire.conditionOption) {
        steps.push(lesionZones);
        const isValidLesionKey = (key: string): key is keyof typeof lesionComponents => {
        return key in lesionComponents;
        };
        if (data.desire === desire.conditionOption && data.zonas_de_molestia && isValidLesionKey(data.zonas_de_molestia)) {
        const component = lesionComponents[data.zonas_de_molestia];
        if (component) {
            steps.push(component);
        }
        }

        steps.push(rehabilitation);
    } else {
        steps.push(zones, lastOperation, lesionBeforeZones, objetivos, tipoEjercicios, nivel);
    }
    steps.push(
        lugar,
        equipamiento,
        condiciones,
        movilidad,
        enfermedadCardiovascular,
        condicionRespiratoria,
        nivelActividadActual,
        practicaRegular,
        trabajoSentado,
        estres,
        rehabilitacionPreviamente,
        dolor,
    );
    return steps
  };
  
  export { getSurveySteps };
  
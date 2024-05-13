export interface Step {
    setStepValid: (value: { state: boolean; error: string }) => void;
    handleStep: (name: string, value?: string, num?: number) => void;
    stepInfo:{
        fieldType:
        | 'Options'
        | 'OptionsAndInput'
        | 'MultipleChoices'
        | 'MultipleChoicesAndInput'
        | 'BirthDate' 
        | 'WeigthAndHeigth';
        fieldName?: string;
    }
    currentValue: string | null;
}
export interface StepWeightAndHeight {
    setStepValid: (value: { state: boolean; error: string }) => void;
    handleStep: (name: string, value?: string, num?: number) => void;
    stepInfo:{
        fieldType:
        | 'Options'
        | 'OptionsAndInput'
        | 'MultipleChoices'
        | 'MultipleChoicesAndInput'
        | 'BirthDate' 
        | 'WeigthAndHeigth';
        fieldName?: string;
        question1?: string;
        question2?: string;
    }
    currentValueWeigth: string | null,
    currentValueHeigth:string | null
}
export interface StepOptions {
    setStepValid: (value: { state: boolean; error: string }) => void;
    handleStep: (name: string, value?: string, num?: number) => void;
    stepInfo:{
        fieldType:
        | 'Options'
        | 'OptionsAndInput'
        | 'MultipleChoices'
        | 'MultipleChoicesAndInput'
        | 'BirthDate' 
        | 'WeigthAndHeigth';
        question: string;
        fieldName: string;
        options: string[];
    }
    currentValue: string | null;
}
export interface StepOptionsAndInput {
    setStepValid: (value: { state: boolean; error: string }) => void;
    handleStep: (name: string, value?: string, num?: number) => void;
    stepInfo:{
        fieldType:
        | 'Options'
        | 'OptionsAndInput'
        | 'MultipleChoices'
        | 'MultipleChoicesAndInput'
        | 'BirthDate' 
        | 'WeigthAndHeigth';
        options: string[];
        question: string;
        otherText:string;
        fieldName: string;
    }
    currentValue: string | null;
}
export interface StepMultipleChoices {
    setStepValid: (value: { state: boolean; error: string }) => void;
    handleStep: (name: string, value?: string, num?: number) => void;
    stepInfo:{
        fieldType:
        | 'Options'
        | 'OptionsAndInput'
        | 'MultipleChoices'
        | 'MultipleChoicesAndInput'
        | 'BirthDate' 
        | 'WeigthAndHeigth';
        question: string;
        fieldName: string;
        exclusiveOption: string;
        options: string[];
        otherText: string;
    }
    currentValue: string | null;

}
export interface StepMultipleChoicesInput {
    setStepValid: (value: { state: boolean; error: string }) => void;
    handleStep: (name: string, value?: string, num?: number) => void;
    stepInfo:{
        fieldType:
        | 'Options'
        | 'OptionsAndInput'
        | 'MultipleChoices'
        | 'MultipleChoicesAndInput'
        | 'BirthDate' 
        | 'WeigthAndHeigth';
        question: string;
        fieldName: string;
        exclusiveOption: string;
        options: string[];
        otherText: string;
    }
    currentValue: string | null;
}

export interface SurveyData {
    genero?:string;
    goals?:string;
    dateOfBirth?: string;
    heigth?: string;
    weigth?: string;
    operationCuello?: string;
    operationColumna?: string;
    operationHombro?: string;
    operationEspalda?: string;
    operationCadera?: string;
    operationCodo?: string;
    operationMuneca?: string;
    operationRodilla?: string;
    operationPie?: string;
    operationTobillo?: string;
    desire?: string;
    zones?: string;
    lastOperation?: string;
    lesionZones?: string;
    lesionBeforeZones?: string;
    rehabilitation?: string;
    objetivos?: string;
    tipoEjercicios?: string;
    nivel?: string;
    lugar?: string;
    equipamiento?: string;
    condiciones?: string;
    condicionRespiratoria?: string;
    dolor?: string;
    enfermedadCardiovascular?: string;
    estres?: string;
    movilidad?: string;
    nivelActividadActual?: string;
    practicaRegular?: string;
    rehabilitacionPreviamente?: string;
    trabajoSentado?: string;
  }
  
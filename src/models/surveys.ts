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
    motivacion?:string;
    birth_date?: string;
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
    zonas_de_molestia?: string;
    operacion_recientemente?: string;
    zonas_con_molestias?: string;
    sufrido_lesion_antes?: string;
    objetivo_principal?: string;
    tipo_de_ejercicios?: string;
    nivel_entrenamiento?: string;
    lugar_entrenamiento?: string;
    equipamiento?: string;
    condiciones_cronicas?: string;
    condiciones_respiratorias?: string;
    nivel_dolor_actual?: string;
    enfermedades_cardiovasculares?: string;
    estres?: string;
    limitacion_movilidad?: string;
    nivel_actividad_fisica_actual?: string;
    practica_deporte_regular?: string;
    realizado_rehabilitacion_previamente?: string;
    trabajo_sentado?: string;
}

export interface CheckPercentageProps {
    percentage: number[];
    setPercentage: (value: React.SetStateAction<number[]>) => void;
    numSteps: number[];
    setNumSteps: (value: React.SetStateAction<number[]>) => void;
}

export interface SurveyData {
    desire?: string;
}

export interface CalculatePercentageProps {
    data: SurveyData;
    numSteps: number[];
    setNumSteps: (value: React.SetStateAction<number[]>) => void;
    currentStep: number;
    setPercentage: (value: React.SetStateAction<number[]>) => void;
    percentage: number[];
}

export interface CalculateDecrementPercentageProps {
    currentStep: number;
    numSteps: number[];
    setPercentage: (value: React.SetStateAction<number[]>) => void;
    data: SurveyData;
}
export interface ExerciseFromAPI {
    name: string;
    series: number;
    minRep: number;
    maxRep: number;
  }
  
export interface RehabilitationDay {
    day: number;
    exercises: ExerciseFromAPI[];
}

export interface RehabilitationProgramProps {
    rehabilitation_program: RehabilitationDay[];
    days?: number;
    uid?: string;
    user_id?: string;
    name?: string;
    groups?: string[];
    description?: string;
}
export interface GenerateProgramProps {
    rehabilitation_program: RehabilitationDay[];
    patient_profile?: SurveyData;
}

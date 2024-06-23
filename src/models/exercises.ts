export interface ExerciseFromApiFirebase {
    description: string,
    type: string,
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado',
    equipment:string[],
    frequency: number,
    id: number,
    image: string,
    instructions: string[],
    kcalBurned: string,
    mainAreas: string[],
    maxRep: number,
    minRep: number,
    name: string,
    objective: string,
    precautions:string,
    secondAreas: string[],
    series: number,
    video:string,
    creationDate?: string
}

export interface Exercise {
    description: string,
    type: string,
    difficulty: 'Principiante' | 'Intermedio' | 'Avanzado',
    equipment:string[],
    frequency: number,
    id: number,
    image: string,
    instructions: string[],
    kcalBurned: string,
    mainAreas: string[],
    maxRep: number,
    minRep: number,
    name: string,
    objective: string,
    precautions:string,
    secondAreas: string[],
    series: number,
    video:string,
    creationDate?: string,
}

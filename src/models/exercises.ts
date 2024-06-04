export interface exerciseFromApi {
    description: string,
    difficulty: string,
    equipment:string[],
    frecuency: number,
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

export interface exercisesFromApi {
    exercises: exerciseFromApi[]
}
export interface Exercise {
    name: string;
    description: string;
    repetitions?: string;
    duration_sec?: string;
    pause_sec?: string;
}

export interface DailyRoutine {
    day: string;
    exercices_num: string;
    exercises: Exercise[];
}

export interface Program {
    id: string;
    user_id: string;
    group: string;
    initDate: string;
    endDate: string;
    days: number;
    rutine: DailyRoutine[];
}

export interface ExerciseFromApi {
    name: string;
    description: string;
    repetitions?: string;
    duration_sec?: string;
    pause_sec?: string;
}

export interface DailyRoutineFromApi {
    day: string;
    exercices_num: string;
    exercises: Exercise[];
}

export interface ProgramFromApi {
    id: string;
    user_id: string;
    group: string;
    initDate: string;
    endDate: string;
    days: number;
    rutine: DailyRoutine[];
}
import uuid4 from "uuid4";
import { ExerciseFromAPI, RehabilitationDay, RehabilitationProgramProps } from "../models";
import { getFromCookies } from "../utils/helpers";

export const openAiToFirebase = (data: any, groups: string[], level?:string): RehabilitationProgramProps => {
    const program: RehabilitationProgramProps = {
        rehabilitation_program: [],
        finished: false
    };

    const exercisesArray = data.rehabilitation_program.days || data.rehabilitation_program.exercises || data.rehabilitation_program.exercises_per_day || data.rehabilitation_program.program || data.rehabilitation_program.rehabilitation_program;
    if (Array.isArray(exercisesArray)) {
        let currentDay = 0;
        const startDate = new Date();
        for (const dayData of exercisesArray) {
            const yourDate = new Date(startDate);
            yourDate.setDate(startDate.getDate() + currentDay);
            currentDay = currentDay + 1;

            const day: RehabilitationDay = {
                day: dayData.day ?? 0,
                date: yourDate.toISOString(),
                exercises: []
            };

            if (Array.isArray(dayData.exercises)) {
                for (const exerciseData of dayData.exercises) {
                    const exercise: ExerciseFromAPI = {
                        id:exerciseData.id ?? exerciseData.uid ?? "",
                        name: exerciseData.name ?? "",
                        series: exerciseData.series ?? 0,
                        minRep: exerciseData.minRep ?? exerciseData.minReps ?? exerciseData.min_reps ?? exerciseData.min_rep ?? exerciseData.min_repetitions ?? exerciseData.minreps ?? 0,
                        maxRep: exerciseData.maxRep ?? exerciseData.maxReps ?? exerciseData.max_reps ?? exerciseData.max_rep ?? exerciseData.max_repetitions ?? exerciseData.maxreps ?? 0,
                    };
                    day.exercises.push(exercise);
                    program.exercices?.push(exerciseData.id ?? exerciseData.uid ?? "");
                }
            }
            program.rehabilitation_program.push(day);
        }
        program.user_id = getFromCookies('uid');
        program.uid = uuid4();
        program.days = exercisesArray.length;
        program.name = data.rehabilitation_program.name ?? data.rehabilitation_program.programName ?? '';
        program.groups = groups ?? data.rehabilitation_program.groups ?? data.rehabilitation_program.group ?? [];
        program.description = data.rehabilitation_program.description ?? '';
        program.level = level ?? '';
        program.weeks = (exercisesArray.length ? Math.ceil(exercisesArray.length / 7) : 0).toString();
        program.hours = '20';
        program.completedDays = 0;
    }
    return program;
};

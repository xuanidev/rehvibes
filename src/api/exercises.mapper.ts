
import { Exercise, ExerciseFromApiFirebase } from "../models";

export const mapExerciseApiToExerciseView = (exercises: ExerciseFromApiFirebase[]): Exercise[] => {
    return exercises.map((exerciseItem: Exercise) => {
      return {
        description: exerciseItem.description,
        difficulty: exerciseItem.difficulty,
        equipment: exerciseItem.equipment,
        frequency: exerciseItem.frequency,
        id: exerciseItem.id,
        image: exerciseItem.image,
        instructions: exerciseItem.instructions,
        kcalBurned: exerciseItem.kcalBurned,
        mainAreas: exerciseItem.mainAreas,
        maxRep: exerciseItem.maxRep,
        minRep: exerciseItem.minRep,
        name: exerciseItem.name,
        objective: exerciseItem.objective,
        precautions: exerciseItem.precautions,
        secondAreas: exerciseItem.secondAreas,
        series: exerciseItem.series,
        video: exerciseItem.video,
        creationDate: exerciseItem.creationDate ?? ''
      };
    });
  };
  
import { getFirestore, collection, getDocs} from "firebase/firestore";
import { Exercise, ExerciseFromApiFirebase } from "../models/exercises";
import { mapExerciseApiToExerciseView } from "./exercises.mapper";
const db = getFirestore();

export const getExercises = async ():Promise<Exercise[]> => {
    try{
        const usersCollection = collection(db, "exercises");
        const usersSnapshot = await getDocs(usersCollection);

        const exercisesData: ExerciseFromApiFirebase[] = [];
        usersSnapshot.forEach((doc) => {
            const usersData = doc.data() as ExerciseFromApiFirebase;
            exercisesData.push(usersData);
        });

        return mapExerciseApiToExerciseView(exercisesData);

    }catch(error){
        throw (error as Error).message;
    }
};
import { getFirestore, collection, getDocs, query, where} from "firebase/firestore";
import { Exercise, ExerciseFromApiFirebase } from "../models/exercises";
import { mapExerciseApiToExerciseView } from "./exercises.mapper";
const db = getFirestore();

export const getExercise = async (exerciseId:string): Promise<Exercise> => {
    try {
        const exercisesCollection = collection(db, 'exercises');
        const querySnapshot = await getDocs(query(exercisesCollection, where('id', '==', exerciseId)));
        let userData = {} as Exercise;
        querySnapshot.forEach((doc) => {
            userData = doc.data() as Exercise;
        });
        return userData;
    } catch (error) {
        console.log(error);
        throw (error as Error).message;
    }
};

export const getExercises = async ():Promise<Exercise[]> => {
    try{
        const exercisesCollection = collection(db, "exercises");
        const usersSnapshot = await getDocs(exercisesCollection);

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

export const getExercisesById = async (ids:string[]): Promise<Exercise[]> => {
    try{
        const exercisesCollection = collection(db, "exercises");
        const exercisesSnapshot = await getDocs(query(exercisesCollection, where("id", "in", ids)));


        const exercisesData: ExerciseFromApiFirebase[] = [];
        exercisesSnapshot.forEach((doc) => {
            console.log(doc.data());
            const usersData = doc.data() as ExerciseFromApiFirebase;
            exercisesData.push(usersData);
        });

        return mapExerciseApiToExerciseView(exercisesData);

    }catch(error){
        throw (error as Error).message;
    }
};


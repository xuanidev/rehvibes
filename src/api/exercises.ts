import { getFirestore, collection, getDocs} from "firebase/firestore";
import { exerciseFromApi, exercisesFromApi } from "../models/exercises";
const db = getFirestore();

export const getExercises = async ():Promise<exerciseFromApi[]> => {
    const usersCollection = collection(db, "exercises");
    const usersSnapshot = await getDocs(usersCollection);

    const exercisesData: exerciseFromApi[] = [];

    usersSnapshot.forEach((doc) => {
        const usersData = doc.data() as exercisesFromApi;
        usersData.exercises.forEach( exercise => {
            exercisesData.push(exercise);
        });
    });

    console.log(exercisesData);
    return exercisesData;
};
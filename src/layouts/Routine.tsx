import { useEffect, useState } from 'react';
import { getExercises } from '../api/exercises';
import { RoutineContent } from '../components/routine';
import HeaderRoutine from '../components/routine/HeaderRoutine';
import { Exercise } from '../models';

export const Routine = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const getNewExercises = async () => {
    const exercisesFromApi = await getExercises();
    setExercises(exercisesFromApi);
  };

  useEffect(() => {
    try {
      getNewExercises();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="routine">
      <HeaderRoutine mins="30" types={['Fuerza']} />
      <RoutineContent day={1} exercises={exercises} />
    </div>
  );
};

export default Routine;

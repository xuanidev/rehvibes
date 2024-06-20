import { useContext, useEffect, useState } from 'react';
import { getExercisesById } from '../api/exercises';
import { RoutineContent } from '../components/routine';
import HeaderRoutine from '../components/routine/HeaderRoutine';
import { Exercise, ExerciseFromAPI, RehabilitationDay, RehabilitationProgramProps } from '../models';
import { UserContext } from '../contexts/UserContextProvider';
import { useParams } from 'react-router-dom';
import { getProgramsByUserID } from '../api/programs';

export const Routine = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  //const [programNames, setProgramNames] = useState<string[]>([]);
  const { mainProgram, setMainProgram, setCurrentExercises } = useContext(UserContext);
  const { programId } = useParams();

  const getInformation = async () => {
    try {
      const responsePrograms = await getProgramsByUserID(programId ?? '');
      if (responsePrograms.length > 0) {
        setMainProgram(responsePrograms[0]);
        /*let auxProgramNames = responsePrograms
          .slice(1)
          .map((program: RehabilitationProgramProps) => {
            return program.name ?? '';
          })
          .filter(name => name !== '');
        setProgramNames(auxProgramNames ?? ([] as string[]));*/
      }
    } catch (error) {
      console.log();
    }
  };
  const setInformationFromContext = async () => {
    const daysFromProgram = mainProgram?.rehabilitation_program || ([] as RehabilitationDay[]);
    const programDay = daysFromProgram
      ? daysFromProgram[mainProgram?.completedDays ? mainProgram?.completedDays - 1 : 0]
      : ({} as RehabilitationDay);
    const exercisesIds = programDay.exercises.map((exercise: ExerciseFromAPI) => {
      return exercise.id.toString();
    });
    const auxExercises = await getExercisesById(exercisesIds);
    setExercises(auxExercises);
    setCurrentExercises(auxExercises);
  };

  const getExercises = async () => {
    if (mainProgram != ({} as RehabilitationProgramProps)) {
      await getInformation();
    }
    await setInformationFromContext();
  };

  useEffect(() => {
    try {
      getExercises();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="routine">
      <HeaderRoutine mins="30" types={['Fuerza']} />
      <RoutineContent day={mainProgram?.completedDays ?? 0} exercises={exercises} />
    </div>
  );
};

export default Routine;

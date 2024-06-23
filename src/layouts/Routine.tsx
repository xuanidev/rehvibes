import { useContext, useEffect, useState } from 'react';
import { getExercisesById } from '../api/exercises';
import { RoutineContent } from '../components/routine';
import HeaderRoutine from '../components/routine/HeaderRoutine';
import { Exercise, ExerciseFromAPI, RehabilitationDay, RehabilitationProgramProps } from '../models';
import { UserContext } from '../contexts/UserContextProvider';
import { useParams } from 'react-router-dom';
import { getProgramsById } from '../api/programs';

export const Routine = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  //const [programNames, setProgramNames] = useState<string[]>([]);
  const { mainProgram, setMainProgram, setCurrentExercises } = useContext(UserContext);
  const { programId } = useParams();
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>({
    value: '8f3c45f9-a41d-40c6-8c2b-178c215cd176',
    label: 'Cuello',
  });

  const getInformation = async (): Promise<RehabilitationProgramProps> => {
    try {
      const responsePrograms = await getProgramsById([programId ?? '']);
      if (responsePrograms.length > 0) {
        const auxMainProgram = responsePrograms[0];
        setMainProgram(auxMainProgram);
        /*let auxProgramNames = responsePrograms
          .slice(1)
          .map((program: RehabilitationProgramProps) => {
            return program.name ?? '';
          })
          .filter(name => name !== '');
        setProgramNames(auxProgramNames ?? ([] as string[]));*/
        return auxMainProgram;
      }
      return {} as RehabilitationProgramProps;
    } catch (error) {
      console.log(error);
      return {} as RehabilitationProgramProps;
    }
  };

  const setInformationFromContext = async (mainProgramAux: RehabilitationProgramProps) => {
    if (mainProgramAux.rehabilitation_program != ([] as RehabilitationDay[])) {
      const daysFromProgram = mainProgramAux?.rehabilitation_program || ([] as RehabilitationDay[]);
      const programDay = daysFromProgram
        ? daysFromProgram[mainProgramAux?.completedDays ? mainProgramAux?.completedDays - 1 : 0]
        : ({} as RehabilitationDay);
      const exercisesIds = programDay.exercises
        .map((exercise: ExerciseFromAPI) => {
          return exercise.id.toString() ?? '';
        })
        .filter(name => name !== '');
      const auxExercises = await getExercisesById(exercisesIds);
      setExercises(auxExercises);
      setCurrentExercises(auxExercises);
    }
  };

  const getExercises = async () => {
    let mainProgram = {} as RehabilitationProgramProps;
    if (mainProgram != undefined) {
      mainProgram = await getInformation();
    }
    await setInformationFromContext(mainProgram);
  };

  useEffect(() => {
    try {
      getExercises();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    try {
      getExercises();
    } catch (error) {
      console.log(error);
    }
  }, [selectedOption]);

  return (
    <div className="routine">
      <HeaderRoutine
        mins="30"
        types={['Fuerza']}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <RoutineContent day={mainProgram?.completedDays ?? 0} exercises={exercises} />
    </div>
  );
};

export default Routine;

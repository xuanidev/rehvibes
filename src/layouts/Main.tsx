import { useEffect, useState } from 'react';
import { getProgramByUserID } from '../api/programs';
import { RehabilitationProgramProps } from '../models';
import { getFromCookies, getFromLocalStorage, saveOnLocalStorage } from '../utils/helpers';
import { ToastContainer, toast } from 'react-toastify';
import { toastError } from '../constants';
import RoutineContainer from '../components/RoutineInfo';

interface RoutineInfo {
  description: string;
  difficulty: string;
  totalTimeWeeks: string;
  totalTimeHours: string;
  mainAreas: string[];
}

export const Main = () => {
  const [programs, setPrograms] = useState<RehabilitationProgramProps[]>();
  const [routineInfo, setRoutineInfo] = useState<RoutineInfo>({
    description: '',
    difficulty: '',
    totalTimeWeeks: '',
    totalTimeHours: '',
    mainAreas: [],
  });

  const getPrograms = async () => {
    const uidCookie = getFromCookies('uid');
    if (uidCookie !== '') {
      try {
        const programsResponse = await getProgramByUserID(uidCookie);
        setPrograms(programsResponse);
        if (programs && programs.length > 0) {
          const firstProgram = programs[0];
          const info: RoutineInfo = {
            description: firstProgram.description || 'No description available',
            difficulty: firstProgram.level || routineInfo.difficulty,
            totalTimeWeeks: firstProgram.weeks || routineInfo.totalTimeWeeks,
            totalTimeHours: '6 hours',
            mainAreas: firstProgram.groups || routineInfo.mainAreas,
          };
          setRoutineInfo(info);
          saveOnLocalStorage('mainProgram', JSON.stringify(info));
        }
      } catch {
        const toastIdAux = toast.error(
          'No se han podido cargar los programas, recarga la página por favor',
          toastError,
        );
        toast(toastIdAux);
      }
    }
  };

  useEffect(() => {
    const programFromStorage = getFromLocalStorage('mainProgram');
    console.log(programFromStorage);
    if (programFromStorage != '') {
      const routineInfo = JSON.parse(programFromStorage);
      setRoutineInfo(routineInfo);
    } else {
      getPrograms();
    }
  }, []);

  return (
    <div className="main">
      <RoutineContainer routineInfo={routineInfo} />
      <ToastContainer />
    </div>
  );
};

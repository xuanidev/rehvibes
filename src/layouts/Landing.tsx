import { Greet } from '../components/WelcomeMsg';
import {
  RoutineContainer,
  ProgressBar,
  InfoTrabajado,
  AddWorkoutBtn,
  BtnNtf,
  Calendar,
  Achievements,
  NewRoutines,
} from '../components';
import { LogoWordmark } from '../components/branding';
import { getProgramByUserID } from '../api/programs';
import { getFromCookies, getFromLocalStorage, retrieveDates, saveOnLocalStorage } from '../utils/helpers';
import { useEffect, useState } from 'react';
import { RehabilitationProgramProps } from '../models';
import { toastError } from '../constants';
import { Id, ToastContainer, toast } from 'react-toastify';

interface RoutineInfo {
  description: string;
  difficulty: string;
  totalTimeWeeks: string;
  totalTimeHours: string;
  mainAreas: string[];
}

export const Landing = () => {
  const [programs, setPrograms] = useState<RehabilitationProgramProps[]>();
  const [toastId, setToastId] = useState<Id>('');
  const [rehabDays, setRehabDays] = useState<Date[]>([]);
  const [routineInfo, setRoutineInfo] = useState<RoutineInfo>({
    description: '',
    difficulty: '',
    totalTimeWeeks: '',
    totalTimeHours: '',
    mainAreas: [],
  });

  const user = getFromCookies('username');
  const greetingUser = Greet(user);
  const uid = getFromCookies('uid');

  const getPrograms = async () => {
    if (uid !== '') {
      try {
        const programsResponse = await getProgramByUserID(uid);
        console.log(programsResponse);
        setPrograms(programsResponse);
        if (programsResponse && programsResponse.length > 0) {
          const firstProgram = programsResponse[0];
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

        retrieveDates(programsResponse || [], setRehabDays);
      } catch {
        const toastIdAux = toast.error(
          'No se han podido cargar los programas, recarga la página por favor',
          toastError,
        );
        setToastId(toastIdAux);
      }
    }
  };

  const setCalendarDays = (value: string) => {
    const days = JSON.parse(value);
    const dates = days.map((date: string) => {
      return new Date(date);
    });
    setRehabDays(dates);
  };
  useEffect(() => {
    const programFromStorage = getFromLocalStorage('mainProgram');
    const rehabDaysFromStorage = getFromLocalStorage('rehabdays');
    console.log(rehabDaysFromStorage);
    if (programFromStorage != '' && rehabDaysFromStorage != '') {
      const routineInfo = JSON.parse(programFromStorage);
      setRoutineInfo(routineInfo);
      setCalendarDays(rehabDaysFromStorage);
    } else {
      getPrograms();
    }
  }, []);
  const cualidades = [
    {
      text: 'Coordinación',
      percentage: 60,
    },
    {
      text: 'Flexibilidad',
      percentage: 80,
    },
    {
      text: 'Fuerza',
      percentage: 100,
    },
    {
      text: 'Resistencia',
      percentage: 80,
    },
  ];

  return (
    <div className="main_home">
      <div className="top_up">
        <div className="welcome">
          {greetingUser} <BtnNtf userId={uid} /> <AddWorkoutBtn />
        </div>
        <div className="logo">
          <LogoWordmark width={180} />
        </div>
      </div>
      <div className="components">
        <div className="components_left">
          <RoutineContainer routineInfo={routineInfo} />
          <InfoTrabajado
            cualidades={cualidades}
            energy="3500Kcal"
            level="6/10"
            sesions="4"
            time="4:30h."
            zones={['Cuello']}
          />
        </div>
        <div className="components_right">
          <div className="components_right_top">
            <ProgressBar />
            <Calendar rehabDays={rehabDays} />
          </div>
          <Achievements hours="8" sesions="8" achievements="8" />
          <NewRoutines />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

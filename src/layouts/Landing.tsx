import {
  RoutineContainer,
  ProgressBar,
  InfoTrabajado,
  Calendar,
  Achievements,
  NewRoutines,
  TopBar,
} from '../components';
import { getProgramByUserID } from '../api/programs';
import {
  getFromCookies,
  getFromLocalStorage,
  retrieveDates,
  saveOnCookies,
  saveOnLocalStorage,
} from '../utils/helpers';
import { useContext, useEffect, useState } from 'react';
import { Exercise, RoutineInfo, cualidadesUser } from '../models';
import { cualidadesDefault, toastError } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import { getUser } from '../api/users';
import { getExercises } from '../api/exercises';
import { UserContext } from '../contexts/UserContextProvider';

const initialRoutineInfo = {
  description: '',
  difficulty: '',
  totalTimeWeeks: '',
  totalTimeHours: '',
  mainAreas: [],
};

export const Landing = () => {
  const [cualidades, setCualidades] = useState<cualidadesUser[]>(cualidadesDefault);
  const [horas, setHoras] = useState<number>(0);
  const [sessions, setSessions] = useState<number>(0);
  const [achievements, setAchievements] = useState<number>(0);
  const { username, setUsername, programs, setPrograms, rehabDays, setRehabDays, routineInfo, setRoutineInfo } =
    useContext(UserContext);

  const [exercises, setExercises] = useState<Exercise[]>();
  const uid = getFromCookies('uid');
  const usernameCookies = getFromCookies('username');

  const getProgramsData = async () => {
    try {
      const programsResponse = await getProgramByUserID(uid);
      if (programsResponse && programsResponse.length > 0) {
        const firstProgram = programsResponse[0];
        const info: RoutineInfo = {
          description: firstProgram.description || 'No description available',
          difficulty: firstProgram.level || routineInfo?.difficulty || '',
          totalTimeWeeks: firstProgram.weeks || routineInfo?.totalTimeWeeks || '',
          totalTimeHours: '6 hours',
          mainAreas: firstProgram.groups || routineInfo?.mainAreas || [],
        };
        setRoutineInfo(info);
        saveOnLocalStorage('mainProgram', JSON.stringify(info));
      }

      retrieveDates(programsResponse || [], setRehabDays);
    } catch {
      const toastIdAux = toast.error('No se han podido cargar los programas, recarga la página por favor', toastError);
      toast(toastIdAux);
      console.log(programs);
    }
  };

  const getUserData = async () => {
    try {
      const userResponse = await getUser(uid);
      setUsername(userResponse.name);
      saveOnCookies('username', userResponse.name);
      setCualidades(userResponse.cualidades ?? []);
      setHoras(userResponse.horas ?? 0);
      setSessions(userResponse.sesiones ?? 0);
      setAchievements(userResponse.logros ?? 0);
      saveOnLocalStorage('userInfo', JSON.stringify(userResponse));
    } catch {
      console.log('error');
      const toastIdAux = toast.error('No se han podido cargar el usuario', toastError);
      toast(toastIdAux);
    }

    if (username !== '') {
      setUsername(getFromCookies('username'));
    }
  };

  const getNewExercises = async () => {
    const exercisesFromApi = await getExercises();
    setExercises(exercisesFromApi);
  };
  const setCalendarDays = (value: string) => {
    const days = JSON.parse(value);
    const dates = days.map((date: string) => {
      return new Date(date);
    });
    setRehabDays(dates);
  };

  useEffect(() => {
    getNewExercises();
    if (usernameCookies !== '') {
      setUsername(usernameCookies);
    }
    const programFromStorage = getFromLocalStorage('mainProgram');
    const rehabDaysFromStorage = getFromLocalStorage('rehabdays');
    const userFromStorage = getFromLocalStorage('userInfo');
    if (programFromStorage !== '' && rehabDaysFromStorage !== '') {
      const routineInfo = JSON.parse(programFromStorage);
      console.log(routineInfo);
      setRoutineInfo(routineInfo);
      setCalendarDays(rehabDaysFromStorage);
    } else {
      getProgramsData();
    }
    console.log(userFromStorage);
    console.log(uid);
    if (uid !== '' && userFromStorage === '') {
      getUserData();
    }
  }, []);

  return (
    <div className="main_home">
      <TopBar uid={uid} user={username ?? ''} />
      <div className="components">
        <div className="components_left">
          <RoutineContainer routineInfo={routineInfo || initialRoutineInfo} />
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
            <Calendar rehabDays={rehabDays || []} />
          </div>
          <Achievements hours={horas} sessions={sessions} achievements={achievements} />
          <NewRoutines exercises={exercises || []} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

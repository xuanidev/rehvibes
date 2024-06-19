import {
  RoutineContainer,
  ProgressBar,
  InfoTrabajado,
  Calendar,
  Achievements,
  NewRoutines,
  TopBar,
} from '../components';
import { getFromCookies, retrieveDates } from '../utils/helpers';
import { useContext, useEffect, useState } from 'react';
import { Exercise, RehabilitationProgramProps, RoutineInfo, cualidadesUser } from '../models';
import { cualidadesDefault, toastError } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import { getUser } from '../api/users';
import { getExercises } from '../api/exercises';
import { UserContext } from '../contexts/UserContextProvider';
import { getProgramsByUserID } from '../api/programs';

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
  const [progress, setProgress] = useState<number>(0);
  const {
    username,
    setUsername,
    setUserInfo,
    setPrograms,
    setMainProgram,
    currentProgramId,
    setCurrentProgramId,
    rehabDays,
    setRehabDays,
    routineInfo,
    setRoutineInfo,
  } = useContext(UserContext);

  const [exercises, setExercises] = useState<Exercise[]>();
  const uid = getFromCookies('uid');
  const usernameCookies = getFromCookies('username');

  const handleProgram = async (programs: RehabilitationProgramProps[]) => {
    if (programs && programs.length > 0) {
      const firstProgram = programs[0];
      setCurrentProgramId(firstProgram.uid ?? '');
      setMainProgram(firstProgram);
      const info: RoutineInfo = {
        description: firstProgram.description || 'No description available',
        difficulty: firstProgram.level || routineInfo?.difficulty || '',
        totalTimeWeeks: firstProgram.weeks || routineInfo?.totalTimeWeeks || '',
        totalTimeHours: '6 hours',
        mainAreas: firstProgram.groups || routineInfo?.mainAreas || [],
      };
      setRoutineInfo(info);
      setProgress(
        firstProgram.completedDays && firstProgram.days
          ? Number(((firstProgram.completedDays / firstProgram.days) * 100).toFixed(2))
          : 0,
      );
    }
  };

  const getProgramsData = async () => {
    try {
      const programsResponse = await getProgramsByUserID(uid);
      setPrograms(programsResponse);
      handleProgram(programsResponse);
      retrieveDates(programsResponse || [], setRehabDays);
    } catch {
      const toastIdAux = toast.error('No se han podido cargar los programas, recarga la página por favor', toastError);
      toast(toastIdAux);
    }
  };

  const getUserData = async () => {
    try {
      const userResponse = await getUser(uid);
      setUsername(userResponse.name);
      setCualidades(userResponse.cualidades ?? []);
      setHoras(userResponse.horas ?? 0);
      setSessions(userResponse.sesiones ?? 0);
      setAchievements(userResponse.logros ?? 0);
      setUserInfo(userResponse);
    } catch {
      const toastIdAux = toast.error('No se han podido cargar el usuario', toastError);
      toast(toastIdAux);
    }
  };

  const getNewExercises = async () => {
    const exercisesFromApi = await getExercises();
    setExercises(exercisesFromApi);
  };

  useEffect(() => {
    getNewExercises();
    if (usernameCookies !== '') {
      setUsername(usernameCookies);
    }
    if (uid !== '') {
      getUserData();
    }
    getProgramsData();
  }, []);

  return (
    <div className="main_home">
      <TopBar uid={uid} user={username ?? ''} />
      <div className="components">
        <div className="components_left">
          <RoutineContainer routineInfo={routineInfo || initialRoutineInfo} id={currentProgramId} />
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
            <ProgressBar progress={progress} />
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

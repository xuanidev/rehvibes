import { ReactNode, createContext, useEffect, useState } from 'react';
import { Exercise, RehabilitationDay, RehabilitationProgramProps, RoutineInfo, UserFromApi } from '../models';
import { toast } from 'react-toastify';
import { getUser } from '../api/users';
import { getFromCookies } from '../utils/helpers';
import { toastError } from '../constants';

interface UserContextModel {
  username?: string;
  setUsername: (username: string) => void;
  userInfo: UserFromApi;
  setUserInfo: (userInfo: UserFromApi) => void;
  programs?: RehabilitationProgramProps[];
  setPrograms: (programs: RehabilitationProgramProps[]) => void;
  mainProgram?: RehabilitationProgramProps;
  setMainProgram: (mainProgram: RehabilitationProgramProps) => void;
  currentProgramId: string;
  setCurrentProgramId: (currentProgramId: string) => void;
  rehabDays?: Date[];
  setRehabDays: (rehabDays: Date[]) => void;
  routineInfo?: RoutineInfo;
  setRoutineInfo: (routineInfo: RoutineInfo) => void;
  currentExercises?: Exercise[];
  setCurrentExercises: (exercise: Exercise[]) => void;
  currentExerciseId?: number;
  setCurrentExerciseId: (id: number) => void;
}

const context: UserContextModel = {
  username: '',
  setUsername: () => {
    return;
  },
  userInfo: {} as UserFromApi,
  setUserInfo: () => {
    return;
  },
  programs: [] as RehabilitationProgramProps[],
  setPrograms: () => {
    return;
  },
  mainProgram: {} as RehabilitationProgramProps,
  setMainProgram: () => {
    return;
  },
  currentProgramId: '',
  setCurrentProgramId: () => {
    return;
  },
  rehabDays: [] as Date[],
  setRehabDays: () => {
    return;
  },
  routineInfo: {} as RoutineInfo,
  setRoutineInfo: () => {
    return;
  },
  currentExercises: [] as Exercise[],
  setCurrentExercises: () => {
    return;
  },
  currentExerciseId: 0,
  setCurrentExerciseId: () => {
    return;
  },
};

export const UserContext = createContext<UserContextModel>(context);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps): JSX.Element | null => {
  const [username, setUsername] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserFromApi>({} as UserFromApi);
  const [programs, setPrograms] = useState<RehabilitationProgramProps[]>([]);
  const [mainProgram, setMainProgram] = useState<RehabilitationProgramProps>({
    finished: false,
    rehabilitation_program: [] as RehabilitationDay[],
  });
  const [currentProgramId, setCurrentProgramId] = useState<string>('');
  const [rehabDays, setRehabDays] = useState<Date[]>([]);
  const [routineInfo, setRoutineInfo] = useState<RoutineInfo>({
    description: '',
    difficulty: '',
    totalTimeWeeks: '',
    totalTimeHours: '',
    mainAreas: [],
  });
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const [currentExerciseId, setCurrentExerciseId] = useState<number>(0);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const uid = getFromCookies('uid');
        const userResponse = await getUser(uid);
        console.log(userResponse);
        setUserInfo(userResponse);
      } catch {
        const toastIdAux = toast.error('No se han podido cargar el usuario', toastError);
        toast(toastIdAux);
      }
    };
    getUserData();
  }, []);

  const contextValue = {
    username: userInfo.name,
    setUsername,
    userInfo,
    setUserInfo,
    programs,
    setPrograms,
    mainProgram,
    setMainProgram,
    currentProgramId,
    setCurrentProgramId,
    rehabDays,
    setRehabDays,
    routineInfo,
    setRoutineInfo,
    currentExercises,
    setCurrentExercises,
    currentExerciseId,
    setCurrentExerciseId,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

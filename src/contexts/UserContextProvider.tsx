import { ReactNode, createContext, useState } from 'react';
import { Exercise, RehabilitationProgramProps, RoutineInfo } from '../models';

interface UserContextModel {
  username?: string;
  setUsername: (username: string) => void;
  programs?: RehabilitationProgramProps[];
  setPrograms: (programs: RehabilitationProgramProps[]) => void;
  currentProgramId: string;
  setCurrentProgramId: (currentProgramId: string) => void;
  rehabDays?: Date[];
  setRehabDays: (rehabDays: Date[]) => void;
  routineInfo?: RoutineInfo;
  setRoutineInfo: (routineInfo: RoutineInfo) => void;
  currentExercises?: Exercise[];
  setCurrentExercises: (exercise: Exercise[]) => void;
}

const context: UserContextModel = {
  setUsername: () => {
    return;
  },
  programs: [] as RehabilitationProgramProps[],
  setPrograms: () => {
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
};

export const UserContext = createContext<UserContextModel>(context);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps): JSX.Element | null => {
  const [username, setUsername] = useState<string>('');
  const [programs, setPrograms] = useState<RehabilitationProgramProps[]>([]);
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

  const contextValue = {
    username,
    setUsername,
    programs,
    setPrograms,
    currentProgramId,
    setCurrentProgramId,
    rehabDays,
    setRehabDays,
    routineInfo,
    setRoutineInfo,
    currentExercises,
    setCurrentExercises,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

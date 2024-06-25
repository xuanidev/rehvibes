import { getFromCookies, retrieveDates } from '../utils/helpers';
import { useContext, useEffect } from 'react';
import { RehabilitationProgramProps, RoutineInfo } from '../models';
import { UserContext } from '../contexts/UserContextProvider';
import { getProgramsByUserID } from '../api/programs';
import { useNavigate } from 'react-router-dom';

export const MiEntrenamiento = () => {
  const {
    setPrograms,
    setMainProgram,
    currentProgramId,
    setCurrentProgramId,
    setRehabDays,
    routineInfo,
    setRoutineInfo,
  } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentProgramId) {
      navigate(`/routine/${currentProgramId}`);
      return;
    }
  }, [currentProgramId]);

  useEffect(() => {
    const getProgramsData = async () => {
      try {
        const uid = getFromCookies('uid');
        const programsResponse = await getProgramsByUserID(uid);
        setCurrentProgramId(programsResponse[0]?.uid ?? '');
      } catch {
        // TODO
      }
    };
    getProgramsData();
  });

  return null;
};

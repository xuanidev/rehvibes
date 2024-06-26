import { getFromCookies } from '../utils/helpers';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContextProvider';
import { getProgramsByUserID } from '../api/programs';
import { useNavigate } from 'react-router-dom';

export const MiEntrenamiento = () => {
  const { currentProgramId, setCurrentProgramId } = useContext(UserContext);

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
        console.log('error');
      }
    };
    getProgramsData();
  });

  return null;
};

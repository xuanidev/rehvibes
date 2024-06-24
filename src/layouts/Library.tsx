import { useEffect, useState } from 'react';
import '../styles/layouts/_library.scss';
import { getExercises, getExercisesById } from '../api/exercises';
import { Exercise } from '../models';
import Slider from '../components/library/Slider';
import { getFromCookies } from '../utils/helpers';
import { getFavorites } from '../api/users';
import ModalExercise from '../components/ModalExercise';
import { useModal } from '../contexts/ModalContext';
import { TopLibrary } from '../components/library/TopLibrary';

export const Library = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [favorites, setFavorites] = useState<Exercise[]>([]);
  const { showModalLibrary, setShowModalLibrary } = useModal();
  const [clickedExerciseId, setClickedExerciseId] = useState<number>(0);

  useEffect(() => {
    const fetchAndSetExercises = async () => {
      const auxExercises = await getExercises();
      setExercises(auxExercises);
      const favorites = await getFavorites(getFromCookies('uid'));
      const stringArray: string[] = favorites.map(String);
      const auxFavorites = await getExercisesById(stringArray);
      setFavorites(auxFavorites);
    };

    fetchAndSetExercises();
  }, []);

  return (
    <div className="library_content">
      <TopLibrary />
      <main className="library_main-content">
        <Slider
          exercises={exercises}
          tittle="Rutinas para ti"
          setShowModalLibrary={setShowModalLibrary}
          setClickedExerciseId={setClickedExerciseId}
        />
        <Slider
          exercises={favorites}
          tittle="Favoritos"
          setShowModalLibrary={setShowModalLibrary}
          setClickedExerciseId={setClickedExerciseId}
        />
        {showModalLibrary && <ModalExercise id={clickedExerciseId} />}
      </main>
    </div>
  );
};

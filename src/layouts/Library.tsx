import { useContext, useMemo, useState } from 'react';
import '../styles/layouts/_library.scss';
import { Exercise } from '../models';
import Slider from '../components/library/Slider';
import ModalExercise from '../components/ModalExercise';
import { useModal } from '../contexts/ModalContext';
import { TopLibrary } from '../components/library/TopLibrary';
import { SearchContext } from '../contexts/SearchContext';
import { ExercisesContext } from '../contexts/ExercisesContextProvider';

const exerciseMatchesFilter = (exercise: Exercise, normalizedSearch: string) => {
  const { name, description, mainAreas } = exercise;

  const matchesMainAreas = mainAreas.some(area => area.includes(normalizedSearch));

  return (
    matchesMainAreas ||
    description.toLowerCase().includes(normalizedSearch) ||
    name.toLowerCase().includes(normalizedSearch)
  );
};

export const Library = () => {
  const { search } = useContext(SearchContext);
  const { exercises, favorites } = useContext(ExercisesContext);
  const { showModalLibrary, setShowModalLibrary } = useModal();
  const [clickedExerciseId, setClickedExerciseId] = useState<number>(0);

  const filteredExercises = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return exercises.filter(exercise => exerciseMatchesFilter(exercise, normalizedSearch));
  }, [exercises, search]);

  const filteredFavs = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return favorites.filter(favExercise => exerciseMatchesFilter(favExercise, normalizedSearch));
  }, [favorites, search]);

  return (
    <div className="library_content">
      <TopLibrary />
      <main className="library_main-content">
        <Slider
          exercises={filteredExercises}
          tittle="Rutinas para ti"
          setShowModalLibrary={setShowModalLibrary}
          setClickedExerciseId={setClickedExerciseId}
        />
        <Slider
          exercises={filteredFavs}
          tittle="Favoritos"
          setShowModalLibrary={setShowModalLibrary}
          setClickedExerciseId={setClickedExerciseId}
        />
        {showModalLibrary && <ModalExercise id={clickedExerciseId} />}
      </main>
    </div>
  );
};

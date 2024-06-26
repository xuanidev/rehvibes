import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Exercise } from '../models';
import { getExercises } from '../api/exercises';
import { addExerciseToFavorites, getFavorites, removeExerciseFromFavorites } from '../api/users';
import { getFromCookies } from '../utils/helpers';

interface ExercisesContextProvider {
  exercises: Exercise[];
  favorites: Exercise[];
  toggleFav: (exerciseId: number) => void;
  isExerciseFav: (exerciseId: number) => boolean;
  loadExercisesAndFavs: () => Promise<void>;
}

const context: ExercisesContextProvider = {
  exercises: [],
  favorites: [],
  toggleFav: () => Promise.resolve(),
  isExerciseFav: () => false,
  loadExercisesAndFavs: async () => Promise.resolve(),
};

export const ExercisesContext = createContext<ExercisesContextProvider>(context);

interface ExercisesContextProviderProps {
  children: ReactNode;
}

export const ExercisesContextProvider = ({ children }: ExercisesContextProviderProps): JSX.Element | null => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const favorites = useMemo(() => {
    return exercises.filter(exercise => {
      return favoriteIds.includes(exercise.id.toString());
    });
  }, [favoriteIds, exercises]);

  const isExerciseFav = useCallback(
    (exerciseId: number) => {
      return favoriteIds.some(id => exerciseId.toString() === id);
    },
    [favoriteIds],
  );

  const loadExercisesAndFavs = useCallback(async () => {
    const auxExercises = await getExercises();
    setExercises(auxExercises);
    const favorites = await getFavorites(getFromCookies('uid'));
    setFavoriteIds(favorites.map(id => String(id)));
  }, []);

  const toggleFav = useCallback(
    async (exerciseId: number) => {
      if (isExerciseFav(exerciseId)) {
        await removeExerciseFromFavorites(getFromCookies('uid'), exerciseId);
      } else {
        await addExerciseToFavorites(getFromCookies('uid'), exerciseId);
      }
      await loadExercisesAndFavs();
    },
    [isExerciseFav, loadExercisesAndFavs],
  );

  useEffect(() => {
    loadExercisesAndFavs();
  }, [loadExercisesAndFavs]);

  return (
    <ExercisesContext.Provider value={{ exercises, favorites, isExerciseFav, loadExercisesAndFavs, toggleFav }}>
      {children}
    </ExercisesContext.Provider>
  );
};

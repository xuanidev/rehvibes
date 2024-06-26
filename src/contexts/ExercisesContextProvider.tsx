import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
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
  isLoadingAddToFav: (exerciseId: number) => boolean;
  setIsLoadingAddToFav: (exerciseId: number, isLoading: boolean) => void;
}

const context: ExercisesContextProvider = {
  exercises: [],
  favorites: [],
  toggleFav: () => Promise.resolve(),
  isExerciseFav: () => false,
  loadExercisesAndFavs: async () => Promise.resolve(),
  isLoadingAddToFav: () => false,
  setIsLoadingAddToFav: () => {
    return;
  },
};

export const ExercisesContext = createContext<ExercisesContextProvider>(context);

interface ExercisesContextProviderProps {
  children: React.ReactNode;
}

export const ExercisesContextProvider = ({ children }: ExercisesContextProviderProps): JSX.Element | null => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});

  const favorites = useMemo(() => {
    return exercises.filter(exercise => favoriteIds.includes(exercise.id.toString()));
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
      setLoadingStates(prev => ({ ...prev, [exerciseId]: true }));
      if (isExerciseFav(exerciseId)) {
        await removeExerciseFromFavorites(getFromCookies('uid'), exerciseId);
      } else {
        await addExerciseToFavorites(getFromCookies('uid'), exerciseId);
      }
      await loadExercisesAndFavs();
      setLoadingStates(prev => ({ ...prev, [exerciseId]: false }));
    },
    [isExerciseFav, loadExercisesAndFavs],
  );

  const isLoadingAddToFav = useCallback(
    (exerciseId: number) => {
      return loadingStates[exerciseId] || false;
    },
    [loadingStates],
  );

  const setIsLoadingAddToFav = useCallback((exerciseId: number, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [exerciseId]: isLoading }));
  }, []);

  useEffect(() => {
    loadExercisesAndFavs();
  }, [loadExercisesAndFavs]);

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        favorites,
        isExerciseFav,
        loadExercisesAndFavs,
        toggleFav,
        isLoadingAddToFav,
        setIsLoadingAddToFav,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};

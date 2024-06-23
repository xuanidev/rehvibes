import { useEffect, useState } from 'react';
import BtnFilter from '../components/library/BtnFilter';
import BtnSearch from '../components/library/BtnSearch';
import { Card } from '../components/Card';
import '../styles/layouts/_library.scss';
import LogoWordmark from '../components/branding/LogoWordmark';
import { getExercises } from '../api/exercises';
import { Exercise } from '../models';

export const Library = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchAndSetExercises = async () => {
      const auxExercises = await getExercises();
      setExercises(auxExercises);
    };

    fetchAndSetExercises();
  }, []);

  return (
    <div className="library_content">
      <div className="library_header">
        <div className="library_header-btns">
          <BtnFilter style="search-input" />
          <BtnSearch style="exercise-filter" />
        </div>
        <div className="logo" style={{ width: '180px' }}>
          <LogoWordmark />
        </div>
      </div>
      <main className="library_main-content">
        <section className="library_section">
          <h2>Rutinas para ti</h2>
          <div className="card-list">
            {exercises.map(exercise => (
              <Card
                key={exercise.id}
                size="lg"
                img={exercise.image}
                text={exercise.name}
                onClick={() => {}}
                duration={exercise.series.toString()}
                difficulty={exercise.difficulty}
              />
            ))}
          </div>
        </section>
        <section className="library_section">
          <h2>Favoritos</h2>
          <div className="library_card-list">
            {exercises.map(exercise => (
              <Card
                key={exercise.id}
                size="lg"
                img={exercise.image}
                text={exercise.name}
                onClick={() => {}}
                duration={exercise.series.toString()}
                difficulty={exercise.difficulty}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

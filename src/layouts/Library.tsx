import { useState } from 'react';
import SearchInput from '../components/BtnSearch';
import ExerciseFilter from '../components/BtnFilter';
import { Card } from '../components/Card';
import '../styles/layouts/_library.scss';
import LogoWordmark from '../components/branding/LogoWordmark';

export const Library = () => {
  const [exercises, setExercises] = useState([]);

  return (
    <div className="content">
      <div className="header">
        <div className='header-btns'>
        <SearchInput className="search-input" />
        <ExerciseFilter className="exercise-filter" />
        </div>
        <div className="logo" style={{ width: '180px' }}>
          {' '}
          <LogoWordmark />{' '}
        </div>
      </div>
      <main className="main-content">
        <section className="section">
          <h2>Rutinas para ti</h2>
          <div className="card-list">
            {exercises.map(exercise => (
              <Card
                key={exercise.id}
                size="lg"
                img={exercise.image}
                text={exercise.name}
                onClick={() => {}}
                duration={exercise.series}
                difficulty={exercise.difficulty}
              />
            ))}
          </div>
        </section>
        <section className="section">
          <h2>Favoritos</h2>
          <div className="card-list">
            {exercises.map(exercise => (
              <Card
                key={exercise.id}
                size="lg"
                img={exercise.image}
                text={exercise.name}
                onClick={() => {}}
                duration={exercise.series}
                difficulty={exercise.difficulty}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

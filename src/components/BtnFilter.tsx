import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import FiltersIcon from './icons/FiltersIcon.js';
import { Btn } from './index.js';
import './btnFilter.scss';

const ExerciseFilter = () => {
  const [exercises, setExercises] = useState<DocumentData[]>([]);
  const [difficulty, setDifficulty] = useState('');
  const [mainAreas, setMainAreas] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const exercisesRef = collection(db, 'exercises');
    getDocs(exercisesRef).then(querySnapshot => {
      const exercisesData = querySnapshot.docs.map(doc => doc.data());
      setExercises(exercisesData);
    });
  }, []);

  const getUniqueValues = (key:string) => {
    return [
      ...new Set(exercises.flatMap(exercise => (Array.isArray(exercise[key]) ? exercise[key] : [exercise[key]]))),
    ];
  };

  const handleDifficultyChange = value => {
    setDifficulty(value);
  };

  const handleMainAreasChange = value => {
    if (mainAreas.includes(value)) {
      setMainAreas(mainAreas.filter(area => area !== value));
    } else {
      setMainAreas([...mainAreas, value]);
    }
  };

  const handleFilterChange = () => {
    const filters = { difficulty, mainAreas };

    setIsModalOpen(false);
  };

  return (
    <div className="filter-container">
      <Btn
        btnClass="borderGradient"
        leftIcon={FiltersIcon}
        iconHeight={24}
        iconWidth={24}
        iconClass="color-brand icon"
        text="Filtros"
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <div className="filter-modal">
          <div className="filter-modal-content">
            <div className="filter-modal-header">
              <span className="filter-modal-title">Filtros</span>
              <button onClick={() => setIsModalOpen(false)} className="filter-modal-close-button">
                X
              </button>
            </div>
            <div className="filter-modal-body">
              <div className="filter-section">
                <h3 className="filter-section-title">Por duración</h3>
                <div className="filter-option-group">
                  {getUniqueValues('duration').map(duration => (
                    <label key={`duration-${duration}`} htmlFor={`duration-${duration}`}>
                      <input type="checkbox" id={`duration-${duration}`} value={duration} />
                      {duration} min.
                    </label>
                  ))}
                </div>
              </div>
              <div className="filter-section">
                <h3 className="filter-section-title">Dificultad</h3>
                <div className="filter-option-group">
                  {getUniqueValues('difficulty').map(difficulty => (
                    <label key={`difficulty-${difficulty}`} htmlFor={`difficulty-${difficulty}`}>
                      <input
                        type="checkbox"
                        id={`difficulty-${difficulty}`}
                        value={difficulty}
                        onChange={e => handleDifficultyChange(e.target.value)}
                      />
                      {difficulty}
                    </label>
                  ))}
                </div>
              </div>
              <div className="filter-section">
                <h3 className="filter-section-title">Zona muscular</h3>
                <div className="filter-option-group">
                  {getUniqueValues('mainAreas').map(mainArea => (
                    <label key={`main-areas-${mainArea}`} htmlFor={`main-areas-${mainArea}`}>
                      <input
                        type="checkbox"
                        id={`main-areas-${mainArea}`}
                        value={mainArea}
                        onChange={e => handleMainAreasChange(e.target.value)}
                      />
                      {mainArea}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="filter-modal-footer">
              <button onClick={() => setIsModalOpen(false)} className="filter-modal-button">
                Cancelar
              </button>
              <button onClick={() => handleFilterChange()} className="filter-modal-button">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseFilter;

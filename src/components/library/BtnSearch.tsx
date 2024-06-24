import React, { useEffect, useState } from 'react';
import './btnSearch.scss';
import SearchIcon from '../icons/SearchIcon.js';
import Card from '../Card.js';
// import { getExercisesLibraryFilter } from '../../api/exercises.js';
import { Exercise } from '../../models/exercises.js';
import { getFirestore, collection, getDocs, query as firestoreQuery, where, DocumentData } from 'firebase/firestore';

interface BtnSearchProps {
  style?: string;
}

export const BtnSearch = ({ style }: BtnSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  useEffect(() => {
    const searchExercises = async () => {
      if (searchTerm !== '') {
        try {
          const db = getFirestore();
          const exercisesRef = collection(db, 'exercises');
          const exercisesQuery = firestoreQuery(
            exercisesRef,
            where('name', '>=', searchTerm),
            // where("mainAreas", ">", searchTerm),
            // where("type", ">", searchTerm),
          );
          const exercisesSnapshot = await getDocs(exercisesQuery);
          const exercisesList = exercisesSnapshot.docs.map((doc: DocumentData) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || '',
              description: data.description || '',
              type: data.type || '',
              difficulty: data.difficulty || '',
              equipment: data.equipment || [],
              image: data.image || '',
              series: data.series || 0,
            } as Exercise;
          });
          setSearchResults(exercisesList);
        } catch (error) {
          console.error('Error searching exercises:', error);
        }
      } else {
        setSearchResults([]);
      }
    };

    searchExercises();
  }, [searchTerm]);

  return (
    <div className={`btn_search-input borderGradientSearch ${style}  ${isExpanded ? 'expanded' : ''}`}>
      <div className="btn_search-icon" onClick={handleExpand}>
        <SearchIcon className="icon" />
      </div>
      <input
        type="text"
        placeholder="Buscar ejercicios"
        value={searchTerm}
        onChange={handleChange}
        onBlur={handleCollapse}
        className={`btn_search-input-field ${isExpanded ? 'expanded' : ''}`}
      />
      <div className="btn_search-results">
        {searchResults.map(exercise => (
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
    </div>
  );
};

export default BtnSearch;

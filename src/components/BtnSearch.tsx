import { useEffect, useState } from 'react';
import './btnSearch.scss';
import SearchIcon from './icons/SearchIcon';
import { Card } from './Card.js';
import { getFirestore, collection, getDocs, query as firestoreQuery, where, } from 'firebase/firestore';

const db = getFirestore();

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState<{ id: string; name: string; description: string }[]>([]);

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
        const exercisesRef = collection(db, 'exercises');
        const exercisesQuery = firestoreQuery(
          exercisesRef,
          where('name', '>=', searchTerm),
          // where("mainAreas", ">", searchTerm),
          // where("type", ">", searchTerm),
        );
        const exercisesSnapshot = await getDocs(exercisesQuery);
        console.log(exercisesQuery);
        const exercisesList = exercisesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSearchResults(exercisesList);
        console.log(exercisesList);
        console.log(searchTerm);
      } else {
        setSearchResults([]);
      }
    };
    searchExercises();
  }, [searchTerm]);

  return (
    <div className={`search-input ${isExpanded ? 'expanded' : ''}`}>
      <div className="search-icon" onClick={handleExpand}>
        <SearchIcon className="icon" />
      </div>
      <input
        type="text"
        placeholder="Buscar ejercicios"
        value={searchTerm}
        onChange={handleChange}
        onBlur={handleCollapse}
        className={`search-input-field ${isExpanded ? 'expanded' : ''}`}
      />
      <div className="search-results">
        {searchResults.map(exercise => (
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
    </div>
  );
};

export default SearchInput;

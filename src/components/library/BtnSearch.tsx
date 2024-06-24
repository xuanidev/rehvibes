import { useEffect, useState } from 'react';
import './btnSearch.scss';
import SearchIcon from '../icons/SearchIcon.js';
import Card from '../Card.js';
import { getExercisesLibraryFilter } from '../../api/exercises.js';
import { Exercise } from '../../models/exercises.js';

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
        console.log(searchTerm);
        const auxExercises = await getExercisesLibraryFilter(searchTerm);
        console.log(auxExercises);
        setSearchResults(auxExercises);
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

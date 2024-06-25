import React, { useContext, useState } from 'react';
import './btnSearch.scss';
import SearchIcon from '../icons/SearchIcon.js';
import { SearchContext } from '../../contexts/SearchContext.js';

interface BtnSearchProps {
  style?: string;
}

export const BtnSearch = ({ style }: BtnSearchProps) => {
  const { search, setSearch } = useContext(SearchContext);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [searchResults, setSearchResults] = useState<Exercise[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  // useEffect(() => {
  //   const searchExercises = async () => {
  //     if (searchTerm !== '') {
  //       try {
  //         const db = getFirestore();
  //         const exercisesRef = collection(db, 'exercises');
  //         const exercisesQuery = firestoreQuery(
  //           exercisesRef,
  //           where('name', '>=', searchTerm),
  //           // where("mainAreas", ">", searchTerm),
  //           // where("type", ">", searchTerm),
  //         );
  //         const exercisesSnapshot = await getDocs(exercisesQuery);
  //         const exercisesList = exercisesSnapshot.docs.map((doc: DocumentData) => {
  //           const data = doc.data();
  //           return {
  //             id: doc.id,
  //             name: data.name || '',
  //             description: data.description || '',
  //             type: data.type || '',
  //             difficulty: data.difficulty || '',
  //             equipment: data.equipment || [],
  //             image: data.image || '',
  //             series: data.series || 0,
  //           } as Exercise;
  //         });
  //         setSearchResults(exercisesList);
  //       } catch (error) {
  //         console.error('Error searching exercises:', error);
  //       }
  //     } else {
  //       setSearchResults([]);
  //     }
  //   };

  //   searchExercises();
  // }, [searchTerm]);

  return (
    <div className={`btn_search-input borderGradientSearch ${style}  ${isExpanded || search ? 'expanded' : ''}`}>
      <div className="btn_search-icon" onClick={handleExpand}>
        <SearchIcon className="icon" />
      </div>
      <input
        type="text"
        placeholder="Buscar ejercicios"
        value={search}
        onChange={handleChange}
        onBlur={handleCollapse}
        className={`btn_search-input-field ${isExpanded || search ? 'expanded' : ''}`}
      />
    </div>
  );
};

export default BtnSearch;

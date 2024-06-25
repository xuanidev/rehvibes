import { SearchContextProvider } from '../contexts/SearchContext';
import { Library } from './Library';

export const LibraryPage = () => {
  return (
    <SearchContextProvider>
      <Library />
    </SearchContextProvider>
  );
};

import { ReactNode, createContext, useState } from 'react';

interface SearchContextModel {
  search: string;
  setSearch: (search: string) => void;
}

const context: SearchContextModel = {
  search: '',
  setSearch: () => {},
};

export const SearchContext = createContext<SearchContextModel>(context);

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps): JSX.Element | null => {
  const [search, setSearch] = useState<string>('');

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
};

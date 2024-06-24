import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showModalTraining: boolean;
  setShowModalTraining: (show: boolean) => void;
  showModalExercise: boolean;
  setShowModalExercise: (show: boolean) => void;
  showModalLibrary: boolean;
  setShowModalLibrary: (show: boolean) => void;
  pendingPath: string;
  setPendingPath: (path: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalTraining, setShowModalTraining] = useState(false);
  const [showModalExercise, setShowModalExercise] = useState(false);
  const [showModalLibrary, setShowModalLibrary] = useState(false);
  const [pendingPath, setPendingPath] = useState('');

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        showModalTraining,
        setShowModalTraining,
        showModalExercise,
        setShowModalExercise,
        showModalLibrary,
        setShowModalLibrary,
        pendingPath,
        setPendingPath,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

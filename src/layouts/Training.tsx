import { useContext, useEffect, useState } from 'react';
import { ExerciseContainer, HeaderTraining } from '../components/training';
import { Exercise } from '../models';
import { UserContext } from '../contexts/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import { getFromCookies, getFromLocalStorage, removeFromLocalStorageArray, saveOnLocalStorage } from '../utils/helpers';
import { Modal } from '../components/Modal';
import { useModal } from '../contexts/ModalContext';

export const Training = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const { currentExercises, username } = useContext(UserContext);
  const { showModalTraining, setShowModalTraining, pendingPath } = useModal();

  const confirmNavigation = () => {
    setShowModalTraining(false);
    navigate(pendingPath);
  };

  const cancelNavigation = () => {
    setShowModalTraining(false);
  };

  const updateProgress = (step: number) => {
    const newProgress = (step / exercises.length) * 100;
    setProgress(newProgress);
    saveOnLocalStorage('progress', newProgress.toString());
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      saveOnLocalStorage('currentStepTraining', newStep.toString());
      setCurrentStep(newStep);
      updateProgress(newStep);
    }
  };

  const nextStep = () => {
    if (currentStep < exercises.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      saveOnLocalStorage('currentStepTraining', newStep.toString());
      updateProgress(newStep);
    }
  };
  const handleSubmit = () => {
    removeFromLocalStorageArray(['currentExercises', 'currentStepTraining', 'progress']);
    //updateProgram();
    navigate('/');
  };

  useEffect(() => {
    if (currentExercises && currentExercises.length === 0) {
      console.log(currentExercises);
      const exercisesFromStorage = getFromLocalStorage('currentExercises');
      if (exercisesFromStorage !== '[]' && exercisesFromStorage !== '') {
        console.log('entra');
        setExercises(JSON.parse(exercisesFromStorage));
      }
      const currentStepTraining = getFromLocalStorage('currentStepTraining');
      if (currentStepTraining !== '') {
        setCurrentStep(Number(currentStepTraining));
      }
      const progress = getFromLocalStorage('progress');
      if (progress !== '') {
        setProgress(Number(progress));
      }
      if (exercisesFromStorage !== '[]' && exercisesFromStorage !== '') {
        return;
      }
      navigate('/routine');
      return;
    }
    setExercises(currentExercises ?? []);
    saveOnLocalStorage('currentExercises', JSON.stringify(currentExercises));
  }, []);

  const usernameHeader = username ? username : getFromCookies('username');
  return (
    <div className="routine_training">
      <div className="overlay">
        <HeaderTraining user={usernameHeader} />
        <ExerciseContainer
          exercise={exercises[currentStep] || ({} as Exercise)}
          prevStep={prevStep}
          nextStep={nextStep}
          currentStep={currentStep}
          length={exercises.length}
          progress={progress}
          handleSubmit={handleSubmit}
        />
        {showModalTraining && (
          <Modal
            onConfirm={confirmNavigation}
            onCancel={cancelNavigation}
            text="¿Estás seguro de que deseas abandonar el entrenamiento? Se perderán sus datos guardados"
            confirmText="Si, deseo salir"
            cancelText="Cancelar"
          />
        )}
      </div>
    </div>
  );
};

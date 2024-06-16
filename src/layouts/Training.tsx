import { useEffect, useState } from 'react';
import { ExerciseContainer, HeaderTraining } from '../components/training';
import { Exercise } from '../models';
import { getExercisesById } from '../api/exercises';

export const Training = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const updateProgress = (step: number) => {
    const newProgress = (step / exercises.length) * 100;
    setProgress(newProgress);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      updateProgress(newStep);
    }
  };

  const nextStep = () => {
    if (currentStep < exercises.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      updateProgress(newStep);
    }
  };

  const getExercises = async (ids: string[]) => {
    const exerciseFromApi = await getExercisesById(ids);
    console.log(exerciseFromApi);
    setExercises(exerciseFromApi);
  };

  useEffect(() => {
    getExercises(['7', '10']);
  }, []);

  return (
    <div className="routine_training">
      <div className="overlay">
        <HeaderTraining user="Vicente" />
        <ExerciseContainer
          exercise={exercises[currentStep] || ({} as Exercise)}
          prevStep={prevStep}
          nextStep={nextStep}
          currentStep={currentStep}
          length={exercises.length}
          progress={progress}
        />
      </div>
    </div>
  );
};

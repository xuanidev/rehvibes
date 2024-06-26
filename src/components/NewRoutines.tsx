import './newRoutines.scss';
import Btn from './Btn';
import Card from './Card';
import ImgDefault from '../../public/assets/routinesLibrary/pecho superior.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { Exercise } from '../models';
import ModalExercise from './ModalExercise';
import { UserContext } from '../contexts/UserContextProvider';
import { useModal } from '../contexts/ModalContext';

interface NewRoutinesProps {
  exercises: Exercise[];
}

export const NewRoutines = ({ exercises }: NewRoutinesProps) => {
  const { setCurrentExerciseId } = useContext(UserContext);
  const { showModalExercise, setShowModalExercise } = useModal();
  const sliderContainer = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef<number | null>(null);
  const startClicked = useRef<number>(0);
  const scrollLeft = useRef<number | null>(null);
  const moved = useRef(false); // Track if the mouse has moved
  const [clickedExerciseId, setClickedExerciseId] = useState<number>(0);

  useEffect(() => {
    const slider = sliderContainer.current;
    if (slider) {
      const handleMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return;
        isDown.current = true;
        startX.current = e.pageX - slider.offsetLeft;
        scrollLeft.current = slider.scrollLeft;
        moved.current = false; // Reset moved flag
        startClicked.current = e.clientX;
      };

      const handleMouseLeave = () => {
        isDown.current = false;
      };

      const handleMouseUp = (e: MouseEvent) => {
        if (e.button !== 0) return;
        const mouseUp = e.clientX;
        if (startClicked && mouseUp < startClicked.current + 6 && mouseUp > startClicked.current - 6) {
          handleClick(1);
        }
        isDown.current = false;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - (startX.current ?? 0);
        if (Math.abs(walk) > 10) {
          moved.current = true; // Set moved flag if the mouse moved significantly
        }
        slider.scrollLeft = (scrollLeft.current ?? 0) - walk;
      };

      slider.addEventListener('mousedown', handleMouseDown);
      slider.addEventListener('mouseleave', handleMouseLeave);
      slider.addEventListener('mouseup', handleMouseUp);
      slider.addEventListener('mousemove', handleMouseMove);

      return () => {
        slider.removeEventListener('mousedown', handleMouseDown);
        slider.removeEventListener('mouseleave', handleMouseLeave);
        slider.removeEventListener('mouseup', handleMouseUp);
        slider.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const handleClick = (exerciseId: number) => {
    if (!moved.current) {
      setCurrentExerciseId(exerciseId);
      setClickedExerciseId(exerciseId);
      setShowModalExercise(true);
    }
  };

  return (
    <div className="new_routines_container">
      <h3 className="new_routines_container__tittle">Nuevos ejercicios que te pueden interesar</h3>
      <div className="slider-container" ref={sliderContainer}>
        <div className="inner-slider">
          {exercises.map((exercise: Exercise) => (
            <Card
              key={exercise.id}
              img={exercise.image ?? ImgDefault}
              difficulty={exercise.difficulty}
              duration={'40min' + '.'}
              onClick={() => handleClick(exercise.id)}
              size="sm"
              text={exercise.name}
              exerciseId={exercise.id}
            />
          ))}
        </div>
      </div>
      <Btn btnClass="borderGradient" text="Ver más" />
      {showModalExercise && <ModalExercise id={clickedExerciseId} />}
    </div>
  );
};

export default NewRoutines;

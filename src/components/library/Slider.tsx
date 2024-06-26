import './slider.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { Exercise } from '../../models';
import Card from '../Card';
import { UserContext } from '../../contexts/UserContextProvider';
import { ExercisesContext } from '../../contexts/ExercisesContextProvider';

interface SliderProps {
  tittle: string;
  exercises: Exercise[];
  setShowModalLibrary: (show: boolean) => void;
  setClickedExerciseId: (show: number) => void;
}

export const Slider = (props: SliderProps) => {
  const { exercises, tittle, setShowModalLibrary, setClickedExerciseId } = props;
  const { setCurrentExerciseId } = useContext(UserContext);
  const { isExerciseFav, toggleFav } = useContext(ExercisesContext);
  const sliderContainer = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const startClicked = useRef<number>(0);
  const scrollLeft = useRef<number | null>(null);
  const moved = useRef(false);
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const idleTimeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const slider = sliderContainer.current;
    if (slider) {
      const handleMouseDown = (e: MouseEvent | TouchEvent) => {
        // Adjust for touch events
        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

        if (e instanceof MouseEvent && e.button !== 0) return;
        isDown.current = true;
        startX.current = clientX - slider.offsetLeft;
        startY.current = clientY - slider.offsetTop;
        scrollLeft.current = slider.scrollLeft;
        moved.current = false;
        startClicked.current = clientX;
        setIsGrabbing(true);
        clearIdleTimeout();
      };

      const handleMouseLeave = () => {
        isDown.current = false;
        setIsGrabbing(false);
        setIsHovering(true);
        clearIdleTimeout();
      };

      const handleMouseUp = (e: MouseEvent | TouchEvent) => {
        // Adjust for touch events
        const clientX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
        if (e instanceof MouseEvent && e.button !== 0) return;

        const mouseUp = clientX;
        if (startClicked && mouseUp < startClicked.current + 6 && mouseUp > startClicked.current - 6) {
        }
        isDown.current = false;
        setIsGrabbing(false);
        setIdleTimeout();
      };

      const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDown.current) return;
        e.preventDefault();

        // Adjust for touch events
        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

        const x = clientX - slider.offsetLeft;
        const y = clientY - slider.offsetTop;
        const walk = x - (startX.current ?? 0);
        if (Math.abs(walk) > 10 || Math.abs(y - (startY.current ?? 0)) > 10) {
          moved.current = true;
        }
        slider.scrollLeft = (scrollLeft.current ?? 0) - walk;
        setIsGrabbing(true);
        setIsIdle(false);
        clearIdleTimeout();
      };

      const handleMouseEnter = () => {
        setIsHovering(true);
        setIdleTimeout();
      };

      const clearIdleTimeout = () => {
        if (idleTimeoutId.current) {
          clearTimeout(idleTimeoutId.current);
        }
      };

      const setIdleTimeout = () => {
        clearIdleTimeout();
        idleTimeoutId.current = setTimeout(() => {
          setIsIdle(true);
        }, 1000);
      };

      slider.addEventListener('mousedown', handleMouseDown);
      slider.addEventListener('touchstart', handleMouseDown);
      slider.addEventListener('mouseleave', handleMouseLeave);
      slider.addEventListener('mouseup', handleMouseUp);
      slider.addEventListener('touchend', handleMouseUp);
      slider.addEventListener('mousemove', handleMouseMove);
      slider.addEventListener('touchmove', handleMouseMove);
      slider.addEventListener('mouseenter', handleMouseEnter);

      return () => {
        slider.removeEventListener('mousedown', handleMouseDown);
        slider.removeEventListener('touchstart', handleMouseDown);
        slider.removeEventListener('mouseleave', handleMouseLeave);
        slider.removeEventListener('mouseup', handleMouseUp);
        slider.removeEventListener('touchend', handleMouseUp);
        slider.removeEventListener('mousemove', handleMouseMove);
        slider.removeEventListener('touchmove', handleMouseMove);
        slider.removeEventListener('mouseenter', handleMouseEnter);
      };
    }
  }, []);

  const handleClick = (exerciseId: number) => {
    if (!moved.current) {
      setCurrentExerciseId(exerciseId);
      setClickedExerciseId(exerciseId);
      setShowModalLibrary(true);
    }
  };

  let cursorClass = '';
  if (isGrabbing) {
    cursorClass = 'grabbing';
  } else if (isIdle) {
    cursorClass = 'pointer';
  } else if (isHovering) {
    cursorClass = 'grab';
  }

  return (
    <div className={`slider_container ${cursorClass}`}>
      <h3 className="slider_container__tittle">{tittle}</h3>
      <div className="slider-content" ref={sliderContainer}>
        <div className="slider-inner-slider">
          {exercises.map((exercise: Exercise) => (
            <Card
              key={exercise.id}
              isFav={isExerciseFav(exercise.id)}
              onFavClick={() => toggleFav(exercise.id)}
              img={exercise.image}
              difficulty={exercise.difficulty}
              duration={'40min' + '.'}
              onClick={() => {
                handleClick(exercise.id);
                setCurrentExerciseId(exercise.id);
              }}
              size="sm"
              text={exercise.name}
              exerciseId={exercise.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

import './newRoutines.scss';
import Btn from './Btn';
import Card from './Card';
import ImgDefault from '../../public/assets/routinesLibrary/pecho superior.png';
import { useEffect, useRef } from 'react';
import { Exercise } from '../models';
interface NewRoutinesProps {
  exercises: Exercise[];
}

export const NewRoutines = ({ exercises }: NewRoutinesProps) => {
  const sliderContainer = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef<number | null>(null);
  const scrollLeft = useRef<number | null>(null);

  useEffect(() => {
    const slider = sliderContainer.current;
    if (slider) {
      const handleMouseDown = (e: MouseEvent) => {
        isDown.current = true;
        startX.current = e.pageX - slider.offsetLeft;
        scrollLeft.current = slider.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown.current = false;
      };

      const handleMouseUp = () => {
        isDown.current = false;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown.current) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - (startX.current ?? 0);
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

  return (
    <div className="new_routines_container">
      <h3 className="new_routines_container__tittle">Nuevas rutinas que te pueden interesar</h3>
      <div className="slider-container" ref={sliderContainer}>
        <div className="inner-slider">
          {exercises.map((exercise: Exercise) => {
            return (
              <Card
                key={exercise.id}
                img={exercise.image ?? ImgDefault}
                difficulty={exercise.difficulty}
                duration={'40min' + '.'}
                onClick={() => {
                  console.log('click');
                }}
                size="sm"
                text={exercise.name}
              ></Card>
            );
          })}
        </div>
      </div>
      <Btn btnClass="borderGradient" text="Ver más" />
    </div>
  );
};

export default NewRoutines;

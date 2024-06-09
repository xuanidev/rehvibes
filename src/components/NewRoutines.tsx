import './newRoutines.scss';
import Btn from './Btn';
import Card from './Card';
import PechoSuperior from '../assets/routinesLibrary/pecho superior.png';
import { useEffect, useRef } from 'react';

export const NewRoutines = () => {
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
    <div className="new_routines">
      <h3>Nuevas rutinas que te pueden interesar</h3>
      <div className="slider-container" ref={sliderContainer}>
        <div className="inner-slider">
          <Card
            img={PechoSuperior}
            difficulty="Intermedia"
            duration={'40min' + '.'}
            onClick={() => {
              console.log('click');
            }}
            size="sm"
            text="Pecho Superior"
          ></Card>
          <Card
            img={PechoSuperior}
            difficulty="Intermedia"
            duration={'40min' + '.'}
            onClick={() => {
              console.log('click');
            }}
            size="sm"
            text="Pecho Superior"
          ></Card>
          <Card
            img={PechoSuperior}
            difficulty="Intermedia"
            duration={'40min' + '.'}
            onClick={() => {
              console.log('click');
            }}
            size="sm"
            text="Pecho Superior"
          ></Card>
        </div>
      </div>
      <Btn btnClass="borderGradient" text="Ver más" />
    </div>
  );
};

export default NewRoutines;

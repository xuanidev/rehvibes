// BodyMap.tsx
import Model, { IExerciseData, Muscle } from 'react-body-highlighter';
import { bodyPartsMap } from '../constants';
import './bodyMap.scss';

type BodyPart = keyof typeof bodyPartsMap;
const isValidBodyPart = (part: string): part is BodyPart => {
  return part in bodyPartsMap;
};

const getValidBodyParts = (parts: string[]): BodyPart[] => {
  return parts.filter(isValidBodyPart) as BodyPart[];
};

const getMuscles = (bodyParts: BodyPart[]): Muscle[] => {
  return bodyParts.flatMap(part => bodyPartsMap[part]) as Muscle[];
};

interface BodyMapProps {
  zones: string[];
}

const BodyMap = ({ zones }: BodyMapProps) => {
  const validZones = getValidBodyParts(zones);
  const muscles = getMuscles(validZones);
  const data: IExerciseData[] = [{ name: 'Zonas', muscles: muscles }];
  return <Model data={data} highlightedColors={['#FF662D']} bodyColor={'#e0b9aa'} />;
};

export default BodyMap;

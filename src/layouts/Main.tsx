import { Card } from '../components';
import PechoSuperior from '../assets/routinesLibrary/pecho superior.png';
import { useEffect, useState } from 'react';
import { getProgramByUserID } from '../api/programs';
import { RehabilitationProgramProps } from '../models';
import { getFromCookies } from '../utils/helpers';
import { ToastContainer, toast } from 'react-toastify';
export const Main = () => {
  /*const [programs, setPrograms] = useState<RehabilitationProgramProps[]>();

  
  useEffect(() => {
    const getPrograms = async()=>{
      const uidCookie = getFromCookies('uid');
      if(uidCookie !== ''){
        try{
          const programs = await getProgramByUserID(uidCookie);
          setPrograms(programs);
        }catch{
          toast
        }
      }
    }
    getPrograms();
  }, []);*/

  return (
    <div className="main">
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
      <ToastContainer />
    </div>
  );
};

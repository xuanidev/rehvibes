import { Greet } from '../components/WelcomeMsg';
import NotificationsBtn from '../components/BtnNtf';
import AddWorkoutBtn from '../components/AddWorkout';
import LogoWordmark from '../components/branding/LogoWordmark';
import RoutineContainer from '../components/RoutineInfo';
import ProgressBar from '../components/ProgressBar'
import Calendar from '../components/Calendar';

export const Landing = () => {
  const user = 'Pepito'; 
  const greetingUser = Greet(user);
  const userId = 'user'
  const routineInfo = {
    description: "entrenamiento de rehabilitación para fortalecer el cuello y la espalda",
    difficulty: "Intermedio",
    totalTimeWeeks: "3",
    totalTimeHours: "20",
    mainAreas: ["Cuello", "Espalda"]
  };
  const rehabDays = [
    new Date(2024, 4, 20),
    new Date(2024, 4, 22),
    new Date(2024, 4, 24),
  ];

  console.log(greetingUser);
  return <div className='mainHome' style={{display: 'flex', flexDirection:'column', alignItems: 'flex-end', width: '1594px', paddingRight:'64px'}}> 
            <div className='top-up' style={{display: 'flex', alignItems: 'center', marginTop: '32px', width: '1300px', justifyContent: 'space-between'}}>
              <div className="welcome." style={{ width: '758px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
              {greetingUser} <NotificationsBtn userId={userId}/> <AddWorkoutBtn/>
              </div> 
              <div className='logo' style={{ width: '180px'}}> <LogoWordmark/> </div> 
            </div>
            <div className='components-top' style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', alignContent: 'flex-end', width:'77%', marginTop:'32px'}}>
            <RoutineContainer routineInfo={routineInfo} />
            <ProgressBar/>
            </div>
            <Calendar rehabDays={rehabDays} />
          </div>;
};

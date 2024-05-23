import './welcomeMsg.scss';
import '../api/users';

export function Greet (username: string): React.ReactNode {
    const currentHour = new Date().getHours();
    let greeting:string;
    if (currentHour >= 5 && currentHour <13) {
        greeting = 'Buenos días';
    } else if (currentHour >= 13 && currentHour <20) {
        greeting = 'Buenas tardes';
    } else {
        greeting = 'Buenas noches';
    }
    return <h1 className="greeting">{greeting}, {username}!</h1>; 
}

const user = 'Pepito'; 
const greetingUser = Greet(user);

console.log(greetingUser); 
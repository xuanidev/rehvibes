import { useState, useEffect } from 'react';
import './btnNtf.scss';
import '../api/users';
import '../firebaseConfig.js'
import firebase from 'firebase/compat/app';
import { Btn } from './index.js';
import Bell from './icons/Bell.tsx';

interface NotificationBtnProps {
    userId: string;
}

const NotificationsBtn = ({userId}: NotificationBtnProps) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]); 

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const notificationsRef = firebase.firestore().collection('notifications').doc(userId);
                const info = await notificationsRef.get();
    
                if (info.exists) {
                    setNotifications(info.data()?.message || []);
                }
            } catch (error) {
                console.error('Ha habido un error para mostrarte las notificaciones', error);
            }
        };
        getNotifications();
    }, [userId]);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className='notification-container'>
        <Btn
          btnClass="borderGradient"
          leftIcon={Bell}
          iconHeight={24}
          iconWidth={24}
          iconClass="color-brand icon"
          onClick={toggleNotifications}
        />
        {showNotifications && (
            <ul className='showNtf'>
                {notifications.length > 0 ? (
                notifications.map((message, index) => (
                    <li key={index}>{message}</li>
                ))
                ) : (
                    <li> Todavía no hay notificaciones</li>
                )}
            </ul>
        )}
        </div>
    );

}

export default NotificationsBtn
import { useState, useEffect } from 'react';
import './btnNtf.scss';
import '../api/users';
import '../firebaseConfig.js';
import { Btn } from './index.js';
import Bell from './icons/Bell.tsx';
import { getNotificationsFromUser } from '../api/notifications.ts';
import { Notification } from '../models/notifications.ts';

interface NotificationBtnProps {
  userId: string;
  style?: string;
}

export const BtnNtf = (props: NotificationBtnProps) => {
  const { userId, style = '' } = props;
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotifications = async () => {
    try {
      const text = await getNotificationsFromUser(userId);
      if (text.notifications) {
        setNotifications(text.notifications);
      }
    } catch (error) {
      console.error('Ha habido un error para mostrarte las notificaciones', error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [userId]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className={`notification-container ${style}`}>
      <Btn
        btnClass="borderGradient"
        leftIcon={Bell}
        iconHeight={24}
        iconWidth={24}
        iconClass="color-brand icon"
        onClick={toggleNotifications}
      />
      {showNotifications && (
        <ul className="showNtf">
          {notifications.length > 0 ? (
            notifications.map((message, index) => <li key={index + message.text}>{message.text}</li>)
          ) : (
            <li className="notification"> Todavía no hay notificaciones</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BtnNtf;

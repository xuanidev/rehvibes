import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import { NotificationFromUser } from "../models";
const db = getFirestore();

const undefinedNotifications = {
    uid: '',
    notifications: [],
}

export const getNotificationsFromUser = async (userId:string):Promise<NotificationFromUser> => {
    try{
        const notificationsCollection = collection(db, 'notifications');
        const querySnapshot = await getDocs(query(notificationsCollection, where('uid', '==', userId)));

        let notifiactionData: NotificationFromUser | null = undefinedNotifications;

        querySnapshot.forEach((doc) => {
            notifiactionData = doc.data() as NotificationFromUser;
        });
        return notifiactionData;

    }catch(error){
        throw (error as Error).message;
    }
};
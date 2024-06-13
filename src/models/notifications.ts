export interface Notification {
    text: string,
    createdAt: string,
    readed: boolean
}
export interface NotificationFromUser {
    uid: string
    notifications: Notification[];
}

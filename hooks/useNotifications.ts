import { useState, useEffect, useCallback } from 'react';
import { FightEvent } from '../types';

// Type definitions to satisfy TypeScript for the experimental Notification API
declare class TimestampTrigger {
  constructor(timestamp: number);
}
interface NotificationOptions {
  showTrigger?: TimestampTrigger;
}

const NOTIFICATION_STORAGE_KEY = 'mma-fight-notifications';

type PermissionStatus = 'default' | 'granted' | 'denied' | 'unsupported';

const getNotificationStore = (): Record<string, boolean> => {
    try {
        const store = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
        return store ? JSON.parse(store) : {};
    } catch (e) {
        return {};
    }
};

const setNotificationStore = (store: Record<string, boolean>) => {
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(store));
};

export const useNotifications = (event: FightEvent) => {
    const [permission, setPermission] = useState<PermissionStatus>('unsupported');
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const eventId = `${event.eventName}|${event.date}`;

    useEffect(() => {
        if (!('Notification' in window) || !('ServiceWorker' in navigator) || !('showTrigger' in Notification.prototype)) {
            setPermission('unsupported');
            return;
        }
        setPermission(Notification.permission as 'default' | 'granted' | 'denied');
        
        const store = getNotificationStore();
        setIsSubscribed(!!store[eventId]);

    }, [eventId]);

    const requestPermission = useCallback(async () => {
        const result = await Notification.requestPermission();
        setPermission(result);
    }, []);

    const subscribe = useCallback(async () => {
        if (permission !== 'granted') {
            await requestPermission();
            // If permission is still not granted after asking, exit.
            if (Notification.permission !== 'granted') return;
        }

        const registration = await navigator.serviceWorker.ready;
        const eventDate = new Date(event.date);
        const eventTime = eventDate.getTime();
        const now = Date.now();

        const schedules = [
            { id: 'day', time: eventTime - 24 * 60 * 60 * 1000, label: 'in 1 day' },
            { id: 'hour', time: eventTime - 60 * 60 * 1000, label: 'in 1 hour' },
            { id: '5min', time: eventTime - 5 * 60 * 1000, label: 'in 5 minutes' },
        ];

        for (const schedule of schedules) {
            if (schedule.time > now) {
                const title = `Reminder: ${event.eventName}`;
                const options = {
                    body: `${event.promotion} event starts ${schedule.label}!`,
                    icon: '/vite.svg', // A generic icon
                    tag: `${eventId}-${schedule.id}`,
                    showTrigger: new TimestampTrigger(schedule.time),
                };
                await registration.showNotification(title, options);
            }
        }
        
        const store = getNotificationStore();
        store[eventId] = true;
        setNotificationStore(store);
        setIsSubscribed(true);
        console.log(`Notifications scheduled for ${event.eventName}`);

    }, [event, eventId, permission, requestPermission]);

    const unsubscribe = useCallback(() => {
        // NOTE: The current Notification Triggers API does not support cancelling a scheduled notification.
        // This function will only update the UI state and local storage to reflect the user's intent.
        // The scheduled notifications will still fire unless the user clears site data.
        const store = getNotificationStore();
        delete store[eventId];
        setNotificationStore(store);
        setIsSubscribed(false);
        console.log(`Notifications "cancelled" for ${event.eventName}`);
    }, [eventId]);

    return {
        permission,
        isSubscribed,
        requestPermission,
        subscribe,
        unsubscribe,
    };
};

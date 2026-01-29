import { useState, useEffect, useCallback } from 'react';
import { FightEvent } from '../types';

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
        if (!('Notification' in window) || !('ServiceWorker' in navigator)) {
            setPermission('unsupported');
            return;
        }
        setPermission(Notification.permission as PermissionStatus);
        const store = getNotificationStore();
        setIsSubscribed(!!store[eventId]);
    }, [eventId]);

    const subscribe = useCallback(async () => {
        if (Notification.permission !== 'granted') {
            const result = await Notification.requestPermission();
            if (result !== 'granted') return;
        }

        const registration = await navigator.serviceWorker.ready;
        const eventTime = new Date(event.date).getTime();
        const now = Date.now();

        const schedules = [
            { id: 'day', time: eventTime - 24 * 60 * 60 * 1000, label: 'in 1 day' },
            { id: 'hour', time: eventTime - 60 * 60 * 1000, label: 'in 1 hour' },
        ];

        for (const schedule of schedules) {
            if (schedule.time > now) {
                const options: any = {
                    body: `${event.promotion} starts ${schedule.label}!`,
                    tag: `${eventId}-${schedule.id}`,
                };

                // Use experimental Notification Trigger if available
                if ('TimestampTrigger' in window) {
                    options.showTrigger = new (window as any).TimestampTrigger(schedule.time);
                }

                await registration.showNotification(`Fight Alert: ${event.eventName}`, options);
            }
        }
        
        const store = getNotificationStore();
        store[eventId] = true;
        setNotificationStore(store);
        setIsSubscribed(true);
    }, [event, eventId]);

    const unsubscribe = useCallback(() => {
        const store = getNotificationStore();
        delete store[eventId];
        setNotificationStore(store);
        setIsSubscribed(false);
    }, [eventId]);

    return {
        permission,
        isSubscribed,
        requestPermission: () => Notification.requestPermission().then(setPermission as any),
        subscribe,
        unsubscribe,
    };
};
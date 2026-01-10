import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { FightEvent } from '../types';

interface NotificationButtonProps {
    event: FightEvent;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ event }) => {
    const {
        permission,
        isSubscribed,
        requestPermission,
        subscribe,
        unsubscribe,
    } = useNotifications(event);

    const BellIcon: React.FC<{ subscribed: boolean }> = ({ subscribed }) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {subscribed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            )}
        </svg>
    );

    if (permission === 'unsupported') {
        return null; // Don't render button if notifications aren't supported
    }

    if (permission === 'denied') {
        return (
            <div className="relative group">
                <button className="text-[#715A5A]/50 cursor-not-allowed" disabled>
                    <BellIcon subscribed={false} />
                </button>
                <div className="absolute bottom-full mb-2 w-48 bg-[#37353E] text-center text-xs text-[#D3DAD9] rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Notifications are blocked. Please enable them in your browser settings.
                </div>
            </div>
        );
    }
    
    if (permission === 'default') {
        return (
             <button
                onClick={requestPermission}
                className="text-[#D3DAD9] hover:text-[#715A5A] transition-colors duration-200"
                title="Enable Notifications"
                aria-label="Enable notifications"
            >
                <BellIcon subscribed={false} />
            </button>
        )
    }

    const handleClick = () => {
        if (isSubscribed) {
            unsubscribe();
        } else {
            subscribe();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`transition-colors duration-200 ${isSubscribed ? 'text-[#715A5A]' : 'text-[#D3DAD9] hover:text-[#715A5A]'}`}
            title={isSubscribed ? 'Cancel Notifications' : 'Get Fight Reminders'}
            aria-label={isSubscribed ? 'Cancel notifications for this event' : 'Schedule notifications for this event'}
        >
            <BellIcon subscribed={isSubscribed} />
        </button>
    );
};

export default NotificationButton;
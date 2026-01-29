
import React from 'react';
import { FightEvent, Promotion } from '../types';
import FightMatchup from './FightMatchup';
import NotificationButton from './NotificationButton';

interface FightCardProps {
  event: FightEvent;
}

const getPromotionStyles = (promotion: Promotion) => {
    const styles = { textColor: 'text-[#715A5A]' };
    switch (promotion) {
        case Promotion.UFC:
            return { logo: 'UFC', ...styles };
        case Promotion.PFL:
            return { logo: 'PFL', ...styles };
        case Promotion.BKFC:
            return { logo: 'BKFC', ...styles };
        case Promotion.ONE:
             return { logo: 'ONE', ...styles };
        case Promotion.BELLATOR:
             return { logo: 'BELLATOR', ...styles };
        default:
            return { logo: promotion, ...styles };
    }
}

/**
 * STRICT MANUAL IST CONVERSION ALGORITHM (GMT+5:30):
 * 1. Total minutes = GMT Hours * 60 + GMT Minutes
 * 2. Add 330 minutes
 * 3. Handle rollover (Next day / Previous day)
 * 4. Build output string manually to avoid browser timezone interference
 */
const getManualIST = (isoDateStr: string) => {
    const gmt = new Date(isoDateStr);
    
    // GMT Components
    let year = gmt.getUTCFullYear();
    let month = gmt.getUTCMonth();
    let day = gmt.getUTCDate();
    let hours = gmt.getUTCHours();
    let minutes = gmt.getUTCMinutes();

    // 1. Total minutes
    let total = (hours * 60) + minutes;

    // 2. Add +330 for IST
    total += 330;

    // 3. Handle Rollover
    let dayOffset = 0;
    if (total >= 1440) {
        total -= 1440;
        dayOffset = 1;
    } else if (total < 0) {
        total += 1440;
        dayOffset = -1;
    }

    // 4. Back to components
    const istHours = Math.floor(total / 60);
    const istMinutes = total % 60;

    // Create a virtual date for formatting the date part correctly (handling month/year rollovers)
    const istVirtualDate = new Date(Date.UTC(year, month, day + dayOffset));
    
    // Formatting manually
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[istVirtualDate.getUTCDay()];
    const monthName = months[istVirtualDate.getUTCMonth()];
    const dateNum = istVirtualDate.getUTCDate();
    const yearNum = istVirtualDate.getUTCFullYear();

    const ampm = istHours >= 12 ? 'PM' : 'AM';
    const displayHours = istHours % 12 || 12;
    const displayMinutes = istMinutes.toString().padStart(2, '0');

    return {
        dateString: `${dayName}, ${monthName} ${dateNum}, ${yearNum}`,
        timeString: `${displayHours}:${displayMinutes} ${ampm} IST`
    };
};

const FightCard: React.FC<FightCardProps> = ({ event }) => {
    const { logo, textColor } = getPromotionStyles(event.promotion);
    
    // Perform conversions
    const ist = getManualIST(event.date);
    const gmtDate = new Date(event.date);

    // GMT Formatting (for comparison)
    const gmtDateString = gmtDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });
    const gmtTimeString = gmtDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    }) + ' GMT';

  return (
    <div className="bg-[#44444E]/80 rounded-lg shadow-xl overflow-hidden border border-[#37353E] flex flex-col transition-all duration-300 hover:border-[#715A5A]/50">
      <div className="p-4 bg-[#37353E]/70 flex justify-between items-center border-b border-[#37353E]">
        <h2 className="text-xl md:text-2xl font-black text-[#D3DAD9] flex-1 truncate pr-2 uppercase tracking-tight">{event.eventName}</h2>
        <div className="flex items-center space-x-3">
          <NotificationButton event={event} />
          <span className={`text-2xl md:text-3xl font-black italic ${textColor} opacity-80`}>{logo}</span>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="flex items-start">
          <div className="bg-[#715A5A]/10 p-2 rounded mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#715A5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <div>
                <p className="text-[10px] font-black text-[#715A5A] uppercase tracking-[0.2em] mb-1 opacity-60">GMT / Global</p>
                <p className="text-sm font-bold text-[#b0b8b7]">{gmtDateString} | {gmtTimeString}</p>
            </div>
            
            <div className="bg-[#715A5A]/10 border-l-4 border-[#715A5A] p-4 rounded-r shadow-sm">
              <p className="text-[10px] font-black text-[#715A5A] uppercase tracking-[0.2em] mb-1">🇮🇳 India Standard Time (IST)</p>
              <p className="text-lg font-black text-[#D3DAD9] leading-tight mb-0.5">{ist.dateString}</p>
              <p className="text-2xl font-black text-[#715A5A]">{ist.timeString}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-[#D3DAD9] bg-[#37353E]/30 p-4 rounded-md border border-[#37353E]/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#715A5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-base font-bold text-[#D3DAD9]">{event.venue}, {event.location}</p>
        </div>
      </div>

      <div className="px-6 pb-6 flex-grow">
        <h3 className="text-sm font-black text-[#715A5A] mb-4 border-b border-[#37353E] pb-2 uppercase tracking-[0.3em]">Main Card Matchups</h3>
        <div className="grid gap-3">
          {event.fightCard.map((matchup, index) => (
            <FightMatchup key={index} matchup={matchup} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FightCard;

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

const FightCard: React.FC<FightCardProps> = ({ event }) => {
    const { logo, textColor } = getPromotionStyles(event.promotion);
    
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = new Date(event.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });

  return (
    <div className="bg-[#44444E]/80 rounded-lg shadow-lg overflow-hidden border border-[#37353E] flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-[#715A5A]/50">
      <div className="p-4 bg-[#37353E]/50 flex justify-between items-center border-b border-[#37353E]">
        <h2 className="text-xl font-bold text-[#D3DAD9] flex-1 truncate pr-2">{event.eventName}</h2>
        <div className="flex items-center space-x-4">
          <NotificationButton event={event} />
          <span className={`text-2xl font-black italic ${textColor}`}>{logo}</span>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-center text-[#b0b8b7]">
           <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5 mr-3 text-[#715A5A]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
          <p className="font-semibold text-[#D3DAD9]">{formattedDate} <span className="text-gray-600 font-normal">|</span> {formattedTime}</p>
        </div>
        <div className="flex items-center text-[#b0b8b7]">
          <svg xmlns="http://www.w.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#715A5A]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
          <p className="text-[#D3DAD9]">{event.venue}, {event.location}</p>
        </div>
      </div>

      <div className="px-4 pb-4 flex-grow">
        <h3 className="text-lg font-semibold text-[#D3DAD9] mb-3 border-b-2 border-[#37353E] pb-2">Fight Card</h3>
        <div className="space-y-3">
          {event.fightCard.map((matchup, index) => (
            <FightMatchup key={index} matchup={matchup} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FightCard;
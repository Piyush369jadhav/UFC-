import React from 'react';
import { Promotion } from '../types';

interface PromotionCardProps {
    promotion: Promotion;
    eventCount: number;
    onClick: () => void;
}

const getPromotionGradient = () => {
    // A single, unified gradient for the vintage theme
    return 'from-[#44444E]/20 via-[#37353E]/60 to-[#37353E]';
};

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion, eventCount, onClick }) => {
    const bgGradient = getPromotionGradient();

    return (
        <button 
            onClick={onClick}
            className={`group relative bg-[#44444E] p-6 rounded-lg shadow-lg border border-[#37353E] text-center transition-all duration-300 overflow-hidden 
                       hover:shadow-2xl hover:border-[#715A5A] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#715A5A] focus:ring-offset-2 focus:ring-offset-[#37353E]`}
            aria-label={`View upcoming events for ${promotion}`}
        >
            <div className={`absolute inset-0 bg-gradient-to-t ${bgGradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <h2 className="text-xl md:text-2xl font-extrabold text-[#D3DAD9] uppercase tracking-wider">{promotion}</h2>
                <p className="text-sm text-[#715A5A] mt-2 font-bold">{eventCount} Upcoming Event{eventCount > 1 ? 's' : ''}</p>
            </div>
        </button>
    );
};

export default PromotionCard;
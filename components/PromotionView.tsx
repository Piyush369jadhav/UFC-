import React from 'react';
import { FightEvent, Source, Promotion } from '../types';
import FightCard from './FightCard';
import SourceLinks from './SourceLinks';

interface PromotionViewProps {
    promotion: Promotion;
    events: FightEvent[];
    sources: Source[];
}

const PromotionView: React.FC<PromotionViewProps> = ({ promotion, events, sources }) => {
    return (
        <div>
            <SourceLinks sources={sources} />
            {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                    {events.map((event, index) => (
                        <FightCard key={`${event.eventName}-${index}`} event={event} />
                    ))}
                </div>
            ) : (
                <div className="col-span-full text-center bg-[#44444E]/50 border border-[#37353E] p-8 rounded-lg">
                    <p className="text-[#b0b8b7]">No upcoming events found for {promotion} based on current search results.</p>
                </div>
            )}
        </div>
    );
};

export default PromotionView;
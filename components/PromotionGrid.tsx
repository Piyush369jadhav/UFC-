import React, { useMemo } from 'react';
import { FightEvent, Promotion } from '../types';
import PromotionCard from './PromotionCard';

interface PromotionGridProps {
    events: FightEvent[];
    onSelectPromotion: (promotion: Promotion) => void;
}

const PromotionGrid: React.FC<PromotionGridProps> = ({ events, onSelectPromotion }) => {

    const promotionData = useMemo(() => {
        const promotionMap = new Map<Promotion, number>();
        
        events.forEach(event => {
            promotionMap.set(event.promotion, (promotionMap.get(event.promotion) || 0) + 1);
        });

        // Sort promotions alphabetically
        return Array.from(promotionMap.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([promotion, count]) => ({ promotion, count }));

    }, [events]);

    if (events.length === 0) {
        return (
          <div className="col-span-full text-center bg-[#44444E]/50 border border-[#37353E] p-8 rounded-lg">
              <p className="text-[#b0b8b7]">No upcoming events found based on current search results.</p>
          </div>
        );
    }
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {promotionData.map(({ promotion, count }) => (
                <PromotionCard 
                    key={promotion}
                    promotion={promotion}
                    eventCount={count}
                    onClick={() => onSelectPromotion(promotion)}
                />
            ))}
        </div>
    );
};

export default PromotionGrid;
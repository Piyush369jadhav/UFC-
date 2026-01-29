
import React from 'react';
import { Matchup } from '../types';

interface FightMatchupProps {
  matchup: Matchup;
}

const FightMatchup: React.FC<FightMatchupProps> = ({ matchup }) => {
  return (
    <div className="bg-[#37353E]/60 rounded p-4 border-l-4 border-transparent hover:border-[#715A5A] transition-colors duration-200">
      <div className="flex justify-between items-center mb-3">
        <p className="text-[11px] font-black text-[#715A5A] uppercase tracking-widest">{matchup.weightClass}</p>
        <div className="flex gap-2">
            {matchup.isMainEvent && <span className="bg-[#715A5A] text-[#D3DAD9] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm">Main Event</span>}
            {matchup.isCoMainEvent && <span className="bg-[#D3DAD9] text-[#37353E] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm">Co-Main</span>}
        </div>
      </div>
      <div className="flex items-center justify-between text-center gap-3">
        <div className="w-[43%]">
            <p className="font-black text-base md:text-lg text-[#D3DAD9] leading-tight uppercase tracking-tight">{matchup.fighter1}</p>
        </div>
        <div className="w-[14%]">
            <span className="text-[#715A5A] font-bold text-xs italic opacity-60">VS</span>
        </div>
        <div className="w-[43%]">
            <p className="font-black text-base md:text-lg text-[#D3DAD9] leading-tight uppercase tracking-tight">{matchup.fighter2}</p>
        </div>
      </div>
    </div>
  );
};

export default FightMatchup;

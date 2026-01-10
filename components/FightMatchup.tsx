import React from 'react';
import { Matchup } from '../types';

interface FightMatchupProps {
  matchup: Matchup;
}

const FightMatchup: React.FC<FightMatchupProps> = ({ matchup }) => {
  return (
    <div className="bg-[#37353E]/60 rounded-md p-3 transition-all duration-200 hover:bg-[#37353E] ring-1 ring-[#44444E]/50">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-[#b0b8b7]">{matchup.weightClass}</p>
        {matchup.isMainEvent && <span className="bg-[#715A5A] text-[#D3DAD9] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Main Event</span>}
        {matchup.isCoMainEvent && <span className="bg-[#D3DAD9] text-[#37353E] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Co-Main</span>}
      </div>
      <div className="flex items-center justify-center text-center">
        <p className="w-2/5 font-bold text-lg text-[#D3DAD9] truncate">{matchup.fighter1}</p>
        <p className="w-1/5 text-[#715A5A] font-black text-sm">VS</p>
        <p className="w-2/5 font-bold text-lg text-[#D3DAD9] truncate">{matchup.fighter2}</p>
      </div>
    </div>
  );
};

export default FightMatchup;
import React, { useState } from 'react';
import { HabitPair } from '../types';
import { ArrowRight, XCircle, CheckCircle } from 'lucide-react';

interface FlipCardProps {
  pair: HabitPair;
}

const FlipCard: React.FC<FlipCardProps> = ({ pair }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="group perspective-1000 w-full h-64 cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side (Don't) */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl p-6 shadow-xl bg-gradient-to-br from-slate-800 to-indigo-900 text-white flex flex-col justify-between border border-slate-700">
          <div className="flex justify-between items-start">
            <span className="text-4xl">{pair.icon}</span>
            <XCircle className="text-rose-400 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-rose-300 mb-2">Jangan Lakukan</h3>
            <p className="text-xl font-medium leading-tight">{pair.dont}</p>
            <p className="text-sm text-slate-400 mt-2">{pair.dontDesc}</p>
          </div>
          <div className="text-xs text-center text-slate-500 mt-2 group-hover:text-slate-300 transition-colors flex items-center justify-center gap-1">
            Klik untuk ubah pola pikir <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Back Side (Do) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl p-6 shadow-xl bg-gradient-to-br from-amber-100 to-orange-100 text-slate-800 flex flex-col justify-between border border-orange-200">
           <div className="flex justify-between items-start">
            <span className="text-4xl">✨</span>
            <CheckCircle className="text-emerald-500 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-600 mb-2">Lakukan Ini</h3>
            <p className="text-xl font-medium leading-tight">{pair.do}</p>
            <p className="text-sm text-slate-600 mt-2">{pair.doDesc}</p>
          </div>
           <div className="text-xs text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
            Kamu pasti bisa!
          </div>
        </div>

      </div>
    </div>
  );
};

export default FlipCard;
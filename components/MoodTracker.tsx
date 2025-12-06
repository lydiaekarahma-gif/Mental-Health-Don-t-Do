
import React, { useState, useEffect } from 'react';
import { MoodEntry } from '../types';
import { Smile, Frown, Meh, CloudRain, AlertCircle, Calendar } from 'lucide-react';

const MoodTracker: React.FC = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood'] | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mindbalance_moods');
    if (saved) {
      setMoods(JSON.parse(saved));
    }
  }, []);

  const saveMood = () => {
    if (!selectedMood) return;
    const newEntry: MoodEntry = {
      date: new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' }),
      mood: selectedMood,
      note: ''
    };
    const updated = [newEntry, ...moods].slice(0, 10); // Keep last 10
    setMoods(updated);
    localStorage.setItem('mindbalance_moods', JSON.stringify(updated));
    setSelectedMood(null);
  };

  const getIcon = (mood: string) => {
    switch (mood) {
      case 'senang': return <Smile className="w-6 h-6 text-emerald-500" />;
      case 'normal': return <Meh className="w-6 h-6 text-amber-500" />;
      case 'cemas': return <AlertCircle className="w-6 h-6 text-orange-500" />;
      case 'sedih': return <Frown className="w-6 h-6 text-blue-500" />;
      case 'stres': return <CloudRain className="w-6 h-6 text-purple-500" />;
      default: return <Meh className="w-6 h-6" />;
    }
  };

  const options: { label: string; value: MoodEntry['mood']; color: string; icon: any }[] = [
    { label: 'Senang', value: 'senang', color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700', icon: Smile },
    { label: 'Normal', value: 'normal', color: 'bg-amber-100 hover:bg-amber-200 text-amber-700', icon: Meh },
    { label: 'Cemas', value: 'cemas', color: 'bg-orange-100 hover:bg-orange-200 text-orange-700', icon: AlertCircle },
    { label: 'Sedih', value: 'sedih', color: 'bg-blue-100 hover:bg-blue-200 text-blue-700', icon: Frown },
    { label: 'Stres', value: 'stres', color: 'bg-purple-100 hover:bg-purple-200 text-purple-700', icon: CloudRain },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="bg-white rounded-3xl p-6 shadow-xl h-fit">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Bagaimana perasaanmu hari ini?</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedMood(opt.value)}
              className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
                selectedMood === opt.value 
                  ? 'ring-2 ring-slate-800 scale-105 ' + opt.color 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <opt.icon className="w-6 h-6" />
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
        <button 
          onClick={saveMood}
          disabled={!selectedMood}
          className="w-full bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all"
        >
          Simpan Mood
        </button>
      </div>

      {/* History Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" /> Riwayat Mood
        </h3>
        {moods.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <p>Belum ada data mood.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {moods.map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                <span className="text-sm font-medium text-slate-500">{entry.date}</span>
                <div className="flex items-center gap-2 capitalize font-semibold text-slate-700">
                  {entry.mood} {getIcon(entry.mood)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;

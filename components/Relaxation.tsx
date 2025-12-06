
import React, { useState, useEffect, useRef } from 'react';
import { Play, Music, Wind, Waves, X, Pause, Volume2, ChevronRight, Eye, Hand, Ear, Smile, Loader2 } from 'lucide-react';
import { RelaxationItem } from '../types';

// Extended interface for internal use
interface RelaxationContent extends RelaxationItem {
  audioUrl?: string;
  guideSteps?: { text: string; icon: any }[];
}

const items: RelaxationContent[] = [
  { 
    id: 1, 
    title: "Teknik Pernapasan 4-7-8", 
    duration: "5 min", 
    type: "guide", 
    category: "breathing", 
    description: "Tarik napas 4 detik, tahan 7 detik, hembuskan 8 detik.",
  },
  { 
    id: 2, 
    title: "Suara Hujan Ringan", 
    duration: "∞", 
    type: "audio", 
    category: "music", 
    description: "Suara hujan yang menenangkan untuk meredakan kecemasan.",
    // Pixabay: Rain on Roof
    audioUrl: "https://cdn.pixabay.com/audio/2022/02/07/audio_6584f9326d.mp3"
  },
  { 
    id: 3, 
    title: "Grounding 5-4-3-2-1", 
    duration: "3 min", 
    type: "guide", 
    category: "meditation", 
    description: "Teknik untuk mengatasi serangan panik dengan fokus pada indra.",
    guideSteps: [
      { text: "Sebutkan 5 benda yang bisa kamu LIHAT di sekitarmu.", icon: Eye },
      { text: "Sebutkan 4 benda yang bisa kamu SENTUH teksturnya.", icon: Hand },
      { text: "Sebutkan 3 suara yang bisa kamu DENGAR saat ini.", icon: Ear },
      { text: "Sebutkan 2 benda yang bisa kamu CIUM aromanya.", icon: Wind },
      { text: "Sebutkan 1 hal baik yang bisa kamu RASAKAN tentang dirimu.", icon: Smile }
    ]
  },
  { 
    id: 4, 
    title: "Ambience Keramaian", 
    duration: "30 min", 
    type: "audio", 
    category: "music", 
    description: "Suara latar belakang yang stabil untuk fokus belajar atau bekerja.",
    // Pixabay: Cafe Ambience
    audioUrl: "https://cdn.pixabay.com/audio/2022/03/10/audio_596f6c91a7.mp3" 
  },
  { 
    id: 5, 
    title: "Meditasi Ombak Laut", 
    duration: "10 min", 
    type: "audio", 
    category: "meditation", 
    description: "Suara ritmis ombak pantai untuk membantu tidur nyenyak.",
    // Pixabay: Soft Ocean Waves
    audioUrl: "https://cdn.pixabay.com/audio/2021/08/09/audio_03e05a76e2.mp3"
  },
  { 
    id: 6, 
    title: "Suara Alam Malam", 
    duration: "∞", 
    type: "audio", 
    category: "music", 
    description: "Suara jangkrik dan angin malam yang tenang.",
    // Pixabay: Night Ambience
    audioUrl: "https://cdn.pixabay.com/audio/2021/09/06/audio_9c0b1a0300.mp3"
  },
  { 
    id: 7, 
    title: "Suara Sungai Mengalir", 
    duration: "∞", 
    type: "audio", 
    category: "meditation", 
    description: "Aliran air sungai yang jernih membawa kedamaian alami.",
    // Pixabay: Forest River
    audioUrl: "https://cdn.pixabay.com/audio/2022/02/22/audio_d07a67d51b.mp3"
  },
];

// --- Sub-component: Audio Player ---
const AudioPlayer = ({ item, onClose }: { item: RelaxationContent; onClose: () => void }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [error, setError] = useState<string | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          // Prevent logging circular structure
          if (e.name !== 'AbortError') {
             // setError("Gagal memutar audio.");
          }
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Reset state when item changes
    setIsPlaying(false);
    setIsBuffering(true);
    setError(null);

    // Attempt auto play
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(e => {
            setIsPlaying(false);
          });
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [item.id]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-6 h-6" />
        </button>
        
        <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 
          ${item.category === 'music' ? 'bg-purple-100 text-purple-500' : 'bg-emerald-100 text-emerald-500'}
          ${isPlaying ? 'animate-pulse' : ''}
        `}>
          {item.category === 'music' ? <Music className="w-16 h-16" /> : <Waves className="w-16 h-16" />}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-2">{item.title}</h3>
        <p className="text-slate-500 mb-8">{item.description}</p>
        
        {error && (
          <p className="text-rose-500 text-sm mb-4 bg-rose-50 p-2 rounded-lg">{error}</p>
        )}

        <audio 
          key={item.audioUrl}
          ref={audioRef} 
          src={item.audioUrl} 
          loop 
          preload="auto"
          crossOrigin="anonymous"
          onError={(e) => {
             const err = e.currentTarget.error;
             const code = err ? err.code : 0;
             console.error("Audio Error:", code);
             let msg = "Audio tidak dapat dimuat.";
             if (code === 4) msg = "Sumber audio tidak didukung atau tidak tersedia (Error 4).";
             if (code === 3) msg = "Gagal mendekode audio (Error 3).";
             if (code === 2) msg = "Masalah koneksi jaringan (Error 2).";
             setError(msg);
             setIsBuffering(false);
          }}
          onWaiting={() => setIsBuffering(true)}
          onCanPlay={() => setIsBuffering(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={togglePlay}
              disabled={!!error}
              className={`w-16 h-16 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-slate-700 transition-all hover:scale-105 shadow-lg ${!!error ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isBuffering && !error ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-400 bg-slate-50 p-3 rounded-xl">
            <Volume2 className="w-5 h-5" />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-component: Breathing Exercise ---
const BreathingExercise = ({ onClose }: { onClose: () => void }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [instruction, setInstruction] = useState("Tarik Napas...");

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const startExhale = () => {
      setPhase('exhale');
      setInstruction("Hembuskan...");
      timerId = setTimeout(startInhale, 8000); // 8s exhale
    };

    const startHold = () => {
      setPhase('hold');
      setInstruction("Tahan...");
      timerId = setTimeout(startExhale, 7000); // 7s hold
    };

    const startInhale = () => {
      setPhase('inhale');
      setInstruction("Tarik Napas...");
      timerId = setTimeout(startHold, 4000); // 4s inhale
    };

    // Start cycle
    startInhale();

    return () => clearTimeout(timerId);
  }, []);

  // Visual helper styles
  const getCircleStyles = () => {
    if (phase === 'inhale') return 'scale-150 duration-[4000ms]';
    if (phase === 'hold') return 'scale-150 duration-0'; // Stay big
    return 'scale-100 duration-[8000ms]'; // Shrink
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500 text-white">
      <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
        <X className="w-8 h-8" />
      </button>

      <h3 className="text-xl md:text-3xl font-bold mb-12 opacity-80">Teknik 4-7-8</h3>

      <div className="relative flex items-center justify-center mb-20">
        {/* Glow Effect */}
        <div className={`w-48 h-48 bg-emerald-500/30 rounded-full absolute blur-2xl transition-all ease-in-out ${getCircleStyles()}`} />
        
        {/* Main Breathing Circle */}
        <div className={`w-40 h-40 bg-emerald-500 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.5)] flex items-center justify-center transition-all ease-in-out ${getCircleStyles()}`}>
           <span className="text-4xl font-bold animate-pulse">
             {phase === 'inhale' ? '👃' : phase === 'hold' ? '✋' : '💨'}
           </span>
        </div>
      </div>

      <h2 className="text-4xl md:text-5xl font-light mb-4 text-center tracking-wide">{instruction}</h2>
      <div className="flex gap-8 text-sm text-white/40 mt-8">
        <span className={phase === 'inhale' ? 'text-white font-bold' : ''}>4s Tarik</span>
        <span className={phase === 'hold' ? 'text-white font-bold' : ''}>7s Tahan</span>
        <span className={phase === 'exhale' ? 'text-white font-bold' : ''}>8s Hembus</span>
      </div>
    </div>
  );
};

// --- Sub-component: Grounding Guide ---
const GroundingGuide = ({ item, onClose }: { item: RelaxationContent; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  
  if (!item.guideSteps) return null;

  const currentStepData = item.guideSteps[step];
  const Icon = currentStepData.icon;

  const nextStep = () => {
    if (step < (item.guideSteps?.length || 0) - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in zoom-in-95 duration-200">
      <div className="max-w-lg w-full text-center relative">
        <button onClick={onClose} className="absolute -top-12 right-0 md:-right-12 text-slate-400 hover:text-slate-800">
          <X className="w-8 h-8" />
        </button>

        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shadow-inner">
             <Icon className="w-10 h-10" />
          </div>
        </div>
        
        <div className="mb-2 text-indigo-500 font-bold uppercase tracking-widest text-sm">Langkah {step + 1} dari {item.guideSteps.length}</div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 leading-relaxed">
          {currentStepData.text}
        </h3>
        
        <p className="text-slate-500 mb-12">Amati sekelilingmu, rasakan, dan sebutkan dalam hati.</p>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={nextStep}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-indigo-200"
          >
            {step < item.guideSteps.length - 1 ? 'Lanjut' : 'Selesai'} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Component ---
const Relaxation: React.FC = () => {
  const [activeItem, setActiveItem] = useState<RelaxationContent | null>(null);

  return (
    <div>
      <div className="text-center mb-8">
         <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Perpustakaan Ketenangan</h2>
         <p className="text-white/80">Kumpulan alat bantu untuk meredakan stres sejenak.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setActiveItem(item)}
            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 group cursor-pointer"
          >
            <div className={`h-32 rounded-xl mb-4 flex items-center justify-center text-4xl transition-colors
              ${item.category === 'breathing' ? 'bg-sky-100 text-sky-500 group-hover:bg-sky-200' : ''}
              ${item.category === 'music' ? 'bg-purple-100 text-purple-500 group-hover:bg-purple-200' : ''}
              ${item.category === 'meditation' ? 'bg-emerald-100 text-emerald-500 group-hover:bg-emerald-200' : ''}
            `}>
              {item.category === 'breathing' && <Wind className="w-10 h-10" />}
              {item.category === 'music' && <Music className="w-10 h-10" />}
              {item.category === 'meditation' && <Waves className="w-10 h-10" />}
            </div>
            
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.category}</span>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">{item.duration}</span>
            </div>
            
            <h3 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500 mb-4 h-10 line-clamp-2">{item.description}</p>
            
            <button className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-2 rounded-lg group-hover:bg-slate-700 transition-colors">
              <Play className="w-4 h-4" /> Mulai
            </button>
          </div>
        ))}
      </div>

      {/* Render Active Overlays */}
      {activeItem && (
        <>
          {activeItem.category === 'breathing' && (
            <BreathingExercise onClose={() => setActiveItem(null)} />
          )}
          
          {(activeItem.category === 'music' || (activeItem.category === 'meditation' && activeItem.audioUrl)) && (
            <AudioPlayer item={activeItem} onClose={() => setActiveItem(null)} />
          )}

          {(activeItem.category === 'meditation' && activeItem.guideSteps) && (
            <GroundingGuide item={activeItem} onClose={() => setActiveItem(null)} />
          )}
        </>
      )}
    </div>
  );
};

export default Relaxation;

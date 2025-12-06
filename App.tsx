
import React, { useState } from 'react';
import { HabitPair } from './types';
import FlipCard from './components/FlipCard';
import ChatWidget from './components/ChatWidget';
import DailyQuote from './components/DailyQuote';
import Assessment from './components/Assessment';
import MoodTracker from './components/MoodTracker';
import Relaxation from './components/Relaxation';
import Community from './components/Community';
import ProfessionalHelp from './components/ProfessionalHelp';
import { Moon, Sun, Home, Activity, Heart, Music, Users, Phone, Info } from 'lucide-react';

const habits: HabitPair[] = [
  {
    id: 1,
    dont: "Memendam perasaan sendirian",
    dontDesc: "Menyimpan beban emosi sendiri bisa meningkatkan stres.",
    do: "Ceritakan perasaanmu",
    doDesc: "Berbagi cerita dengan teman atau menulis jurnal bisa melegakan hati.",
    icon: "🤐"
  },
  {
    id: 2,
    dont: "Terlalu keras pada diri sendiri",
    dontDesc: "Perfeksionisme berlebihan bisa menyakiti harga diri.",
    do: "Jaga pola tidur yang cukup",
    doDesc: "Istirahat adalah bentuk kasih sayang pada diri sendiri. Tubuh butuh recharge.",
    icon: "😣"
  },
  {
    id: 3,
    dont: "Membandingkan diri dengan orang lain",
    dontDesc: "Setiap orang punya garis waktu dan perjalanannya sendiri.",
    do: "Lakukan aktivitas yang kamu suka",
    doDesc: "Fokus pada kebahagiaanmu sendiri. Hobi membantumu menemukan jati diri.",
    icon: "👀"
  },
  {
    id: 4,
    dont: "Menumpuk tugas tanpa jadwal",
    dontDesc: "Prokrastinasi membuat kecemasan semakin menumpuk.",
    do: "Makan teratur dan tetap hidrasi",
    doDesc: "Nutrisi yang baik mendukung kesehatan otak dan kestabilan emosi.",
    icon: "📚"
  }
];

type ViewType = 'home' | 'assessment' | 'mood' | 'relax' | 'community' | 'help';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'night' | 'day' | 'split'>('split');
  const [currentView, setCurrentView] = useState<ViewType>('home');

  // Helper to determine background styles based on active state
  const getBackgroundClass = () => {
    if (activeTab === 'night') return "bg-slate-900";
    if (activeTab === 'day') return "bg-amber-50";
    return "bg-gradient-to-br from-slate-900 via-indigo-900 to-amber-50"; // Split feel
  };

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'assessment', label: 'Cek Mental', icon: Activity },
    { id: 'mood', label: 'Mood', icon: Heart },
    { id: 'relax', label: 'Relaksasi', icon: Music },
    { id: 'community', label: 'Komunitas', icon: Users },
    { id: 'help', label: 'Bantuan', icon: Phone },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${getBackgroundClass()} overflow-x-hidden font-sans flex flex-col`}>
      
      {/* Navbar Desktop / Tablet */}
      <nav className="p-4 md:p-6 flex justify-between items-center relative z-20">
        <h1 
          className={`text-xl md:text-2xl font-bold tracking-tight cursor-pointer ${activeTab === 'day' ? 'text-slate-800' : 'text-white'}`}
          onClick={() => setCurrentView('home')}
        >
          Mind<span className="text-emerald-500">Balance</span>
        </h1>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/20 shadow-lg">
          {navItems.map((item) => (
             <button
               key={item.id}
               onClick={() => setCurrentView(item.id as ViewType)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                 currentView === item.id 
                   ? 'bg-emerald-500 text-white shadow-md' 
                   : (activeTab === 'day' ? 'text-slate-600 hover:bg-black/5' : 'text-slate-300 hover:bg-white/10')
               }`}
             >
               <item.icon className="w-4 h-4" />
               {item.label}
             </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="bg-white/10 backdrop-blur-md p-1 rounded-full flex gap-1 border border-white/20">
          <button 
            onClick={() => setActiveTab('night')}
            className={`p-2 rounded-full transition-all ${activeTab === 'night' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Night Mode"
          >
            <Moon className="w-4 h-4" />
          </button>
           <button 
            onClick={() => setActiveTab('split')}
            className={`p-2 rounded-full transition-all ${activeTab === 'split' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Overview"
          >
            <span className="text-xs font-bold px-1">VS</span>
          </button>
          <button 
            onClick={() => setActiveTab('day')}
            className={`p-2 rounded-full transition-all ${activeTab === 'day' ? 'bg-amber-400 text-slate-900' : 'text-slate-400 hover:text-white'}`}
            title="Day Mode"
          >
            <Sun className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 pb-32 pt-4 max-w-6xl relative z-10 flex-1">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <>
            {/* Daily Quote Section */}
            <DailyQuote />

            {/* Header Text */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-top-10 duration-700">
              <h2 className={`text-4xl md:text-6xl font-extrabold mb-4 transition-colors duration-500 ${activeTab === 'day' ? 'text-slate-800' : 'text-white'}`}>
                Mental Health: <br className="md:hidden"/>
                <span className="text-rose-400 inline-block transform hover:-rotate-2 transition-transform cursor-default">Don't</span> 
                <span className={`mx-4 text-2xl font-light ${activeTab === 'day' ? 'text-slate-400' : 'text-slate-500'}`}>&</span> 
                <span className="text-emerald-400 inline-block transform hover:rotate-2 transition-transform cursor-default">Do</span>
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${activeTab === 'day' ? 'text-slate-600' : 'text-slate-300'}`}>
                Kesejahteraan mental dimulai dari kebiasaan kecil.
              </p>
            </div>

            {/* Content Area */}
            <div className="relative">
              
              {/* Visual Divider for Split Mode */}
              {activeTab === 'split' && (
                <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block -z-10" />
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {habits.map((habit, index) => (
                  <div 
                    key={habit.id} 
                    className={`transition-all duration-700 delay-[${index * 100}ms]
                      ${activeTab === 'night' ? 'opacity-100 scale-100' : ''}
                      ${activeTab === 'day' ? 'opacity-100 scale-100' : ''}
                    `}
                  >
                    <FlipCard pair={habit} />
                  </div>
                ))}
              </div>

              {/* Illustration / Atmosphere Section */}
              <div className={`mt-20 rounded-3xl p-8 md:p-12 relative overflow-hidden transition-all duration-1000 ${activeTab === 'day' ? 'bg-amber-100' : 'bg-slate-800'}`}>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-lg">
                    <h3 className={`text-3xl font-bold mb-4 ${activeTab === 'day' ? 'text-slate-800' : 'text-white'}`}>
                      {activeTab === 'day' ? 'Nikmati Prosesnya' : 'Jangan Menyerah'}
                    </h3>
                    <p className={`text-lg leading-relaxed ${activeTab === 'day' ? 'text-slate-700' : 'text-slate-300'}`}>
                      {activeTab === 'day' 
                        ? "Seperti tanaman yang butuh matahari dan air, jiwamu butuh hal-hal positif untuk tumbuh. Luangkan waktu untuk dirimu sendiri hari ini."
                        : "Malam yang gelap selalu diikuti oleh pagi yang cerah. Tidak apa-apa untuk merasa lelah, tapi ingatlah untuk tidak membiarkan kegelapan menguasai dirimu selamanya."}
                    </p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="flex gap-4">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg animate-bounce-slow
                        ${activeTab === 'day' ? 'bg-white text-orange-400' : 'bg-slate-700 text-indigo-300'}
                    `}>
                        {activeTab === 'day' ? '🎸' : '⛈️'}
                    </div>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg mt-8 animate-bounce-delayed
                        ${activeTab === 'day' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-900 text-rose-400'}
                    `}>
                        {activeTab === 'day' ? '🌳' : '🥀'}
                    </div>
                  </div>
                </div>

                {/* Background Texture */}
                <div className={`absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-30 
                  ${activeTab === 'day' ? 'bg-orange-300' : 'bg-indigo-600'}`} 
                />
                <div className={`absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30 
                  ${activeTab === 'day' ? 'bg-emerald-300' : 'bg-slate-950'}`} 
                />
              </div>
            </div>
          </>
        )}

        {/* OTHER VIEWS */}
        <div className="animate-in fade-in zoom-in duration-300">
          {currentView === 'assessment' && <Assessment />}
          {currentView === 'mood' && <MoodTracker />}
          {currentView === 'relax' && <Relaxation />}
          {currentView === 'community' && <Community />}
          {currentView === 'help' && <ProfessionalHelp />}
        </div>

      </main>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-2 z-40">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as ViewType)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                currentView === item.id ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm ${activeTab === 'day' ? 'text-slate-500' : 'text-slate-500'} mb-16 md:mb-0`}>
        <p>© {new Date().getFullYear()} MindBalance. Ingat, kamu tidak sendirian.</p>
        <div className="flex items-center justify-center gap-2 mt-2 opacity-60">
           <Info className="w-3 h-3" />
           <span>Aplikasi ini adalah panduan pendukung, bukan pengganti bantuan medis profesional.</span>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  "Jangan menyerah. Biasanya kunci terakhir dalam kumpullah yang membuka kunci pintu.",
  "Kamu lebih berani dari yang kamu yakini, dan lebih kuat dari yang kamu kira.",
  "Istirahat bukanlah kemalasan, itu adalah obat.",
  "Satu-satunya cara untuk melakukan pekerjaan hebat adalah dengan mencintai apa yang kamu lakukan.",
  "Tidak apa-apa untuk tidak baik-baik saja. Itu bagian dari menjadi manusia.",
  "Setiap hari mungkin tidak baik, tetapi ada sesuatu yang baik di setiap hari.",
  "Bernafaslah. Ini hanya hari yang buruk, bukan kehidupan yang buruk."
];

const DailyQuote: React.FC = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote on mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl mb-8 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-700">
      <Quote className="absolute top-4 left-4 w-8 h-8 text-white/20 rotate-180" />
      <div className="relative z-10 text-center">
        <h4 className="text-xs uppercase tracking-widest text-white/70 mb-2">Motivasi Hari Ini</h4>
        <p className="text-xl md:text-2xl font-medium text-white italic leading-relaxed">
          "{quote}"
        </p>
      </div>
      <Quote className="absolute bottom-4 right-4 w-8 h-8 text-white/20" />
    </div>
  );
};

export default DailyQuote;

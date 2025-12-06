
import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, RefreshCcw } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: "Bagaimana kualitas tidurmu dalam 3 hari terakhir?",
    options: [
      { text: "Sangat nyenyak & teratur", score: 0 },
      { text: "Cukup, sesekali terbangun", score: 1 },
      { text: "Buruk, sulit tidur/terlalu banyak tidur", score: 2 }
    ]
  },
  {
    id: 2,
    text: "Seberapa sering kamu merasa cemas tanpa alasan jelas?",
    options: [
      { text: "Jarang sekali", score: 0 },
      { text: "Kadang-kadang", score: 1 },
      { text: "Sering/Hampir setiap saat", score: 2 }
    ]
  },
  {
    id: 3,
    text: "Apakah kamu masih bisa menikmati hobi atau aktivitas favoritmu?",
    options: [
      { text: "Ya, sangat menikmati", score: 0 },
      { text: "Kurang bersemangat", score: 1 },
      { text: "Tidak ada minat sama sekali", score: 2 }
    ]
  },
  {
    id: 4,
    text: "Bagaimana tingkat energi kamu hari ini?",
    options: [
      { text: "Berenergi", score: 0 },
      { text: "Mudah lelah", score: 1 },
      { text: "Sangat lelah sepanjang waktu", score: 2 }
    ]
  }
];

const Assessment: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const calculateResult = () => {
    const total = (Object.values(answers) as number[]).reduce((a, b) => a + b, 0);
    if (total <= 2) return { status: "Stabil", color: "text-emerald-500", bg: "bg-emerald-100", msg: "Kesehatan mentalmu tampak stabil. Pertahankan kebiasaan baikmu!" };
    if (total <= 5) return { status: "Waspada Ringan", color: "text-amber-500", bg: "bg-amber-100", msg: "Kamu mungkin sedang stres ringan. Coba luangkan waktu untuk relaksasi atau 'Me Time'." };
    return { status: "Butuh Perhatian", color: "text-rose-500", bg: "bg-rose-100", msg: "Skor kamu mengindikasikan beban emosional yang cukup berat. Pertimbangkan untuk berbicara dengan profesional atau orang terpercaya." };
  };

  const isComplete = Object.keys(answers).length === questions.length;
  const result = showResult ? calculateResult() : null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Cek Kondisi Mentalmu</h2>
      
      {!showResult ? (
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="border-b border-slate-100 pb-4 last:border-0">
              <p className="font-medium text-lg text-slate-700 mb-3">{q.text}</p>
              <div className="grid gap-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(q.id, opt.score)}
                    className={`text-left px-4 py-3 rounded-xl transition-all ${
                      answers[q.id] === opt.score 
                        ? 'bg-emerald-500 text-white shadow-md' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <button
            disabled={!isComplete}
            onClick={() => setShowResult(true)}
            className="w-full bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-900 transition-colors mt-4"
          >
            Lihat Hasil
          </button>
        </div>
      ) : (
        <div className="text-center animate-in zoom-in duration-300">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${result?.bg}`}>
            {result?.status === "Stabil" ? <CheckCircle className={`w-12 h-12 ${result.color}`} /> : <AlertTriangle className={`w-12 h-12 ${result?.color}`} />}
          </div>
          <h3 className={`text-3xl font-bold mb-2 ${result?.color}`}>{result?.status}</h3>
          <p className="text-slate-600 text-lg mb-8">{result?.msg}</p>
          
          <button
            onClick={() => {
              setAnswers({});
              setShowResult(false);
            }}
            className="flex items-center gap-2 mx-auto text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> Ulangi Tes
          </button>
        </div>
      )}
    </div>
  );
};

export default Assessment;

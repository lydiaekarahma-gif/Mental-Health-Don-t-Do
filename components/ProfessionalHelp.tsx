
import React from 'react';
import { Phone, MapPin, CalendarCheck, ShieldAlert } from 'lucide-react';

const ProfessionalHelp: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Emergency Section */}
      <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="bg-rose-100 p-4 rounded-full text-rose-600">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-rose-700 mb-1">Butuh Bantuan Mendesak?</h3>
          <p className="text-rose-900/70 mb-4">Jika kamu atau orang yang kamu kenal dalam bahaya, jangan ragu untuk menghubungi layanan darurat.</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="tel:119" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-colors">
              <Phone className="w-4 h-4" /> 119 (Ambulans)
            </a>
            <a href="tel:112" className="bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 px-6 py-2 rounded-full font-bold transition-colors">
              112 (Darurat)
            </a>
             <span className="text-xs text-rose-400 self-center">*Layanan di Indonesia</span>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-emerald-500">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-emerald-500" /> Konsultasi Online
          </h3>
          <ul className="space-y-4">
             <li className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div>
                  <p className="font-bold text-slate-700">Dr. Sarah Psikolog</p>
                  <p className="text-xs text-slate-500">Spesialis Kecemasan & Depresi</p>
                </div>
                <button className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 font-medium">Book</button>
             </li>
             <li className="flex justify-between items-center border-b border-slate-50 pb-3">
                <div>
                  <p className="font-bold text-slate-700">Budi Santoso, M.Psi</p>
                  <p className="text-xs text-slate-500">Konseling Remaja & Karir</p>
                </div>
                <button className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 font-medium">Book</button>
             </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-indigo-500">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-500" /> Klinik Terdekat
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">🏥</div>
              <div>
                <p className="font-bold text-slate-700">RSJ Sehat Jiwa</p>
                <p className="text-xs text-slate-500">Jl. Kesehatan No. 45 (2.5 km)</p>
                <p className="text-xs text-emerald-600 mt-1">Buka 24 Jam</p>
              </div>
            </div>
             <div className="flex gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">🏥</div>
              <div>
                <p className="font-bold text-slate-700">Klinik Mentari</p>
                <p className="text-xs text-slate-500">Jl. Mawar Indah (5.1 km)</p>
                <p className="text-xs text-slate-400 mt-1">08:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfessionalHelp;

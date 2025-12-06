import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

export const generateEmpatheticResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `Anda adalah "Teman Cerita" (Empathetic Listener), sebuah persona AI yang hangat, suportif, dan menenangkan. 
        
        Konteks: Anda adalah bagian dari aplikasi kesehatan mental berdasarkan prinsip poster "Don't & Do".
        Tugas Anda: Mendengarkan keluh kesah pengguna dan memberikan respon singkat, hangat, dan memvalidasi perasaan mereka. 
        
        Panduan Gaya:
        - Gunakan bahasa Indonesia yang santai tapi sopan (seperti teman baik).
        - Jangan menghakimi.
        - Fokus pada solusi "Do" (Ceritakan perasaan, Istirahat cukup, Lakukan hobi, Makan teratur).
        - Jangan berikan diagnosis medis. Jika masalah terlihat berat (depresi berat, keinginan bunuh diri), sarankan dengan lembut untuk mencari bantuan profesional.
        - Jawaban maksimal 3-4 kalimat.`,
        temperature: 0.7,
      },
    });

    return response.text || "Maaf, saya sedang kesulitan mendengar Anda saat ini. Bisa ulangi?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Gagal terhubung dengan Teman Cerita.");
  }
};
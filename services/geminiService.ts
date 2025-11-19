import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const diagnoseProblem = async (userDescription: string): Promise<string> => {
  if (!apiKey) {
    return "API Anahtarı bulunamadı. Lütfen sistem yöneticisi ile iletişime geçin.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userDescription,
      config: {
        systemInstruction: `Sen TamirAdam platformunun uzman yapay zeka asistanısın. 
        Kullanıcı sana evindeki bir arızayı veya ihtiyacı anlatacak.
        Görevin:
        1. Sorunu nazikçe ve profesyonelce analiz etmek.
        2. Bu sorunun hangi usta kategorisine girdiğini belirlemek (Örn: Elektrikçi, Tesisatçı, Boyacı, Mobilyacı).
        3. Kullanıcıya çözüm için kısa bir ön bilgi vermek ve "Hemen bir usta yönlendiriyorum" mesajı vermek.
        Cevabın Türkçe, samimi ama profesyonel olsun. Maksimum 3 cümle kur.`,
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    
    return response.text || "Üzgünüm, şu an bağlantı kuramıyorum. Lütfen doğrudan servis seçiniz.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Bağlantı hatası oluştu. Lütfen doğrudan kategori seçerek devam ediniz.";
  }
};

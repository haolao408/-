
import { GoogleGenAI } from "@google/genai";
import { MoodType } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getDailyWisdom = async (mood: MoodType, userName: string): Promise<string> => {
  if (!API_KEY) {
    return getFallbackWisdom(mood);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const prompt = `
      Ты - мудрый, заботливый, мягкий наставник для женщин в приложении "Я-Ресурс".
      Пользовательницу зовут ${userName}.
      Ее текущее настроение: ${getMoodDescription(mood)}.
      
      Напиши ОЧЕНЬ короткое (максимум 25 слов) поддерживающее послание или аффирмацию для нее.
      Тон: теплый, принимающий, спокойный. Используй "Ты".
      Если настроение хорошее - порадуйся с ней и вдохнови сохранить это.
      Если плохое - поддержи, не давай советов, просто будь рядом словами.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || getFallbackWisdom(mood);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getFallbackWisdom(mood);
  }
};

const getMoodDescription = (mood: MoodType) => {
  switch (mood) {
    case MoodType.JOY: return "радость, легкость, свет";
    case MoodType.GRATITUDE: return "благодарность, любовь, тепло";
    case MoodType.ENERGY: return "энергия, сила, готовность действовать";
    case MoodType.CALM: return "спокойствие, баланс";
    case MoodType.TIRED: return "усталость, нет сил, нужна пауза";
    case MoodType.ANXIETY: return "тревога, беспокойство, страх";
    case MoodType.SADNESS: return "грусть, меланхолия, слезы";
    case MoodType.IRRITATION: return "раздражение, злость, гнев";
    case MoodType.NEED_SUPPORT: return "усталость, тревога, нужна поддержка";
    case MoodType.READY_TO_GROW: return "энергия, готовность действовать";
    default: return "нейтральное";
  }
};

const getFallbackWisdom = (mood: MoodType) => {
  switch (mood) {
    case MoodType.JOY:
    case MoodType.GRATITUDE:
      return "Сохрани этот свет внутри себя. Ты сияешь.";
    case MoodType.ENERGY:
    case MoodType.READY_TO_GROW:
      return "Сегодня мир открыт для тебя. Твори и создавай.";
    case MoodType.CALM:
      return "Внутри тебя тихая гавань. Дыши и чувствуй опору.";
    case MoodType.TIRED:
    case MoodType.NEED_SUPPORT:
      return "Ты имеешь право на отдых. Мир подождет, пока ты восстановишься.";
    case MoodType.ANXIETY:
      return "Ты в безопасности. Это состояние временно, оно пройдет как облака.";
    case MoodType.SADNESS:
      return "Твои чувства важны. Позволь себе прожить их, мы рядом.";
    case MoodType.IRRITATION:
      return "Дыши глубже. Представь, как напряжение утекает в землю.";
    default:
      return "Слушай себя. Ты у себя одна, и это самое ценное.";
  }
};

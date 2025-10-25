import { GeminiService } from '../services/GeminiService';
import { API_CONFIG } from '../config/api';

export const testGeminiAPI = async () => {
  try {
    console.log('🧪 Testing Gemini API with official SDK...');
    const geminiService = new GeminiService({ apiKey: API_CONFIG.GEMINI_API_KEY });
    
    // Test with a simple document content
    const testRequest = {
      documentContent: "This is a test document about JavaScript programming. JavaScript is a programming language used for web development. It can be used for both frontend and backend development.",
      title: "JavaScript Quiz",
      description: "A quiz about JavaScript programming",
      type: 'quiz' as const,
      points: 100,
      timeLimit: 30,
      difficulty: 'medium' as const,
      questionCount: 3,
    };

    console.log('🧪 Starting Gemini API test...');
    const result = await geminiService.generateQuiz(testRequest);
    console.log('✅ Gemini API test successful:', result);
    return result;
  } catch (error) {
    console.error('❌ Gemini API test failed:', error);
    throw error;
  }
};

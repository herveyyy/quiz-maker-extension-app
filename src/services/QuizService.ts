import { GeminiService } from './GeminiService';
import { FileService } from './FileService';

type QuizFormData = {
  title: string;
  description: string;
  type: 'quiz' | 'assignment';
  points: number;
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
};

type Question = {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options?: string[];
  correctAnswer?: string;
  points: number;
};

type GeneratedQuiz = {
  title: string;
  description: string;
  questions: Question[];
  totalPoints: number;
};

// ActivityData type removed for AI testing mode

export class QuizService {
  private geminiService: GeminiService;
  private fileService: FileService;

  constructor(
    geminiApiKey: string,
    baseUrl: string,
    apiKey: string
  ) {
    this.geminiService = new GeminiService({ apiKey: geminiApiKey });
    this.fileService = new FileService(baseUrl, apiKey);
    // Backend URLs and API keys stored but not used in AI testing mode
  }

  async generateQuizFromDocument(
    file: File,
    formData: QuizFormData
  ): Promise<GeneratedQuiz> {
    try {
      // Extract text from the uploaded file
      const documentContent = await this.fileService.extractTextFromFile(file);
      
      // Generate quiz using Gemini API
      const generatedQuiz = await this.geminiService.generateQuiz({
        documentContent,
        ...formData,
      });

      return generatedQuiz;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw new Error(`Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async saveQuizToBackend(
    quiz: GeneratedQuiz,
    formData: QuizFormData,
    classCardId: string
  ): Promise<{ success: boolean; activityId?: string; error?: string }> {
    // AI Testing Mode - Backend save disabled
    console.log('AI Testing Mode: Quiz would be saved to backend:', {
      quiz,
      formData,
      classCardId
    });
    
    // Simulate save delay for UI feedback
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      activityId: 'test-activity-id',
    };
  }

  async createSectionQuestions(
    activityId: string,
    questions: Question[]
  ): Promise<{ success: boolean; error?: string }> {
    // AI Testing Mode - Section questions creation disabled
    console.log('AI Testing Mode: Section questions would be created:', {
      activityId,
      questions
    });
    
    // Simulate creation delay for UI feedback
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { success: true };
  }

  async validateQuizForm(formData: QuizFormData): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!formData.title.trim()) {
      errors.push('Title is required');
    }

    if (formData.points <= 0) {
      errors.push('Points must be greater than 0');
    }

    if (formData.questionCount <= 0) {
      errors.push('Number of questions must be greater than 0');
    }

    if (formData.timeLimit < 0) {
      errors.push('Time limit cannot be negative');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

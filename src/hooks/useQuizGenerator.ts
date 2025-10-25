import { useState, useCallback } from 'react';
import { QuizService } from '../services/QuizService';

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

type UseQuizGeneratorReturn = {
  // State
  selectedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  uploadError: string | null;
  quizFormData: QuizFormData;
  generatedQuiz: GeneratedQuiz | null;
  isGenerating: boolean;
  isSaving: boolean;
  alert: { type: 'success' | 'error'; message: string } | null;
  
  // Actions
  selectFile: (file: File) => void;
  removeFile: () => void;
  updateQuizForm: (data: QuizFormData) => void;
  generateQuiz: () => Promise<void>;
  saveQuiz: (classCardId: string) => Promise<{ success: boolean; activityId?: string; error?: string }>;
  regenerateQuiz: () => void;
  editQuiz: () => void;
  clearAlert: () => void;
};

export const useQuizGenerator = (
  geminiApiKey: string,
  baseUrl: string,
  apiKey: string
): UseQuizGeneratorReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [quizFormData, setQuizFormData] = useState<QuizFormData>({
    title: '',
    description: '',
    type: 'quiz',
    points: 100,
    timeLimit: 60,
    difficulty: 'medium',
    questionCount: 10,
  });
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const quizService = new QuizService(geminiApiKey, baseUrl, apiKey);

  const selectFile = useCallback(async (file: File) => {
    setSelectedFile(file);
    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate file upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setAlert({ type: 'success', message: 'File uploaded successfully!' });
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadError(null);
  }, []);

  const updateQuizForm = useCallback((data: QuizFormData) => {
    setQuizFormData(data);
  }, []);

  const generateQuiz = useCallback(async () => {
    if (!selectedFile) {
      setAlert({ type: 'error', message: 'Please select a file first.' });
      return;
    }

    setIsGenerating(true);
    setAlert(null);

    try {
      console.log('🎯 useQuizGenerator: Starting quiz generation...');
      console.log('📁 Selected file:', selectedFile);
      console.log('📝 Form data:', quizFormData);
      
      const quiz = await quizService.generateQuizFromDocument(selectedFile, quizFormData);
      
      console.log('🎯 useQuizGenerator: Quiz generation complete');
      console.log('📊 Generated Quiz Raw Data:', JSON.stringify(quiz, null, 2));
      console.log('📋 Questions Array:', JSON.stringify(quiz.questions, null, 2));
      
      setGeneratedQuiz(quiz);
      setAlert({ type: 'success', message: 'Quiz generated successfully!' });
    } catch (error) {
      setAlert({ 
        type: 'error', 
        message: `Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsGenerating(false);
    }
  }, [selectedFile, quizFormData, quizService]);

  const saveQuiz = useCallback(async (classCardId: string) => {
    if (!generatedQuiz) {
      return { success: false, error: 'No quiz to save' };
    }

    setIsSaving(true);
    setAlert(null);

    try {
      const result = await quizService.saveQuizToBackend(generatedQuiz, quizFormData, classCardId);
      
      if (result.success) {
        setAlert({ type: 'success', message: 'Quiz saved successfully!' });
      } else {
        setAlert({ type: 'error', message: result.error || 'Failed to save quiz' });
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save quiz';
      setAlert({ type: 'error', message: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setIsSaving(false);
    }
  }, [generatedQuiz, quizFormData, quizService]);

  const regenerateQuiz = useCallback(() => {
    setGeneratedQuiz(null);
    setAlert(null);
  }, []);

  const editQuiz = useCallback(() => {
    setGeneratedQuiz(null);
    setAlert(null);
  }, []);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return {
    selectedFile,
    isUploading,
    uploadProgress,
    uploadError,
    quizFormData,
    generatedQuiz,
    isGenerating,
    isSaving,
    alert,
    selectFile,
    removeFile,
    updateQuizForm,
    generateQuiz,
    saveQuiz,
    regenerateQuiz,
    editQuiz,
    clearAlert,
  };
};

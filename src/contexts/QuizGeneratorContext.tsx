import React, { createContext, useContext, type ReactNode } from 'react';
import { useQuizGenerator } from '../hooks';

type QuizGeneratorContextType = ReturnType<typeof useQuizGenerator>;

const QuizGeneratorContext = createContext<QuizGeneratorContextType | null>(null);

type QuizGeneratorProviderProps = {
  children: ReactNode;
  geminiApiKey: string;
  baseUrl: string;
  apiKey: string;
};

export const QuizGeneratorProvider: React.FC<QuizGeneratorProviderProps> = ({ 
  children, 
  geminiApiKey, 
  baseUrl, 
  apiKey 
}) => {
  const quizGenerator = useQuizGenerator(geminiApiKey, baseUrl, apiKey);
  
  return (
    <QuizGeneratorContext.Provider value={quizGenerator}>
      {children}
    </QuizGeneratorContext.Provider>
  );
};

export const useQuizGeneratorContext = () => {
  const context = useContext(QuizGeneratorContext);
  if (!context) {
    throw new Error('useQuizGeneratorContext must be used within a QuizGeneratorProvider');
  }
  return context;
};

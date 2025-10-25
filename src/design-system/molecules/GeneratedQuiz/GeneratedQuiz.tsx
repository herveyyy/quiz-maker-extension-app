import React from 'react';
import { Button } from '../../atoms';

type Question = {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options?: string[];
  correctAnswer?: string;
  points: number;
};

type GeneratedQuizProps = {
  quiz: {
    title: string;
    description: string;
    questions: Question[];
    totalPoints: number;
  };
  onEdit: () => void;
  onSave: () => void;
  onRegenerate: () => void;
  isSaving: boolean;
  className?: string;
};

const GeneratedQuiz: React.FC<GeneratedQuizProps> = ({
  quiz,
  onEdit,
  onSave,
  onRegenerate,
  isSaving,
  className = '',
}) => {
  const renderQuestion = (question: Question, index: number) => (
    <div key={question.id} className="border border-orange-200/50 rounded-lg p-4 bg-white/5 backdrop-blur-sm shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-base font-semibold text-orange-800">
          Question {index + 1}
        </h4>
        <span className="text-xs text-orange-600 font-medium">{question.points} pts</span>
      </div>
      
      <p className="text-orange-700 mb-3 text-sm font-medium">{question.question}</p>
      
      {question.type === 'multiple_choice' && question.options && (
        <div className="space-y-2">
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                className="text-blue-600"
                disabled
              />
              <label className="text-xs text-orange-700 font-medium">{option}</label>
            </div>
          ))}
        </div>
      )}
      
      {question.type === 'true_false' && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name={`question-${question.id}`}
              value="true"
              className="text-blue-600"
              disabled
            />
            <label className="text-xs text-orange-700 font-medium">True</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              name={`question-${question.id}`}
              value="false"
              className="text-blue-600"
              disabled
            />
            <label className="text-xs text-orange-700 font-medium">False</label>
          </div>
        </div>
      )}
      
      {(question.type === 'short_answer' || question.type === 'essay') && (
        <div>
          <textarea
            className="w-full p-2 border border-orange-200/50 rounded-lg bg-white/10 backdrop-blur-sm text-orange-800 placeholder-orange-400 text-sm"
            rows={question.type === 'essay' ? 3 : 2}
            placeholder="Your answer here..."
            disabled
          />
        </div>
      )}
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-orange-200/30">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-bold text-orange-800">{quiz.title}</h2>
            <p className="text-orange-700 mt-1 text-sm font-medium">{quiz.description}</p>
            <p className="text-xs text-orange-600 mt-1 font-semibold">
              {quiz.questions.length} questions • {quiz.totalPoints} total points
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {quiz.questions.map((question, index) => renderQuestion(question, index))}
        </div>
        
        <div className="flex flex-col space-y-2 mt-4 pt-3 border-t border-orange-200/50">
          <div className="flex space-x-2">
            <Button onClick={onEdit} variant="secondary" disabled={isSaving} size="sm" className="flex-1">
              Edit
            </Button>
            <Button onClick={onRegenerate} variant="secondary" disabled={isSaving} size="sm" className="flex-1">
              Regenerate
            </Button>
          </div>
          <Button onClick={onSave} variant="primary" disabled={isSaving} size="sm" className="w-full">
            {isSaving ? 'Testing Save...' : 'Test Save (AI Mode)'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedQuiz;

import React from 'react';
import { Input, Select, Button } from '../../atoms';

type QuizFormData = {
  title: string;
  description: string;
  type: 'quiz' | 'assignment';
  points: number;
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
};

type QuizFormProps = {
  data: QuizFormData;
  onChange: (data: QuizFormData) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  className?: string;
};

const QuizForm: React.FC<QuizFormProps> = ({
  data,
  onChange,
  onSubmit,
  isSubmitting,
  className = '',
}) => {
  const handleChange = (field: keyof QuizFormData, value: string | number) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const typeOptions = [
    { value: 'quiz', label: 'Quiz' },
    { value: 'assignment', label: 'Assignment' },
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-orange-800 mb-1">
            Title *
          </label>
          <Input
            value={data.title}
            onChange={(value) => handleChange('title', value)}
            placeholder="Enter quiz/assignment title"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">
              Type
            </label>
            <Select
              value={data.type}
              onChange={(value) => handleChange('type', value as 'quiz' | 'assignment')}
              options={typeOptions}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">
              Difficulty
            </label>
            <Select
              value={data.difficulty}
              onChange={(value) => handleChange('difficulty', value as 'easy' | 'medium' | 'hard')}
              options={difficultyOptions}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">
              Points
            </label>
            <Input
              type="number"
              value={data.points.toString()}
              onChange={(value) => handleChange('points', parseInt(value) || 0)}
              placeholder="100"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-orange-800 mb-1">
              Questions
            </label>
            <Input
              type="number"
              value={data.questionCount.toString()}
              onChange={(value) => handleChange('questionCount', parseInt(value) || 0)}
              placeholder="10"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-orange-800 mb-1">
            Time Limit (minutes)
          </label>
          <Input
            type="number"
            value={data.timeLimit.toString()}
            onChange={(value) => handleChange('timeLimit', parseInt(value) || 0)}
            placeholder="60"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <Button
        onClick={onSubmit}
        variant="primary"
        disabled={isSubmitting || !data.title || data.points <= 0}
        className="w-full"
      >
        {isSubmitting ? 'Generating...' : 'Generate Quiz'}
      </Button>
    </div>
  );
};

export default QuizForm;

import React from 'react';

type ProgressBarProps = {
  progress: number; // 0-100
  className?: string;
  showPercentage?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  showPercentage = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 border border-orange-200/30">
        <div
          className="bg-linear-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg shadow-orange-200/50"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-orange-600 font-semibold mt-2 text-center">
          {Math.round(clampedProgress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

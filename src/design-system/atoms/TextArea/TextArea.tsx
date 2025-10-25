import React from 'react';

type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
};

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
  rows = 4,
}) => {
  const baseStyle = 'px-4 py-3 border border-orange-200/50 rounded-xl bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 disabled:bg-white/10 disabled:cursor-not-allowed resize-vertical transition-all duration-300 placeholder-orange-300/70 text-orange-800';
  
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseStyle} ${className}`}
      disabled={disabled}
      rows={rows}
    />
  );
};

export default TextArea;

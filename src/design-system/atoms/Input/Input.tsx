import React from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'file';
  className?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  disabled = false,
  accept,
  multiple = false,
}) => {
  const baseStyle = 'px-4 py-3 border border-orange-200/50 rounded-xl bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-300 placeholder-orange-300/70 text-orange-800';
  
  if (type === 'file') {
    return (
      <input
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            onChange(files[0].name);
          }
        }}
        className={`${baseStyle} ${className}`}
        disabled={disabled}
        accept={accept}
        multiple={multiple}
      />
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${baseStyle} ${className}`}
      disabled={disabled}
    />
  );
};

export default Input;

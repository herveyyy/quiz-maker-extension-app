import React from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  className = '',
  disabled = false,
}) => {
  const baseStyle = 'px-4 py-3 border border-orange-200/50 rounded-xl bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-300 text-orange-800';
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${baseStyle} ${className}`}
      disabled={disabled}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

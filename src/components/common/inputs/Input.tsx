"use client";

import React from "react";

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
  helpText?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function Input({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  maxLength,
  required = false,
  inputRef,
  className = "",
  helpText,
  onKeyDown,
  disabled = false,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        ref={inputRef}
        className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
      {helpText && <p className="mt-2 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
}

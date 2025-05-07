"use client";

import React from "react";

interface ButtonInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function ButtonInput({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  error,
  required = false,
  disabled = false,
  buttonText,
  onButtonClick,
  className = "",
  inputRef,
}: ButtonInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="flex items-stretch">
        <input
          type="text"
          id={id}
          ref={inputRef}
          value={value}
          onChange={onChange}
          className={`flex-1 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-l-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${className}`}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={onButtonClick}
          className="bg-gray-800 text-white px-3 p-2.5 rounded-r-lg text-sm hover:bg-gray-700 transition-colors"
          disabled={disabled}
        >
          {buttonText}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

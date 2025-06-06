"use client";

import React, { InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  id: string;
  label: string;

  error?: string;
  helpText?: string;

  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function Input({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  maxLength,
  required = false,
  disabled = false,
  error,
  className = "",
  helpText,
  inputRef,
  onKeyDown,
  ...rest
}: InputProps) {
  const getInputClassName = () => {
    let baseStyle = `w-full p-2 rounded-lg border ${
      error ? "border-red-300" : "border-gray-300"
    } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
      disabled ? "bg-gray-50 text-gray-500" : ""
    } ${className}`;

    return baseStyle;
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          ref={inputRef}
          className={getInputClassName()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          disabled={disabled}
          onKeyDown={onKeyDown}
          {...rest}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {helpText && !error && (
        <p className="text-gray-500 text-xs mt-1">{helpText}</p>
      )}
    </div>
  );
}

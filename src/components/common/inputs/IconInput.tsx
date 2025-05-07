"use client";

import React, { ReactNode } from "react";

interface IconInputProps {
  id: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  icon: ReactNode;
  error?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  rightElement?: ReactNode;
}

export default function IconInput({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  maxLength,
  required = false,
  disabled = false,
  icon,
  error,
  className = "",
  inputRef,
  rightElement,
}: IconInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          ref={inputRef}
          className={`block w-full pl-10 border ${
            error ? "border-red-300" : "border-gray-300"
          } rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
            disabled ? "bg-gray-50 text-gray-500" : ""
          } ${rightElement ? "pr-10" : ""} ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          disabled={disabled}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

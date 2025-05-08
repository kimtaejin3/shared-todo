"use client";

import React, { ReactNode } from "react";

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  helpText?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  
  // 아이콘 관련 속성
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  
  // 버튼 관련 속성
  buttonText?: string;
  onButtonClick?: () => void;
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
  
  // 아이콘 관련 속성
  leftIcon,
  rightElement,
  
  // 버튼 관련 속성
  buttonText,
  onButtonClick,
}: InputProps) {
  // 입력 필드 스타일 계산
  const getInputClassName = () => {
    let baseStyle = `border ${error ? "border-red-300" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${disabled ? "bg-gray-50 text-gray-500" : ""} ${className}`;
    
    // 왼쪽 아이콘이 있는 경우
    if (leftIcon) baseStyle += " pl-10";
    
    // 오른쪽 요소가 있는 경우
    if (rightElement) baseStyle += " pr-10";
    
    // 버튼이 있는 경우
    if (buttonText) {
      baseStyle += " rounded-l-lg";
    } else {
      baseStyle += " rounded-lg";
    }
    
    // 기본 패딩 및 너비
    if (!buttonText) {
      baseStyle += " w-full";
    }
    
    baseStyle += " p-2.5";
    
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
      
      {buttonText ? (
        // 버튼이 있는 입력 필드
        <div className="flex items-stretch">
          <div className="relative flex-1">
            {leftIcon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                {leftIcon}
              </div>
            )}
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
            />
            {rightElement && !buttonText && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {rightElement}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onButtonClick}
            className="bg-gray-800 text-white px-3 p-2.5 rounded-r-lg text-sm hover:bg-gray-700 transition-colors"
            disabled={disabled}
          >
            {buttonText}
          </button>
        </div>
      ) : (
        // 일반 입력 필드 (아이콘 있을 수 있음)
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
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
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
      )}
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {helpText && !error && <p className="text-gray-500 text-xs mt-1">{helpText}</p>}
    </div>
  );
}

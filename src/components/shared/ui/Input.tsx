"use client";

import React, { ReactNode, InputHTMLAttributes } from "react";

type InputVariant = 'default' | 'withIcon' | 'withButton';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  // 기본 필수 속성
  id: string;
  label: string;
  
  // 스타일 및 상태 관련
  error?: string;
  helpText?: string;
  variant?: InputVariant;
  
  // 추가 요소
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  
  // 참조 관련
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
  variant = 'default',
  leftIcon,
  rightElement,
  buttonText,
  onButtonClick,
  ...rest
}: InputProps) {
  // 입력 필드 스타일 계산
  const getInputClassName = () => {
    let baseStyle = `border ${error ? "border-red-300" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${disabled ? "bg-gray-50 text-gray-500" : ""} ${className}`;
    
    // 배리언트에 따른 스타일 적용
    if (variant === 'withIcon' || leftIcon) baseStyle += " pl-10";
    if (variant === 'withIcon' || rightElement) baseStyle += " pr-10";
    
    // 버튼이 있는 경우
    if (variant === 'withButton' || buttonText) {
      baseStyle += " rounded-l-lg";
    } else {
      baseStyle += " rounded-lg";
    }
    
    // 기본 패딩 및 너비
    if (!(variant === 'withButton' || buttonText)) {
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
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              required={required}
              disabled={disabled}
              ref={inputRef}
              onKeyDown={onKeyDown}
              className={getInputClassName()}
              {...rest}
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
            {...rest}
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

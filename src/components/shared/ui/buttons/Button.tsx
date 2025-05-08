"use client";

import React, { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  className = "",
  icon,
}: ButtonProps) {
  const baseStyles = "font-medium rounded-lg transition-colors duration-200 flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-gray-800 hover:bg-gray-700 text-white",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    icon: "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-500 rounded-full p-1",
  };
  
  const sizeStyles = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
  };
  
  const widthStyles = fullWidth ? "w-full" : "";
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

import React from "react";

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function ClockIcon({ className = "", width = 20, height = 20 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      width={width}
      height={height}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

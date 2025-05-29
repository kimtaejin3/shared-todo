import React from "react";

interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function PreviousIcon({ className = "", width = 24, height = 24 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z"
        fill="currentColor"
      />
    </svg>
  );
}

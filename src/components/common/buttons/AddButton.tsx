"use client";

import React from "react";

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

/**
 * 추가 버튼 공통 컴포넌트
 */
export default function AddButton({ onClick, label }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-gray-700 rounded-xl text-sm px-4 py-2 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3.33334V12.6667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33334 8H12.6667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}

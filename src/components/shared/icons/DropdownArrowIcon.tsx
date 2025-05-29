import React from 'react';

interface DropdownArrowIconProps {
  className?: string;
}

const DropdownArrowIcon: React.FC<DropdownArrowIconProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 10L12 6H4L8 10Z" fill="#9CA3AF" />
    </svg>
  );
};

export default DropdownArrowIcon;

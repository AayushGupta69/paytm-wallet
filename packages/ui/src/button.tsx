"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="ui-text-white ui-bg-gray-800 hover:ui-bg-gray-900 focus:ui-outline-none focus:ui-ring-4 focus:ui-ring-gray-300 ui-font-medium ui-rounded-lg ui-text-sm ui-px-5 ui-py-2.5 ui-me-2 ui-mb-2"
    >
      {children}
    </button>
  );
};

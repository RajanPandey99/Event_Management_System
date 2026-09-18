import React from "react";

interface navigateProps {
  label: string;
  onClick: () => void;
}

export const NavigateButton = ({onClick, label} : navigateProps) => {
  return (
    <button
      onClick={onClick}
      className="h-full w-40 rounded-3xl bg-blue-300 text-3xl font-bold"
    >
      {label}
    </button>
  );
};

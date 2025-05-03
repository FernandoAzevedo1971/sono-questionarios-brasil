
import React from "react";

type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1 text-sm text-neutral-700">
        <span>Progresso</span>
        <span>{current} de {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary-500 h-2 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

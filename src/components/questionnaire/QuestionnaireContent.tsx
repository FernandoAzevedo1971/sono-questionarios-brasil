
import React from "react";

type QuestionnaireContentProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const QuestionnaireContent = ({ title, description, children }: QuestionnaireContentProps) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-neutral-900 mb-4">
        {title}
      </h1>
      
      {description && (
        <p className="text-neutral-700 mb-6 text-left">{description}</p>
      )}

      <div className="text-left">
        {children}
      </div>
    </div>
  );
};

export default QuestionnaireContent;

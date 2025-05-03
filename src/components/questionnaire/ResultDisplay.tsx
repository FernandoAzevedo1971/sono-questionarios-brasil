
import React from "react";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

type Severity = "success" | "warning" | "danger" | "info";

type ResultDisplayProps = {
  score: number;
  interpretation: string;
  maxScore?: number;
  minScore?: number;
  notes?: string[];
  severity: Severity;
};

const ResultDisplay = ({
  score,
  interpretation,
  maxScore,
  minScore = 0,
  notes,
  severity,
}: ResultDisplayProps) => {
  const getSeverityClasses = () => {
    switch (severity) {
      case "success":
        return "bg-green-50 border-green-100 text-green-700";
      case "warning":
        return "bg-yellow-50 border-yellow-100 text-yellow-700";
      case "danger":
        return "bg-red-50 border-red-100 text-red-700";
      case "info":
      default:
        return "bg-primary-50 border-primary-100 text-primary-700";
    }
  };

  const getIcon = () => {
    switch (severity) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "danger":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "info":
      default:
        return null;
    }
  };

  return (
    <div className={`mt-6 p-4 border rounded-lg animate-fade-in ${getSeverityClasses()}`}>
      <div className="flex items-center gap-2 mb-1">
        {getIcon()}
        <p className="font-medium">
          Sua pontuação: {score} {maxScore ? `de ${maxScore}` : ""} pontos
        </p>
      </div>
      <p className="font-medium">
        Interpretação: {interpretation}
      </p>
      
      {notes && notes.length > 0 && (
        <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}
      
      {maxScore && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                severity === "success" ? "bg-green-500" :
                severity === "warning" ? "bg-yellow-500" :
                severity === "danger" ? "bg-red-500" : "bg-primary-500"
              }`} 
              style={{ width: `${(score / maxScore) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-neutral-500 mt-1">
            <span>{minScore}</span>
            <span>{maxScore}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;

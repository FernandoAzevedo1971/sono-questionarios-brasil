
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { stopBangQuestions } from "./stopBangQuestions";
import StopBangQuestion from "./StopBangQuestion";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";
import { StopBangAnswers } from "./types";

const StopBangForm = () => {
  const [answers, setAnswers] = useState<StopBangAnswers>({});
  const [score, setScore] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<string | null>(null);

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value === "yes",
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    
    // Count all "yes" answers
    Object.entries(answers).forEach(([_, value]) => {
      if (value) totalScore += 1;
    });
    
    setScore(totalScore);
    
    // Determine risk level based on criteria
    let risk = "";
    
    if (totalScore <= 2) {
      risk = "Baixo risco de Apneia Obstrutiva do Sono (AOS)";
    } else if (totalScore <= 4) {
      risk = "Risco intermediário de Apneia Obstrutiva do Sono (AOS)";
    } else {
      risk = "Alto risco de Apneia Obstrutiva do Sono (AOS)";
    }
    
    // Additional high-risk criteria
    const firstFourQuestions = ["snoring", "tired", "observed", "pressure"];
    const firstFourCount = firstFourQuestions.filter(q => answers[q]).length;
    
    if (firstFourCount >= 2) {
      if (answers["gender"] || answers["bmi"] || answers["neck"]) {
        risk = "Alto risco de Apneia Obstrutiva do Sono (AOS)";
      }
    }
    
    setRiskLevel(risk);
  };

  const isFormComplete = Object.keys(answers).length === stopBangQuestions.length;

  return (
    <div className="space-y-6 mb-6">
      {stopBangQuestions.map((question) => (
        <StopBangQuestion
          key={question.id}
          question={question}
          value={answers[question.id] !== undefined ? (answers[question.id] ? "yes" : "no") : ""}
          onChange={handleOptionChange}
        />
      ))}

      <Button
        className="w-full md:w-auto"
        onClick={calculateScore}
        disabled={!isFormComplete}
      >
        Calcular Resultado
      </Button>

      {score !== null && riskLevel && (
        <ResultDisplay
          score={score}
          interpretation={riskLevel}
          maxScore={8}
          severity={score <= 2 ? "success" : score <= 4 ? "warning" : "danger"}
          notes={[
            "Baixo risco de AOS: Sim para 0 a 2 perguntas.",
            "Risco intermediário de AOS: Sim para 3 a 4 perguntas.",
            "Risco alto de AOS: Sim para 5 a 8 perguntas, ou:",
            "- Sim para 2 ou mais das 4 perguntas iniciais + sexo masculino.",
            "- Sim para 2 ou mais das 4 perguntas iniciais + IMC &gt; 35 kg/m².",
            "- Sim para 2 ou mais das 4 perguntas iniciais + circunferência do pescoço (43 cm em homens, 41 cm em mulheres)."
          ]}
        />
      )}
    </div>
  );
};

export default StopBangForm;

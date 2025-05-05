
import React from "react";
import { StopBangQuestionItem } from "./types";
import QuestionItem from "@/components/questionnaire/QuestionItem";

type StopBangQuestionProps = {
  question: StopBangQuestionItem;
  value: string;
  onChange: (questionId: string, value: string) => void;
};

const StopBangQuestion = ({ question, value, onChange }: StopBangQuestionProps) => {
  return (
    <div className="p-4 bg-neutral-50 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <question.icon className="h-5 w-5 text-primary-600" />
        <p className="font-medium text-neutral-900 text-left">
          <span className="font-bold underline">{question.letter}</span>{question.text}
        </p>
      </div>
      <p className="text-sm text-neutral-600 mb-2 text-left">{question.description}</p>
      <QuestionItem
        id={question.id}
        title=""
        options={["no", "yes"]}
        optionLabels={["Não", "Sim"]}
        value={value}
        onChange={(value) => onChange(question.id, value)}
        inline={true}
        hideOptionNumbers={true}
        optionSpacing="wide"
        reducedSpacing={true}
      />
    </div>
  );
};

export default StopBangQuestion;

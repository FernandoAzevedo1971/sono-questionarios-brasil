
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type QuestionItemProps = {
  id: string | number;
  title: string;
  description?: string;
  options: string[] | number[];
  optionLabels?: string[];
  value: string;
  onChange: (value: string) => void;
  variant?: "card" | "panel";
};

const QuestionItem = ({
  id,
  title,
  description,
  options,
  optionLabels,
  value,
  onChange,
  variant = "panel",
}: QuestionItemProps) => {
  const renderContent = () => (
    <div className="flex flex-col space-y-2">
      <div className="mb-2">
        <h3 className="font-medium text-neutral-900">{title}</h3>
        {description && (
          <p className="text-sm text-neutral-600">{description}</p>
        )}
      </div>
      
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={`${optionLabels ? "flex flex-col space-y-2" : "grid grid-cols-2 md:grid-cols-5 gap-4"}`}
      >
        {options.map((option, index) => (
          <div 
            key={`${id}-${option}`}
            className={`${optionLabels ? "flex flex-col items-center" : "flex items-center space-x-2"}`}
          >
            {optionLabels && (
              <div className="mb-1 text-xs text-center text-neutral-600">
                {optionLabels[index] || ""}
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value={option.toString()} 
                id={`q${id}-${option}`} 
                className="transition-all duration-200 focus:ring-4 focus:ring-primary-100"
              />
              <Label
                htmlFor={`q${id}-${option}`}
                className="text-sm text-neutral-700 cursor-pointer"
              >
                {optionLabels ? option.toString() : option.toString()}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  if (variant === "card") {
    return (
      <Card className="border border-gray-200 transition-all duration-200 hover:border-primary-200">
        <CardContent className="p-4">
          {renderContent()}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-4 bg-neutral-50 rounded-lg border border-transparent transition-all duration-200 hover:border-primary-100">
      {renderContent()}
    </div>
  );
};

export default QuestionItem;

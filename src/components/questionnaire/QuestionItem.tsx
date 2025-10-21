
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
  inline?: boolean; 
  hideOptionNumbers?: boolean;
  optionSpacing?: "normal" | "wide";
  reducedSpacing?: boolean;
  boldTitle?: boolean; // Nova propriedade para título em negrito
  largerTitle?: boolean; // Nova propriedade para título maior
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
  inline = false,
  hideOptionNumbers = false,
  optionSpacing = "normal",
  reducedSpacing = false,
  boldTitle = false, // Valor padrão falso
  largerTitle = false, // Valor padrão falso
}: QuestionItemProps) => {
  const renderContent = () => (
    <div className="flex flex-col text-left">
      <div className={`${reducedSpacing ? 'mb-1' : 'mb-2'}`}>
        <h3 className={`text-neutral-900 text-left ${
          boldTitle ? 'font-bold' : 'font-medium'
        } ${
          largerTitle ? 'text-lg' : 'text-base'
        }`}>
          {title}
        </h3>
        {description && (
          <p className="text-sm text-neutral-600 text-left">{description}</p>
        )}
      </div>
      
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={`${
          optionLabels 
            ? "flex flex-col space-y-2" 
            : inline 
              ? "flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-x-6" 
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        } ${reducedSpacing ? 'mt-1' : ''}`}
      >
        {options.map((option, index) => (
          <div 
            key={`${id}-${option}`}
            className={`${
              optionLabels 
                ? "flex flex-col items-start" 
                : "flex items-center space-x-2"
            } ${optionSpacing === "wide" ? "mr-8" : ""}`}
          >
            {optionLabels && !hideOptionNumbers && (
              <div className="mb-1 text-xs text-left text-neutral-600">
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
                className="text-sm text-neutral-700 cursor-pointer text-left"
              >
                {optionLabels && hideOptionNumbers ? optionLabels[index] : option.toString()}
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

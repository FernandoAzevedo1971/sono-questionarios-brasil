
import { LucideIcon } from "lucide-react";

export type StopBangQuestionItem = {
  id: string;
  letter: string;
  text: string;
  description: string;
  icon: LucideIcon;
};

export type StopBangAnswers = Record<string, boolean>;


export type QuestionnaireCategory = 'sleep' | 'anxiety' | 'depression' | 'fatigue' | 'other';

export interface QuestionnaireTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  lightBg: string;
  buttonClass: string;
  headingClass: string;
}

export const getCategoryTheme = (category: QuestionnaireCategory): QuestionnaireTheme => {
  switch(category) {
    case 'sleep':
      return {
        primaryColor: 'text-blue-600',
        secondaryColor: 'text-blue-800',
        accentColor: 'border-blue-200',
        lightBg: 'bg-blue-50',
        buttonClass: 'hover:border-blue-300 hover:bg-blue-50',
        headingClass: 'border-b border-blue-100'
      };
    case 'anxiety':
      return {
        primaryColor: 'text-purple-600',
        secondaryColor: 'text-purple-800',
        accentColor: 'border-purple-200',
        lightBg: 'bg-purple-50',
        buttonClass: 'hover:border-purple-300 hover:bg-purple-50',
        headingClass: 'border-b border-purple-100'
      };
    case 'depression':
      return {
        primaryColor: 'text-indigo-600',
        secondaryColor: 'text-indigo-800',
        accentColor: 'border-indigo-200',
        lightBg: 'bg-indigo-50',
        buttonClass: 'hover:border-indigo-300 hover:bg-indigo-50',
        headingClass: 'border-b border-indigo-100'
      };
    case 'fatigue':
      return {
        primaryColor: 'text-amber-600',
        secondaryColor: 'text-amber-800',
        accentColor: 'border-amber-200',
        lightBg: 'bg-amber-50',
        buttonClass: 'hover:border-amber-300 hover:bg-amber-50',
        headingClass: 'border-b border-amber-100'
      };
    default:
      return {
        primaryColor: 'text-primary-600',
        secondaryColor: 'text-primary-800',
        accentColor: 'border-primary-200',
        lightBg: 'bg-primary-50',
        buttonClass: 'hover:border-primary-300 hover:bg-primary-50',
        headingClass: 'border-b border-primary-100'
      };
  }
};

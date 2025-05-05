
import { CategoryId, Questionnaire } from './types';
import { questionnaires } from './questionnaires';

export const getCategoryQuestionnaires = (categoryId: CategoryId): Questionnaire[] => {
  return questionnaires.filter(q => q.category === categoryId);
};

export const searchQuestionnaires = (query: string): Questionnaire[] => {
  const lowercaseQuery = query.toLowerCase();
  return questionnaires.filter(q => 
    q.name.toLowerCase().includes(lowercaseQuery) || 
    q.description.toLowerCase().includes(lowercaseQuery)
  );
};


export type CategoryId = 'insonia' | 'apneia' | 'sonolencia' | 'cronotipos' | 'movimentos' | 'outros' | 'ansiedade';

export type Questionnaire = {
  id: string;
  name: string;
  description: string;
  indication: string;
  pdfUrl: string;
  onlineUrl?: string;
  references?: string[];
  category: CategoryId;
};

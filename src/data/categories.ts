
import { CategoryId } from './types';

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
};

export const categories: Category[] = [
  {
    id: 'sonolencia',
    name: 'Avaliação de Sonolência Diurna e Fadiga',
    description: 'Escalas para avaliação de sonolência diurna e fadiga.',
    icon: 'moon',
  },
  {
    id: 'apneia',
    name: 'Apneia do Sono',
    description: 'Instrumentos para triagem e avaliação de apneia obstrutiva do sono.',
    icon: 'lungs',
  },
  {
    id: 'movimentos',
    name: 'Distúrbios de Movimento e Parassonias',
    description: 'Instrumentos para avaliação de síndrome das pernas inquietas, distúrbio comportamental do sono REM e outros distúrbios de movimento.',
    icon: 'book',
  },
  {
    id: 'ansiedade',
    name: 'Avaliação de Ansiedade e Depressão',
    description: 'Escalas para avaliação de ansiedade e depressão relacionadas aos distúrbios do sono.',
    icon: 'brain',
  },
  {
    id: 'qualidade-vida',
    name: 'Qualidade de Vida',
    description: 'Questionários para avaliação da qualidade de vida relacionada ao sono.',
    icon: 'heart',
  },
  {
    id: 'cronotipos',
    name: 'Distúrbios de Ritmo Circadiano',
    description: 'Questionários para avaliação de cronotipos e ritmo circadiano.',
    icon: 'clock',
  },
  {
    id: 'insonia',
    name: 'Insônia e Qualidade do Sono',
    description: 'Questionários relacionados ao diagnóstico e avaliação de insônia e qualidade do sono.',
    icon: 'bed',
  },
  {
    id: 'outros',
    name: 'Outros',
    description: 'Questionários diversos relacionados à medicina do sono.',
    icon: 'file-text',
  },
];

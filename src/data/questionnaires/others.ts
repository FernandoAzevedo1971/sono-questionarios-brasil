
import { Questionnaire } from '../types';

export const othersQuestionnaires: Questionnaire[] = [
  {
    id: 'rbdsq',
    name: 'Questionário de Transtorno Comportamental do Sono REM (RBDSQ)',
    description: 'Avalia sintomas de transtorno comportamental do sono REM',
    category: 'outros', // Changed from "others" to "outros" to match CategoryId type
    path: '/questionarios/rbdsq'
  },
  {
    id: 'hdas',
    name: 'Hospital Depression and Anxiety Scale (HDAS)',
    description: 'Avalia sintomas de depressão e ansiedade',
    category: 'outros', // Changed from "others" to "outros" to match CategoryId type
    path: '/questionarios/hdas'
  },
  {
    id: 'psqi',
    name: 'Índice de Qualidade de Sono de Pittsburgh (PSQI)',
    description: 'Avalia a qualidade do sono durante o último mês',
    category: 'outros', // Changed from "others" to "outros" to match CategoryId type
    path: '/questionarios/psqi-intro',  // Points to the intro page first
    pdfUrl: '/questionarios/psqi.pdf'
  }
];

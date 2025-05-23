
import { Questionnaire } from '../types';

export const othersQuestionnaires: Questionnaire[] = [
  {
    id: 'rbdsq',
    name: 'Questionário de Transtorno Comportamental do Sono REM (RBDSQ)',
    description: 'Avalia sintomas de transtorno comportamental do sono REM',
    category: 'others',
    path: '/questionarios/rbdsq'
  },
  {
    id: 'hdas',
    name: 'Hospital Depression and Anxiety Scale (HDAS)',
    description: 'Avalia sintomas de depressão e ansiedade',
    category: 'others',
    path: '/questionarios/hdas'
  },
  {
    id: 'psqi',
    name: 'Índice de Qualidade de Sono de Pittsburgh (PSQI)',
    description: 'Avalia a qualidade do sono durante o último mês',
    category: 'others',
    path: '/questionarios/psqi-intro',  // Changed this to point to the intro page first
    pdfUrl: '/questionarios/psqi.pdf'
  }
];

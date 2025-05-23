
import { Questionnaire } from '../types';

export const othersQuestionnaires: Questionnaire[] = [
  {
    id: 'rbdsq',
    name: 'Questionário de Transtorno Comportamental do Sono REM (RBDSQ)',
    description: 'Avalia sintomas de transtorno comportamental do sono REM',
    category: 'outros',
    indication: 'Avaliação de sintomas de transtorno comportamental do sono REM',
    pdfUrl: '/questionarios/rbdsq.pdf',
    onlineUrl: '/questionarios/rbdsq'
  },
  {
    id: 'hdas',
    name: 'Hospital Depression and Anxiety Scale (HDAS)',
    description: 'Avalia sintomas de depressão e ansiedade',
    category: 'outros',
    indication: 'Rastreamento de transtornos de ansiedade e depressão',
    pdfUrl: '/questionarios/hdas.pdf',
    onlineUrl: '/questionarios/hdas'
  },
  {
    id: 'psqi',
    name: 'Índice de Qualidade de Sono de Pittsburgh (PSQI)',
    description: 'Avalia a qualidade do sono durante o último mês',
    category: 'outros',
    indication: 'Avaliação da qualidade do sono no último mês',
    pdfUrl: '/questionarios/psqi.pdf',
    onlineUrl: '/questionarios/psqi-intro'  // Points to the intro page first
  }
];

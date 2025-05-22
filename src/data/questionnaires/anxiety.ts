
import { Questionnaire } from '../types';

export const anxietyQuestionnaires: Questionnaire[] = [
  {
    id: 'hdas',
    name: 'Escala Hospitalar de Ansiedade e Depressão (HDAS)',
    description: 'Avalia sintomas de ansiedade e depressão em ambiente hospitalar.',
    indication: 'Rastreamento de transtornos de ansiedade e depressão em pacientes com distúrbios do sono.',
    pdfUrl: '/questionarios/hdas.pdf',
    category: 'ansiedade',
    onlineUrl: '/questionarios/hdas',
    references: [
      'Zigmond AS, Snaith RP - The hospital anxiety and depression scale. Acta Psychiatr Scand, 1983;67:361-370.',
      'Botega NJ, Bio MR, Zomignani MA et al - Transtornos de humor em enfermarias de clínica médica e validação de escala de medida (HAD) de ansiedade e depressão. Rev Saúde Pública, 1995;29:355-363.'
    ],
  },
];

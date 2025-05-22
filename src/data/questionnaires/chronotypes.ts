
import { Questionnaire } from '../types';

export const chronotypesQuestionnaires: Questionnaire[] = [
  {
    id: 'meq',
    name: 'Questionário de Horne e Östberg (MEQ)',
    description: 'Avalia preferências individuais de horários para atividades e sono.',
    indication: 'Determinação de cronotipos (matutino, vespertino ou intermediário).',
    pdfUrl: '/questionarios/meq.pdf',
    category: 'cronotipos',
    onlineUrl: '/questionarios/meq-ho',
    references: ['Horne, J. A., & Östberg, O. (1976). A self-assessment questionnaire to determine morningness-eveningness in human circadian rhythms. International Journal of Chronobiology, 4, 97-110.'],
  },
  {
    id: 'meq-ho',
    name: 'Questionário de Horne e Oestberg original (1976)',
    description: 'Versão original do questionário que avalia o cronotipo dos indivíduos.',
    indication: 'Classificação do cronotipo em definitivamente matutino, moderadamente matutino, intermediário, moderadamente vespertino ou definitivamente vespertino.',
    pdfUrl: '/questionarios/meq-ho.pdf',
    category: 'cronotipos',
    onlineUrl: '/questionarios/meq-ho',
    references: ['Horne JA, Östberg O. A self-assessment questionnaire to determine morningness-eveningness in human circadian rhythms. Int J Chronobiol. 1976;4(2):97–110.'],
  },
  {
    id: 'mctq',
    name: 'Munich Chronotype Questionnaire (MCTQ)',
    description: 'Avalia horários de sono em dias de trabalho e dias livres.',
    indication: 'Avaliação de cronotipo baseada em comportamento real de sono.',
    pdfUrl: '/questionarios/mctq.pdf',
    category: 'cronotipos',
    references: ['Roenneberg, T., Wirz-Justice, A., & Merrow, M. (2003). Life between clocks: daily temporal patterns of human chronotypes. Journal of Biological Rhythms, 18(1), 80-90.'],
  },
];

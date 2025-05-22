
import { Questionnaire } from '../types';

export const movementQuestionnaires: Questionnaire[] = [
  {
    id: 'rls',
    name: 'Questionário para Diagnóstico de Síndrome das Pernas Inquietas',
    description: 'Instrumento para diagnóstico da síndrome das pernas inquietas.',
    indication: 'Diagnóstico de síndrome das pernas inquietas em adultos.',
    pdfUrl: '/questionarios/rls.pdf',
    category: 'movimentos',
    references: ['Allen, R. P., Picchietti, D., Hening, W. A., Trenkwalder, C., Walters, A. S., & Montplaisir, J. (2003). Restless legs syndrome: diagnostic criteria, special considerations, and epidemiology. Sleep Medicine, 4(2), 101-119.'],
  },
  {
    id: 'rbdsq',
    name: 'Questionário de Triagem para Distúrbio Comportamental do Sono REM (RBDSQ)',
    description: 'Avalia comportamentos anormais e potencialmente violentos durante o sono REM.',
    indication: 'Triagem para distúrbio comportamental do sono REM (RBD) em adultos.',
    pdfUrl: '/questionarios/rbdsq.pdf',
    onlineUrl: '/questionarios/rbdsq',
    category: 'movimentos',
    references: [
      'Stiasny-Kolster K, Mayer G, Schäfer S, Möller JC, Heinzel-Gutenbrunner M, Oertel WH. The REM sleep behavior disorder screening questionnaire--a new diagnostic instrument. Mov Disord. 2007 Dec;22(16):2386-93.',
      'Silva DF, Bezerra AG, Zeitzer JM, et al. Tradução e adaptação transcultural do REM Sleep Behavior Disorder Screening Questionnaire (RBDSQ) para o português. Arq Neuropsiquiatr. 2016;74(2):123–128. DOI: 10.1590/0004-282X20150208'
    ],
  },
];

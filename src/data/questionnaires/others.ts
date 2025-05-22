
import { Questionnaire } from '../types';

export const othersQuestionnaires: Questionnaire[] = [
  {
    id: 'ham-a',
    name: 'Escala de Avaliação de Ansiedade de Hamilton (HAM-A)',
    description: 'Instrumento para avaliação e quantificação de sintomas de ansiedade.',
    indication: 'Avaliação de ansiedade em contexto clínico.',
    pdfUrl: '/questionarios/ham-a.pdf',
    onlineUrl: '/questionarios/ham-a',
    category: 'outros',
    references: [
      'Brendan T. Carroll, Roger G. Kathol, Russell Noyes, Tina G. Wald, Gerald H. Clamon, Screening for depression and anxiety in cancer patients using the Hospital Anxiety and Depression Scale, General Hospital Psychiatry, Volume 15, Issue 2, 1993, Pages 69-74, ISSN 0163-8343, https://doi.org/10.1016/0163-8343(93)90099-A.',
      'Nota: Não há validação oficial para a língua portuguesa. A tradução utilizada é uma tradução livre.'
    ],
  },
];


import { Questionnaire } from '../types';

export const qualityOfLifeQuestionnaires: Questionnaire[] = [
  {
    id: 'fosq-36',
    name: 'FOSQ-36 (Functional Outcomes of Sleep Questionnaire) – Versão em Português',
    description: 'Questionário de resultados funcionais relacionados ao sono. As palavras "com sono" ou "cansado" significam a sensação de não conseguir manter os olhos abertos, "batendo cabeça" ou vontade de cochilar, não se referindo a fadiga pós-exercício.',
    indication: 'Avaliação da qualidade de vida relacionada ao sono.',
    pdfUrl: '/questionarios/fosq-36.pdf',
    onlineUrl: '/questionarios/fosq-36',
    category: 'qualidade-vida',
    references: ['Weaver TE, Laizner AM, Evans LK, et al. An instrument to measure functional status outcomes for disorders of excessive sleepiness. Sleep. 1997;20(10):835-43.'],
  },
];


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
  {
    id: 'fosq-10',
    name: 'FOSQ-10 (Functional Outcomes of Sleep Questionnaire) – Versão em Português',
    description: 'Versão reduzida do questionário de resultados funcionais relacionados ao sono. Avalia dificuldades em realizar atividades do dia-a-dia quando cansado ou com sono.',
    indication: 'Avaliação da qualidade de vida relacionada ao sono - versão breve.',
    pdfUrl: '/questionarios/fosq-10.pdf',
    onlineUrl: '/questionarios/fosq-10',
    category: 'qualidade-vida',
    references: [
      'Chasens ER, Ratcliffe SJ, Weaver TE. Development of the FOSQ-10: a short version of the functional outcomes of sleep questionnaire. Sleep. 2009;32(7):915–919.',
      'Moreira APSM et al. Psychometric evaluation of the Brazilian‑Portuguese version of the Functional Outcome of Sleep Questionnaire 10 (FOSQ‑10) in patients with obstructive apnea. Braz J Otorhinolaryngol. 2024 Sep–Oct;90(5):101452.'
    ],
  },
];

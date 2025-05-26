
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
  {
    id: 'ham-a',
    name: 'Escala de Avaliação de Ansiedade de Hamilton (HAM-A)',
    description: 'Avalia a gravidade dos sintomas de ansiedade através de 14 itens que abrangem sintomas psíquicos e somáticos.',
    indication: 'Avaliação clínica da gravidade dos sintomas de ansiedade.',
    pdfUrl: '/questionarios/ham-a.pdf',
    category: 'ansiedade',
    onlineUrl: '/questionarios/ham-a',
    references: [
      'Brendan T. Carroll, Roger G. Kathol, Russell Noyes, Tina G. Wald, Gerald H. Clamon, Screening for depression and anxiety in cancer patients using the Hospital Anxiety and Depression Scale, General Hospital Psychiatry, Volume 15, Issue 2, 1993, Pages 69-74.'
    ],
  },
  {
    id: 'beck-depression',
    name: 'Inventário de Depressão de Beck (BDI)',
    description: 'Instrumento para avaliação da gravidade dos sintomas depressivos através de 21 itens que abrangem aspectos cognitivos, afetivos, comportamentais e somáticos da depressão.',
    indication: 'Avaliação da gravidade dos sintomas depressivos em contextos clínicos e de pesquisa.',
    pdfUrl: '/questionarios/beck-depression.pdf',
    category: 'ansiedade',
    onlineUrl: '/questionarios/beck-depression',
    references: [
      'Beck AT, Ward CH, Mendelson M, Mock J, Erbaugh J. An inventory for measuring depression. Archives of General Psychiatry. 1961;4:561–571.',
      'Cunha JA. Manual da versão em português das Escalas Beck. São Paulo: Casa do Psicólogo; 2001.',
      'Gorenstein C, Andrade L. Validation of a Portuguese version of the Beck Depression Inventory and the State-Trait Anxiety Inventory in Brazilian subjects. Brazilian Journal of Medical and Biological Research. 1996;29(4):453–457.'
    ],
  },
];

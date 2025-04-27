export type Questionnaire = {
  id: string;
  name: string;
  description: string;
  indication: string;
  pdfUrl: string;
  onlineUrl?: string;
  references?: string[];
  category: CategoryId;
};

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
};

export type CategoryId = 'insonia' | 'apneia' | 'sonolencia' | 'cronotipos' | 'movimentos' | 'outros';

export const categories: Category[] = [
  {
    id: 'insonia',
    name: 'Insônia',
    description: 'Questionários relacionados ao diagnóstico e avaliação de insônia.',
    icon: 'bed',
  },
  {
    id: 'apneia',
    name: 'Apneia do Sono',
    description: 'Instrumentos para triagem e avaliação de apneia obstrutiva do sono.',
    icon: 'lungs',
  },
  {
    id: 'sonolencia',
    name: 'Avaliação de Sonolência Diurna e Fadiga',
    description: 'Escalas para avaliação de sonolência diurna e fadiga.',
    icon: 'moon',
  },
  {
    id: 'cronotipos',
    name: 'Distúrbios de Ritmo Circadiano',
    description: 'Questionários para avaliação de cronotipos e ritmo circadiano.',
    icon: 'clock',
  },
  {
    id: 'movimentos',
    name: 'Síndromes de Movimentos',
    description: 'Instrumentos para avaliação de síndrome das pernas inquietas e outros distúrbios de movimento.',
    icon: 'book',
  },
  {
    id: 'outros',
    name: 'Outros',
    description: 'Questionários diversos relacionados à medicina do sono.',
    icon: 'file-text',
  },
];

export const questionnaires: Questionnaire[] = [
  {
    id: 'isi',
    name: 'Índice de Gravidade da Insônia (ISI)',
    description: 'Avalia a natureza, gravidade e impacto da insônia.',
    indication: 'Avaliação da gravidade da insônia em adultos.',
    pdfUrl: '/questionarios/isi.pdf',
    category: 'insonia',
    references: [
      'Bastien, C. H., Vallières, A., & Morin, C. M. (2001). Validation of the Insomnia Severity Index as an outcome measure for insomnia research. Sleep Medicine, 2(4), 297-307.',
      'CASTRO, Laura de Siqueira. Adaptação e Validação do Índice de Gravidade de Insônia (IGI): Caracterização Populacional, Valores Normativos e Aspectos Associados. 2011. 104 f. Dissertação (Mestrado) - Escola Paulista de Medicina, Universidade Federal de São Paulo. São Paulo, 2011. URL: http://repositorio.unifesp.br/handle/11600/23193'
    ],
  },
  {
    id: 'berlin',
    name: 'Questionário de Berlim',
    description: 'Identifica pacientes com alto risco para síndrome da apneia do sono.',
    indication: 'Triagem para apneia do sono em população geral.',
    pdfUrl: '/questionarios/berlin.pdf',
    category: 'apneia',
    references: ['Netzer, N. C., Stoohs, R. A., Netzer, C. M., Clark, K., & Strohl, K. P. (1999). Using the Berlin Questionnaire to identify patients at risk for the sleep apnea syndrome. Annals of Internal Medicine, 131(7), 485-491.'],
  },
  {
    id: 'stop-bang',
    name: 'STOP-BANG',
    description: 'Ferramenta de triagem para apneia obstrutiva do sono.',
    indication: 'Identificação de pacientes com risco de apneia obstrutiva do sono.',
    pdfUrl: '/questionarios/stop-bang.pdf',
    category: 'apneia',
    references: [
      'Fonseca LBM, Silveira EA, Lima NM, Rabahi MF. Tradução e adaptação transcultural do questionário STOP-Bang para a língua portuguesa falada no Brasil. J Bras Pneumol. 2016;42(4):266–272. doi:10.1590/S1806-37562015000000243'
    ],
  },
  {
    id: 'epworth',
    name: 'Escala de Sonolência de Epworth (ESE)',
    description: 'Avalia a tendência à sonolência diurna em diferentes situações.',
    indication: 'Avaliação de sonolência em adultos.',
    pdfUrl: '/questionarios/epworth.pdf',
    onlineUrl: '/questionarios/online/epworth',
    category: 'sonolencia',
    references: ['Johns, M. W. (1991). A new method for measuring daytime sleepiness: the Epworth sleepiness scale. Sleep, 14(6), 540-545.'],
  },
  {
    id: 'fas',
    name: 'Escala de Avaliação de Fadiga (FAS)',
    description: 'Avalia diferentes aspectos da fadiga física e mental.',
    indication: 'Avaliação do impacto da fadiga nas atividades diárias.',
    pdfUrl: '/questionarios/fas.pdf',
    onlineUrl: '/questionarios/fas',
    category: 'sonolencia',
    references: ['Krupp LB, LaRocca NG, Muir-Nash J, Steinberg AD. The fatigue severity scale. Application to patients with multiple sclerosis and systemic lupus erythematosus. Arch Neurol. 1989 Oct;46(10):1121-3.'],
  },
  {
    id: 'stanford',
    name: 'Stanford Sleepiness Scale',
    description: 'Escala para avaliação momentânea do estado de sonolência.',
    indication: 'Medição do nível de sonolência ao longo do dia.',
    pdfUrl: '/questionarios/stanford.pdf',
    category: 'sonolencia',
    references: ['Hoddes, E., Zarcone, V., Smythe, H., Phillips, R., & Dement, W. C. (1973). Quantification of sleepiness: a new approach. Psychophysiology, 10(4), 431-436.'],
  },
  {
    id: 'meq',
    name: 'Questionário de Horne e Östberg (MEQ)',
    description: 'Avalia preferências individuais de horários para atividades e sono.',
    indication: 'Determinação de cronotipos (matutino, vespertino ou intermediário).',
    pdfUrl: '/questionarios/meq.pdf',
    category: 'cronotipos',
    references: ['Horne, J. A., & Östberg, O. (1976). A self-assessment questionnaire to determine morningness-eveningness in human circadian rhythms. International Journal of Chronobiology, 4, 97-110.'],
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
    id: 'psqi',
    name: 'Questionário de Avaliação de Qualidade de Sono de Pittsburgh (PSQI)',
    description: 'Avalia a qualidade e distúrbios do sono durante o mês anterior.',
    indication: 'Avaliação da qualidade do sono em população adulta.',
    pdfUrl: '/questionarios/psqi.pdf',
    category: 'outros',
    references: ['Buysse, D. J., Reynolds, C. F., Monk, T. H., Berman, S. R., & Kupfer, D. J. (1989). The Pittsburgh Sleep Quality Index: a new instrument for psychiatric practice and research. Psychiatry Research, 28(2), 193-213.'],
  },
  {
    id: 'fss',
    name: 'Escala de Fadiga (Fatigue Severity Score)',
    description: 'Avalia o impacto da fadiga na vida diária.',
    indication: 'Avaliação da intensidade da fadiga em diferentes condições.',
    pdfUrl: '/questionarios/fss.pdf',
    category: 'outros',
    references: ['Krupp, L. B., LaRocca, N. G., Muir-Nash, J., & Steinberg, A. D. (1989). The fatigue severity scale: application to patients with multiple sclerosis and systemic lupus erythematosus. Archives of Neurology, 46(10), 1121-1123.'],
  },
  {
    id: 'beck',
    name: 'Escala de Beck para Depressão e Ansiedade',
    description: 'Escalas para avaliação de sintomas depressivos e ansiosos.',
    indication: 'Rastreio de comorbidades psiquiátricas em pacientes com distúrbios do sono.',
    pdfUrl: '/questionarios/beck.pdf',
    category: 'outros',
    references: ['Beck, A. T., Ward, C. H., Mendelson, M., Mock, J., & Erbaugh, J. (1961). An inventory for measuring depression. Archives of General Psychiatry, 4, 561-571.'],
  },
];

export const getCategoryQuestionnaires = (categoryId: CategoryId): Questionnaire[] => {
  return questionnaires.filter(q => q.category === categoryId);
};

export const searchQuestionnaires = (query: string): Questionnaire[] => {
  const lowercaseQuery = query.toLowerCase();
  return questionnaires.filter(q => 
    q.name.toLowerCase().includes(lowercaseQuery) || 
    q.description.toLowerCase().includes(lowercaseQuery)
  );
};

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
    onlineUrl: '/questionarios/isi',
    references: [
      'CASTRO, Laura de Siqueira. Adaptação e Validação do Índice de Gravidade de Insônia (IGI): Caracterização Populacional, Valores Normativos e Aspectos Associados. 2011. 104 f. Dissertação (Mestrado) - Escola Paulista de Medicina, Universidade Federal de São Paulo. São Paulo, 2011. URL: http://repositorio.unifesp.br/handle/11600/23193',
      'Morin, C. M. (1993). Insomnia Severity Index (ISI) [Database record]. APA PsycTests. https://doi.org/10.1037/t07115-000',
      'Morin CM, Belleville G, Bélanger L, Ivers H. The Insomnia Severity Index: psychometric indicators to detect insomnia cases and evaluate treatment response. Sleep. 2011 May;34(5):601–608.',
      'Bastien CH, Vallières A, Morin CM. Validation of the Insomnia Severity Index as an outcome measure for insomnia research. Sleep Med. 2001;2(4):297–307. doi:10.1016/S1389-9457(00)00065-4'
    ],
  },
  {
    id: 'berlin',
    name: 'Questionário de Berlim',
    description: 'Identifica pacientes com alto risco para síndrome da apneia do sono.',
    indication: 'Triagem para apneia do sono em população geral.',
    pdfUrl: '/questionarios/berlin.pdf',
    category: 'apneia',
    onlineUrl: '/questionarios/berlin',
    references: [
      'Netzer NC, Stoohs RA, Netzer CM, Clark K, Strohl KP. Using the Berlin Questonnaire to identfy patents at risk for the sleep apnea syndrome. Ann Intern Med. 1999 Oct 5;131(7):485-91.',
      'Vaz AP, Drummond M, Mota PC, et al. Tradução do Questionário de Berlim para língua Portuguesa e sua aplicação na identifcação da SAOS numa consulta de patologia respiratória do sono. Rev Port Pneumol. 2011;17(2):59-65.',
      'ANDRECHUK, Carla Renata Silva. Adaptação cultural e validação do "Berlin Questionnaire" para o contexto brasileiro. 2018. Tese (doutorado) - Universidade Estadual de Campinas, Faculdade de Enfermagem, Campinas, SP. Disponível em: https://hdl.handle.net/20.500.12733/1637880.'
    ],
  },
  {
    id: 'stop-bang',
    name: 'STOP-BANG',
    description: 'Ferramenta de triagem para apneia obstrutiva do sono.',
    indication: 'Identificação de pacientes com risco de apneia obstrutiva do sono.',
    pdfUrl: '/questionarios/stop-bang.pdf',
    category: 'apneia',
    onlineUrl: '/questionarios/stop-bang',
    references: [
      'Fonseca LBM, Silveira EA, Lima NM, Rabahi MF. Tradução e adaptação transcultural do questionário STOP-Bang para a língua portuguesa falada no Brasil. J Bras Pneumol. 2016;42(4):266–272. doi:10.1590/S1806-37562015000000243',
      'Chung F, Yegneswaran B, Liao P, et al. STOP questionnaire: a tool to screen patients for obstructive sleep apnea. Anesthesiology. 2008;108(5):812-821',
      'Chung F, Subramanyam R, Liao P, Sasaki E, Shapiro C, Sun Y. High STOP-Bang score indicates a high probability of obstructive sleep apnoea. Br J Anaesth. 2012 May;108(5):768-75.'
    ],
  },
  {
    id: 'sacs',
    name: 'Escore Clínico da Apneia do Sono (SACS-BR)',
    description: 'Instrumento validado para triagem da síndrome de apneia obstrutiva do sono.',
    indication: 'Triagem de apneia do sono em adultos brasileiros.',
    pdfUrl: '/questionarios/sacs.pdf',
    onlineUrl: '/questionarios/sacs',
    category: 'apneia',
    references: [
      'Lapas, V. S. C., Faria, A. C., Rufino, R. L., & Costa, C. H. (2020). Tradução e adaptação cultural do questionário Sleep Apnea Clinical Score para uso no Brasil. Jornal Brasileiro de Pneumologia, 46(3), 223-231.'
    ],
  },
  {
    id: 'epworth',
    name: 'Escala de Sonolência de Epworth (ESE)',
    description: 'Avalia a tendência à sonolência diurna em diferentes situações.',
    indication: 'Avaliação de sonolência em adultos.',
    pdfUrl: '/questionarios/epworth.pdf',
    onlineUrl: '/questionarios/epworth',
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
    id: 'fss',
    name: 'Escala de Gravidade de Fadiga (FSS)',
    description: 'Avalia o impacto da fadiga no funcionamento físico, social e ocupacional.',
    indication: 'Avaliação da fadiga em condições neurológicas e outros distúrbios.',
    pdfUrl: '/questionarios/fss.pdf',
    onlineUrl: '/questionarios/fss',
    category: 'sonolencia',
    references: ['Krupp LB, LaRocca NG, Muir-Nash J, Steinberg AD. The fatigue severity scale. Application to patients with multiple sclerosis and systemic lupus erythematosus. Arch Neurol. 1989 Oct;46(10):1121-3. doi: 10.1001/archneur.1989.00520460115022. PMID: 2803071.'],
  },
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
    name: 'Índice de Qualidade de Sono de Pittsburgh (PSQI-BR)',
    description: 'Avalia a qualidade do sono no último mês, considerando aspectos subjetivos e objetivos.',
    indication: 'Avaliação da qualidade do sono em adultos.',
    pdfUrl: '/questionarios/psqi.pdf',
    onlineUrl: '/questionarios/psqi',
    category: 'outros',
    references: [
      'Buysse DJ et al. The Pittsburgh Sleep Quality Index: a new instrument for psychiatric practice and research. Psychiatry Res. 1989;28(2):193-213.',
      'Bertolazi AN et al. Validation of the Brazilian Portuguese version of the Pittsburgh Sleep Quality Index. Sleep Med. 2010;11(9):907-913.'
    ],
  },
  {
    id: 'goal',
    name: 'Questionário GOAL',
    description: 'Instrumento de 4 itens para triagem de apneia obstrutiva do sono.',
    indication: 'Rastreamento de apneia obstrutiva do sono em população adulta.',
    pdfUrl: '/questionarios/goal.pdf',
    onlineUrl: '/questionarios/goal',
    category: 'apneia',
    references: ['Duarte RLM, Magalhães-da-Silveira FJ, Oliveira-e-Sá TS, Silva JA, Mello FCQ, Gozal D. Obstructive sleep apnea screening with a 4-item instrument, named GOAL questionnaire: development, validation and comparative study with No-Apnea, STOP-Bang, and NoSAS. Nature and Science of Sleep. 2020;12:57–67. doi: 10.2147/NSS.S238255'],
  },
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
  {
    id: 'nosas',
    name: 'Escore NoSAS',
    description: 'Ferramenta de triagem para distúrbios respiratórios do sono.',
    indication: 'Identificação de pacientes com alta probabilidade de distúrbios respiratórios do sono.',
    pdfUrl: '/questionarios/nosas.pdf',
    category: 'apneia',
    onlineUrl: '/questionarios/nosas',
    references: [
      'Marti-Soler H, Hirotsu C, Marques-Vidal P, Vollenweider P, Waeber G, Preisig M, Tafti M, Tufik SB, Bittencourt L, Tufik S, Haba-Rubio J, Heinzer R. The NoSAS score for screening of sleep-disordered breathing: a derivation and validation study. Lancet Respir Med. 2016 Sep;4(9):742-748. doi: 10.1016/S2213-2600(16)30075-3. Epub 2016 Jun 16. PMID: 27321086.'
    ],
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

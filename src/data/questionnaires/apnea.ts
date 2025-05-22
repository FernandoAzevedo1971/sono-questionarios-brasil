
import { Questionnaire } from '../types';

export const apneaQuestionnaires: Questionnaire[] = [
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

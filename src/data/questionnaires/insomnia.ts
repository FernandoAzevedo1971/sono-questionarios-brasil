
import { Questionnaire } from '../types';

export const insomniaQuestionnaires: Questionnaire[] = [
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
    id: 'psqi',
    name: 'Índice de Qualidade de Sono de Pittsburgh (PSQI-BR)',
    description: 'Avalia a qualidade do sono no último mês, considerando aspectos subjetivos e objetivos.',
    indication: 'Avaliação da qualidade do sono em adultos.',
    pdfUrl: '/questionarios/psqi.pdf',
    onlineUrl: '/questionarios/psqi-intro',
    category: 'insonia',
    references: [
      'Buysse DJ et al. The Pittsburgh Sleep Quality Index: a new instrument for psychiatric practice and research. Psychiatry Res. 1989;28(2):193-213.',
      'Bertolazi AN et al. Validation of the Brazilian Portuguese version of the Pittsburgh Sleep Quality Index. Sleep Med. 2010;11(9):907-913.'
    ],
  },
];

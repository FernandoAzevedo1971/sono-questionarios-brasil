
import { Questionnaire } from '../types';

export const sleepinessQuestionnaires: Questionnaire[] = [
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
    id: 'promis-fatigue',
    name: 'PROMIS Fatigue v1.0 Short Form 8a',
    description: 'Avalia fadiga auto-relatada e seu impacto nas atividades físicas, mentais e sociais.',
    indication: 'Avaliação de fadiga com base nas experiências da última semana.',
    pdfUrl: '/questionarios/promis-fatigue.pdf',
    onlineUrl: '/questionarios/promis-fatigue',
    category: 'sonolencia',
    references: [
      'Lai, J.S., Cella, D., Choi, S.W., Junghaenel, D.U., Christodoulou, C., Gershon, R., & Stone, A. (2011). How Item Banks and Their Application Can Influence Measurement Practice in Rehabilitation Medicine: A PROMIS Fatigue Item Bank Example. Archives of Physical Medicine and Rehabilitation, 92(10 Supplement), S20-S27.',
      'Manual disponível em: https://www.healthmeasures.net/images/PROMIS/manuals/Scoring_Manual_Only/PROMIS_Fatigue_User_Manual_and_Scoring_Instructions_05Dec2023.pdf',
      'Questionário disponível em: www.HealthMeasures.net'
    ],
  },
];

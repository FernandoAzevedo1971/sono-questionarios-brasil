
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
];

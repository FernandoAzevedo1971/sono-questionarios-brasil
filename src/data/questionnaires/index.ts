
import { Questionnaire } from '../types';
import { insomniaQuestionnaires } from './insomnia';
import { apneaQuestionnaires } from './apnea';
import { sleepinessQuestionnaires } from './sleepiness';
import { chronotypesQuestionnaires } from './chronotypes';
import { movementQuestionnaires } from './movement';
import { anxietyQuestionnaires } from './anxiety';
import { qualityOfLifeQuestionnaires } from './quality-of-life';
import { othersQuestionnaires } from './others';

// Combine all questionnaires into a single array
export const questionnaires: Questionnaire[] = [
  ...insomniaQuestionnaires,
  ...apneaQuestionnaires,
  ...sleepinessQuestionnaires,
  ...chronotypesQuestionnaires,
  ...movementQuestionnaires,
  ...anxietyQuestionnaires,
  ...qualityOfLifeQuestionnaires,
  ...othersQuestionnaires
];

// Export each category array individually for direct access when needed
export {
  insomniaQuestionnaires,
  apneaQuestionnaires,
  sleepinessQuestionnaires,
  chronotypesQuestionnaires,
  movementQuestionnaires,
  anxietyQuestionnaires,
  qualityOfLifeQuestionnaires,
  othersQuestionnaires
};

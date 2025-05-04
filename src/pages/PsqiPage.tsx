
import { useState, useEffect } from "react";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import QuestionItem from "@/components/questionnaire/QuestionItem";
import { Button } from "@/components/ui/button";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type TimeInputProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
};

const TimeInput = ({ value, onChange, label, id }: TimeInputProps) => {
  return (
    <div className="flex flex-col space-y-2 text-left">
      <label htmlFor={id} className="font-medium text-sm text-neutral-700">{label}</label>
      <Input
        id={id}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-32"
      />
    </div>
  );
};

type NumberInputProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  id: string;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
};

const NumberInput = ({ value, onChange, label, id, min, max, step = 1, suffix }: NumberInputProps) => {
  return (
    <div className="flex flex-col space-y-2 text-left">
      <label htmlFor={id} className="font-medium text-sm text-neutral-700">{label}</label>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-20"
        />
        {suffix && <span className="text-sm text-neutral-600">{suffix}</span>}
      </div>
    </div>
  );
};

const frequencyOptions = [
  "Nenhuma no último mês",
  "Menos de 1 vez/semana",
  "1 ou 2 vezes/semana",
  "3 ou mais vezes/semana"
];

const sleepQualityOptions = [
  "Muito boa",
  "Boa",
  "Ruim",
  "Muito ruim"
];

const problemLevelOptions = [
  "Nenhuma dificuldade",
  "Um problema leve",
  "Um problema razoável",
  "Um grande problema"
];

const partnerOptions = [
  "Não",
  "Parceiro/colega em outro quarto",
  "Parceiro no mesmo quarto, mas não na mesma cama",
  "Parceiro na mesma cama"
];

type SleepDisturbanceType = {
  id: string;
  text: string;
  value: string;
  hasDescription?: boolean;
  description?: string;
};

// Initial disturbance questions (question 5)
const sleepDisturbances: SleepDisturbanceType[] = [
  { id: "trouble_sleep_30m", text: "a) Não conseguir adormecer em até 30 minutos", value: "" },
  { id: "wake_up", text: "b) Acordar no meio da noite ou de manhã cedo", value: "" },
  { id: "bathroom", text: "c) Precisar levantar para ir ao banheiro", value: "" },
  { id: "breathing", text: "d) Não conseguir respirar confortavelmente", value: "" },
  { id: "cough_snore", text: "e) Tossir ou roncar forte", value: "" },
  { id: "cold", text: "f) Sentir muito frio", value: "" },
  { id: "hot", text: "g) Sentir muito calor", value: "" },
  { id: "bad_dreams", text: "h) Ter sonhos ruins", value: "" },
  { id: "pain", text: "i) Ter dor", value: "" },
  { id: "other_reason", text: "j) Outra razão", value: "", hasDescription: true, description: "" }
];

// Partner-related questions (question 10)
const partnerDisturbances: SleepDisturbanceType[] = [
  { id: "loud_snoring", text: "a) Ronco forte", value: "" },
  { id: "breathing_pauses", text: "b) Longas paradas na respiração", value: "" },
  { id: "leg_twitching", text: "c) Contrações ou puxões nas pernas", value: "" },
  { id: "disorientation", text: "d) Episódios de desorientação ou confusão", value: "" },
  { id: "other_issues", text: "e) Outras alterações", value: "", hasDescription: true, description: "" }
];

const PsqiPage = () => {
  const [bedTime, setBedTime] = useState("23:00");
  const [fallAsleepTime, setFallAsleepTime] = useState("15");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [sleepHours, setSleepHours] = useState("7");
  const [disturbances, setDisturbances] = useState<SleepDisturbanceType[]>(sleepDisturbances);
  const [sleepQuality, setSleepQuality] = useState("");
  const [medication, setMedication] = useState("");
  const [stayingAwake, setStayingAwake] = useState("");
  const [enthusiasm, setEnthusiasm] = useState("");
  const [hasPartner, setHasPartner] = useState("");
  const [partnerIssues, setPartnerIssues] = useState<SleepDisturbanceType[]>(partnerDisturbances);
  const [score, setScore] = useState<number | null>(null);
  const [scoreComponents, setScoreComponents] = useState<number[]>([]);
  
  const updateDisturbance = (index: number, value: string) => {
    setDisturbances(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value };
      return updated;
    });
  };
  
  const updateDisturbanceDescription = (index: number, description: string) => {
    setDisturbances(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], description };
      return updated;
    });
  };
  
  const updatePartnerIssue = (index: number, value: string) => {
    setPartnerIssues(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value };
      return updated;
    });
  };
  
  const updatePartnerIssueDescription = (index: number, description: string) => {
    setPartnerIssues(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], description };
      return updated;
    });
  };
  
  // Calculate sleep efficiency (hours of sleep / hours in bed)
  const calculateSleepEfficiency = (): number => {
    try {
      // Parse bed time and wake time
      const [bedHour, bedMinute] = bedTime.split(":").map(Number);
      const [wakeHour, wakeMinute] = wakeTime.split(":").map(Number);
      
      // Calculate time in bed in minutes
      let timeInBedMinutes = ((wakeHour * 60 + wakeMinute) - (bedHour * 60 + bedMinute));
      if (timeInBedMinutes < 0) timeInBedMinutes += 24 * 60; // Adjust if wake time is next day
      
      // Convert sleep hours to minutes
      const sleepTimeMinutes = parseFloat(sleepHours) * 60;
      
      // Calculate efficiency
      return (sleepTimeMinutes / timeInBedMinutes) * 100;
    } catch (error) {
      console.error("Error calculating sleep efficiency:", error);
      return 0;
    }
  };

  const getValueFrequencyScore = (value: string): number => {
    switch (value) {
      case "Nenhuma no último mês": return 0;
      case "Menos de 1 vez/semana": return 1;
      case "1 ou 2 vezes/semana": return 2;
      case "3 ou mais vezes/semana": return 3;
      default: return 0;
    }
  };

  const getSleepDurationScore = (hours: number): number => {
    if (hours >= 7) return 0;
    if (hours >= 6) return 1;
    if (hours >= 5) return 2;
    return 3;
  };

  const getSleepEfficiencyScore = (efficiency: number): number => {
    if (efficiency >= 85) return 0;
    if (efficiency >= 75) return 1;
    if (efficiency >= 65) return 2;
    return 3;
  };

  const getEnthusiasmScore = (value: string): number => {
    switch (value) {
      case "Nenhuma dificuldade": return 0;
      case "Um problema leve": return 1;
      case "Um problema razoável": return 2;
      case "Um grande problema": return 3;
      default: return 0;
    }
  };

  const getSleepQualityScore = (value: string): number => {
    switch (value) {
      case "Muito boa": return 0;
      case "Boa": return 1;
      case "Ruim": return 2;
      case "Muito ruim": return 3;
      default: return 0;
    }
  };

  const mapRangeToScore = (value: number, ranges: number[][]): number => {
    for (let i = 0; i < ranges.length; i++) {
      const [min, max] = ranges[i];
      if (value >= min && value <= max) return i;
    }
    return 0;
  };

  const calculateScore = () => {
    // Component 1: Subjective sleep quality
    const c1 = getSleepQualityScore(sleepQuality);
    
    // Component 2: Sleep latency
    let fallAsleepScore = 0;
    const fallAsleepMinutes = parseInt(fallAsleepTime, 10);
    if (fallAsleepMinutes <= 15) fallAsleepScore = 0;
    else if (fallAsleepMinutes <= 30) fallAsleepScore = 1;
    else if (fallAsleepMinutes <= 60) fallAsleepScore = 2;
    else fallAsleepScore = 3;
    
    const troubleSleepScore = getValueFrequencyScore(disturbances[0].value);
    const c2 = mapRangeToScore(fallAsleepScore + troubleSleepScore, [[0, 0], [1, 2], [3, 4], [5, 6]]);
    
    // Component 3: Sleep duration
    const c3 = getSleepDurationScore(parseFloat(sleepHours));
    
    // Component 4: Sleep efficiency
    const sleepEfficiency = calculateSleepEfficiency();
    const c4 = getSleepEfficiencyScore(sleepEfficiency);
    
    // Component 5: Sleep disturbances
    let disturbanceSum = 0;
    for (let i = 1; i < disturbances.length; i++) { // Start from index 1 (skip the first item used in C2)
      disturbanceSum += getValueFrequencyScore(disturbances[i].value);
    }
    const c5 = mapRangeToScore(disturbanceSum, [[0, 0], [1, 9], [10, 18], [19, 27]]);
    
    // Component 6: Use of sleep medication
    const c6 = getValueFrequencyScore(medication);
    
    // Component 7: Daytime dysfunction
    const stayingAwakeScore = getValueFrequencyScore(stayingAwake);
    const enthusiasmScore = getEnthusiasmScore(enthusiasm);
    const c7 = mapRangeToScore(stayingAwakeScore + enthusiasmScore, [[0, 0], [1, 2], [3, 4], [5, 6]]);
    
    const components = [c1, c2, c3, c4, c5, c6, c7];
    const totalScore = components.reduce((sum, score) => sum + score, 0);
    
    setScoreComponents(components);
    setScore(totalScore);
  };

  const getScoreSeverity = (score: number) => {
    if (score <= 5) return { text: "Boa qualidade de sono", severity: "success" as const };
    if (score <= 10) return { text: "Qualidade de sono média, com dificuldades moderadas", severity: "warning" as const };
    return { text: "Má qualidade de sono, sugerindo atenção médica", severity: "danger" as const };
  };
  
  // Count answered questions for progress calculation
  const countAnsweredQuestions = (): number => {
    let count = 0;
    
    if (bedTime !== "23:00") count++; // Question 1
    if (fallAsleepTime !== "15") count++; // Question 2
    if (wakeTime !== "07:00") count++; // Question 3
    if (sleepHours !== "7") count++; // Question 4
    
    // Count answered disturbances (Question 5)
    disturbances.forEach(item => {
      if (item.value) count++;
      if (item.hasDescription && item.description) count += 0.5; // Count description as half a question
    });
    
    if (sleepQuality) count++; // Question 6
    if (medication) count++; // Question 7
    if (stayingAwake) count++; // Question 8
    if (enthusiasm) count++; // Question 9
    if (hasPartner) count++; // Question 10
    
    // Count partner issues if applicable
    if (hasPartner && hasPartner !== "Não") {
      partnerIssues.forEach(item => {
        if (item.value) count++;
        if (item.hasDescription && item.description) count += 0.5;
      });
    }
    
    return count;
  };
  
  // Total number of questions (adjusts based on whether user has a partner)
  const getTotalQuestions = (): number => {
    const baseQuestions = 10 + disturbances.length;
    return hasPartner && hasPartner !== "Não" ? baseQuestions + partnerIssues.length : baseQuestions;
  };

  return (
    <QuestionnaireContainer
      title="Índice de Qualidade de Sono de Pittsburgh (PSQI-BR)"
      categoryPath="/categorias/outros"
      categoryName="Outros"
    >
      <QuestionnaireContent
        title="Índice de Qualidade de Sono de Pittsburgh (PSQI-BR)"
        description="As perguntas a seguir referem-se aos seus hábitos de sono durante o último mês. Responda com a lembrança mais exata da maioria dos dias e noites desse período."
      >
        <ProgressBar 
          current={countAnsweredQuestions()} 
          total={getTotalQuestions()} 
        />

        <div className="space-y-8 mb-6">
          {/* Time-based questions */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-neutral-900 text-left">Horários de Sono</h3>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <TimeInput 
                      id="bedTime"
                      label="1. Durante o último mês, quando você geralmente foi para a cama à noite?"
                      value={bedTime}
                      onChange={setBedTime}
                    />
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <NumberInput 
                      id="fallAsleepTime"
                      label="2. Durante o último mês, quanto tempo (em minutos) você geralmente levou para dormir à noite?"
                      value={fallAsleepTime}
                      onChange={setFallAsleepTime}
                      min={0}
                      suffix="minutos"
                    />
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <TimeInput 
                      id="wakeTime"
                      label="3. Durante o último mês, quando você geralmente levantou de manhã?"
                      value={wakeTime}
                      onChange={setWakeTime}
                    />
                  </div>
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <NumberInput 
                      id="sleepHours"
                      label="4. Durante o último mês, quantas horas de sono você teve por noite?"
                      value={sleepHours}
                      onChange={setSleepHours}
                      min={0}
                      max={24}
                      step={0.1}
                      suffix="horas"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep disturbance questions */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-lg font-medium text-neutral-900 text-left">5. Durante o último mês, com que frequência você teve dificuldade de dormir por causa de:</h3>
                
                {disturbances.map((item, index) => (
                  <div key={item.id} className="p-4 bg-neutral-50 rounded-lg">
                    <div className="font-medium text-neutral-900 mb-3 text-left">{item.text}</div>
                    <div className="space-y-4">
                      <div>
                        <QuestionItem
                          id={item.id}
                          title=""
                          options={frequencyOptions}
                          value={item.value}
                          onChange={(value) => updateDisturbance(index, value)}
                          variant="panel"
                          inline={true}
                        />
                      </div>
                      
                      {item.hasDescription && (
                        <div className="mt-2">
                          <label htmlFor={`${item.id}-desc`} className="block text-sm font-medium text-neutral-700 mb-1 text-left">
                            Descreva:
                          </label>
                          <Input
                            id={`${item.id}-desc`}
                            value={item.description || ""}
                            onChange={(e) => updateDisturbanceDescription(index, e.target.value)}
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
              
            {/* Sleep quality and medication */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <QuestionItem
                    id="sleepQuality"
                    title="6. Durante o último mês, como você classificaria a qualidade do seu sono de uma maneira geral?"
                    options={sleepQualityOptions}
                    value={sleepQuality}
                    onChange={setSleepQuality}
                    inline={true}
                  />
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <QuestionItem
                    id="medication"
                    title="7. Durante o último mês, com que frequência você tomou medicamento para dormir (prescrito ou por conta própria)?"
                    options={frequencyOptions}
                    value={medication}
                    onChange={setMedication}
                    inline={true}
                  />
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <QuestionItem
                    id="stayingAwake"
                    title="8. No último mês, com que frequência você teve dificuldade de ficar acordado enquanto dirigia, comia ou participava de atividade social?"
                    options={frequencyOptions}
                    value={stayingAwake}
                    onChange={setStayingAwake}
                    inline={true}
                  />
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <QuestionItem
                    id="enthusiasm"
                    title="9. Durante o último mês, quão problemático foi para você manter o entusiasmo para fazer suas atividades habituais?"
                    options={problemLevelOptions}
                    value={enthusiasm}
                    onChange={setEnthusiasm}
                    inline={true}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Partner questions */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <QuestionItem
                    id="hasPartner"
                    title="10. Você tem parceiro(a) ou colega de quarto?"
                    options={partnerOptions}
                    value={hasPartner}
                    onChange={setHasPartner}
                    inline={false}
                  />
                </div>
                
                {hasPartner && hasPartner !== "Não" && (
                  <div className="mt-4">
                    <h3 className="font-medium text-neutral-900 mb-4 text-left">
                      Se você tem parceiro ou colega de quarto, pergunte a ele(a) com que frequência, no último mês, você apresentou:
                    </h3>
                    
                    {partnerIssues.map((item, index) => (
                      <div key={item.id} className="p-4 bg-neutral-50 rounded-lg mb-4">
                        <div className="font-medium text-neutral-900 mb-3 text-left">{item.text}</div>
                        <div className="space-y-4">
                          <div>
                            <QuestionItem
                              id={item.id}
                              title=""
                              options={frequencyOptions}
                              value={item.value}
                              onChange={(value) => updatePartnerIssue(index, value)}
                              variant="panel"
                              inline={true}
                            />
                          </div>
                          
                          {item.hasDescription && (
                            <div className="mt-2">
                              <label htmlFor={`${item.id}-desc`} className="block text-sm font-medium text-neutral-700 mb-1 text-left">
                                Descreva:
                              </label>
                              <Input
                                id={`${item.id}-desc`}
                                value={item.description || ""}
                                onChange={(e) => updatePartnerIssueDescription(index, e.target.value)}
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Button
            className="w-full md:w-auto"
            onClick={calculateScore}
          >
            Calcular Escore
          </Button>

          {score !== null && (
            <ResultDisplay
              score={score}
              maxScore={21}
              interpretation={getScoreSeverity(score).text}
              severity={getScoreSeverity(score).severity}
              notes={[
                "0-5 pontos: qualidade de sono boa ou sem problemas significativos",
                "6-10 pontos: qualidade de sono média, com dificuldades moderadas",
                ">10 pontos: má qualidade de sono, sugerindo atenção médica"
              ]}
            >
              <div className="mt-4">
                <h4 className="font-medium text-left mb-2">Componentes do escore:</h4>
                <ul className="space-y-1 text-sm text-left">
                  <li>C1 - Qualidade subjetiva do sono: {scoreComponents[0]}</li>
                  <li>C2 - Latência do sono: {scoreComponents[1]}</li>
                  <li>C3 - Duração do sono: {scoreComponents[2]}</li>
                  <li>C4 - Eficiência habitual: {scoreComponents[3]}</li>
                  <li>C5 - Distúrbios do sono: {scoreComponents[4]}</li>
                  <li>C6 - Uso de medicação: {scoreComponents[5]}</li>
                  <li>C7 - Disfunção diurna: {scoreComponents[6]}</li>
                </ul>
              </div>
            </ResultDisplay>
          )}
        </div>
      </QuestionnaireContent>

      <QuestionnaireSidebar pdfUrl="/questionarios/psqi.pdf">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Sobre o questionário</h2>
        <p className="text-neutral-700 mb-4 text-left">
          O Índice de Qualidade de Sono de Pittsburgh (PSQI-BR) avalia a qualidade do sono no último mês, 
          abrangendo sete componentes: qualidade subjetiva, latência, duração, eficiência, distúrbios, 
          uso de medicação e funcionamento diurno.
        </p>
        <p className="text-neutral-700 mb-6 text-left">
          Gera um escore total de 0 a 21 pontos, onde valores superiores a 5 indicam qualidade ruim de sono 
          e valores acima de 10 sugerem distúrbio significativo do sono que merece atenção médica.
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Referências</h2>
        <p className="text-sm text-neutral-600 mb-2 text-left">
          Buysse DJ et al. The Pittsburgh Sleep Quality Index: a new instrument for psychiatric practice and research. 
          Psychiatry Res. 1989;28(2):193-213. doi:10.1016/0165-1781(89)90047-4
        </p>
        <p className="text-sm text-neutral-600 text-left">
          Bertolazi AN et al. Validation of the Brazilian Portuguese version of the Pittsburgh Sleep Quality Index. 
          Sleep Med. 2010;11(9):907-913. doi:10.1016/j.sleep.2010.04.020
        </p>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default PsqiPage;

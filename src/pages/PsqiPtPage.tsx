import { useState } from "react";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import QuestionItem from "@/components/questionnaire/QuestionItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";
import ProgressBar from "@/components/questionnaire/ProgressBar";

type TimeInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const TimeInput = ({ id, label, value, onChange }: TimeInputProps) => {
  return (
    <div className="text-left mb-4">
      <p className="font-medium mb-3">{label}</p>
      <Input
        id={id}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-36"
      />
    </div>
  );
};

type MinuteInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const MinuteInput = ({ id, label, value, onChange }: MinuteInputProps) => {
  return (
    <div className="text-left mb-4">
      <p className="font-medium mb-3">{label}</p>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20"
        />
        <span>min</span>
      </div>
    </div>
  );
};

type DurationInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const DurationInput = ({ id, label, value, onChange }: DurationInputProps) => {
  return (
    <div className="text-left mb-4">
      <p className="font-medium mb-3">{label}</p>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          min="0"
          max="24"
          step="0.5"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24"
        />
        <span>horas</span>
      </div>
    </div>
  );
};

const PsqiPtPage = () => {
  // Time inputs
  const [bedTime, setBedTime] = useState("");
  const [fallAsleepMinutes, setFallAsleepMinutes] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  
  // Frequency responses
  const [problem30Min, setProblem30Min] = useState("");
  const [wakeEarly, setWakeEarly] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [breathingDifficulty, setBreathingDifficulty] = useState("");
  const [coughSnore, setCoughSnore] = useState("");
  const [cold, setCold] = useState("");
  const [hot, setHot] = useState("");
  const [badDreams, setBadDreams] = useState("");
  const [pain, setPain] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [otherReasonDesc, setOtherReasonDesc] = useState("");
  
  // Other questions
  const [sleepQuality, setSleepQuality] = useState("");
  const [medication, setMedication] = useState("");
  const [stayAwake, setStayAwake] = useState("");
  const [enthusiasm, setEnthusiasm] = useState("");
  const [hasPartner, setHasPartner] = useState("");
  
  // Partner questions
  const [snoring, setSnoring] = useState("");
  const [breathingPauses, setBreathingPauses] = useState("");
  const [legMovements, setLegMovements] = useState("");
  const [confusion, setConfusion] = useState("");
  const [otherSymptoms, setOtherSymptoms] = useState("");
  const [otherSymptomsDesc, setOtherSymptomsDesc] = useState("");
  
  // Results
  const [score, setScore] = useState<number | null>(null);
  const [componentScores, setComponentScores] = useState<number[]>([]);
  
  const frequencyOptions = [
    "Nunca",
    "Menos de 1x/semana",
    "1 ou 2x/semana",
    "3x/semana ou mais"
  ];

  const sleepQualityOptions = [
    "Muito boa",
    "Boa", 
    "Má", 
    "Muito Má"
  ];

  const partnerOptions = [
    "Não",
    "Sim, mas em outro quarto",
    "sim, no mesmo quarto mas, não na mesma cama",
    "sim, na mesma cama"
  ];

  const calculateScore = () => {
    // Component 1: Subjective sleep quality
    const c1 = sleepQuality === "Muito boa" ? 0 : 
               sleepQuality === "Boa" ? 1 :
               sleepQuality === "Má" ? 2 : 3;
    
    // Component 2: Sleep latency
    let latencyScore = 0;
    if (fallAsleepMinutes) {
      const minutes = parseInt(fallAsleepMinutes);
      latencyScore = minutes <= 15 ? 0 :
                     minutes <= 30 ? 1 :
                     minutes <= 60 ? 2 : 3;
    }
    
    const problem30MinScore = problem30Min === "Nunca" ? 0 :
                              problem30Min === "Menos de 1x/semana" ? 1 :
                              problem30Min === "1 ou 2x/semana" ? 2 : 3;
    
    const c2 = (latencyScore + problem30MinScore) === 0 ? 0 :
               (latencyScore + problem30MinScore) <= 2 ? 1 :
               (latencyScore + problem30MinScore) <= 4 ? 2 : 3;
    
    // Component 3: Sleep duration
    let c3 = 0;
    if (sleepHours) {
      const hours = parseFloat(sleepHours);
      c3 = hours > 7 ? 0 :
            hours >= 6 ? 1 :
            hours >= 5 ? 2 : 3;
    }
    
    // Component 4: Sleep efficiency
    let c4 = 0;
    if (bedTime && wakeTime && sleepHours) {
      // Parse time strings (HH:MM format)
      const [bedHour, bedMinute] = bedTime.split(":").map(Number);
      const [wakeHour, wakeMinute] = wakeTime.split(":").map(Number);
      
      // Calculate time in bed in minutes
      const bedTimeMinutes = bedHour * 60 + bedMinute;
      let wakeTimeMinutes = wakeHour * 60 + wakeMinute;
      
      // Adjust if wakeTime is earlier than bedTime (next day)
      if (wakeTimeMinutes < bedTimeMinutes) {
        wakeTimeMinutes += 24 * 60;
      }
      
      const timeInBedMinutes = wakeTimeMinutes - bedTimeMinutes;
      const sleepTimeMinutes = parseFloat(sleepHours) * 60;
      
      // Calculate efficiency percentage
      const efficiency = (sleepTimeMinutes / timeInBedMinutes) * 100;
      
      c4 = efficiency >= 85 ? 0 :
           efficiency >= 75 ? 1 :
           efficiency >= 65 ? 2 : 3;
    }
    
    // Component 5: Sleep disturbances
    const getFrequencyScore = (value: string) => {
      return value === "Nunca" ? 0 :
             value === "Menos de 1x/semana" ? 1 :
             value === "1 ou 2x/semana" ? 2 : 
             value === "3x/semana ou mais" ? 3 : 0;
    };
    
    const disturbanceSum = 
      getFrequencyScore(wakeEarly) +
      getFrequencyScore(bathroom) +
      getFrequencyScore(breathingDifficulty) +
      getFrequencyScore(coughSnore) +
      getFrequencyScore(cold) +
      getFrequencyScore(hot) +
      getFrequencyScore(badDreams) +
      getFrequencyScore(pain) +
      (otherReason !== "" ? getFrequencyScore(otherReason) : 0);
    
    const c5 = disturbanceSum === 0 ? 0 :
               disturbanceSum <= 9 ? 1 :
               disturbanceSum <= 18 ? 2 : 3;
    
    // Component 6: Use of sleep medication
    const c6 = getFrequencyScore(medication);
    
    // Component 7: Daytime dysfunction
    const stayAwakeScore = getFrequencyScore(stayAwake);
    const enthusiasmScore = getFrequencyScore(enthusiasm);
    
    const c7 = (stayAwakeScore + enthusiasmScore) === 0 ? 0 :
               (stayAwakeScore + enthusiasmScore) <= 2 ? 1 :
               (stayAwakeScore + enthusiasmScore) <= 4 ? 2 : 3;
    
    // Global PSQI Score
    const totalScore = c1 + c2 + c3 + c4 + c5 + c6 + c7;
    
    setComponentScores([c1, c2, c3, c4, c5, c6, c7]);
    setScore(totalScore);
  };

  const getScoreSeverity = (score: number) => {
    if (score <= 5) return { text: "Boa qualidade de sono", severity: "success" as const };
    if (score <= 10) return { text: "Qualidade de sono média, com dificuldades moderadas", severity: "warning" as const };
    return { text: "Má qualidade de sono, sugerindo atenção médica", severity: "danger" as const };
  };

  const resetForm = () => {
    setBedTime("");
    setFallAsleepMinutes("");
    setWakeTime("");
    setSleepHours("");
    setProblem30Min("");
    setWakeEarly("");
    setBathroom("");
    setBreathingDifficulty("");
    setCoughSnore("");
    setCold("");
    setHot("");
    setBadDreams("");
    setPain("");
    setOtherReason("");
    setOtherReasonDesc("");
    setSleepQuality("");
    setMedication("");
    setStayAwake("");
    setEnthusiasm("");
    setHasPartner("");
    setSnoring("");
    setBreathingPauses("");
    setLegMovements("");
    setConfusion("");
    setOtherSymptoms("");
    setOtherSymptomsDesc("");
    setScore(null);
    setComponentScores([]);
  };

  // Count answered questions for progress bar
  const countAnsweredQuestions = () => {
    let count = 0;
    
    // Time inputs (Questions 1-4)
    if (bedTime) count++;
    if (fallAsleepMinutes) count++;
    if (wakeTime) count++;
    if (sleepHours) count++;
    
    // Question 5 (a-j)
    if (problem30Min) count++;
    if (wakeEarly) count++;
    if (bathroom) count++;
    if (breathingDifficulty) count++;
    if (coughSnore) count++;
    if (cold) count++;
    if (hot) count++;
    if (badDreams) count++;
    if (pain) count++;
    if (otherReason) count++;
    
    // Questions 6-10
    if (sleepQuality) count++;
    if (medication) count++;
    if (stayAwake) count++;
    if (enthusiasm) count++;
    if (hasPartner) count++;
    
    // Partner questions if applicable
    if (hasPartner && hasPartner !== "Não") {
      if (snoring) count++;
      if (breathingPauses) count++;
      if (legMovements) count++;
      if (confusion) count++;
      if (otherSymptoms) count++;
    }
    
    return count;
  };
  
  // Total number of questions
  const getTotalQuestions = () => {
    return hasPartner && hasPartner !== "Não" ? 20 : 15;
  };

  return (
    <QuestionnaireContainer
      title="Índice de Qualidade do Sono de Pittsburgh – versão portuguesa (PSQI-PT)"
      categoryPath="/categorias/insonia"
      categoryName="Insônia e Qualidade do Sono"
    >
      <QuestionnaireContent
        title="Índice de Qualidade do Sono de Pittsburgh – versão portuguesa (PSQI-PT)"
        description="Versão em língua portuguesa, com único objetivo de formar o score do questionário. Lembre-se de ter acessado a página do autor para o questionário original."
      >
        <ProgressBar 
          current={countAnsweredQuestions()}
          total={getTotalQuestions()}
        />
        
        <div className="space-y-6 mb-8">
          <p className="text-neutral-700 font-medium">
            As questões a seguir são referentes à sua qualidade de sono apenas durante o mês passado. 
            As suas respostas devem indicar o mais correctamente possível o que aconteceu na maioria dos 
            dias e noites do último mês. Por favor responda a todas as questões.
          </p>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <TimeInput
                id="bedtime"
                label="1) Durante o mês passado, a que horas se deitou à noite na maioria das vezes?"
                value={bedTime}
                onChange={setBedTime}
              />
              
              <MinuteInput
                id="fallasleep"
                label="2) Durante o mês passado, quanto tempo (em minutos) demorou para adormecer na maioria das vezes?"
                value={fallAsleepMinutes}
                onChange={setFallAsleepMinutes}
              />
              
              <TimeInput
                id="waketime"
                label="3) Durante o mês passado, a que horas acordou (levantou) de manhã na maioria das vezes?"
                value={wakeTime}
                onChange={setWakeTime}
              />
              
              <DurationInput
                id="sleeptime"
                label="4) Durante o mês passado, quantas horas de sono por noite dormiu? (pode ser diferente do número de horas que ficou na cama)."
                value={sleepHours}
                onChange={setSleepHours}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-neutral-900 mb-4 text-left">
                5) Durante o mês passado, quantas vezes teve problemas para dormir por causa de:
              </h3>
              
              <div className="space-y-6">
                <QuestionItem
                  id="problem30min"
                  title="a) Demorar mais de 30 minutos para adormecer:"
                  options={frequencyOptions}
                  value={problem30Min}
                  onChange={setProblem30Min}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <QuestionItem
                  id="wakeearly"
                  title="b) Acordar ao meio da noite ou de manhã muito cedo:"
                  options={frequencyOptions}
                  value={wakeEarly}
                  onChange={setWakeEarly}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <QuestionItem
                  id="bathroom"
                  title="c) Levantar-se para ir à casa de banho:"
                  options={frequencyOptions}
                  value={bathroom}
                  onChange={setBathroom}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <QuestionItem
                  id="breathingdifficulty"
                  title="d) Ter dificuldade para respirar:"
                  options={frequencyOptions}
                  value={breathingDifficulty}
                  onChange={setBreathingDifficulty}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <QuestionItem
                  id="coughsnore"
                  title="e) Tossir ou ressonar alto:"
                  options={frequencyOptions}
                  value={coughSnore}
                  onChange={setCoughSnore}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <QuestionItem
                  id="cold"
                  title="f) Sentir muito frio:"
                  options={frequencyOptions}
                  value={cold}
                  onChange={setCold}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <QuestionItem
                  id="hot"
                  title="g) Sentir muito calor:"
                  options={frequencyOptions}
                  value={hot}
                  onChange={setHot}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <QuestionItem
                  id="baddreams"
                  title="h) Ter sonhos maus ou pesadelos:"
                  options={frequencyOptions}
                  value={badDreams}
                  onChange={setBadDreams}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <QuestionItem
                  id="pain"
                  title="i) Sentir dores:"
                  options={frequencyOptions}
                  value={pain}
                  onChange={setPain}
                  variant="panel"
                  reducedSpacing={true}
                />
                
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-medium text-neutral-900 mb-2 text-left">j) Outra razão, por favor, descreva:</h3>
                  <Input
                    id="otherdesc"
                    value={otherReasonDesc}
                    onChange={(e) => setOtherReasonDesc(e.target.value)}
                    className="mb-4"
                  />
                  <p className="font-medium text-neutral-900 mb-2 text-left">
                    Quantas vezes teve problemas para dormir por esta razão, durante o mês passado?
                  </p>
                  <QuestionItem
                    id="otherreason"
                    title=""
                    options={frequencyOptions}
                    value={otherReason}
                    onChange={setOtherReason}
                    variant="panel"
                    inline={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <QuestionItem
                id="sleepquality"
                title="6) Durante o mês passado, como classificaria a qualidade do seu sono?"
                options={sleepQualityOptions}
                value={sleepQuality}
                onChange={setSleepQuality}
                variant="panel"
                inline={true}
              />
              
              <QuestionItem
                id="medication"
                title="7) Durante o mês passado, tomou algum medicamento para dormir receitado pelo médico, ou indicado por outra pessoa (farmacêutico, amigo, familiar), ou mesmo por sua iniciativa?"
                options={frequencyOptions}
                value={medication}
                onChange={setMedication}
                variant="panel"
                inline={true}
              />
              
              <QuestionItem
                id="stayawake"
                title="8) Durante o mês passado, teve problemas em ficar acordado durante as refeições, ou enquanto conduzia, ou enquanto participava nalguma atividade social?"
                options={frequencyOptions}
                value={stayAwake}
                onChange={setStayAwake}
                variant="panel"
                inline={true}
              />
              
              <QuestionItem
                id="enthusiasm"
                title="9) Durante o mês passado, sentiu pouca vontade ou falta de entusiasmo para realizar as suas atividades diárias?"
                options={frequencyOptions}
                value={enthusiasm}
                onChange={setEnthusiasm}
                variant="panel"
                inline={true}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <QuestionItem
                id="haspartner"
                title="10) Vive com um(a) companheiro(a)?"
                options={partnerOptions}
                value={hasPartner}
                onChange={setHasPartner}
                variant="panel"
              />
              
              {hasPartner && hasPartner !== "Não" && (
                <div className="space-y-6 mt-4">
                  <h3 className="font-medium text-neutral-900 mb-2 text-left">
                    Se tem um(a) companheiro(a) de cama ou quarto, pergunte-lhe se, no mês passado, você teve:
                  </h3>
                  
                  <QuestionItem
                    id="snoring"
                    title="a) Ronco alto:"
                    options={frequencyOptions}
                    value={snoring}
                    onChange={setSnoring}
                    variant="panel"
                    reducedSpacing={true}
                  />
                  
                  <QuestionItem
                    id="breathingpauses"
                    title="b) Pausas longas na respiração durante o sono:"
                    options={frequencyOptions}
                    value={breathingPauses}
                    onChange={setBreathingPauses}
                    variant="panel"
                    reducedSpacing={true}
                  />
                  
                  <QuestionItem
                    id="legmovements"
                    title="c) Movimentos de pernas durante o sono:"
                    options={frequencyOptions}
                    value={legMovements}
                    onChange={setLegMovements}
                    variant="panel"
                    reducedSpacing={true}
                  />
                  
                  <QuestionItem
                    id="confusion"
                    title="d) Episódios de desorientação ou confusão durante o sono:"
                    options={frequencyOptions}
                    value={confusion}
                    onChange={setConfusion}
                    variant="panel"
                    reducedSpacing={true}
                  />
                  
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h3 className="font-medium text-neutral-900 mb-2 text-left">e) Outros sintomas na cama enquanto dorme, por favor, descreva:</h3>
                    <Input
                      id="othersymptomsdesc"
                      value={otherSymptomsDesc}
                      onChange={(e) => setOtherSymptomsDesc(e.target.value)}
                      className="mb-4"
                    />
                    <QuestionItem
                      id="othersymptoms"
                      title=""
                      options={frequencyOptions}
                      value={otherSymptoms}
                      onChange={setOtherSymptoms}
                      variant="panel"
                      inline={true}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg"
              onClick={calculateScore}
            >
              Calcular Resultados
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={resetForm}
            >
              Limpar Formulário
            </Button>
          </div>
          
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
                  <li>C1 - Qualidade subjetiva do sono: {componentScores[0]}</li>
                  <li>C2 - Latência do sono: {componentScores[1]}</li>
                  <li>C3 - Duração do sono: {componentScores[2]}</li>
                  <li>C4 - Eficiência habitual: {componentScores[3]}</li>
                  <li>C5 - Distúrbios do sono: {componentScores[4]}</li>
                  <li>C6 - Uso de medicação: {componentScores[5]}</li>
                  <li>C7 - Disfunção diurna: {componentScores[6]}</li>
                </ul>
              </div>
            </ResultDisplay>
          )}
        </div>
      </QuestionnaireContent>

      <QuestionnaireSidebar pdfUrl="/questionarios/psqi.pdf">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Sobre o questionário</h2>
        <p className="text-neutral-700 mb-4 text-left">
          O Índice de Qualidade de Sono de Pittsburgh (PSQI-PT) avalia a qualidade do sono no último mês, 
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
          Psychiatry Res. 1989;28(2):193-213.
        </p>
        <p className="text-sm text-neutral-600 text-left">
          Bertolazi AN et al. Validation of the Brazilian Portuguese version of the Pittsburgh Sleep Quality Index. 
          Sleep Med. 2010;11(9):907-913.
        </p>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default PsqiPtPage;

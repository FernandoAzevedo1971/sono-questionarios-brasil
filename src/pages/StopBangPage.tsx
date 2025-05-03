import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";
import QuestionItem from "@/components/questionnaire/QuestionItem";
import { VolumeX, LucideAlarmClock, Eye, Heart, Scale, Clock, User, UserCircle2 } from "lucide-react";

type QuestionItem = {
  id: string;
  letter: string;
  text: string;
  description: string;
  icon: React.ElementType;
};

const questions: QuestionItem[] = [
  {
    id: "snoring",
    letter: "S",
    text: "noring (Roncos)",
    description: "Você ronca alto (alto o suficiente que pode ser ouvido através de portas fechadas ou seu companheiro cutuca você à noite para parar de roncar)?",
    icon: VolumeX
  },
  {
    id: "tired",
    letter: "T",
    text: "iredness (Cansado)",
    description: "Você frequentemente se sente cansado, exausto ou sonolento durante o dia (como, por exemplo, adormecer enquanto dirige)?",
    icon: LucideAlarmClock
  },
  {
    id: "observed",
    letter: "O",
    text: "bserved apnea (apneia observada)",
    description: "Alguém observou que você para de respirar ou engasga/fica ofegante durante o seu sono?",
    icon: Eye
  },
  {
    id: "pressure",
    letter: "P",
    text: "ressure (pressão arterial elevada)",
    description: "Você tem ou está sendo tratado para pressão sanguínea alta?",
    icon: Heart
  },
  {
    id: "bmi",
    letter: "B",
    text: "MI (IMC)",
    description: "Índice de massa corporal maior que 35 kg/m²?",
    icon: Scale
  },
  {
    id: "age",
    letter: "A",
    text: "ge (Idade)",
    description: "Idade acima de 50 anos?",
    icon: Clock
  },
  {
    id: "neck",
    letter: "N",
    text: "eck Circumference (Circunferência do pescoço)",
    description: "Circunferência do pescoço 43 cm ou mais no homem ou 41 cm ou mais na mulher?",
    icon: User
  },
  {
    id: "gender",
    letter: "G",
    text: "ender (Sexo)",
    description: "Sexo = Masculino?",
    icon: UserCircle2
  }
];

const StopBangPage = () => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<string | null>(null);

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value === "yes",
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    
    // Count all "yes" answers
    Object.entries(answers).forEach(([_, value]) => {
      if (value) totalScore += 1;
    });
    
    setScore(totalScore);
    
    // Determine risk level based on criteria
    let risk = "";
    
    if (totalScore <= 2) {
      risk = "Baixo risco de Apneia Obstrutiva do Sono (AOS)";
    } else if (totalScore <= 4) {
      risk = "Risco intermediário de Apneia Obstrutiva do Sono (AOS)";
    } else {
      risk = "Alto risco de Apneia Obstrutiva do Sono (AOS)";
    }
    
    // Additional high-risk criteria
    const firstFourQuestions = ["snoring", "tired", "observed", "pressure"];
    const firstFourCount = firstFourQuestions.filter(q => answers[q]).length;
    
    if (firstFourCount >= 2) {
      if (answers["gender"] || answers["bmi"] || answers["neck"]) {
        risk = "Alto risco de Apneia Obstrutiva do Sono (AOS)";
      }
    }
    
    setRiskLevel(risk);
  };

  const isFormComplete = Object.keys(answers).length === questions.length;

  return (
    <QuestionnaireContainer 
      title="Questionário STOP-BANG"
      categoryPath="/categorias/apneia"
      categoryName="Apneia do Sono"
    >
      {/* Left Panel - Questionnaire Form */}
      <QuestionnaireContent 
        title="Questionário STOP-BANG validado em português" 
        description="Responda as 8 perguntas abaixo selecionando 'Sim' ou 'Não' para cada item."
      >
        <div className="space-y-6 mb-6">
          {questions.map((question) => (
            <div key={question.id} className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <question.icon className="h-5 w-5 text-primary-600" />
                <p className="font-medium text-neutral-900">
                  <span className="font-bold underline">{question.letter}</span>{question.text}
                </p>
              </div>
              <p className="text-sm text-neutral-600 mb-3">{question.description}</p>
              <RadioGroup
                value={answers[question.id] !== undefined ? (answers[question.id] ? "yes" : "no") : ""}
                onValueChange={(value) => handleOptionChange(question.id, value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id={`${question.id}-no`} />
                  <Label htmlFor={`${question.id}-no`}>Não</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                  <Label htmlFor={`${question.id}-yes`}>Sim</Label>
                </div>
              </RadioGroup>
            </div>
          ))}

          <Button
            className="w-full md:w-auto"
            onClick={calculateScore}
            disabled={!isFormComplete}
          >
            Calcular Resultado
          </Button>

          {score !== null && riskLevel && (
            <ResultDisplay
              score={score}
              interpretation={riskLevel}
              maxScore={8}
              severity={score <= 2 ? "success" : score <= 4 ? "warning" : "danger"}
              notes={[
                "Baixo risco de AOS: Sim para 0 a 2 perguntas.",
                "Risco intermediário de AOS: Sim para 3 a 4 perguntas.",
                "Risco alto de AOS: Sim para 5 a 8 perguntas, ou:",
                "- Sim para 2 ou mais das 4 perguntas iniciais + sexo masculino.",
                "- Sim para 2 ou mais das 4 perguntas iniciais + IMC &gt; 35 kg/m².",
                "- Sim para 2 ou mais das 4 perguntas iniciais + circunferência do pescoço (43 cm em homens, 41 cm em mulheres)."
              ]}
            />
          )}
        </div>
      </QuestionnaireContent>

      {/* Right Panel - Info and Download */}
      <QuestionnaireSidebar pdfUrl='/questionarios/stop-bang.pdf'>
        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre o questionário</h2>
        <p className="text-neutral-700 mb-6">
          O questionário STOP-BANG é uma ferramenta validada para triagem de Apneia Obstrutiva do Sono (AOS).
          É composto por oito perguntas de sim/não, sendo um dos instrumentos mais utilizados mundialmente
          para identificação de pacientes com risco de AOS.
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Critérios de Pontuação</h2>
        <p className="text-sm text-neutral-600 mb-2">Para a população geral:</p>
        <ul className="text-sm text-neutral-600 list-disc pl-5 mb-6 space-y-1">
          <li>Baixo risco de AOS: Sim para 0 a 2 perguntas</li>
          <li>Risco intermediário de AOS: Sim para 3 a 4 perguntas</li>
          <li>Risco alto de AOS: Sim para 5 a 8 perguntas OU</li>
          <li>Sim para 2 ou mais das 4 perguntas iniciais + sexo masculino OU</li>
          <li>Sim para 2 ou mais das 4 perguntas iniciais + IMC &gt; 35 kg/m² OU</li>
          <li>Sim para 2 ou mais das 4 perguntas iniciais + circunferência do pescoço (43 cm em homens, 41 cm em mulheres)</li>
        </ul>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
        <div className="text-sm text-neutral-600 space-y-4">
          <p>
            Fonseca LBM, Silveira EA, Lima NM, Rabahi MF. 
            Tradução e adaptação transcultural do questionário STOP-Bang para a língua portuguesa falada no Brasil. 
            J Bras Pneumol. 2016;42(4):266–272. 
            doi:10.1590/S1806-37562015000000243
          </p>
          <p>
            Chung F, Yegneswaran B, Liao P, et al. STOP questionnaire: a tool to screen patients for obstructive sleep apnea. 
            Anesthesiology. 2008; 108(5):812-821
          </p>
        </div>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default StopBangPage;

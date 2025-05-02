
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type QuestionItem = {
  id: string;
  text: string;
  description?: string;
};

const questions: QuestionItem[] = [
  {
    id: "snoring",
    text: "Roncos?",
    description: "Você ronca alto (alto o suficiente que pode ser ouvido através de portas fechadas ou seu companheiro cutuca você à noite para parar de roncar)?"
  },
  {
    id: "tired",
    text: "Cansado?",
    description: "Você frequentemente se sente cansado, exausto ou sonolento durante o dia (como, por exemplo, adormecer enquanto dirige)?"
  },
  {
    id: "observed",
    text: "Observou?",
    description: "Alguém observou que você para de respirar ou engasga/fica ofegante durante o seu sono?"
  },
  {
    id: "pressure",
    text: "Pressão?",
    description: "Você tem ou está sendo tratado para pressão sanguínea alta?"
  },
  {
    id: "bmi",
    text: "Índice de Massa Corporal (IMC)?",
    description: "Seu IMC é maior que 35 kg/m²?"
  },
  {
    id: "age",
    text: "Idade?",
    description: "Você tem idade acima de 50 anos?"
  },
  {
    id: "neck",
    text: "Pescoço Grosso?",
    description: "Para homens: o colarinho da sua camisa é de 43 cm ou mais? Para mulheres: o colarinho da sua camisa é de 41 cm ou mais?"
  },
  {
    id: "gender",
    text: "Sexo?",
    description: "Você é do sexo masculino?"
  }
];

const StopBangPage = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Button
                variant="link"
                className="p-0 h-auto text-neutral-600 hover:text-primary-600"
                onClick={() => navigate("/")}
              >
                Início
              </Button>
              <span>/</span>
              <Button
                variant="link"
                className="p-0 h-auto text-neutral-600 hover:text-primary-600"
                onClick={() => navigate("/categorias/apneia")}
              >
                Apneia do Sono
              </Button>
              <span>/</span>
              <span className="text-neutral-900">Questionário STOP-BANG</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Questionário STOP-BANG
              </h1>

              <p className="mb-6 text-neutral-600">
                Responda as 8 perguntas abaixo selecionando "Sim" ou "Não" para cada item.
              </p>

              <div className="space-y-6 mb-6">
                {questions.map((question) => (
                  <div key={question.id} className="p-4 bg-neutral-50 rounded-lg">
                    <p className="font-medium text-neutral-900 mb-2">{question.text}</p>
                    {question.description && (
                      <p className="text-sm text-neutral-600 mb-3">{question.description}</p>
                    )}
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
                  <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
                    <p className="text-primary-900 font-medium mb-1">
                      Seu escore: {score} pontos
                    </p>
                    <p className="text-primary-700 font-medium">
                      Classificação: {riskLevel}
                    </p>
                    <div className="text-xs text-neutral-500 mt-2 space-y-1">
                      <p>Critérios de Pontuação:</p>
                      <ul className="list-disc pl-5">
                        <li>Baixo risco de AOS: Sim para 0 a 2 perguntas.</li>
                        <li>Risco intermediário de AOS: Sim para 3 a 4 perguntas.</li>
                        <li>Risco alto de AOS: Sim para 5 a 8 perguntas, ou:</li>
                        <ul className="list-disc pl-5">
                          <li>Sim para 2 ou mais das 4 perguntas iniciais + sexo masculino.</li>
                          <li>Sim para 2 ou mais das 4 perguntas iniciais + IMC &gt; 35 kg/m².</li>
                          <li>Sim para 2 ou mais das 4 perguntas iniciais + circunferência do pescoço (43 cm em homens, 41 cm em mulheres).</li>
                        </ul>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Info and Download */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <Button 
                  className="w-full mb-6" 
                  variant="outline"
                  onClick={() => window.open('/questionarios/stop-bang.pdf', '_blank')}
                >
                  Baixar versão em PDF
                </Button>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre o questionário</h2>
                <p className="text-neutral-700 mb-6">
                  O questionário STOP-BANG é uma ferramenta validada para triagem de Apneia Obstrutiva do Sono (AOS).
                  É composto por oito perguntas de sim/não, sendo um dos instrumentos mais utilizados mundialmente
                  para identificação de pacientes com risco de AOS.
                </p>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
                <div className="text-sm text-neutral-600 space-y-4">
                  <p>
                    Fonseca LBM, Silveira EA, Lima NM, Rabahi MF. 
                    Tradução e adaptação transcultural do questionário STOP-Bang para a língua portuguesa falada no Brasil. 
                    J Bras Pneumol. 2016;42(4):266–272. 
                    DOI: 10.1590/S1806-37562015000000243
                  </p>
                  <p>
                    Reis R, Teixeira F, Martins V, Sousa L, Batata L, Santos C, Moutinho J. 
                    Validation of a Portuguese version of the STOP-Bang questionnaire as a screening tool for obstructive sleep apnea: Analysis in a sleep clinic. 
                    Rev Port Pneumol (2014). 
                    DOI: 10.1016/j.rppneu.2014.04.007
                  </p>
                  <p>
                    Nagappa M, Liao P, Wong J, Auckley D, Ramachandran SK, Memtsoudis S, Mokhlesi B, Chung F. 
                    Validation of the STOP-Bang Questionnaire as a Screening Tool for Obstructive Sleep Apnea among Different Populations: A Systematic Review and Meta-Analysis. 
                    PLoS ONE. 2015;10(12):e0143697. 
                    DOI: 10.1371/journal.pone.0143697
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StopBangPage;

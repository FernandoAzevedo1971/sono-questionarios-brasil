
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuestionItem from "@/components/questionnaire/QuestionItem";

type QuestionItem = {
  id: string;
  text: string;
  shortLabel: string;
};

const questions: QuestionItem[] = [
  {
    id: "gender",
    text: "G - Gênero masculino",
    shortLabel: "Masculino",
  },
  {
    id: "obesity",
    text: "O - Obesidade: índice de massa corporal ≥ 30 kg/m²",
    shortLabel: "IMC ≥ 30",
  },
  {
    id: "age",
    text: "A - Idade ≥ 50 anos",
    shortLabel: "Idade ≥ 50",
  },
  {
    id: "snoring",
    text: "L - Ronco alto",
    shortLabel: "Ronco alto",
  },
];

const GoalPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value === "yes",
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    Object.entries(answers).forEach(([_, value]) => {
      if (value) totalScore += 1;
    });
    setScore(totalScore);
  };

  const getScoreInterpretation = (score: number) => {
    return score >= 2
      ? "Alto risco para Apneia Obstrutiva do Sono"
      : "Baixo risco para Apneia Obstrutiva do Sono";
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
              <span className="text-neutral-900">Questionário GOAL</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4 text-left">
                Questionário GOAL
              </h1>

              <p className="mb-6 text-neutral-600 text-left">
                Responda as 4 perguntas abaixo selecionando "Sim" ou "Não" para cada item.
              </p>

              <div className="space-y-6 mb-6">
                <Card className="overflow-hidden">
                  <div className="bg-primary-50 p-4">
                    <h3 className="font-medium text-primary-900 text-left">Tabela do Questionário GOAL</h3>
                  </div>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900">Parâmetros</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-900">Pontos</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm text-neutral-700">G - Gênero masculino</td>
                            <td className="px-4 py-3 text-sm text-neutral-700">Não = 0 Sim = 1</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm text-neutral-700">O - Obesidade: índice de massa corporal ≥ 30 kg/m²</td>
                            <td className="px-4 py-3 text-sm text-neutral-700">Não = 0 Sim = 1</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 text-sm text-neutral-700">A - Idade ≥ 50 anos</td>
                            <td className="px-4 py-3 text-sm text-neutral-700">Não = 0 Sim = 1</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-neutral-700">L - Ronco alto</td>
                            <td className="px-4 py-3 text-sm text-neutral-700">Não = 0 Sim = 1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="px-4 py-3 text-xs text-neutral-500 bg-neutral-50 border-t text-left">
                      Nota: Os pontos para cada variável são somados, totalizando uma pontuação final de 0-4 pontos.
                    </div>
                  </CardContent>
                </Card>

                {questions.map((question) => (
                  <div key={question.id} className="p-4 bg-neutral-50 rounded-lg">
                    <p className="font-medium text-neutral-900 mb-3 text-left">{question.text}</p>
                    <RadioGroup
                      value={answers[question.id] !== undefined ? (answers[question.id] ? "yes" : "no") : ""}
                      onValueChange={(value) => handleOptionChange(question.id, value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${question.id}-no`} />
                        <Label htmlFor={`${question.id}-no`} className="text-left">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                        <Label htmlFor={`${question.id}-yes`} className="text-left">Sim</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}

                <Button
                  className="w-full md:w-auto"
                  onClick={calculateScore}
                  disabled={!isFormComplete}
                >
                  Calcular Escore
                </Button>

                {score !== null && (
                  <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
                    <p className="text-primary-900 font-medium mb-1 text-left">
                      Seu escore: {score} pontos
                    </p>
                    <p className="text-primary-700 text-left">
                      Interpretação: {getScoreInterpretation(score)}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2 text-left">
                      * Pontuação mínima = 0 pontos, máxima 4 pontos.<br />
                      * Valores ≥ 2 indicam alto risco para Apneia Obstrutiva do Sono.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Info and Download */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <Button className="w-full mb-6" variant="outline">
                  Baixar versão em PDF
                </Button>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Sobre o questionário</h2>
                <p className="text-neutral-700 mb-6 text-left">
                  O questionário GOAL é um instrumento de 4 itens desenvolvido e validado no Brasil para 
                  rastreamento de Apneia Obstrutiva do Sono. A pontuação total varia de 0 a 4 pontos, 
                  com pontuação ≥2 indicando alto risco para AOS.
                </p>

                <p className="text-neutral-700 mb-6 text-left">
                  A capacidade discriminatória do questionário GOAL para rastreamento de AOS foi 
                  similar ao No-Apnea, STOP-Bang e NoSAS, com sensibilidade variando de 83,7% a 94,2%.
                </p>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Referências</h2>
                <p className="text-sm text-neutral-600 text-left">
                  Duarte RLM, Magalhães-da-Silveira FJ, Oliveira-e-Sá TS, Silva JA, Mello FCQ, Gozal D. 
                  Obstructive sleep apnea screening with a 4-item instrument, named GOAL questionnaire: 
                  development, validation and comparative study with No-Apnea, STOP-Bang, and NoSAS. 
                  Nature and Science of Sleep. 2020;12:57–67. doi: 10.2147/NSS.S238255
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GoalPage;

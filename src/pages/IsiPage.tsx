
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const questions = [
  {
    id: 1,
    text: "Dificuldade em pegar no sono",
    options: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 2,
    text: "Dificuldade em manter o sono",
    options: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 3,
    text: "Problema de despertar muito cedo",
    options: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 4,
    text: "Quanto você está satisfeito ou insatisfeito com o padrão atual de seu sono?",
    options: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 5,
    text: "Em que medida você considera que seu problema de sono interfere nas suas atividades diurnas (por exemplo: fadiga diária, habilidade para trabalhar/ executar atividades diárias, concentração, memória, humor, etc.)",
    options: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 6,
    text: "Quanto você acha que os outros percebem que o seu problema de sono atrapalha sua qualidade de vida?",
    options: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 7,
    text: "O quanto você está preocupado/ estressado com o seu problema de sono?",
    options: ["Não estou preocupado", "Um pouco preocupado", "De algum modo preocupado", "Muito preocupado", "Extremamente preocupado"]
  },
];

const IsiPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
      setScore(total);
    }
  };

  const getScoreSeverity = (score: number) => {
    if (score <= 7) return "ausência de insônia significativa";
    if (score <= 14) return "limite inferior para insônia";
    if (score <= 21) return "insônia clínica moderada";
    return "insônia clínica grave";
  };

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
                onClick={() => navigate("/categorias/insonia")}
              >
                Insônia
              </Button>
              <span>/</span>
              <span className="text-neutral-900">Índice de Gravidade de Insônia</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Índice de Gravidade de Insônia (ISI)
              </h1>
              
              <p className="text-neutral-700 mb-6">
                Avalie a gravidade atual da sua insônia (nas últimas 2 a 4 semanas) em relação a:
              </p>

              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="p-4 bg-neutral-50 rounded-lg">
                    <p className="font-medium text-neutral-900 mb-3">{question.text}</p>
                    <RadioGroup
                      value={answers[question.id]?.toString()}
                      onValueChange={(value) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: parseInt(value),
                        }))
                      }
                      className="grid grid-cols-2 md:grid-cols-5 gap-4"
                    >
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={index.toString()} id={`q${question.id}-${index}`} />
                          <Label
                            htmlFor={`q${question.id}-${index}`}
                            className="text-sm text-neutral-700"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}

                <Button
                  className="w-full md:w-auto"
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  Calcular Escore
                </Button>

                {score !== null && (
                  <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
                    <p className="text-primary-900 font-medium">
                      Seu escore: {score} - {getScoreSeverity(score)}
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

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre a escala</h2>
                <p className="text-neutral-700 mb-6">
                  O Índice de Gravidade de Insônia avalia a severidade dos sintomas de insônia e seu 
                  impacto na qualidade de vida. É composto por sete perguntas em escala de 0 a 4, 
                  resultando em escore total de 0 a 28.
                </p>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
                <p className="text-sm text-neutral-600">
                  Morin CM, Belleville G, Bélanger L, Ivers H. Validation of the Insomnia Severity Index 
                  as an outcome measure for insomnia research. Sleep Med. 2011;34(5):601–608. 
                  DOI: 10.1093/sleep/34.5.601
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

export default IsiPage;

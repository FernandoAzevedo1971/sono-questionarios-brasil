
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
    text: "Minha motivação é menor quando eu estou fadigado",
  },
  {
    id: 2,
    text: "Exercícios me deixam fadigado",
  },
  {
    id: 3,
    text: "Eu estou facilmente fadigado",
  },
  {
    id: 4,
    text: "A fadiga interfere com meu desempenho físico",
  },
  {
    id: 5,
    text: "A fadiga causa problemas frequentes para mim",
  },
  {
    id: 6,
    text: "Minha fadiga impede um desempenho físico prolongado",
  },
  {
    id: 7,
    text: "A fadiga interfere com a execução de certas obrigações e responsabilidades",
  },
  {
    id: 8,
    text: "A fadiga é um dos três sintomas mais incapacitantes que tenho",
  },
  {
    id: 9,
    text: "A fadiga interfere com meu trabalho, minha família ou com minha vida social",
  },
];

const options = [1, 2, 3, 4, 5, 6, 7];

const FssPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
      setScore(total);
    }
  };

  const getScoreSeverity = (score: number) => {
    return score >= 36 ? "presença de fadiga significativa" : "ausência de fadiga significativa";
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
                onClick={() => navigate("/categorias/sonolencia")}
              >
                Sonolência Diurna e Fadiga
              </Button>
              <span>/</span>
              <span className="text-neutral-900">Escala de Gravidade de Fadiga</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Escala de Gravidade de Fadiga (FSS)
              </h1>
              
              <p className="mb-6 text-neutral-600">
                Para cada afirmação, por favor, selecione um número de 1 a 7 que melhor indica seu grau de concordância: 
                <strong className="block mt-2 text-neutral-800">1 = DISCORDO FORTEMENTE, 7 = CONCORDO FORTEMENTE</strong>
                <span className="block mt-1">As demais pontuações devem refletir o quanto você discorda ou concorda com a afirmação.</span>
              </p>
              
              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="p-4 bg-neutral-50 rounded-lg">
                    <p className="font-medium text-neutral-900 mb-3">{question.id}. {question.text}</p>
                    <RadioGroup
                      value={answers[question.id]?.toString()}
                      onValueChange={(value) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: parseInt(value),
                        }))
                      }
                    >
                      <div className="grid grid-cols-7 gap-2 mt-2">
                        {options.map((option) => (
                          <div key={option} className="flex flex-col items-center">
                            <div className="flex flex-col items-center gap-1">
                              <RadioGroupItem 
                                value={option.toString()} 
                                id={`q${question.id}-${option}`} 
                                className="mx-auto"
                              />
                              <Label
                                htmlFor={`q${question.id}-${option}`}
                                className="text-sm text-neutral-700"
                              >
                                {option}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
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
                    <p className="text-primary-900 font-medium mb-1">
                      Seu escore: {score} pontos
                    </p>
                    <p className="text-primary-700">
                      Interpretação: {getScoreSeverity(score)}
                    </p>
                    <p className="text-xs text-neutral-500 mt-2">
                      * Pontuação mínima = 9 pontos, máxima 63 pontos.<br />
                      * Valores ≥ 36 podem ser considerados como indicador de presença de fadiga significativa.
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
                  A Escala de Gravidade de Fadiga (FSS) é um questionário de 9 itens que avalia o impacto 
                  da fadiga no funcionamento físico, social e ocupacional. O escore total varia de 9 a 63 pontos.
                </p>
                
                <div className="text-neutral-700 mb-6">
                  <p className="text-red-600 mb-2 font-medium">Importante:</p>
                  <p>Esta é uma tradução livre do questionário original. Não há validação oficial para a língua portuguesa.</p>
                </div>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
                <p className="text-sm text-neutral-600">
                  Krupp LB, LaRocca NG, Muir-Nash J, Steinberg AD. The fatigue severity scale. Application to patients with multiple 
                  sclerosis and systemic lupus erythematosus. Arch Neurol. 1989 Oct;46(10):1121-3. doi: 10.1001/archneur.1989.00520460115022. PMID: 2803071.
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

export default FssPage;

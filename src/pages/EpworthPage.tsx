
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const questions = [
  {
    id: 1,
    text: "Sentado e lendo",
  },
  {
    id: 2,
    text: "Assistindo TV",
  },
  {
    id: 3,
    text: "Sentado, quieto, em um lugar público (por exemplo, em um teatro, reunião ou palestra)",
  },
  {
    id: 4,
    text: "Andando de carro por uma hora sem parar, como passageiro",
  },
  {
    id: 5,
    text: "Ao deitar-se à tarde para descansar, quando possível",
  },
  {
    id: 6,
    text: "Sentado conversando com alguém",
  },
  {
    id: 7,
    text: "Sentado quieto após o almoço sem bebida de álcool",
  },
  {
    id: 8,
    text: "Em um carro parado no trânsito por alguns minutos",
  },
];

const EpworthPage = () => {
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
    if (score <= 9) return "normal";
    if (score <= 15) return "sonolência moderada";
    return "sonolência grave";
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
                Sonolência Excessiva
              </Button>
              <span>/</span>
              <span className="text-neutral-900">Escala de Sonolência de Epworth</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Escala de Sonolência de Epworth (ESE)
              </h1>
              
              <p className="text-neutral-700 mb-6">
                Qual é a probabilidade de você cochilar ou adormecer nas situações apresentadas a seguir? 
                Considere o seu modo de vida atual. Mesmo que você não tenha feito algumas destas coisas 
                recentemente, tente imaginar como elas o afetariam.
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
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {[0, 1, 2, 3].map((value) => (
                        <div key={value} className="flex items-center space-x-2">
                          <RadioGroupItem value={value.toString()} id={`q${question.id}-${value}`} />
                          <Label
                            htmlFor={`q${question.id}-${value}`}
                            className="text-sm text-neutral-700"
                          >
                            {value}
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
                  A Escala de Sonolência de Epworth avalia a propensão à sonolência diurna em diferentes 
                  situações do cotidiano. É composta por oito perguntas em escala de 0 a 3, gerando 
                  escore total de 0 a 24, com valores ≥ 10 sugerindo sonolência excessiva.
                </p>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
                <p className="text-sm text-neutral-600">
                  Johns, M. W. (1991). A new method for measuring daytime sleepiness: the Epworth 
                  sleepiness scale. Sleep, 14(6), 540-545. DOI: 10.1093/sleep/14.6.540
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

export default EpworthPage;

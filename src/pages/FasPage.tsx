
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
    text: "A fadiga incomoda-me",
    reverse: false
  },
  {
    id: 2,
    text: "Fico cansado muito rapidamente",
    reverse: false
  },
  {
    id: 3,
    text: "Não faço muitas coisas durante o dia",
    reverse: false
  },
  {
    id: 4,
    text: "Tenho energia suficiente para a vida do dia-a-dia",
    reverse: true
  },
  {
    id: 5,
    text: "Fisicamente, sinto-me exausto",
    reverse: false
  },
  {
    id: 6,
    text: "Tenho problemas em começar as tarefas",
    reverse: false
  },
  {
    id: 7,
    text: "Tenho problemas em pensar com clareza",
    reverse: false
  },
  {
    id: 8,
    text: "Não tenho vontade de fazer nada",
    reverse: false
  },
  {
    id: 9,
    text: "Mentalmente, sinto-me exausto",
    reverse: false
  },
  {
    id: 10,
    text: "Quando estou a fazer algo, consigo concentrar-me bastante bem",
    reverse: true
  }
];

const options = ["Nunca", "Às vezes", "Regularmente", "Com frequência", "Sempre"];

const FasPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      const total = questions.reduce((sum, question) => {
        const value = answers[question.id];
        return sum + (question.reverse ? 6 - value : value);
      }, 0);
      setScore(total);
    }
  };

  const getScoreSeverity = (score: number) => {
    return score >= 22 ? "presença de fadiga significativa" : "ausência de fadiga significativa";
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
              <span className="text-neutral-900">Escala de Avaliação de Fadiga</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Escala de Avaliação de Fadiga (FAS)
              </h1>
              
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
                      className="grid grid-cols-1 md:grid-cols-5 gap-4"
                    >
                      {options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={(index + 1).toString()} id={`q${question.id}-${index}`} />
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
                  A Escala de Avaliação de Fadiga avalia diferentes aspectos da fadiga física e mental através de 10 questões. 
                  O escore total varia de 10 a 50 pontos, com valores ≥ 22 indicando presença de fadiga significativa.
                </p>
                
                <div className="text-neutral-700 mb-6">
                  <p className="text-red-600 mb-2 font-medium">Importante:</p>
                  <p>Esta é uma tradução livre do questionário original. Não há validação oficial para a língua portuguesa.</p>
                </div>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
                <p className="text-sm text-neutral-600">
                  Krupp LB, LaRocca NG, Muir-Nash J, Steinberg AD. The fatigue severity scale. Application to patients with multiple 
                  sclerosis and systemic lupus erythematosus. Arch Neurol. 1989;46(10):1121-3.
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

export default FasPage;

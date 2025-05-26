
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

const phq9Questions = [
  "Pouco interesse ou prazer em fazer as coisas",
  "Sentir-se para baixo, deprimido ou sem esperança",
  "Dificuldade para dormir ou dormir demais",
  "Sentir-se cansado ou com pouca energia",
  "Falta de apetite ou comer em excesso",
  "Sentir-se mal consigo mesmo – ou que é um fracasso ou que decepcionou sua família",
  "Dificuldade de concentração nas atividades do dia a dia",
  "Mover-se ou falar devagar a ponto de outras pessoas perceberem. Ou o contrário – estar muito agitado(a) ou inquieto(a)",
  "Pensamentos de que seria melhor estar morto(a) ou de se machucar de alguma forma"
];

const options = [
  { value: "0", label: "Nenhum dia" },
  { value: "1", label: "Vários dias" },
  { value: "2", label: "Mais da metade dos dias" },
  { value: "3", label: "Quase todos os dias" }
];

const Phq9Page = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleOptionChange = (questionIndex: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: parseInt(value)
    }));
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setScore(totalScore);
  };

  const getScoreInterpretation = (score: number) => {
    if (score <= 4) return "Depressão mínima";
    if (score <= 9) return "Depressão leve";
    if (score <= 14) return "Depressão moderada";
    if (score <= 19) return "Depressão moderadamente grave";
    return "Depressão grave";
  };

  const getSeverityClass = (score: number) => {
    if (score <= 4) return "bg-green-50 border-green-100 text-green-700";
    if (score <= 9) return "bg-yellow-50 border-yellow-100 text-yellow-700";
    if (score <= 14) return "bg-orange-50 border-orange-100 text-orange-700";
    return "bg-red-50 border-red-100 text-red-700";
  };

  const isFormComplete = Object.keys(answers).length === phq9Questions.length;

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
                onClick={() => navigate("/categorias/ansiedade")}
              >
                Ansiedade e Depressão
              </Button>
              <span>/</span>
              <span className="text-neutral-900">PHQ-9</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4 text-left">
                PHQ-9 – Questionário do Paciente para Depressão
              </h1>
              
              <div className="text-neutral-700 mb-6 text-left">
                <p className="mb-4 text-left">
                  O PHQ-9 é um instrumento breve e eficaz para triagem e monitoramento da gravidade dos sintomas depressivos.
                </p>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900 mb-1 text-left">Domínio Público</h3>
                      <p className="text-sm text-blue-700 text-left">
                        O PHQ-9 é de domínio público e pode ser usado gratuitamente para qualquer aplicação clínica, institucional ou científica.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="font-medium mb-2 text-left">Instruções:</p>
                <p className="mb-4 text-left">
                  Nas últimas duas semanas, com que frequência você foi incomodado por algum dos problemas abaixo?
                </p>
              </div>

              <div className="text-left">
                <form className="space-y-6">
                  {phq9Questions.map((question, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex flex-col text-left">
                          <h3 className="font-medium text-neutral-900 mb-3 text-left">
                            {index + 1}. {question}
                          </h3>
                          
                          <RadioGroup
                            value={answers[index]?.toString() || ""}
                            onValueChange={(value) => handleOptionChange(index, value)}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
                          >
                            {options.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem 
                                  value={option.value} 
                                  id={`q${index}-${option.value}`}
                                  className="transition-all duration-200"
                                />
                                <Label
                                  htmlFor={`q${index}-${option.value}`}
                                  className="text-sm text-neutral-700 cursor-pointer text-left"
                                >
                                  {option.label} ({option.value})
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="pt-6 border-t border-gray-200">
                    <Button 
                      onClick={calculateScore}
                      disabled={!isFormComplete}
                      className="w-full md:w-auto"
                    >
                      Calcular Resultado
                    </Button>
                  </div>
                </form>

                {score !== null && (
                  <div className={`mt-6 p-4 border rounded-lg ${getSeverityClass(score)} text-left`}>
                    <div className="mb-2">
                      <p className="font-medium text-left">
                        Sua pontuação: {score} de 27 pontos
                      </p>
                    </div>
                    <p className="font-medium mb-2 text-left">
                      Interpretação: {getScoreInterpretation(score)}
                    </p>
                    
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            score <= 4 ? "bg-green-500" :
                            score <= 9 ? "bg-yellow-500" :
                            score <= 14 ? "bg-orange-500" : "bg-red-500"
                          }`} 
                          style={{ width: `${(score / 27) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-neutral-500 mt-1">
                        <span>0</span>
                        <span>27</span>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-left">
                      <p className="mb-2 text-left"><strong>Interpretação dos escores:</strong></p>
                      <ul className="space-y-1 text-left">
                        <li>• 0–4: Depressão mínima</li>
                        <li>• 5–9: Depressão leve</li>
                        <li>• 10–14: Depressão moderada</li>
                        <li>• 15–19: Depressão moderadamente grave</li>
                        <li>• 20–27: Depressão grave</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <Button 
                  className="w-full mb-6" 
                  variant="outline"
                  onClick={() => window.open('/questionarios/phq-9.pdf', '_blank')}
                >
                  Baixar versão em PDF
                </Button>
                
                <div className="space-y-4 text-left">
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2 text-left">Sobre o PHQ-9</h3>
                    <p className="text-sm text-neutral-600 text-left">
                      O PHQ-9 é uma ferramenta de triagem amplamente utilizada para detectar e monitorar a gravidade da depressão em cuidados primários.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2 text-left">Características</h3>
                    <ul className="text-sm text-neutral-600 space-y-1 text-left">
                      <li>• 9 itens baseados nos critérios do DSM-IV</li>
                      <li>• Tempo de aplicação: 2-3 minutos</li>
                      <li>• Pontuação: 0-27 pontos</li>
                      <li>• Domínio público</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2 text-left">Propriedades Psicométricas</h3>
                    <ul className="text-sm text-neutral-600 space-y-1 text-left">
                      <li>• Sensibilidade: 77,5%</li>
                      <li>• Especificidade: 86,7%</li>
                      <li>• Ponto de corte {">="} 10</li>
                      <li>• Alfa de Cronbach {">"} 0,80</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2 text-left">Referências</h3>
                    <div className="text-xs text-neutral-600 space-y-2 text-left">
                      <p className="text-left">
                        Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606–13.
                      </p>
                      <p className="text-left">
                        Santos IS, et al. Sensitivity and specificity of the Patient Health Questionnaire-9 (PHQ-9) among adults from the general population. Cad Saúde Pública. 2013;29(8):1533–1543.
                      </p>
                    </div>
                  </div>
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

export default Phq9Page;

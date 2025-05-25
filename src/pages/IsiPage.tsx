
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuestionItem from "@/components/questionnaire/QuestionItem";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";

const questions = [
  {
    id: 1,
    text: "Dificuldade em pegar no sono",
    options: ["0", "1", "2", "3", "4"],
    optionLabels: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 2,
    text: "Dificuldade em manter o sono",
    options: ["0", "1", "2", "3", "4"],
    optionLabels: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 3,
    text: "Problema de despertar muito cedo",
    options: ["0", "1", "2", "3", "4"],
    optionLabels: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 4,
    text: "Quanto você está satisfeito ou insatisfeito com o padrão atual de seu sono?",
    options: ["0", "1", "2", "3", "4"],
    optionLabels: ["Muito Satisfeito", "Satisfeito", "Indiferente", "Insatisfeito", "Muito Insatisfeito"]
  },
  {
    id: 5,
    text: "Em que medida você considera que seu problema de sono interfere nas suas atividades diurnas (por exemplo: fadiga diária, habilidade para trabalhar/ executar atividades diárias, concentração, memória, humor, etc.)",
    options: ["0", "1", "2", "3", "4"],
    optionLabels: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 6,
    text: "Quanto você acha que os outros percebem que o seu problema de sono atrapalha sua qualidade de vida?",
    options: ["0", "1", "2", "3", "4"],
    optionLabels: ["Nenhuma", "Leve", "Moderada", "Grave", "Muito grave"]
  },
  {
    id: 7,
    text: "O quanto você está preocupado/ estressado com o seu problema de sono?",
    options: ["0", "1", "2", "3", "4"],
    optionLabels: ["Não estou preocupado", "Um pouco preocupado", "De algum modo preocupado", "Muito preocupado", "Extremamente preocupado"]
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

  const getSeverityType = (score: number) => {
    if (score <= 7) return "success";
    if (score <= 14) return "info";
    if (score <= 21) return "warning";
    return "danger";
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
              <h1 className="text-2xl font-bold text-neutral-900 mb-4 text-left">
                Índice de Gravidade de Insônia (ISI)
              </h1>
              
              <p className="text-neutral-700 mb-6 text-left">
                Avalie a gravidade atual da sua insônia (nas últimas 2 a 4 semanas) em relação a:
              </p>

              <div className="space-y-6">
                {questions.map((question) => (
                  <QuestionItem
                    key={question.id}
                    id={question.id}
                    title={question.text}
                    options={question.options}
                    optionLabels={question.optionLabels}
                    value={answers[question.id]?.toString() || ""}
                    onChange={(value) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: parseInt(value),
                      }))
                    }
                    inline={true}
                    hideOptionNumbers={true}
                    boldTitle={true}
                  />
                ))}

                <Button
                  className="w-full md:w-auto"
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length !== questions.length}
                >
                  Calcular Escore
                </Button>

                {score !== null && (
                  <ResultDisplay 
                    score={score}
                    maxScore={28}
                    interpretation={getScoreSeverity(score)}
                    severity={getSeverityType(score)}
                    notes={[
                      "0-7: ausência de insônia significativa",
                      "8-14: limite inferior para insônia",
                      "15-21: insônia clínica moderada",
                      "22-28: insônia clínica grave"
                    ]}
                  />
                )}
              </div>
            </div>

            {/* Right Panel - Info and Download */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <Button className="w-full mb-6" variant="outline">
                  Baixar versão em PDF
                </Button>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Sobre a escala</h2>
                <p className="text-neutral-700 mb-6 text-left">
                  O Índice de Gravidade de Insônia avalia a severidade dos sintomas de insônia e seu 
                  impacto na qualidade de vida. É composto por sete perguntas em escala de 0 a 4, 
                  resultando em escore total de 0 a 28.
                </p>
                
                <p className="text-neutral-700 mb-6 text-left">
                  O ISI tem validação na lingua portuguesa.
                </p>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Referências</h2>
                <div className="space-y-3">
                  <p className="text-sm text-neutral-600 text-left">
                    CASTRO, Laura de Siqueira. Adaptação e Validação do Índice de Gravidade de Insônia (IGI): 
                    Caracterização Populacional, Valores Normativos e Aspectos Associados. 2011. 104 f. 
                    Dissertação (Mestrado) - Escola Paulista de Medicina, Universidade Federal de São Paulo. 
                    São Paulo, 2011. URL: http://repositorio.unifesp.br/handle/11600/23193
                  </p>
                  
                  <p className="text-sm text-neutral-600 text-left">
                    Morin, C. M. (1993). Insomnia Severity Index (ISI) [Database record]. APA PsycTests.
                    https://doi.org/10.1037/t07115-000
                  </p>
                  
                  <p className="text-sm text-neutral-600 text-left">
                    Morin CM, Belleville G, Bélanger L, Ivers H. The Insomnia Severity Index: psychometric 
                    indicators to detect insomnia cases and evaluate treatment response. Sleep. 2011 May;34(5):601–608.
                  </p>
                  
                  <p className="text-sm text-neutral-600 text-left">
                    Bastien CH, Vallières A, Morin CM. Validation of the Insomnia Severity Index as an 
                    outcome measure for insomnia research. Sleep Med. 2001;2(4):297–307. 
                    doi:10.1016/S1389-9457(00)00065-4
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

export default IsiPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuestionItem from "@/components/questionnaire/QuestionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Definindo os grupos de perguntas
const questionGroups = [
  {
    id: 1,
    title: "Grupo 1 – Nível de atividade",
    questions: [
      "Concentrar-se numa tarefa como um jogo ou um trabalho manual",
      "Lembrar de coisas",
      "Terminar uma refeição", 
      "Conduzir um veículo por longas distâncias (mais de 100km) como passageiro",
      "Conduzir um veículo por distâncias curtas (menos de 100km) como passageiro",
      "Conduzir um veículo por longas distâncias (mais de 100km) como condutor",
      "Conduzir um veículo por distâncias curtas (menos de 100km) como condutor",
      "Atividades domésticas como limpeza da casa, lavagem da roupa, compras",
      "Conseguir fazer tudo o que quer fazer"
    ]
  },
  {
    id: 2,
    title: "Grupo 2 – Nível de Vigilância",
    questions: [
      "Ficar acordado assistindo TV",
      "Ficar acordado durante atividades que exigem alguma concentração como ouvir música ou ler",
      "Ficar acordado em locais públicos como cinema, igreja ou palestras",
      "Ficar acordado como passageiro de um carro ou transporte público por uma hora sem parar",
      "Ficar acordado conversando com alguém",
      "Ficar acordado depois do almoço sem álcool",
      "Ficar acordado numa conversa com outra pessoa"
    ]
  },
  {
    id: 3,
    title: "Grupo 3 – Intimidade e relacionamento sexual",
    questions: [
      "Ter interesse por sexo",
      "Ter relações sexuais",
      "Manter um relacionamento com o/a parceiro/a, família ou amigos",
      "Exercer a paternidade/maternidade (se tem filhos com menos de 18 anos em casa)"
    ]
  },
  {
    id: 4,
    title: "Grupo 4 – Produtividade Geral",
    questions: [
      "Exercer atividade remunerada ou de voluntariado",
      "Manter um emprego", 
      "Ter relacionamentos com colegas de trabalho",
      "Executar atividades no trabalho de forma eficaz",
      "Executar atividades no trabalho de forma segura",
      "Usar todo o seu potencial para progredir na carreira",
      "Usar todo o seu potencial para completar a educação",
      "Usar todo o seu potencial para completar projetos domésticos"
    ]
  },
  {
    id: 5,
    title: "Grupo 5 – Performance Social", 
    questions: [
      "Participar ativamente de atividades sociais (ex: festas, barbecues, atividades noturnas)",
      "Participar ativamente de atividades recreativas ou de lazer (ex: esportes organizados, exercícios, praia)"
    ]
  }
];

const options = [
  { value: "not-applicable", label: "Eu não faço esta atividade por outras razões", points: 0 },
  { value: "1", label: "Muita dificuldade", points: 1 },
  { value: "2", label: "Média dificuldade", points: 2 },
  { value: "3", label: "Pouca dificuldade", points: 3 },
  { value: "4", label: "Nenhuma dificuldade", points: 4 }
];

const Fosq36Page = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);

  const handleAnswer = (groupId: number, questionIndex: number, value: string) => {
    const key = `g${groupId}_q${questionIndex}`;
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const calculateResults = () => {
    const groupResults: any = {};
    let totalGeral = 0;
    let totalMedias = 0;

    questionGroups.forEach(group => {
      const groupAnswers: number[] = [];
      let groupTotal = 0;
      
      group.questions.forEach((_, questionIndex) => {
        const key = `g${group.id}_q${questionIndex}`;
        const answer = answers[key];
        
        if (answer && answer !== "not-applicable") {
          const points = parseInt(answer);
          groupAnswers.push(points);
          groupTotal += points;
        }
      });

      const groupMedia = groupAnswers.length > 0 ? groupTotal / groupAnswers.length : 0;
      
      groupResults[`grupo${group.id}`] = {
        respostas: groupAnswers,
        total: groupTotal,
        media: parseFloat(groupMedia.toFixed(2))
      };

      totalGeral += groupTotal;
      totalMedias += groupMedia;
    });

    const totalMediasX5 = totalMedias * 5;

    const finalResults = {
      fosq36: {
        ...groupResults,
        totalGeral: totalGeral,
        totalMedias: parseFloat(totalMedias.toFixed(2)),
        totalMediasX5: parseFloat(totalMediasX5.toFixed(2))
      }
    };

    setResults(finalResults);
  };

  const allQuestionsAnswered = () => {
    const totalQuestions = questionGroups.reduce((sum, group) => sum + group.questions.length, 0);
    return Object.keys(answers).length === totalQuestions;
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
                onClick={() => navigate("/categorias/qualidade-vida")}
              >
                Qualidade de Vida
              </Button>
              <span>/</span>
              <span className="text-neutral-900">FOSQ-36</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4 text-left">
                FOSQ-36 (Functional Outcomes of Sleep Questionnaire) – Versão em Português
              </h1>
              
              <p className="text-neutral-700 mb-6 text-left">
                Questionário de resultados funcionais relacionados ao sono. As palavras <strong>"com sono"</strong> ou <strong>"cansado"</strong> significam a sensação de não conseguir manter os olhos abertos, "batendo cabeça" ou vontade de cochilar, não se referindo a fadiga pós-exercício.
              </p>

              <div className="space-y-8">
                {questionGroups.map((group) => (
                  <Card key={group.id} className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-neutral-900 text-left">
                        {group.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {group.questions.map((question, questionIndex) => (
                        <QuestionItem
                          key={`${group.id}-${questionIndex}`}
                          id={`g${group.id}_q${questionIndex}`}
                          title={`${questionIndex + 1}. ${question}`}
                          options={options.map(opt => opt.value)}
                          optionLabels={options.map(opt => opt.label)}
                          value={answers[`g${group.id}_q${questionIndex}`] || ""}
                          onChange={(value) => handleAnswer(group.id, questionIndex, value)}
                          variant="panel"
                          boldTitle={true}
                        />
                      ))}
                    </CardContent>
                  </Card>
                ))}

                <Button
                  className="w-full md:w-auto"
                  onClick={calculateResults}
                  disabled={!allQuestionsAnswered()}
                >
                  Calcular Resultado
                </Button>

                {results && (
                  <Card className="mt-6 border border-primary-200 bg-primary-50">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-primary-900 text-left">
                        Resultados FOSQ-36
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {questionGroups.map((group) => {
                          const groupResult = results.fosq36[`grupo${group.id}`];
                          return (
                            <div key={group.id} className="text-left">
                              <h4 className="font-semibold text-neutral-900">{group.title}:</h4>
                              <p className="text-sm text-neutral-700">
                                Total: {groupResult.total} | Média: {groupResult.media}
                              </p>
                            </div>
                          );
                        })}
                        
                        <hr className="my-4" />
                        
                        <div className="text-left">
                          <p className="font-semibold text-neutral-900">
                            Total Geral: {results.fosq36.totalGeral}
                          </p>
                          <p className="font-semibold text-neutral-900">
                            Total Médias: {results.fosq36.totalMedias}
                          </p>
                          <p className="font-semibold text-primary-700">
                            Total Médias × 5: {results.fosq36.totalMediasX5}
                          </p>
                        </div>

                        <div className="mt-4 p-3 bg-neutral-100 rounded text-left">
                          <p className="text-xs text-neutral-600">
                            <strong>Dados JSON:</strong>
                          </p>
                          <pre className="text-xs text-neutral-800 mt-2 whitespace-pre-wrap">
                            {JSON.stringify(results, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                  O FOSQ-36 é um questionário validado que avalia o impacto funcional dos distúrbios do sono na qualidade de vida. 
                  Ele mede cinco domínios: atividade, vigilância, intimidade, produtividade geral e desempenho social.
                </p>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Interpretação</h2>
                <p className="text-neutral-700 mb-6 text-left">
                  Pontuações mais altas indicam melhor funcionamento. O questionário utiliza uma escala de 1-4 pontos, 
                  onde 4 representa "nenhuma dificuldade" e 1 representa "muita dificuldade".
                </p>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Referências</h2>
                <p className="text-sm text-neutral-600 text-left">
                  Weaver TE, Laizner AM, Evans LK, et al. An instrument to measure functional status outcomes for disorders of excessive sleepiness. Sleep. 1997;20(10):835-43.
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

export default Fosq36Page;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type QuestionItem = {
  id: string;
  text: string;
  description: string;
};

const questions: QuestionItem[] = [
  {
    id: "humor-ansioso",
    text: "Humor Ansioso",
    description: "Preocupações, previsão do pior, antecipação temerosa, irritabilidade, etc."
  },
  {
    id: "tensao",
    text: "Tensão",
    description: "Sensações de tensão, fadiga, reação de sobressalto, comove-se facilmente, tremores, incapacidade para relaxar e agitação."
  },
  {
    id: "medos",
    text: "Medos",
    description: "De escuro, de estranhos, de ficar sozinho, de animais, de trânsito, de multidões, etc. (avaliar qualquer um por intensidade e frequência de exposição)."
  },
  {
    id: "insonia",
    text: "Insônia",
    description: "Dificuldade em adormecer, sono interrompido, insatisfeito e fadiga ao despertar, sonhos penosos, pesadelos, terrores noturnos, etc."
  },
  {
    id: "intelectual",
    text: "Intelectual (cognitivo)",
    description: "Dificuldade de concentração, falhas de memória, etc."
  },
  {
    id: "humor-deprimido",
    text: "Humor Deprimido",
    description: "Perda de interesse, falta de prazer nos passatempos, depressão, despertar precoce, oscilação do humor, etc."
  },
  {
    id: "somatizacoes-motoras",
    text: "Somatizações Motoras",
    description: "Dores musculares, rigidez muscular, contrações espásticas, contrações involuntárias, ranger de dentes, voz insegura, etc."
  },
  {
    id: "somatizacoes-sensoriais",
    text: "Somatizações Sensoriais",
    description: "Ondas de frio ou calor, sensações de fraqueza, visão turva, sensação de picadas, formigamento, câimbras, dormências, sensações auditivas de tinidos, zumbidos, etc."
  },
  {
    id: "sintomas-cardiovasculares",
    text: "Sintomas Cardiovasculares",
    description: "Taquicardia, palpitações, dores torácicas, sensação de desmaio, sensação de extrassístoles, latejamento dos vasos sanguíneos, vertigens, batimentos irregulares, etc."
  },
  {
    id: "sintomas-respiratorios",
    text: "Sintomas Respiratórios",
    description: "Sensações de opressão ou constrição no tórax, sensações de sufocamento ou asfixia, suspiros, dispneia, etc."
  },
  {
    id: "sintomas-gastrointestinais",
    text: "Sintomas Gastrointestinais",
    description: "Deglutição difícil, aerofagia, dispepsia, dores abdominais, ardência ou azia, dor pré ou pós-prandial, sensações de plenitude ou de vazio gástrico, náuseas, vômitos, diarreia ou constipação, pirose, meteorismo (gases), etc."
  },
  {
    id: "sintomas-geniturinarios",
    text: "Sintomas Geniturinários",
    description: "Polaciúria, urgência da micção, amenorreia, menorragia, frigidez, ereção incompleta, ejaculação precoce, impotência, diminuição da libido, etc."
  },
  {
    id: "sintomas-autonomicos",
    text: "Sintomas Autonômicos",
    description: "Boca seca, rubor, palidez, tendência a sudorese, mãos molhadas, inquietação, tensão, dor de cabeça, pelos eriçados, tonteiras, etc."
  },
  {
    id: "comportamento-entrevista",
    text: "Comportamento na Entrevista",
    description: "Tenso, pouco à vontade, inquieto, a andar a esmo, agitação das mãos (tremores, remexer, cacoetes) franzir a testa e face tensa, engolir seco, arrotos, dilatação pupilar, sudação, respiração suspirosa, palidez facial, pupilas dilatadas, etc."
  }
];

const HamAPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: parseInt(value, 10),
    }));
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setScore(totalScore);
  };

  const getScoreInterpretation = (score: number) => {
    if (score <= 17) return "Ansiedade normal";
    if (score <= 24) return "Ansiedade leve";
    if (score <= 29) return "Ansiedade moderada";
    return "Ansiedade grave";
  };

  const getSeverityClass = (score: number) => {
    if (score <= 17) return "text-green-700 bg-green-50";
    if (score <= 24) return "text-yellow-700 bg-yellow-50";
    if (score <= 29) return "text-orange-700 bg-orange-50";
    return "text-red-700 bg-red-50";
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
                onClick={() => navigate("/categorias/outros")}
              >
                Outros
              </Button>
              <span>/</span>
              <span className="text-neutral-900">Escala de Avaliação de Ansiedade de Hamilton</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Escala de Avaliação de Ansiedade de Hamilton (HAM-A)
              </h1>

              <p className="mb-6 text-neutral-600">
                Avalie cada item de acordo com os seguintes graus de intensidade:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-200 mb-4">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 border-b text-left text-sm">Grau</th>
                      <th className="py-2 px-4 border-b text-left text-sm">Intensidade</th>
                      <th className="py-2 px-4 border-b text-left text-sm">Pontuação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="py-2 px-4 border-b">Nenhum</td><td className="py-2 px-4 border-b">Ausência do sintoma</td><td className="py-2 px-4 border-b">0</td></tr>
                    <tr><td className="py-2 px-4 border-b">Leve</td><td className="py-2 px-4 border-b">Sintoma leve, pouco intenso</td><td className="py-2 px-4 border-b">1</td></tr>
                    <tr><td className="py-2 px-4 border-b">Médio</td><td className="py-2 px-4 border-b">Sintoma moderado, perturba, mas é tolerável</td><td className="py-2 px-4 border-b">2</td></tr>
                    <tr><td className="py-2 px-4 border-b">Forte</td><td className="py-2 px-4 border-b">Sintoma severo, muito perturbador</td><td className="py-2 px-4 border-b">3</td></tr>
                    <tr><td className="py-2 px-4 border-b">Máximo</td><td className="py-2 px-4 border-b">Sintoma extremo, incapacitante</td><td className="py-2 px-4 border-b">4</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-6 mb-6">
                {questions.map((question) => (
                  <Card key={question.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-2">
                        <div className="mb-2">
                          <h3 className="font-medium text-neutral-900">{question.text}</h3>
                          <p className="text-sm text-neutral-600">{question.description}</p>
                        </div>
                        
                        <RadioGroup
                          value={answers[question.id]?.toString() || ""}
                          onValueChange={(value) => handleOptionChange(question.id, value)}
                          className="flex flex-wrap gap-4 mt-2"
                        >
                          {[0, 1, 2, 3, 4].map((value) => (
                            <div key={`${question.id}-${value}`} className="flex items-center space-x-2">
                              <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                              <Label htmlFor={`${question.id}-${value}`}>
                                {value === 0 && "Nenhum"}
                                {value === 1 && "Leve"}
                                {value === 2 && "Médio"}
                                {value === 3 && "Forte"}
                                {value === 4 && "Máximo"}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  className="w-full md:w-auto"
                  onClick={calculateScore}
                  disabled={!isFormComplete}
                >
                  Calcular Pontuação
                </Button>

                {score !== null && (
                  <div className={`mt-6 p-4 border rounded-lg ${getSeverityClass(score)}`}>
                    <p className="font-medium mb-1">
                      Sua pontuação: {score} pontos
                    </p>
                    <p>
                      Interpretação: <strong>{getScoreInterpretation(score)}</strong>
                    </p>
                    <p className="text-xs mt-2">
                      * Os primeiros 7 itens estão relacionados a sintomas de humor ansioso.<br />
                      * Os últimos 7 itens estão relacionados a sintomas físicos de ansiedade.<br />
                      * A pontuação varia de 0 a 56.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Info and Download */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <Button className="w-full mb-6" variant="outline" onClick={() => window.open('/questionarios/ham-a.pdf', '_blank')}>
                  Baixar versão em PDF
                </Button>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre a escala</h2>
                <p className="text-neutral-700 mb-4">
                  A Escala de Avaliação de Ansiedade de Hamilton (HAM-A) é um instrumento clínico 
                  aplicado por profissionais para avaliar a gravidade dos sintomas de ansiedade.
                </p>
                
                <p className="text-neutral-700 mb-4">
                  Desenvolvida originalmente por Max Hamilton em 1959, esta escala consiste em 14 itens que 
                  abrangem tanto sintomas psíquicos quanto somáticos da ansiedade.
                </p>

                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Importante:</strong> Esta escala deve ser aplicada por um profissional qualificado. 
                    O resultado obtido aqui não substitui uma avaliação clínica adequada.
                  </p>
                </div>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Interpretação</h2>
                <ul className="list-disc pl-5 mb-6 text-neutral-700 space-y-1">
                  <li>0 - 17: ansiedade normal</li>
                  <li>18 - 24: ansiedade leve</li>
                  <li>25 - 29: ansiedade moderada</li>
                  <li>≥ 30: ansiedade grave</li>
                </ul>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
                <p className="text-sm text-neutral-600">
                  Brendan T. Carroll, Roger G. Kathol, Russell Noyes, Tina G. Wald, Gerald H. Clamon,
                  Screening for depression and anxiety in cancer patients using the Hospital Anxiety and Depression Scale,
                  General Hospital Psychiatry, Volume 15, Issue 2, 1993, Pages 69-74.
                </p>
                <p className="text-sm text-neutral-600 mt-2 italic">
                  Nota: Não há validação oficial para a língua portuguesa. A tradução utilizada é uma tradução livre.
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

export default HamAPage;

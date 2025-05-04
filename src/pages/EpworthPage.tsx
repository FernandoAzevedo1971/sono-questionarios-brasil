
import { useState } from "react";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import QuestionItem from "@/components/questionnaire/QuestionItem";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import { Button } from "@/components/ui/button";

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
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleOptionChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: parseInt(value, 10),
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      const total = Object.values(answers).reduce((sum, value) => sum + value, 0);
      setScore(total);
    }
  };

  const getScoreSeverity = (score: number) => {
    if (score <= 5) return { text: "Sonolência diurna normal / baixa", severity: "success" as const };
    if (score <= 10) return { text: "Sonolência diurna normal / alta", severity: "success" as const };
    if (score <= 12) return { text: "Sonolência diurna excessiva leve", severity: "warning" as const };
    if (score <= 15) return { text: "Sonolência diurna excessiva moderada", severity: "warning" as const };
    return { text: "Sonolência diurna excessiva grave", severity: "danger" as const };
  };

  const answeredQuestionsCount = Object.keys(answers).length;

  return (
    <QuestionnaireContainer
      title="Escala de Sonolência de Epworth (ESE)"
      categoryPath="/categorias/sonolencia"
      categoryName="Sonolência Excessiva"
    >
      <QuestionnaireContent
        title="Escala de Sonolência de Epworth (ESE)"
        description="Qual é a probabilidade de você cochilar ou adormecer nas situações apresentadas a seguir? Considere o seu modo de vida atual. Mesmo que você não tenha feito algumas destas coisas recentemente, tente imaginar como elas o afetariam."
      >
        <ProgressBar current={answeredQuestionsCount} total={questions.length} />

        <div className="space-y-6 text-left">
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              id={question.id}
              title={question.text}
              options={[0, 1, 2, 3]}
              optionLabels={[
                "Nunca cochilaria", 
                "Pequena chance", 
                "Chance moderada", 
                "Alta chance"
              ]}
              value={answers[question.id]?.toString() || ""}
              onChange={(value) => handleOptionChange(question.id, value)}
              variant="panel"
              inline={true}
              hideOptionNumbers={true}
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
              interpretation={getScoreSeverity(score).text}
              maxScore={24}
              notes={[
                "0–5: Sonolência diurna normal / baixa",
                "6–10: Sonolência diurna normal / alta",
                "11–12: Sonolência diurna excessiva leve",
                "13–15: Sonolência diurna excessiva moderada",
                "16–24: Sonolência diurna excessiva grave"
              ]}
              severity={getScoreSeverity(score).severity}
            />
          )}
        </div>
      </QuestionnaireContent>

      <QuestionnaireSidebar pdfUrl="/questionarios/epworth.pdf">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre a escala</h2>
        <p className="text-neutral-700 mb-6 text-left">
          A Escala de Sonolência de Epworth avalia a propensão à sonolência diurna em diferentes 
          situações do cotidiano. É composta por oito perguntas em escala de 0 a 3, gerando 
          escore total de 0 a 24, com valores ≥ 10 sugerindo sonolência excessiva.
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
        <div className="text-sm text-neutral-600 text-left space-y-2">
          <p>
            Johns, M. W. (1991). A new method for measuring daytime sleepiness: the Epworth 
            sleepiness scale. Sleep, 14(6), 540-545. DOI: 10.1093/sleep/14.6.540
          </p>
          <p>
            Johns MW. Reliability and factor analysis of the Epworth Sleepiness Scale. Sleep, 1992; 15: 376-381.
          </p>
          <p>
            Johns MW. Sleepiness in different situations measured by the Epworth Sleepiness Scale. Sleep, 1994; 17: 703-710.
          </p>
          <p>
            Bertolazi AN, Fagondes SC, Hoff LS, Pedro VD, Barreto SSM, Johns MW. Validação da escala de sonolência de Epworth em português para uso no Brasil. J Bras Pneumol. 2009;35(9):877–83. doi:10.1590/S1806-37132009000900009
          </p>
        </div>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default EpworthPage;

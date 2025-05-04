
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
    text: "A sua circunferência de pescoço é maior que 40 cm?",
    options: [4, 0],
    optionLabels: ["Sim", "Não"]
  },
  {
    id: 2,
    text: "Qual é o seu índice de massa corporal (IMC)?",
    options: [3, 5, 0],
    optionLabels: ["25,0 kg/m² a 29,9 kg/m²", "≥ 30,0 kg/m²", "< 25,0 kg/m²"]
  },
  {
    id: 3,
    text: "Você ronca?",
    options: [2, 0],
    optionLabels: ["Sim", "Não"]
  },
  {
    id: 4,
    text: "A sua idade é superior a 55 anos?",
    options: [4, 0],
    optionLabels: ["Sim", "Não"]
  },
  {
    id: 5,
    text: "Qual o seu sexo legal?",
    options: [2, 0],
    optionLabels: ["Masculino", "Feminino"]
  }
];

const NoSasPage = () => {
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
    if (score >= 8) return { text: "Alta probabilidade de distúrbio respiratório do sono", severity: "danger" as const };
    return { text: "Baixa probabilidade de distúrbio respiratório do sono", severity: "success" as const };
  };

  const answeredQuestionsCount = Object.keys(answers).length;

  return (
    <QuestionnaireContainer
      title="Escore NoSAS"
      categoryPath="/categorias/apneia"
      categoryName="Apneia do Sono"
    >
      <QuestionnaireContent
        title="Escore NoSAS"
        description="Instrumento para triagem de distúrbios respiratórios do sono baseado em 5 itens: circunferência do pescoço, IMC, ronco, idade e sexo."
      >
        <ProgressBar current={answeredQuestionsCount} total={questions.length} />

        <div className="space-y-6 text-left">
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              id={question.id}
              title={question.text}
              options={question.options}
              optionLabels={question.optionLabels}
              value={answers[question.id]?.toString() || ""}
              onChange={(value) => handleOptionChange(question.id, value)}
              variant="panel"
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
              maxScore={17}
              minScore={0}
              notes={[
                "Escore NoSAS ≥ 8: Alta probabilidade de distúrbio respiratório do sono",
                "Escore NoSAS < 8: Baixa probabilidade de distúrbio respiratório do sono"
              ]}
              severity={getScoreSeverity(score).severity}
            />
          )}
        </div>
      </QuestionnaireContent>

      <QuestionnaireSidebar pdfUrl="/questionarios/nosas.pdf">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre o escore</h2>
        <p className="text-neutral-700 mb-3 text-left">
          O NoSAS é um escore de rastreamento para distúrbios respiratórios do sono, desenvolvido para 
          identificar indivíduos com alta probabilidade desses distúrbios. Ele considera cinco fatores de risco: 
          circunferência do pescoço, IMC, ronco, idade e sexo.
        </p>
        <p className="text-neutral-700 mb-3 text-left">
          <strong>Cálculo do escore:</strong>
        </p>
        <ul className="list-disc pl-5 mb-4 text-neutral-700 text-left space-y-1">
          <li>Circunferência do pescoço &gt; 40 cm: 4 pontos</li>
          <li>IMC:
            <ul className="list-disc pl-5 mt-1">
              <li>25,0 kg/m² a 29,9 kg/m² (sobrepeso): 3 pontos</li>
              <li>≥ 30,0 kg/m² (obesidade): 5 pontos</li>
              <li>&lt; 25,0 kg/m² (normal): 0 pontos</li>
            </ul>
          </li>
          <li>Presença de ronco: 2 pontos</li>
          <li>Idade superior a 55 anos: 4 pontos</li>
          <li>Sexo masculino: 2 pontos</li>
        </ul>
        <p className="text-neutral-700 mb-3 text-left">
          O escore total varia de 0 a 17 pontos. Um valor ≥ 8 indica alta probabilidade de 
          distúrbio respiratório do sono.
        </p>
        <p className="text-neutral-700 mb-6 text-left">
          <strong>Validação para o português:</strong> Não. Por se tratar de um escore baseado em 
          medidas objetivas e não um questionário com elementos subjetivos, não é esperado prejuízo 
          na sua validade ao ser utilizado em português.
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
        <div className="text-sm text-neutral-600 text-left space-y-2">
          <p>
            Marti-Soler H, Hirotsu C, Marques-Vidal P, Vollenweider P, Waeber G, Preisig M, Tafti M, 
            Bittencourt L, Tufik SB, Tufik S, Haba-Rubio J, Heinzer R. The NoSAS score for screening 
            of sleep-disordered breathing: a derivation and validation study. Lancet Respir Med. 
            2016 Sep;4(9):742-748. doi: 10.1016/S2213-2600(16)30075-3.
          </p>
        </div>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default NoSasPage;

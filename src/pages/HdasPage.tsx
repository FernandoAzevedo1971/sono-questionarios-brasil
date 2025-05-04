
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
    id: "A1",
    prefix: "A",
    number: 1,
    text: "Eu me sinto tenso ou contraído:",
    options: [3, 2, 1, 0],
    optionLabels: ["A maior parte do tempo", "Boa parte do tempo", "De vez em quando", "Nunca"]
  },
  {
    id: "D2",
    prefix: "D",
    number: 2,
    text: "Eu ainda sinto gosto pelas mesmas coisas de antes:",
    options: [0, 1, 2, 3],
    optionLabels: ["Sim, do mesmo jeito que antes", "Não tanto quanto antes", "Só um pouco", "Já não sinto mais prazer em nada"]
  },
  {
    id: "A3",
    prefix: "A",
    number: 3,
    text: "Eu sinto uma espécie de medo, como se alguma coisa ruim fosse acontecer:",
    options: [3, 2, 1, 0],
    optionLabels: ["Sim, e de um jeito muito forte", "Sim, mas não tão forte", "Um pouco, mas isso não me preocupa", "Não sinto nada disso"]
  },
  {
    id: "D4",
    prefix: "D",
    number: 4,
    text: "Dou risada e me divirto quando vejo coisas engraçadas:",
    options: [0, 1, 2, 3],
    optionLabels: ["Do mesmo jeito que antes", "Atualmente um pouco menos", "Atualmente bem menos", "Não consigo mais"]
  },
  {
    id: "A5",
    prefix: "A",
    number: 5,
    text: "Estou com a cabeça cheia de preocupações:",
    options: [3, 2, 1, 0],
    optionLabels: ["A maior parte do tempo", "Boa parte do tempo", "De vez em quando", "Raramente"]
  },
  {
    id: "D6",
    prefix: "D",
    number: 6,
    text: "Eu me sinto alegre:",
    options: [3, 2, 1, 0],
    optionLabels: ["Nunca", "Poucas vezes", "Muitas vezes", "A maior parte do tempo"]
  },
  {
    id: "A7",
    prefix: "A",
    number: 7,
    text: "Consigo ficar sentado à vontade e me sentir relaxado:",
    options: [0, 1, 2, 3],
    optionLabels: ["Sim, quase sempre", "Muitas vezes", "Poucas vezes", "Nunca"]
  },
  {
    id: "D8",
    prefix: "D",
    number: 8,
    text: "Eu estou lento para pensar e fazer as coisas:",
    options: [3, 2, 1, 0],
    optionLabels: ["Quase sempre", "Muitas vezes", "De vez em quando", "Nunca"]
  },
  {
    id: "A9",
    prefix: "A",
    number: 9,
    text: "Eu tenho uma sensação ruim de medo, como um frio na barriga ou um aperto no estômago:",
    options: [0, 1, 2, 3],
    optionLabels: ["Nunca", "De vez em quando", "Muitas vezes", "Quase sempre"]
  },
  {
    id: "D10",
    prefix: "D",
    number: 10,
    text: "Eu perdi o interesse em cuidar da minha aparência:",
    options: [3, 2, 1, 0],
    optionLabels: ["Completamente", "Não estou mais me cuidando como deveria", "Talvez não tanto quanto antes", "Me cuido do mesmo jeito que antes"]
  },
  {
    id: "A11",
    prefix: "A",
    number: 11,
    text: "Eu me sinto inquieto, como se eu não pudesse ficar parado em lugar nenhum:",
    options: [3, 2, 1, 0],
    optionLabels: ["Sim, demais", "Bastante", "Um pouco", "Não me sinto assim"]
  },
  {
    id: "D12",
    prefix: "D",
    number: 12,
    text: "Fico esperando animado as coisas boas que estão por vir:",
    options: [0, 1, 2, 3],
    optionLabels: ["Do mesmo jeito que antes", "Um pouco menos do que antes", "Bem menos do que antes", "Quase nunca"]
  },
  {
    id: "A13",
    prefix: "A",
    number: 13,
    text: "De repente, tenho a sensação de entrar em pânico:",
    options: [3, 2, 1, 0],
    optionLabels: ["A quase todo momento", "Várias vezes", "De vez em quando", "Não sinto isso"]
  },
  {
    id: "D14",
    prefix: "D",
    number: 14,
    text: "Consigo sentir prazer quando assisto a um bom programa de televisão, de rádio ou quando leio alguma coisa:",
    options: [0, 1, 2, 3],
    optionLabels: ["Quase sempre", "Várias vezes", "Poucas vezes", "Quase nunca"]
  },
];

const HdasPage = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [scores, setScores] = useState<{ anxiety: number | null; depression: number | null }>({
    anxiety: null,
    depression: null
  });

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: parseInt(value, 10),
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      let anxietyScore = 0;
      let depressionScore = 0;

      questions.forEach(question => {
        if (question.prefix === "A") {
          anxietyScore += answers[question.id] ?? 0;
        } else {
          depressionScore += answers[question.id] ?? 0;
        }
      });

      setScores({
        anxiety: anxietyScore,
        depression: depressionScore
      });
    }
  };

  const getScoreSeverity = (score: number) => {
    if (score >= 12) return { text: "Provável", severity: "danger" as const };
    if (score >= 8) return { text: "Possível (questionável ou duvidosa)", severity: "warning" as const };
    return { text: "Improvável", severity: "success" as const };
  };

  const answeredQuestionsCount = Object.keys(answers).length;

  return (
    <QuestionnaireContainer
      title="Escala Hospitalar de Ansiedade e Depressão (HDAS)"
      categoryPath="/categorias/ansiedade"
      categoryName="Avaliação de Ansiedade e Depressão"
    >
      <QuestionnaireContent
        title="Escala Hospitalar de Ansiedade e Depressão (HDAS)"
        description="Este questionário ajudará o seu médico a saber como você está se sentindo. Leia todas as frases. Marque a resposta que melhor corresponder a como você tem se sentido na ÚLTIMA SEMANA. Não é preciso ficar pensando muito em cada questão. Neste questionário as respostas espontâneas têm mais valor do que aquelas em que se pensa muito."
      >
        <ProgressBar current={answeredQuestionsCount} total={questions.length} />

        <div className="space-y-6 text-left">
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              id={question.id}
              title={`${question.prefix} ${question.number}) ${question.text}`}
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

          {(scores.anxiety !== null && scores.depression !== null) && (
            <div className="space-y-6 mt-8">
              <ResultDisplay
                score={scores.anxiety}
                interpretation={`Ansiedade: ${getScoreSeverity(scores.anxiety).text}`}
                maxScore={21}
                minScore={0}
                notes={[
                  "0-7: Improvável (ansiedade)",
                  "8-11: Possível (questionável ou duvidosa)",
                  "≥12: Provável (ansiedade)"
                ]}
                severity={getScoreSeverity(scores.anxiety).severity}
              />
              
              <ResultDisplay
                score={scores.depression}
                interpretation={`Depressão: ${getScoreSeverity(scores.depression).text}`}
                maxScore={21}
                minScore={0}
                notes={[
                  "0-7: Improvável (depressão)",
                  "8-11: Possível (questionável ou duvidosa)",
                  "≥12: Provável (depressão)"
                ]}
                severity={getScoreSeverity(scores.depression).severity}
              />
            </div>
          )}
        </div>
      </QuestionnaireContent>

      <QuestionnaireSidebar pdfUrl="/questionarios/hdas.pdf">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre a escala</h2>
        <p className="text-neutral-700 mb-3 text-left">
          A Escala Hospitalar de Ansiedade e Depressão (HDAS) foi desenvolvida para identificar quadros de 
          ansiedade e depressão em pacientes de hospitais clínicos não-psiquiátricos e posteriormente 
          foi estendida para outros contextos clínicos.
        </p>
        <p className="text-neutral-700 mb-3 text-left">
          É composta por 14 itens, dos quais sete são voltados para a avaliação da ansiedade (A) e sete 
          para a depressão (D). Cada item pode ser pontuado de 0 a 3, compondo uma pontuação máxima de 
          21 pontos para cada subescala.
        </p>
        <p className="text-neutral-700 mb-3 text-left">
          <strong>Interpretação:</strong>
        </p>
        <ul className="list-disc pl-5 mb-4 text-neutral-700 text-left space-y-1">
          <li>0 a 7 - Improvável</li>
          <li>8 a 11 - Possível (questionável ou duvidosa)</li>
          <li>≥ 12 - Provável</li>
        </ul>
        <p className="text-neutral-700 mb-6 text-left">
          <strong>Validação para o português:</strong> Sim, por Botega et al (1995).
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
        <div className="text-sm text-neutral-600 text-left space-y-2">
          <p>
            Zigmond AS, Snaith RP - The hospital anxiety and depression scale. Acta 
            Psychiatr Scand, 1983;67:361-370.
          </p>
          <p>
            Botega NJ, Bio MR, Zomignani MA et al - Transtornos de humor em enfermarias de 
            clínica médica e validação de escala de medida (HAD) de ansiedade e depressão. 
            Rev Saúde Pública, 1995;29:355-363.
          </p>
        </div>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default HdasPage;

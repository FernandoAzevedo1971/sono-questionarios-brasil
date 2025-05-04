
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
    text: "Considerando apenas seu ritmo de \"sentir-se melhor\", a que horas você se levantaria se estivesse totalmente livre para planejar seu dia?",
    options: [5, 4, 3, 2, 1],
    optionLabels: ["5h – 6h30", "6h30 – 7h45", "7h45 – 9h45", "9h45 – 11h", "11h – 12h"]
  },
  {
    id: 2,
    text: "Considerando apenas seu ritmo de \"sentir-se melhor\", a que horas você se deitaria se estivesse totalmente livre para planejar sua noite?",
    options: [5, 4, 3, 2, 1],
    optionLabels: ["20h – 21h", "21h – 22h15", "22h15 – 00h30", "00h30 – 01h45", "01h45 – 03h"]
  },
  {
    id: 3,
    text: "Se houver um horário específico em que você precise se levantar pela manhã, até que ponto você depende de um despertador para acordar?",
    options: [4, 3, 2, 1],
    optionLabels: ["Nada dependente", "Pouco dependente", "Moderadamente dependente", "Muito dependente"]
  },
  {
    id: 4,
    text: "Supondo condições ambientais adequadas, quão fácil você acha levantar-se pela manhã?",
    options: [1, 2, 3, 4],
    optionLabels: ["Nada fácil", "Pouco fácil", "Moderadamente fácil", "Muito fácil"]
  },
  {
    id: 5,
    text: "Quão alerta você se sente durante a primeira meia-hora após acordar pela manhã?",
    options: [1, 2, 3, 4],
    optionLabels: ["Nada alerta", "Pouco alerta", "Moderadamente alerta", "Muito alerta"]
  },
  {
    id: 6,
    text: "Como está seu apetite na primeira meia-hora após acordar pela manhã?",
    options: [1, 2, 3, 4],
    optionLabels: ["Muito ruim", "Pouco satisfatório", "Moderadamente bom", "Muito bom"]
  },
  {
    id: 7,
    text: "Durante a primeira meia-hora após acordar, o quão cansado você se sente?",
    options: [1, 2, 3, 4],
    optionLabels: ["Muito cansado", "Moderadamente cansado", "Moderadamente descansado", "Muito descansado"]
  },
  {
    id: 8,
    text: "Quando você não tem compromissos no dia seguinte, a que horas você vai para a cama em comparação ao seu horário habitual?",
    options: [4, 3, 2, 1],
    optionLabels: ["Quase nunca mais tarde", "Menos de uma hora mais tarde", "De 1 a 2 horas mais tarde", "Mais de duas horas mais tarde"]
  },
  {
    id: 9,
    text: "Você decidiu fazer exercício físico durante uma hora, duas vezes por semana, e um amigo sugere praticar das 7h às 8h. Considerando apenas seu ritmo de \"sentir-se melhor\", como você acha que seu desempenho seria?",
    options: [4, 3, 2, 1],
    optionLabels: ["Em ótima forma", "Em forma razoável", "Dificuldade moderada", "Muita dificuldade"]
  },
  {
    id: 10,
    text: "A que horas, à noite, você se sente cansado e com necessidade de dormir?",
    options: [5, 4, 3, 2, 1],
    optionLabels: ["20h – 21h", "21h – 22h15", "22h15 – 00h45", "00h45 – 02h", "02h – 03h"]
  },
  {
    id: 11,
    text: "Você deseja ter seu melhor desempenho em um teste de duas horas que será mentalmente exaustivo. Se pudesse planejar seu dia livremente, em qual período escolheria fazer o teste?",
    options: [6, 4, 2, 0],
    optionLabels: ["8h – 10h", "11h – 13h", "15h – 17h", "19h – 21h"]
  },
  {
    id: 12,
    text: "Se você fosse para a cama às 23h, em qual nível de cansaço você estaria?",
    options: [0, 2, 3, 5],
    optionLabels: ["Nada cansado", "Pouco cansado", "Moderadamente cansado", "Muito cansado"]
  },
  {
    id: 13,
    text: "Por alguma razão você foi para a cama várias horas mais tarde que o habitual, mas não precisa acordar em um horário específico. Qual dos seguintes eventos você provavelmente experimentaria?",
    options: [4, 3, 2, 1],
    optionLabels: ["Acordaria no horário habitual e não voltaria a dormir", "Acordaria no horário habitual e cochilaria depois", "Acordaria no horário habitual e voltaria a dormir", "Não acordaria até mais tarde que o habitual"]
  },
  {
    id: 14,
    text: "Em uma noite você precisa ficar acordado das 4h às 6h para fazer vigília. No dia seguinte não há compromissos. Qual opção se encaixa melhor para você?",
    options: [1, 2, 3, 4],
    optionLabels: ["Só dormiria depois do término da vigília", "Dormiria um pouco antes e depois da vigília", "Dormiria bem antes e cochilaria depois", "Dormiria tudo antes da vigília"]
  },
  {
    id: 15,
    text: "Você tem duas horas de trabalho físico intenso e pode planejar seu dia livremente. Em qual período considera que seu desempenho seria melhor?",
    options: [4, 3, 2, 1],
    optionLabels: ["8h – 10h", "11h – 13h", "15h – 17h", "19h – 21h"]
  },
  {
    id: 16,
    text: "Você decidiu fazer exercício físico intenso por uma hora, duas vezes por semana, e um amigo sugere praticar das 22h às 23h. Considerando apenas seu ritmo de \"sentir-se melhor\", como você acha que seu desempenho seria?",
    options: [1, 2, 3, 4],
    optionLabels: ["Em ótima forma", "Em forma razoável", "Dificuldade moderada", "Muita dificuldade"]
  },
  {
    id: 17,
    text: "Suponha que você possa escolher seu horário de trabalho. Se trabalhasse cinco horas por dia (incluindo pausas) e fosse remunerado por produtividade, a que horas terminaria?",
    options: [5, 4, 3, 2, 1],
    optionLabels: ["5h – 8h", "9h", "10h – 14h", "15h – 17h", "18h – 4h"]
  },
  {
    id: 18,
    text: "Em que horário do dia você acredita atingir seu pico de \"sentir-se melhor\"?",
    options: [1, 5, 4, 3, 2],
    optionLabels: ["22h – 4h", "5h – 7h", "8h – 9h", "10h – 16h", "17h – 21h"]
  },
  {
    id: 19,
    text: "Fala-se em pessoas \"matutinas\" e \"vespertinas\". Com qual tipo você se identifica?",
    options: [6, 4, 2, 0],
    optionLabels: ["Definitivamente matutino", "Mais matutino que vespertino", "Mais vespertino que matutino", "Definitivamente vespertino"]
  }
];

const MeqHoPage = () => {
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
    if (score <= 30) return { text: "Definitivamente tipo vespertino", severity: "info" as const };
    if (score <= 41) return { text: "Moderadamente tipo vespertino", severity: "info" as const };
    if (score <= 58) return { text: "Neutro/intermediário", severity: "info" as const };
    if (score <= 69) return { text: "Moderadamente tipo matutino", severity: "info" as const };
    return { text: "Definitivamente tipo matutino", severity: "info" as const };
  };

  const answeredQuestionsCount = Object.keys(answers).length;

  return (
    <QuestionnaireContainer
      title="Questionário de Horne e Oestberg original (1976)"
      categoryPath="/categorias/cronotipos"
      categoryName="Distúrbios de Ritmo Circadiano"
    >
      <QuestionnaireContent
        title="Questionário de Horne e Oestberg original (1976)"
        description="Este questionário avalia o cronotipo dos indivíduos, classificando-os em matutinos ou vespertinos. Responda as questões considerando suas preferências e ritmos biológicos."
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
              maxScore={86}
              minScore={16}
              notes={[
                "16 – 30: Definitivamente tipo vespertino",
                "31 – 41: Moderadamente tipo vespertino",
                "42 – 58: Neutro/intermediário",
                "59 – 69: Moderadamente tipo matutino",
                "70 – 86: Definitivamente tipo matutino"
              ]}
              severity={getScoreSeverity(score).severity}
            />
          )}
        </div>
      </QuestionnaireContent>

      <QuestionnaireSidebar pdfUrl="/questionarios/meq-ho.pdf">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre o questionário</h2>
        <p className="text-neutral-700 mb-3 text-left">
          O questionário de Horne e Oestberg é um instrumento clássico para avaliação do cronotipo, 
          classificando os indivíduos de acordo com suas preferências para atividades e sono ao longo 
          do dia. Ele ajuda a identificar se uma pessoa tem tendência a ser mais matutina ou vespertina.
        </p>
        <p className="text-neutral-700 mb-6 text-left">
          <strong>Validação para o português:</strong> Não. Esta é uma tradução livre da versão original 
          em inglês, não validada formalmente para o português brasileiro.
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
        <div className="text-sm text-neutral-600 text-left space-y-2">
          <p>
            Horne JA, Östberg O. A self-assessment questionnaire to determine morningness-eveningness in human circadian rhythms. Int J Chronobiol. 1976;4(2):97–110.
          </p>
        </div>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default MeqHoPage;

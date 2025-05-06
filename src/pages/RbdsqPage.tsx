
import { useState } from "react";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ProgressBar from "@/components/questionnaire/ProgressBar";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

// Questions for RBDSQ
const questions = [
  {
    id: "q1",
    text: "1. Você já foi informado, ou acredita, que se movimenta de forma anormal durante o sono (por exemplo, chutes, socos, sentar-se, sair da cama, correr)?",
  },
  {
    id: "q2",
    text: "2. Você já se machucou ou machucou alguém durante o sono?",
  },
  {
    id: "q3",
    text: "3. Você já teve sonhos violentos ou com conteúdo de fuga ou luta?",
  },
  {
    id: "q4",
    text: "4. Esses sonhos ocorrem frequentemente?",
  },
  {
    id: "q5",
    text: "5. Você já gritou, falou alto ou teve vocalizações durante o sono?",
  },
  {
    id: "q6",
    text: "6. Seus movimentos durante o sono coincidem com o conteúdo dos seus sonhos (por exemplo, socar em um sonho e fazer um movimento com o braço)?",
  },
  {
    id: "q7",
    text: "7. Alguma vez você teve episódios desses comportamentos nas últimas semanas?",
  },
  {
    id: "q8",
    text: "8. Você tem ou teve diagnóstico de algum distúrbio neurológico? (ex.: Parkinson, demência, etc.)",
  },
  {
    id: "q9",
    text: "9. Você já foi submetido a polissonografia?",
  },
  {
    id: "q10",
    text: "10. Alguém já relatou roncos, apneias ou pausas na sua respiração durante o sono?",
  },
];

const RbdsqPage = () => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const calculateScore = () => {
    return Object.values(answers).filter((answer) => answer === "sim").length;
  };

  const interpretScore = (score: number) => {
    if (score >= 5) {
      return {
        result: "Alta probabilidade de Distúrbio Comportamental do Sono REM (RBD)",
        recommendation:
          "Recomenda-se avaliação médica especializada e polissonografia para confirmação diagnóstica.",
        color: "text-red-600",
      };
    } else {
      return {
        result: "Baixa probabilidade de Distúrbio Comportamental do Sono REM (RBD)",
        recommendation:
          "Se persistirem os sintomas, discuta com seu médico na próxima consulta.",
        color: "text-green-600",
      };
    }
  };

  const handleSubmit = () => {
    const answeredQuestionsCount = Object.keys(answers).length;
    
    if (answeredQuestionsCount < questions.length) {
      toast({
        title: "Atenção",
        description: `Por favor, responda todas as perguntas. Faltam ${
          questions.length - answeredQuestionsCount
        } respostas.`,
        variant: "destructive",
      });
      return;
    }

    setShowResults(true);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    window.scrollTo(0, 0);
  };

  const score = calculateScore();
  const interpretation = interpretScore(score);
  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <QuestionnaireContainer
      title="Questionário de Triagem para Distúrbio Comportamental do Sono REM (RBDSQ)"
      categoryPath="/categorias/movimentos"
      categoryName="Distúrbios de Movimento e Parassonias"
    >
      <QuestionnaireContent
        title="Questionário de Triagem para Distúrbio Comportamental do Sono REM (RBDSQ)"
        description="Avalia comportamentos anormais e potencialmente violentos durante o sono REM, ajudando a identificar possível distúrbio comportamental do sono REM (RBD)."
      >
        {showResults ? (
          <ResultDisplay
            score={score}
            maxScore={questions.length}
            title="Resultado RBDSQ"
            interpretation={interpretation.result}
            recommendation={interpretation.recommendation}
            color={interpretation.color}
            onReset={handleReset}
          >
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Informações adicionais:</h3>
              <p className="mb-4">
                O RBDSQ é uma ferramenta de triagem, não substitui o diagnóstico médico. 
                Um escore de 5 ou maior sugere uma alta probabilidade de distúrbio 
                comportamental do sono REM, com sensibilidade de 96% e especificidade de 56% 
                no estudo original.
              </p>
              <p>
                Para confirmação diagnóstica, é necessária a realização de polissonografia 
                com registro de sono REM sem atonia muscular e comportamentos motores 
                compatíveis.
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Suas respostas:</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-4/5">Pergunta</TableHead>
                    <TableHead className="w-1/5 text-right">Resposta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="text-left">{question.text}</TableCell>
                      <TableCell className="text-right font-medium">
                        {answers[question.id] === "sim" ? "Sim" : "Não"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResultDisplay>
        ) : (
          <>
            <div className="mb-6">
              <ProgressBar progress={progress} />
            </div>
            
            <div className="space-y-8">
              {questions.map((question) => (
                <div key={question.id} className="border p-4 rounded-lg">
                  <p className="font-medium mb-4 text-left">{question.text}</p>
                  <RadioGroup
                    value={answers[question.id]}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sim" id={`${question.id}-sim`} />
                      <Label htmlFor={`${question.id}-sim`}>Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nao" id={`${question.id}-nao`} />
                      <Label htmlFor={`${question.id}-nao`}>Não</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Button onClick={handleSubmit} size="lg">
                Calcular Resultado
              </Button>
            </div>
          </>
        )}
      </QuestionnaireContent>
      
      <QuestionnaireSidebar pdfUrl="/questionarios/rbdsq.pdf">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Sobre este questionário</h3>
          <p className="text-sm text-neutral-700">
            O Questionário de Triagem para Distúrbio Comportamental do Sono REM (RBDSQ) 
            é um instrumento validado para identificar possíveis casos de Distúrbio 
            Comportamental do Sono REM.
          </p>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-2">Como interpretar:</h4>
            <ul className="text-sm space-y-2">
              <li>
                <span className="font-medium">Pontuação:</span> Cada resposta "Sim" 
                equivale a 1 ponto
              </li>
              <li>
                <span className="font-medium">Resultado ≥ 5:</span> Alta probabilidade
                de Distúrbio Comportamental do Sono REM
              </li>
              <li>
                <span className="font-medium">Sensibilidade:</span> 96%
              </li>
              <li>
                <span className="font-medium">Especificidade:</span> 56%
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-2">Referências:</h4>
            <ul className="text-xs space-y-2 text-neutral-600">
              <li>
                Stiasny-Kolster K, et al. The REM sleep behavior disorder screening 
                questionnaire--a new diagnostic instrument. Mov Disord. 2007 Dec;22(16):2386-93.
              </li>
              <li>
                Silva DF, et al. Tradução e adaptação transcultural do REM Sleep 
                Behavior Disorder Screening Questionnaire (RBDSQ) para o português. 
                Arq Neuropsiquiatr. 2016;74(2):123–128.
              </li>
            </ul>
          </div>
        </div>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default RbdsqPage;

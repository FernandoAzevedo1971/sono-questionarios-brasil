import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Printer, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionItem from "@/components/questionnaire/QuestionItem";

type Answers = {
  [key: string]: string;
};

const Fosq10Page = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Você tem dificuldade de se concentrar em coisas que faz porque está com sono ou cansado?",
      options: ["1", "2", "3", "4"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade", 
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade"
      ]
    },
    {
      id: 2,
      text: "Você geralmente tem dificuldade de se lembrar de coisas porque está com sono ou cansado?",
      options: ["1", "2", "3", "4"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade", 
        "Nenhuma dificuldade"
      ]
    },
    {
      id: 3,
      text: "Você tem dificuldade em dirigir em uma viagem curta, de aproximadamente 150 Km, por que você fica com sono ou cansado?",
      options: ["2", "3", "4", "0"],
      optionLabels: [
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade",
        "Não dirijo"
      ]
    },
    {
      id: 4,
      text: "Você tem dificuldade em dirigir em uma viagem longa, mais 150 Km, por que você fica com sono ou cansado?",
      options: ["1", "2", "3", "4", "5"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade",
        "Não dirijo"
      ]
    },
    {
      id: 5,
      text: "Você tem dificuldade de visitar seus parentes e amigos na casa deles por estar com sono ou cansado?",
      options: ["1", "2", "3", "4"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade"
      ]
    },
    {
      id: 6,
      text: "O seu relacionamento com amigos, parentes e/ou colegas de trabalho tem sido afetado por você estar com sono ou cansado?",
      options: ["1", "2", "3", "4"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade"
      ]
    },
    {
      id: 7,
      text: "Você tem dificuldade em assistir filme por estar com sono ou cansado?",
      options: ["1", "2", "3", "4", "5"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade",
        "Não assisto filme por outra razão"
      ]
    },
    {
      id: 8,
      text: "Você tem dificuldade de realizar suas atividades no início da noite por estar com sono ou cansado?",
      options: ["1", "2", "3", "4"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade"
      ]
    },
    {
      id: 9,
      text: "Você tem dificuldade de realizar suas atividades pelas manhãs por estar com sono ou cansado?",
      options: ["1", "2", "3", "4"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade"
      ]
    },
    {
      id: 10,
      text: "O seu desejo por intimidade ou sexo está sendo afetado por que você está com sono ou cansado?",
      options: ["1", "2", "3", "4", "5"],
      optionLabels: [
        "Sim muita dificuldade",
        "Sim, moderada dificuldade",
        "Sim, pouca dificuldade",
        "Nenhuma dificuldade",
        "Não faço essa atividade por outras razões"
      ]
    }
  ];

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    const answeredQuestions = Object.keys(answers).length;
    if (answeredQuestions < 10) {
      toast({
        title: "Questionário incompleto",
        description: "Por favor, responda todas as questões antes de calcular o resultado.",
        variant: "destructive",
      });
      return;
    }

    setShowResults(true);
    toast({
      title: "Questionário concluído",
      description: "Resultado calculado com sucesso.",
    });
  };

  const resetForm = () => {
    setAnswers({});
    setShowResults(false);
  };

  const getResultInterpretation = () => {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Interpretação dos Resultados</h3>
          <p className="text-neutral-700 mb-4">
            O FOSQ-10 avalia o impacto funcional da sonolência excessiva ou fadiga na qualidade de vida. 
            As respostas indicam o grau de dificuldade em realizar atividades diárias devido ao sono ou cansaço.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Escala de Pontuação:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>1 ponto:</strong> Sim, muita dificuldade</li>
              <li>• <strong>2 pontos:</strong> Sim, moderada dificuldade</li>
              <li>• <strong>3 pontos:</strong> Sim, pouca dificuldade</li>
              <li>• <strong>4 pontos:</strong> Nenhuma dificuldade</li>
              <li>• <strong>Opções especiais:</strong> "Não dirijo" ou "Não faço por outras razões" não são pontuadas</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
            <h4 className="font-medium text-amber-900 mb-2">Interpretação Clínica:</h4>
            <p className="text-sm text-amber-800">
              Pontuações mais baixas indicam maior impacto funcional da sonolência/fadiga na qualidade de vida. 
              O resultado deve ser interpretado por um profissional de saúde qualificado dentro do contexto clínico completo.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;

  return (
    <QuestionnaireContainer
      title="FOSQ-10 (Functional Outcomes of Sleep Questionnaire)"
      categoryPath="/categorias/qualidade-vida"
      categoryName="Qualidade de Vida"
    >
      <QuestionnaireContent
        title="FOSQ-10 (Functional Outcomes of Sleep Questionnaire)"
        description={
          <div className="space-y-4">
            <p>
              Algumas pessoas têm dificuldade em realizar atividades do dia-a-dia quando estão 
              cansadas ou com sono. O propósito deste questionário é descobrir se você tem 
              dificuldade em executar certas atividades por estar muito cansado ou com muito sono.
            </p>
            <p>
              Neste questionário, quando as palavras "com sono" ou "cansado" são usadas se 
              referem a não conseguir manter os olhos abertos, "pescar", querer cochilar ou tirar
              uma soneca. Estas palavras não se referem à sensação de cansaço físico ou fadiga 
              (Exemplo: subir escada, caminhada, limpar a casa, atividades de trabalho) que se tem 
              após atividade física.
            </p>
            <p className="font-medium">
              <strong>Instruções:</strong> Por favor, coloque um "x" no espaço destinado para sua resposta em cada
              questão referente à intensidade de cada situação no seu dia-a-dia. Todas as 
              informações serão mantidas em sigilo.
            </p>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Questões */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Questões ({answeredCount}/{totalQuestions})</h3>
              <div className="text-sm text-neutral-600">
                Progresso: {Math.round((answeredCount / totalQuestions) * 100)}%
              </div>
            </div>

            {questions.map((question) => (
              <QuestionItem
                key={question.id}
                id={question.id}
                title={`${question.id.toString().padStart(2, '0')}. ${question.text}`}
                options={question.options}
                optionLabels={question.optionLabels}
                value={answers[question.id] || ""}
                onChange={(value) => handleAnswerChange(question.id, value)}
                variant="card"
                hideOptionNumbers={true}
              />
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap gap-3 pt-6 border-t">
            <Button onClick={calculateScore} className="flex-1 min-w-32">
              Calcular Resultado
            </Button>
            <Button variant="outline" onClick={resetForm}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpar
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>

          {/* Resultados */}
          {showResults && (
            <Card className="border-primary-200 bg-primary-50">
              <CardHeader>
                <CardTitle className="text-primary-900">Resultado do FOSQ-10</CardTitle>
              </CardHeader>
              <CardContent>
                {getResultInterpretation()}
              </CardContent>
            </Card>
          )}

          {/* Referências */}
          <Card className="bg-neutral-50">
            <CardHeader>
              <CardTitle className="text-sm">Referências</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-neutral-600 space-y-2">
                <p>
                  <strong>Artigo original:</strong><br />
                  Chasens ER, Ratcliffe SJ, Weaver TE. Development of the FOSQ-10: a short version of the functional outcomes of sleep questionnaire. Sleep. 2009;32(7):915–919.
                </p>
                <p>
                  <strong>Validação em português brasileiro:</strong><br />
                  Moreira APSM et al. Psychometric evaluation of the Brazilian‑Portuguese version of the Functional Outcome of Sleep Questionnaire 10 (FOSQ‑10) in patients with obstructive apnea. Braz J Otorhinolaryngol. 2024 Sep–Oct;90(5):101452.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </QuestionnaireContent>
    </QuestionnaireContainer>
  );
};

export default Fosq10Page;
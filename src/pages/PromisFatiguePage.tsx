import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PromisFatigueAnswers {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
}

const questions = [
  {
    id: 'q1',
    text: 'Eu me sinto fadigado(a)',
    options: [
      { value: '1', label: 'Nem um pouco', points: 1 },
      { value: '2', label: 'Um pouco', points: 2 },
      { value: '3', label: 'Moderadamente', points: 3 },
      { value: '4', label: 'Bastante', points: 4 },
      { value: '5', label: 'Muito', points: 5 }
    ]
  },
  {
    id: 'q2',
    text: 'Eu tenho dificuldade para começar a fazer as coisas porque estou cansado(a)',
    options: [
      { value: '1', label: 'Nem um pouco', points: 1 },
      { value: '2', label: 'Um pouco', points: 2 },
      { value: '3', label: 'Moderadamente', points: 3 },
      { value: '4', label: 'Bastante', points: 4 },
      { value: '5', label: 'Muito', points: 5 }
    ]
  },
  {
    id: 'q3',
    text: 'Em média, quão esgotado(a) você se sentiu?',
    options: [
      { value: '1', label: 'Nem um pouco', points: 1 },
      { value: '2', label: 'Um pouco', points: 2 },
      { value: '3', label: 'Moderadamente', points: 3 },
      { value: '4', label: 'Bastante', points: 4 },
      { value: '5', label: 'Muito', points: 5 }
    ]
  },
  {
    id: 'q4',
    text: 'Em média, quão fadigado(a) você esteve?',
    options: [
      { value: '1', label: 'Nem um pouco', points: 1 },
      { value: '2', label: 'Um pouco', points: 2 },
      { value: '3', label: 'Moderadamente', points: 3 },
      { value: '4', label: 'Bastante', points: 4 },
      { value: '5', label: 'Muito', points: 5 }
    ]
  },
  {
    id: 'q5',
    text: 'Em média, o quanto sua fadiga o(a) incomodou?',
    options: [
      { value: '1', label: 'Nem um pouco', points: 1 },
      { value: '2', label: 'Um pouco', points: 2 },
      { value: '3', label: 'Moderadamente', points: 3 },
      { value: '4', label: 'Bastante', points: 4 },
      { value: '5', label: 'Muito', points: 5 }
    ]
  },
  {
    id: 'q6',
    text: 'Até que ponto sua fadiga interferiu no seu funcionamento físico?',
    options: [
      { value: '1', label: 'Nem um pouco', points: 1 },
      { value: '2', label: 'Um pouco', points: 2 },
      { value: '3', label: 'Moderadamente', points: 3 },
      { value: '4', label: 'Bastante', points: 4 },
      { value: '5', label: 'Muito', points: 5 }
    ]
  },
  {
    id: 'q7',
    text: 'Com que frequência você teve que se esforçar para fazer as coisas por causa da sua fadiga?',
    options: [
      { value: '1', label: 'Nunca', points: 1 },
      { value: '2', label: 'Raramente', points: 2 },
      { value: '3', label: 'Às vezes', points: 3 },
      { value: '4', label: 'Frequentemente', points: 4 },
      { value: '5', label: 'Sempre', points: 5 }
    ]
  },
  {
    id: 'q8',
    text: 'Com que frequência você teve dificuldade em terminar as coisas por causa da sua fadiga?',
    options: [
      { value: '1', label: 'Nunca', points: 1 },
      { value: '2', label: 'Raramente', points: 2 },
      { value: '3', label: 'Às vezes', points: 3 },
      { value: '4', label: 'Frequentemente', points: 4 },
      { value: '5', label: 'Sempre', points: 5 }
    ]
  }
];

// Tabela de conversão T-Score
const tScoreTable: { [key: number]: { tScore: number; se: number } } = {
  8: { tScore: 33.1, se: 4.8 },
  9: { tScore: 38.5, se: 2.7 },
  10: { tScore: 41.0, se: 2.2 },
  11: { tScore: 42.8, se: 2.0 },
  12: { tScore: 44.3, se: 1.9 },
  13: { tScore: 45.6, se: 1.8 },
  14: { tScore: 46.9, se: 1.8 },
  15: { tScore: 48.1, se: 1.8 },
  16: { tScore: 49.2, se: 1.8 },
  17: { tScore: 50.4, se: 1.8 },
  18: { tScore: 51.5, se: 1.7 },
  19: { tScore: 52.5, se: 1.7 },
  20: { tScore: 53.6, se: 1.7 },
  21: { tScore: 54.6, se: 1.7 },
  22: { tScore: 55.6, se: 1.7 },
  23: { tScore: 56.6, se: 1.7 },
  24: { tScore: 57.5, se: 1.7 },
  25: { tScore: 58.5, se: 1.7 },
  26: { tScore: 59.4, se: 1.7 },
  27: { tScore: 60.4, se: 1.7 },
  28: { tScore: 61.3, se: 1.7 },
  29: { tScore: 62.3, se: 1.7 },
  30: { tScore: 63.3, se: 1.7 },
  31: { tScore: 64.3, se: 1.7 },
  32: { tScore: 65.3, se: 1.7 },
  33: { tScore: 66.4, se: 1.7 },
  34: { tScore: 67.5, se: 1.7 },
  35: { tScore: 68.6, se: 1.7 },
  36: { tScore: 69.8, se: 1.8 },
  37: { tScore: 71.0, se: 1.8 },
  38: { tScore: 72.4, se: 2.0 },
  39: { tScore: 74.2, se: 2.4 },
  40: { tScore: 77.8, se: 3.7 }
};

export default function PromisFatiguePage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<PromisFatigueAnswers>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: ''
  });
  const [result, setResult] = useState<{
    rawScore: number;
    tScore: number;
    se: number;
    interpretation: string;
  } | null>(null);

  const handleAnswerChange = (questionId: keyof PromisFatigueAnswers, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    if (result) {
      setResult(null);
    }
  };

  const calculateResult = () => {
    const allAnswered = Object.values(answers).every(answer => answer !== '');
    
    if (!allAnswered) {
      alert('Por favor, responda todas as questões antes de calcular o resultado.');
      return;
    }

    const rawScore = Object.values(answers).reduce((sum, answer) => sum + parseInt(answer), 0);
    const tScoreData = tScoreTable[rawScore];
    
    let interpretation = '';
    if (tScoreData.tScore === 50) {
      interpretation = 'Nível médio de fadiga da população geral de referência.';
    } else if (tScoreData.tScore > 50) {
      interpretation = `Nível de fadiga pior (maior) do que a média da população. Quanto mais alto o valor, mais severa é a fadiga.`;
    } else {
      interpretation = 'Nível de fadiga melhor (menor) do que a média da população.';
    }

    setResult({
      rawScore,
      tScore: tScoreData.tScore,
      se: tScoreData.se,
      interpretation
    });
  };

  const resetForm = () => {
    setAnswers({
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
      q8: ''
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao início
          </Button>

          <Card className="shadow-lg border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-2xl text-primary">PROMIS Fatigue v1.0 Short Form 8a</CardTitle>
                  <CardDescription className="text-base">
                    Avaliação de fadiga auto-relatada e seu impacto nas atividades físicas, mentais e sociais
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <Alert>
                <AlertDescription>
                  <strong>Instruções:</strong> Responda às perguntas com base em suas experiências na última semana (últimos 7 dias). 
                  Marque uma única resposta para cada uma das 8 perguntas.
                </AlertDescription>
              </Alert>

              {questions.map((question, index) => (
                <Card key={question.id} className="border-muted">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4 text-foreground">
                      {index + 1}. {question.text}
                    </h3>
                    <RadioGroup
                      value={answers[question.id as keyof PromisFatigueAnswers]}
                      onValueChange={(value) => handleAnswerChange(question.id as keyof PromisFatigueAnswers, value)}
                      className="space-y-2"
                    >
                      {question.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={option.value} 
                            id={`${question.id}-${option.value}`}
                            className="text-primary"
                          />
                          <Label 
                            htmlFor={`${question.id}-${option.value}`}
                            className="cursor-pointer hover:text-primary transition-colors"
                          >
                            {option.label} ({option.points} ponto{option.points > 1 ? 's' : ''})
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-4 pt-6 border-t">
                <Button 
                  onClick={calculateResult}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Calcular Resultado
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="border-primary/20 hover:bg-primary/10"
                >
                  Limpar Respostas
                </Button>
              </div>

              {result && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-primary">Resultado da Avaliação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-background/50 p-4 rounded-lg">
                        <h4 className="font-medium text-muted-foreground">Escore Bruto</h4>
                        <p className="text-2xl font-bold text-primary">{result.rawScore}</p>
                        <p className="text-sm text-muted-foreground">Faixa: 8-40</p>
                      </div>
                      <div className="bg-background/50 p-4 rounded-lg">
                        <h4 className="font-medium text-muted-foreground">T-Score</h4>
                        <p className="text-2xl font-bold text-primary">{result.tScore}</p>
                        <p className="text-sm text-muted-foreground">SE: {result.se}</p>
                      </div>
                      <div className="bg-background/50 p-4 rounded-lg">
                        <h4 className="font-medium text-muted-foreground">Referência</h4>
                        <p className="text-sm text-primary font-medium">T-Score = 50</p>
                        <p className="text-sm text-muted-foreground">População geral</p>
                      </div>
                    </div>
                    
                    <Alert>
                      <AlertDescription>
                        <strong>Interpretação:</strong> {result.interpretation}
                      </AlertDescription>
                    </Alert>

                    <div className="text-sm text-muted-foreground space-y-2">
                      <h4 className="font-medium text-foreground">Informações importantes:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>T-Score = 50: Representa o nível médio de fadiga da população geral</li>
                        <li>T-Score &gt; 50: Indica fadiga pior que a média populacional</li>
                        <li>T-Score &lt; 50: Indica fadiga melhor que a média populacional</li>
                        <li>O escore bruto deve ser convertido para T-score para interpretação clínica</li>
                        <li>Não há validação para a língua portuguesa</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-muted bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Referências e Recursos
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      <strong>Referência principal:</strong> Lai, J.S., Cella, D., Choi, S.W., et al. (2011). 
                      How Item Banks and Their Application Can Influence Measurement Practice in Rehabilitation Medicine: 
                      A PROMIS Fatigue Item Bank Example. Archives of Physical Medicine and Rehabilitation, 92(10 Supplement), S20-S27.
                    </p>
                    <p>
                      <strong>Manual de pontuação:</strong> PROMIS Fatigue User Manual and Scoring Instructions (2023)
                    </p>
                    <p>
                      <strong>Disponível em:</strong> www.HealthMeasures.net
                    </p>
                    <p className="text-orange-600 dark:text-orange-400">
                      <strong>Importante:</strong> O uso comercial requer permissão da PROMIS Health Organization (PHO). 
                      Uso clínico individual é permitido sem permissão.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
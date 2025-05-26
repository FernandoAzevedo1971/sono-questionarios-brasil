
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type BeckQuestion = {
  id: string;
  letter: string;
  title: string;
  options: Array<{
    value: string;
    score: number;
    text: string;
  }>;
};

const beckQuestions: BeckQuestion[] = [
  {
    id: "tristeza",
    letter: "A",
    title: "TRISTEZA",
    options: [
      { value: "0", score: 0, text: "Não me sinto triste." },
      { value: "1", score: 1, text: "Sinto-me melancólico(a) ou triste." },
      { value: "2a", score: 2, text: "Estou triste e melancólico(a) o tempo todo e não consigo sair disso." },
      { value: "2b", score: 2, text: "Estou tão triste e infeliz que isso é extremamente doloroso." },
      { value: "3", score: 3, text: "Estou tão triste e infeliz que não consigo suportar." },
    ],
  },
  {
    id: "pessimismo",
    letter: "B",
    title: "PESSIMISMO",
    options: [
      { value: "0", score: 0, text: "Não estou particularmente triste ou desencorajado(a) em relação ao futuro." },
      { value: "1", score: 1, text: "Sinto-me desencorajado(a) em relação ao futuro." },
      { value: "2a", score: 2, text: "Sinto que não tenho nada para alcançar." },
      { value: "2b", score: 2, text: "Sinto que nunca superarei meus problemas." },
      { value: "3", score: 3, text: "Sinto que o futuro é sem esperança e que as coisas não podem melhorar." },
    ],
  },
  {
    id: "fracasso",
    letter: "C",
    title: "SENSO DE FRACASSO",
    options: [
      { value: "0", score: 0, text: "Não me sinto um fracassado(a)." },
      { value: "1", score: 1, text: "Sinto que tenho fracassado(a) mais que uma pessoa comum." },
      { value: "2a", score: 2, text: "Sinto que tenho realizado muito pouca coisa que valha." },
      { value: "2b", score: 2, text: "Quando olho para trás, na minha vida, tudo o que posso ver é um monte de fracassos." },
      { value: "3", score: 3, text: "Sinto que sou um completo fracasso como pessoa (pai, marido, mulher...)." },
    ],
  },
  {
    id: "insatisfacao",
    letter: "D",
    title: "INSATISFAÇÃO",
    options: [
      { value: "0", score: 0, text: "Não estou particularmente insatisfeito(a)." },
      { value: "1a", score: 1, text: "Sinto-me entediado(a) a maior parte do tempo." },
      { value: "1b", score: 1, text: "Não tenho gosto pelas coisas como costumava ter." },
      { value: "2", score: 2, text: "Não consigo ter satisfação por nada atualmente." },
      { value: "3", score: 3, text: "Estou insatisfeito(a) com tudo." },
    ],
  },
  {
    id: "culpa",
    letter: "E",
    title: "CULPA",
    options: [
      { value: "0", score: 0, text: "Não me sinto particularmente culpado(a)." },
      { value: "1", score: 1, text: "Sinto-me mal ou indigno(a) uma boa parte do tempo." },
      { value: "2a", score: 2, text: "Sinto-me bastante culpado(a)." },
      { value: "2b", score: 2, text: "Sinto-me mal ou indigno(a), praticamente o tempo todo, agora." },
      { value: "3", score: 3, text: "Sinto-me como se estivesse bem ruim e sem valor." },
    ],
  },
  {
    id: "punicao",
    letter: "F",
    title: "EXPECTATIVA DE PUNIÇÃO",
    options: [
      { value: "0", score: 0, text: "Não sinto que esteja sendo punido(a)." },
      { value: "1", score: 1, text: "Tenho um pressentimento de que alguma coisa ruim possa acontecer comigo." },
      { value: "2", score: 2, text: "Sinto que estou sendo punido(a) ou que irei ser punido." },
      { value: "3a", score: 3, text: "Sinto que mereço ser punido(a)." },
      { value: "3b", score: 3, text: "Quero ser punido(a)." },
    ],
  },
  {
    id: "autodesgosto",
    letter: "G",
    title: "AUTODESGOSTO",
    options: [
      { value: "0", score: 0, text: "Não me sinto desapontado(a) comigo mesmo." },
      { value: "1a", score: 1, text: "Estou desapontado(a) comigo mesmo." },
      { value: "1b", score: 1, text: "Não gosto de mim." },
      { value: "2", score: 2, text: "Estou aborrecido(a) comigo mesmo." },
      { value: "3", score: 3, text: "Eu me odeio." },
    ],
  },
  {
    id: "autoacusacoes",
    letter: "H",
    title: "AUTO-ACUSAÇÕES",
    options: [
      { value: "0", score: 0, text: "Não sinto que eu seja algo pior do que qualquer outra pessoa." },
      { value: "1", score: 1, text: "Critico-me por minhas fraquezas ou erros." },
      { value: "2", score: 2, text: "Acuso a mim mesmo(a) por minhas falhas." },
      { value: "3", score: 3, text: "Acuso a mim mesmo(a) por tudo de ruim que acontece." },
    ],
  },
  {
    id: "suicidas",
    letter: "I",
    title: "IDÉIAS SUICIDAS",
    options: [
      { value: "0", score: 0, text: "Não tenho quaisquer pensamentos sobre prejudicar a mim mesmo(a)." },
      { value: "1", score: 1, text: "Tenho pensamentos sobre prejudicar a mim mesmo(a), mas eu não os colocaria em prática." },
      { value: "2a", score: 2, text: "Sinto que estaria em melhor situação morto(a)." },
      { value: "2b", score: 2, text: "Sinto que minha família estaria em melhor situação se eu estivesse morto(a)." },
      { value: "3", score: 3, text: "Eu me mataria se pudesse." },
    ],
  },
  {
    id: "choro",
    letter: "J",
    title: "CHORO",
    options: [
      { value: "0", score: 0, text: "Não choro mais do que o comum." },
      { value: "1", score: 1, text: "Choro mais do que costumava." },
      { value: "2", score: 2, text: "Choro o tempo todo, agora; eu não consigo parar com isso." },
      { value: "3", score: 3, text: "Eu costumava ser capaz de chorar, mas agora não consigo chorar de maneira alguma, muito embora eu queira." },
    ],
  },
  {
    id: "irritabilidade",
    letter: "K",
    title: "IRRITABILIDADE",
    options: [
      { value: "0", score: 0, text: "Eu não estou mais irritado(a) agora do que costumo estar." },
      { value: "1", score: 1, text: "Fico aborrecido(a) ou irritado(a) mais facilmente do que costumava ficar." },
      { value: "2", score: 2, text: "Sinto-me irritado(a) o tempo todo." },
      { value: "3", score: 3, text: "Eu não fico irritado(a) de maneira alguma com as coisas que costumavam irritar-me." },
    ],
  },
  {
    id: "social",
    letter: "L",
    title: "INTERAÇÃO SOCIAL",
    options: [
      { value: "0", score: 0, text: "Eu não perdi o interesse por outras pessoas." },
      { value: "1", score: 1, text: "Estou menos interessado(a) nas pessoas, agora, do que costumava estar." },
      { value: "2", score: 2, text: "Perdi a maior parte do meu interesse por outras pessoas e tenho pouco sentimento por elas." },
      { value: "3", score: 3, text: "Perdi todo o meu interesse por outras pessoas e não me importo com elas de maneira alguma." },
    ],
  },
  {
    id: "indecisao",
    letter: "M",
    title: "INDECISÃO",
    options: [
      { value: "0", score: 0, text: "Tomo decisões tão bem quanto sempre tomei." },
      { value: "1", score: 1, text: "Tento adiar as tomadas de decisão." },
      { value: "2", score: 2, text: "Tenho grande dificuldade em tomar decisões." },
      { value: "3", score: 3, text: "Não consigo tomar quaisquer decisões atualmente." },
    ],
  },
  {
    id: "imagem",
    letter: "N",
    title: "MUDANÇA DA IMAGEM CORPORAL",
    options: [
      { value: "0", score: 0, text: "Eu não sinto que pareça algo pior do que costumava ser." },
      { value: "1", score: 1, text: "Eu estou preocupado(a) que esteja parecendo velho(a) ou sem atrativos." },
      { value: "2", score: 2, text: "Sinto que há mudanças permanentes em minha aparência e elas me fazem parecer sem atrativos." },
      { value: "3", score: 3, text: "Sinto que estou com uma aparência feia ou repulsiva." },
    ],
  },
  {
    id: "trabalho",
    letter: "O",
    title: "RETARDO PARA O TRABALHO",
    options: [
      { value: "0", score: 0, text: "Posso trabalhar tanto quanto antes." },
      { value: "1a", score: 1, text: "É necessário um esforço extra para conseguir começar a fazer alguma coisa." },
      { value: "1b", score: 1, text: "Não trabalho tão bem quanto costumava." },
      { value: "2", score: 2, text: "Tenho de me esforçar demais para fazer qualquer coisa." },
      { value: "3", score: 3, text: "Não consigo fazer nenhum trabalho de maneira alguma." },
    ],
  },
  {
    id: "insonia",
    letter: "P",
    title: "INSÔNIA",
    options: [
      { value: "0", score: 0, text: "Posso dormir tão satisfatoriamente quanto o de costume." },
      { value: "1", score: 1, text: "Acordo mais cansado(a) de manhã do que costumava." },
      { value: "2", score: 2, text: "Acordo uma ou duas horas mais cedo do que é comum e encontro dificuldade para voltar a dormir." },
      { value: "3", score: 3, text: "Acordo cedo todo dia e não posso conciliar mais do que cinco horas de sono." },
    ],
  },
  {
    id: "fadiga",
    letter: "Q",
    title: "SUSCETIBILIDADE À FADIGA",
    options: [
      { value: "0", score: 0, text: "Não fico mais cansado(a) do que o comum." },
      { value: "1", score: 1, text: "Fico cansado(a) mais facilmente do que costumava." },
      { value: "2", score: 2, text: "Fico cansado(a) ao fazer qualquer coisa." },
      { value: "3", score: 3, text: "Fico cansado(a) demais para fazer alguma coisa." },
    ],
  },
  {
    id: "anorexia",
    letter: "R",
    title: "ANOREXIA",
    options: [
      { value: "0", score: 0, text: "Meu apetite não está pior do que o comum." },
      { value: "1", score: 1, text: "Meu apetite não está tão bom quanto costumava estar." },
      { value: "2", score: 2, text: "Meu apetite está bem pior agora." },
      { value: "3", score: 3, text: "Não tenho apetite de maneira alguma." },
    ],
  },
  {
    id: "peso",
    letter: "S",
    title: "PERDA DE PESO",
    options: [
      { value: "0", score: 0, text: "Não tenho perdido muito peso, se é que perdi algum, ultimamente." },
      { value: "1", score: 1, text: "Perdi mais do que 2 quilos." },
      { value: "2", score: 2, text: "Perdi mais do que 4 quilos e meio." },
      { value: "3", score: 3, text: "Perdi mais do que 7 quilos." },
    ],
  },
  {
    id: "somatica",
    letter: "T",
    title: "PREOCUPAÇÃO SOMÁTICA",
    options: [
      { value: "0", score: 0, text: "Não me preocupo com minha saúde mais que o comum." },
      { value: "1", score: 1, text: "Estou preocupado(a) com dores ou sofrimentos, desarranjo estomacal ou prisão de ventre." },
      { value: "2", score: 2, text: "Estou tão preocupado(a) em como eu me sinto ou com o que sinto, que é difícil pensar em muitas outras coisas." },
      { value: "3", score: 3, text: "Estou completamente absorto(a) com relação ao que sinto." },
    ],
  },
  {
    id: "sexual",
    letter: "U",
    title: "PERDA DO INTERESSE SEXUAL",
    options: [
      { value: "0", score: 0, text: "Não tenho notado mudança alguma recente no meu interesse por sexo." },
      { value: "1", score: 1, text: "Estou menos interessado por sexo que costumava estar." },
      { value: "2", score: 2, text: "Estou muito menos interessado por sexo, agora." },
      { value: "3", score: 3, text: "Perdi completamente o interesse por sexo." },
    ],
  },
];

const BeckDepressionPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleOptionChange = (questionId: string, value: string) => {
    const question = beckQuestions.find(q => q.id === questionId);
    const option = question?.options.find(opt => opt.value === value);
    
    if (option) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: option.score,
      }));
    }
  };

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    setScore(totalScore);
  };

  const getScoreInterpretation = (score: number) => {
    if (score < 10) return "Sem depressão ou depressão leve";
    if (score <= 18) return "Depressão leve a moderada";
    if (score <= 29) return "Depressão moderada a grave";
    return "Depressão grave";
  };

  const getSeverityClass = (score: number) => {
    if (score < 10) return "text-green-700 bg-green-50";
    if (score <= 18) return "text-yellow-700 bg-yellow-50";
    if (score <= 29) return "text-orange-700 bg-orange-50";
    return "text-red-700 bg-red-50";
  };

  const isFormComplete = Object.keys(answers).length === beckQuestions.length;

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
                onClick={() => navigate("/categorias/ansiedade")}
              >
                Avaliação de Ansiedade e Depressão
              </Button>
              <span>/</span>
              <span className="text-neutral-900">Inventário de Depressão de Beck</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Questionnaire Form */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Inventário de Depressão de Beck (BDI)
              </h1>

              <p className="mb-6 text-neutral-600">
                Este questionário consiste em 21 grupos de afirmações. Depois de ler cuidadosamente cada grupo, 
                faça um círculo em torno do número (0, 1, 2 ou 3) diante da afirmação, em cada grupo, 
                que descreve melhor a maneira como você tem se sentido nesta semana, incluindo hoje. 
                Se várias afirmações num grupo parecerem se aplicar igualmente bem, 
                faça um círculo em cada uma. Tome o cuidado de ler todas as afirmações, em cada grupo, 
                antes de fazer a sua escolha.
              </p>

              <div className="space-y-6 mb-6">
                {beckQuestions.map((question) => (
                  <Card key={question.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-2">
                        <div className="mb-3">
                          <h3 className="font-bold text-neutral-900 text-lg">
                            {question.letter} - {question.title}
                          </h3>
                        </div>
                        
                        <RadioGroup
                          value={answers[question.id] !== undefined ? 
                            question.options.find(opt => opt.score === answers[question.id])?.value || "" : ""}
                          onValueChange={(value) => handleOptionChange(question.id, value)}
                          className="flex flex-col space-y-3"
                        >
                          {question.options.map((option) => (
                            <div key={`${question.id}-${option.value}`} className="flex items-start space-x-3">
                              <RadioGroupItem 
                                value={option.value} 
                                id={`${question.id}-${option.value}`}
                                className="mt-1"
                              />
                              <Label 
                                htmlFor={`${question.id}-${option.value}`}
                                className="text-sm text-neutral-700 cursor-pointer leading-relaxed"
                              >
                                <span className="font-medium">{option.value === "0" ? "0" : option.value}:</span> {option.text}
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
                      * A pontuação varia de 0 a 63 pontos.<br />
                      * Some a quantidade de pontos referente à sua resposta (exemplo: 2a = 2 pontos).
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Info and Download */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <Button className="w-full mb-6" variant="outline" onClick={() => window.open('/questionarios/beck-depression.pdf', '_blank')}>
                  Baixar versão em PDF
                </Button>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Sobre o Inventário</h2>
                <p className="text-neutral-700 mb-4">
                  O Inventário de Depressão de Beck (BDI) é um dos instrumentos mais utilizados 
                  para avaliação da gravidade dos sintomas depressivos em contextos clínicos e de pesquisa.
                </p>
                
                <p className="text-neutral-700 mb-4">
                  Desenvolvido por Aaron T. Beck em 1961, consiste em 21 itens que abrangem 
                  aspectos cognitivos, afetivos, comportamentais e somáticos da depressão.
                </p>

                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Importante:</strong> Este questionário é apenas uma ferramenta de triagem. 
                    O resultado obtido aqui não substitui uma avaliação clínica adequada por um profissional qualificado.
                  </p>
                </div>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Interpretação dos Resultados</h2>
                <ul className="list-disc pl-5 mb-6 text-neutral-700 space-y-1">
                  <li>Abaixo de 10: Sem depressão ou depressão leve</li>
                  <li>Entre 10 e 18: Depressão leve a moderada</li>
                  <li>Entre 19 e 29: Depressão moderada a grave</li>
                  <li>Entre 30 e 63: Depressão grave</li>
                </ul>

                <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências</h2>
                <div className="text-sm text-neutral-600 space-y-2">
                  <p>
                    Beck AT, Ward CH, Mendelson M, Mock J, Erbaugh J. An inventory for measuring depression. 
                    Archives of General Psychiatry. 1961;4:561–571.
                  </p>
                  <p>
                    Cunha JA. Manual da versão em português das Escalas Beck. 
                    São Paulo: Casa do Psicólogo; 2001.
                  </p>
                  <p>
                    Gorenstein C, Andrade L. Validation of a Portuguese version of the Beck Depression Inventory 
                    and the State-Trait Anxiety Inventory in Brazilian subjects. 
                    Brazilian Journal of Medical and Biological Research. 1996;29(4):453–457.
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

export default BeckDepressionPage;

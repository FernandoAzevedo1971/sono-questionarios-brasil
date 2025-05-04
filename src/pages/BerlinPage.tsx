
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";
import QuestionItem from "@/components/questionnaire/QuestionItem";

// Tipo para cada questão
type Question = {
  id: string;
  text: string;
  options: string[];
  optionLabels: string[];
  category: number;
};

// Tipo para resposta do formulário
type FormData = {
  height: string;
  weight: string;
  age: string;
  gender: string;
  [key: string]: string;
};

const BerlinPage = () => {
  // Estado para armazenar as respostas
  const [formData, setFormData] = useState<FormData>({
    height: "",
    weight: "",
    age: "",
    gender: "",
  });
  
  // Estado para armazenar pontuações por categoria
  const [categoryScores, setCategoryScores] = useState<number[]>([0, 0, 0]);
  
  // Estado para armazenar se categoria é positiva
  const [categoryPositive, setCategoryPositive] = useState<boolean[]>([false, false, false]);
  
  // Estado para resultado final
  const [finalResult, setFinalResult] = useState<string | null>(null);
  
  // Estado para IMC calculado
  const [imc, setImc] = useState<number | null>(null);
  
  // Questões categorizadas
  const questions: Question[] = [
    {
      id: "q1",
      text: "1. Você ronca?",
      options: ["a", "b", "c"],
      optionLabels: ["Sim", "Não", "Não sei"],
      category: 0
    },
    {
      id: "q2",
      text: "2. Se você ronca, seu ronco é:",
      options: ["a", "b", "c", "d"],
      optionLabels: [
        "Ligeiramente mais alto que a respiração",
        "Tão alto quanto falando",
        "Mais alto que falando",
        "Tão alto que pode ser ouvido em outras divisões da casa"
      ],
      category: 0
    },
    {
      id: "q3",
      text: "3. Com que frequência você ronca?",
      options: ["a", "b", "c", "d", "e"],
      optionLabels: [
        "Quase todos os dias",
        "3-4 vezes por semana",
        "1-2 vezes por semana",
        "1-2 vezes por mês",
        "Nunca ou quase nunca"
      ],
      category: 0
    },
    {
      id: "q4",
      text: "4. Alguém já reclamou do seu ronco?",
      options: ["a", "b"],
      optionLabels: ["Sim", "Não"],
      category: 0
    },
    {
      id: "q5",
      text: "5. Alguém notou que você para de respirar enquanto dorme?",
      options: ["a", "b", "c", "d", "e"],
      optionLabels: [
        "Quase todos os dias",
        "3-4 vezes por semana",
        "1-2 vezes por semana",
        "1-2 vezes por mês",
        "Nunca ou quase nunca"
      ],
      category: 0
    },
    {
      id: "q6",
      text: "6. Com que frequência você se sente cansado ou fatigado depois de acordar?",
      options: ["a", "b", "c", "d", "e"],
      optionLabels: [
        "Quase todos os dias",
        "3-4 vezes por semana",
        "1-2 vezes por semana",
        "1-2 vezes por mês",
        "Nunca ou quase nunca"
      ],
      category: 1
    },
    {
      id: "q7",
      text: "7. Durante o dia, você se sente cansado, fatigado ou sem energia?",
      options: ["a", "b", "c", "d", "e"],
      optionLabels: [
        "Quase todos os dias",
        "3-4 vezes por semana",
        "1-2 vezes por semana",
        "1-2 vezes por mês",
        "Nunca ou quase nunca"
      ],
      category: 1
    },
    {
      id: "q8",
      text: "8. Alguma vez você cochilou ou adormeceu enquanto dirigia?",
      options: ["a", "b"],
      optionLabels: ["Sim", "Não"],
      category: 1
    },
    {
      id: "q9",
      text: "9. Se respondeu sim à questão 8, com que frequência isso ocorre?",
      options: ["a", "b", "c", "d", "e"],
      optionLabels: [
        "Quase todos os dias",
        "3-4 vezes por semana",
        "1-2 vezes por semana",
        "1-2 vezes por mês",
        "Nunca ou quase nunca"
      ],
      category: 1
    },
    {
      id: "q10",
      text: "10. Você tem pressão alta?",
      options: ["a", "b", "c"],
      optionLabels: ["Sim", "Não", "Não sei"],
      category: 2
    }
  ];

  // Atualizar as respostas do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Atualizar as respostas das questões
  const handleQuestionChange = (questionId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Calcular IMC quando altura e peso forem preenchidos
  useEffect(() => {
    if (formData.height && formData.weight) {
      const height = parseFloat(formData.height);
      const weight = parseFloat(formData.weight);
      
      if (height > 0 && weight > 0) {
        const calculatedImc = weight / (height * height);
        setImc(calculatedImc);
      } else {
        setImc(null);
      }
    }
  }, [formData.height, formData.weight]);

  // Calcular pontuação e resultado
  const calculateResults = () => {
    // Inicializar pontuações
    const scores = [0, 0, 0];
    
    // Categoria 1: Ronco
    if (formData.q1 === "a") scores[0] += 1;
    if (formData.q2 === "c" || formData.q2 === "d") scores[0] += 1;
    if (formData.q3 === "a" || formData.q3 === "b") scores[0] += 1;
    if (formData.q4 === "a") scores[0] += 1;
    if (formData.q5 === "a" || formData.q5 === "b") scores[0] += 1;
    
    // Categoria 2: Sonolência e Fadiga
    if (formData.q6 === "a" || formData.q6 === "b") scores[1] += 1;
    if (formData.q7 === "a" || formData.q7 === "b") scores[1] += 1;
    if (formData.q8 === "a") scores[1] += 1;
    
    // Categoria 3: Saúde Geral
    if (formData.q10 === "a") scores[2] += 1;
    if (imc && imc > 30) scores[2] += 1;
    
    // Atualizar pontuações de categorias
    setCategoryScores(scores);
    
    // Determinar categorias positivas
    const positives = [
      scores[0] >= 2,          // Categoria 1 positiva se ≥ 2 pontos
      scores[1] >= 2,          // Categoria 2 positiva se ≥ 2 pontos
      scores[2] >= 1 || (imc && imc > 30)  // Categoria 3 positiva se ≥ 1 ponto ou IMC > 30
    ];
    setCategoryPositive(positives);
    
    // Resultado final
    const positiveCategories = positives.filter(Boolean).length;
    
    if (positiveCategories >= 2) {
      setFinalResult("Alto risco para Apneia do Sono");
    } else {
      setFinalResult("Baixo risco para Apneia do Sono");
    }
  };

  // Verificar se o formulário está completo para calcular resultado
  const isFormComplete = () => {
    // Verificar dados pessoais
    if (!formData.height || !formData.weight || !formData.age || !formData.gender) {
      return false;
    }
    
    // Verificar perguntas obrigatórias
    const requiredQuestions = ["q1", "q4", "q6", "q7", "q8", "q10"];
    for (const q of requiredQuestions) {
      if (!formData[q]) return false;
    }
    
    // Verificar perguntas condicionais
    if (formData.q1 === "a" && (!formData.q2 || !formData.q3)) return false;
    if (formData.q8 === "a" && !formData.q9) return false;
    
    return true;
  };

  return (
    <QuestionnaireContainer
      title="Questionário de Berlim"
      categoryPath="/categorias/apneia"
      categoryName="Apneia do Sono"
    >
      <QuestionnaireContent
        title="Questionário de Berlim validado em português"
        description="Preencha as informações abaixo e responda às perguntas marcando a opção correta."
      >
        <div className="space-y-6 mb-6">
          {/* Dados Pessoais */}
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-4 text-left">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height" className="mb-2 block">Altura (m):</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 1.75"
                  value={formData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="weight" className="mb-2 block">Peso (kg):</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="Ex: 70"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="age" className="mb-2 block">Idade:</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Ex: 45"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="gender" className="mb-2 block">Sexo:</Label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="gender-m"
                      name="gender"
                      value="Masculino"
                      checked={formData.gender === "Masculino"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <Label htmlFor="gender-m">Masculino</Label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="gender-f"
                      name="gender"
                      value="Feminino"
                      checked={formData.gender === "Feminino"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <Label htmlFor="gender-f">Feminino</Label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Exibir IMC calculado */}
            {imc !== null && (
              <div className="mt-4 p-2 bg-neutral-100 rounded">
                <p className="font-medium">
                  IMC: {imc.toFixed(2)} kg/m² 
                  {imc > 30 && (
                    <span className="text-red-500 ml-2">(Obesidade)</span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Categoria 1: Ronco */}
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-4 text-left">Categoria 1: Ronco</h3>
            <div className="space-y-6">
              {questions
                .filter(q => q.category === 0)
                .map((question) => (
                  <QuestionItem
                    key={question.id}
                    id={question.id}
                    title={question.text}
                    options={question.options}
                    optionLabels={question.optionLabels}
                    value={formData[question.id] || ""}
                    onChange={(value) => handleQuestionChange(question.id, value)}
                    hideOptionNumbers={true}
                  />
                ))}
            </div>
          </div>

          {/* Categoria 2: Sonolência e Fadiga */}
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-4 text-left">Categoria 2: Sonolência e Fadiga</h3>
            <div className="space-y-6">
              {questions
                .filter(q => q.category === 1)
                .map((question) => (
                  <QuestionItem
                    key={question.id}
                    id={question.id}
                    title={question.text}
                    options={question.options}
                    optionLabels={question.optionLabels}
                    value={formData[question.id] || ""}
                    onChange={(value) => handleQuestionChange(question.id, value)}
                    hideOptionNumbers={true}
                  />
                ))}
            </div>
          </div>

          {/* Categoria 3: Saúde Geral */}
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-semibold text-neutral-900 mb-4 text-left">Categoria 3: Saúde Geral</h3>
            <div className="space-y-6">
              {questions
                .filter(q => q.category === 2)
                .map((question) => (
                  <QuestionItem
                    key={question.id}
                    id={question.id}
                    title={question.text}
                    options={question.options}
                    optionLabels={question.optionLabels}
                    value={formData[question.id] || ""}
                    onChange={(value) => handleQuestionChange(question.id, value)}
                    hideOptionNumbers={true}
                  />
                ))}
            </div>
          </div>

          {/* Botão para calcular resultados */}
          <Button
            className="w-full md:w-auto"
            onClick={calculateResults}
          >
            Calcular Resultado
          </Button>

          {/* Exibir resultado */}
          {finalResult && (
            <ResultDisplay
              score={categoryPositive.filter(Boolean).length}
              maxScore={3}
              interpretation={finalResult}
              severity={finalResult.includes("Alto") ? "danger" : "success"}
              notes={[
                `Categoria 1 (Ronco): ${categoryScores[0]} pontos - ${categoryPositive[0] ? "Positivo" : "Negativo"}`,
                `Categoria 2 (Sonolência): ${categoryScores[1]} pontos - ${categoryPositive[1] ? "Positivo" : "Negativo"}`,
                `Categoria 3 (Saúde Geral): ${categoryScores[2]} pontos - ${categoryPositive[2] ? "Positivo" : "Negativo"}`,
                `Alto risco: Duas ou mais categorias positivas`,
                `Baixo risco: Nenhuma ou apenas uma categoria positiva`
              ]}
            />
          )}
        </div>
      </QuestionnaireContent>

      {/* Sidebar com informações */}
      <QuestionnaireSidebar pdfUrl="/questionarios/berlin.pdf">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Sobre o questionário</h2>
        <p className="text-neutral-700 mb-6 text-left">
          O Questionário de Berlim é uma ferramenta validada para identificar pacientes com alto 
          risco para a síndrome da apneia obstrutiva do sono. O questionário contém questões 
          organizadas em três categorias relacionadas ao risco de ter apneia do sono. Tem validação
          para a língua portuguesa em Portugal e no Brasil.
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Critérios de Pontuação</h2>
        <p className="text-neutral-600 mb-2 text-left">
          Categoria 1: Ronco - Positivo se houver 2 ou mais pontos.
          Questão 1: a) 1 ponto
          Questão 2: c) 1 ponto, d) 1 ponto
          Questão 3: a) 1 ponto, b) 1 ponto
          Questão 4: a) 1 ponto
          Questão 5: a) 1 ponto, b) 1 ponto
        </p>
        
        <p className="text-neutral-600 mb-2 text-left">
          Categoria 2: Sonolência e Fadiga - Positivo se houver 2 ou mais pontos.
          Questão 6: a) 1 ponto, b) 1 ponto
          Questão 7: a) 1 ponto, b) 1 ponto
          Questão 8: a) 1 ponto
        </p>
        
        <p className="text-neutral-600 mb-2 text-left">
          Categoria 3: Saúde Geral - Positivo se houver 1 ou mais pontos ou IMC &gt; 30 kg/m².
          Questão 10: a) 1 ponto
          IMC &gt; 30 kg/m²: 1 ponto
        </p>

        <p className="text-neutral-600 mb-4 text-left">
          Alto risco para Apneia do Sono: Duas ou mais categorias positivas.
          Baixo risco para Apneia do Sono: Nenhuma ou apenas uma categoria positiva.
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Referências</h2>
        <div className="text-sm text-neutral-600 space-y-4 text-left">
          <p>
            Netzer NC, Stoohs RA, Netzer CM, Clark K, Strohl KP. Using the Berlin Questonnaire to 
            identfy patents at risk for the sleep apnea syndrome. Ann Intern Med. 1999 Oct 5;131(7):485-91.
          </p>
          <p>
            Vaz AP, Drummond M, Mota PC, et al. Tradução do Questionário de Berlim para língua Portuguesa e sua aplicação na 
            identifcação da SAOS numa consulta de patologia respiratória do sono. Rev Port Pneumol. 2011;17(2):59-65.
          </p>
          <p>
            ANDRECHUK, Carla Renata Silva. Adaptação cultural e validação do "Berlin Questionnaire" para o contexto brasileiro. 
            2018. 1 recurso online (106 p.) Tese (doutorado) - Universidade Estadual de Campinas, Faculdade de Enfermagem, 
            Campinas, SP. Disponível em: https://hdl.handle.net/20.500.12733/1637880.
          </p>
        </div>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default BerlinPage;

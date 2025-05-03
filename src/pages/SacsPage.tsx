
import React, { useState } from "react";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Calculator } from "lucide-react";
import ResultDisplay from "@/components/questionnaire/ResultDisplay";

type FormValues = {
  hipertensao: string;
  ronco: string;
  apneia: string;
  pescocoCircunferencia: number;
};

const SacsPage = () => {
  const { toast } = useToast();
  const [resultado, setResultado] = useState<number | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      hipertensao: "",
      ronco: "",
      apneia: "",
      pescocoCircunferencia: 0,
    },
  });

  const calcularSACS = (data: FormValues) => {
    // Verifica se tem hipertensão
    const temHAS = data.hipertensao === "sim";
    
    // Contador para características clínicas
    let caracteristicasClinicas = 0;
    
    // Verifica ronco positivo (qualquer resposta que não seja "nunca" ou "nao-sei")
    if (data.ronco !== "nunca" && data.ronco !== "nao-sei") {
      caracteristicasClinicas++;
    }
    
    // Verifica apneia positiva (qualquer resposta que não seja "nunca" ou "nao-sei")
    if (data.apneia !== "nunca" && data.apneia !== "nao-sei") {
      caracteristicasClinicas++;
    }
    
    // Obtém a circunferência do pescoço
    const cp = data.pescocoCircunferencia;
    
    // Calcula o score com base na tabela
    let score = 0;
    
    if (cp < 30) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 0;
        else if (caracteristicasClinicas === 1) score = 0;
        else if (caracteristicasClinicas === 2) score = 1;
      } else {
        if (caracteristicasClinicas === 0) score = 0;
        else if (caracteristicasClinicas === 1) score = 1;
        else if (caracteristicasClinicas === 2) score = 2;
      }
    } else if (cp >= 30 && cp <= 31) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 0;
        else if (caracteristicasClinicas === 1) score = 0;
        else if (caracteristicasClinicas === 2) score = 1;
      } else {
        if (caracteristicasClinicas === 0) score = 1;
        else if (caracteristicasClinicas === 1) score = 2;
        else if (caracteristicasClinicas === 2) score = 4;
      }
    } else if (cp >= 32 && cp <= 33) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 0;
        else if (caracteristicasClinicas === 1) score = 1;
        else if (caracteristicasClinicas === 2) score = 2;
      } else {
        if (caracteristicasClinicas === 0) score = 1;
        else if (caracteristicasClinicas === 1) score = 3;
        else if (caracteristicasClinicas === 2) score = 5;
      }
    } else if (cp >= 34 && cp <= 35) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 1;
        else if (caracteristicasClinicas === 1) score = 2;
        else if (caracteristicasClinicas === 2) score = 3;
      } else {
        if (caracteristicasClinicas === 0) score = 2;
        else if (caracteristicasClinicas === 1) score = 4;
        else if (caracteristicasClinicas === 2) score = 8;
      }
    } else if (cp >= 36 && cp <= 37) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 1;
        else if (caracteristicasClinicas === 1) score = 3;
        else if (caracteristicasClinicas === 2) score = 5;
      } else {
        if (caracteristicasClinicas === 0) score = 4;
        else if (caracteristicasClinicas === 1) score = 6;
        else if (caracteristicasClinicas === 2) score = 11;
      }
    } else if (cp >= 38 && cp <= 39) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 2;
        else if (caracteristicasClinicas === 1) score = 4;
        else if (caracteristicasClinicas === 2) score = 7;
      } else {
        if (caracteristicasClinicas === 0) score = 5;
        else if (caracteristicasClinicas === 1) score = 9;
        else if (caracteristicasClinicas === 2) score = 16;
      }
    } else if (cp >= 40 && cp <= 41) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 3;
        else if (caracteristicasClinicas === 1) score = 6;
        else if (caracteristicasClinicas === 2) score = 10;
      } else {
        if (caracteristicasClinicas === 0) score = 8;
        else if (caracteristicasClinicas === 1) score = 13;
        else if (caracteristicasClinicas === 2) score = 22;
      }
    } else if (cp >= 42 && cp <= 43) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 5;
        else if (caracteristicasClinicas === 1) score = 8;
        else if (caracteristicasClinicas === 2) score = 14;
      } else {
        if (caracteristicasClinicas === 0) score = 11;
        else if (caracteristicasClinicas === 1) score = 18;
        else if (caracteristicasClinicas === 2) score = 30;
      }
    } else if (cp >= 44 && cp <= 45) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 7;
        else if (caracteristicasClinicas === 1) score = 12;
        else if (caracteristicasClinicas === 2) score = 20;
      } else {
        if (caracteristicasClinicas === 0) score = 15;
        else if (caracteristicasClinicas === 1) score = 25;
        else if (caracteristicasClinicas === 2) score = 42;
      }
    } else if (cp >= 46 && cp <= 47) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 10;
        else if (caracteristicasClinicas === 1) score = 16;
        else if (caracteristicasClinicas === 2) score = 28;
      } else {
        if (caracteristicasClinicas === 0) score = 21;
        else if (caracteristicasClinicas === 1) score = 35;
        else if (caracteristicasClinicas === 2) score = 58;
      }
    } else if (cp >= 48 && cp <= 49) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 14;
        else if (caracteristicasClinicas === 1) score = 23;
        else if (caracteristicasClinicas === 2) score = 38;
      } else {
        if (caracteristicasClinicas === 0) score = 29;
        else if (caracteristicasClinicas === 1) score = 48;
        else if (caracteristicasClinicas === 2) score = 80;
      }
    } else if (cp > 49) {
      if (!temHAS) {
        if (caracteristicasClinicas === 0) score = 19;
        else if (caracteristicasClinicas === 1) score = 32;
        else if (caracteristicasClinicas === 2) score = 53;
      } else {
        if (caracteristicasClinicas === 0) score = 40;
        else if (caracteristicasClinicas === 1) score = 66;
        else if (caracteristicasClinicas === 2) score = 110;
      }
    }
    
    return score;
  };

  const onSubmit = (data: FormValues) => {
    const score = calcularSACS(data);
    setResultado(score);
    
    toast({
      title: "Resultado calculado",
      description: `Seu escore SACS-BR é: ${score}`,
    });
  };

  return (
    <QuestionnaireContainer
      title="Escore Clínico da Apneia do Sono (SACS-BR)"
      categoryPath="/categorias/apneia"
      categoryName="Apneia do Sono"
    >
      <QuestionnaireContent
        title="Escore Clínico da Apneia do Sono (SACS-BR)"
        description="Por favor, responda às seguintes questões:"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="hipertensao"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">1. Você é portador de hipertensão arterial ou algum médico recomendou que o senhor usasse alguma medicação para controlar a pressão?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="sim" id="hipertensao-sim" />
                        <FormLabel htmlFor="hipertensao-sim" className="font-normal">
                          Sim
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="nao" id="hipertensao-nao" />
                        <FormLabel htmlFor="hipertensao-nao" className="font-normal">
                          Não
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ronco"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">
                    2. "Meu parceiro diz que ronco". Escolha a melhor resposta sobre a frequência do seu ronco:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="nao-sei" id="ronco-nao-sei" />
                        <FormLabel htmlFor="ronco-nao-sei" className="font-normal">
                          Não sei dizer
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="nunca" id="ronco-nunca" />
                        <FormLabel htmlFor="ronco-nunca" className="font-normal">
                          Nunca
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="raramente" id="ronco-raramente" />
                        <FormLabel htmlFor="ronco-raramente" className="font-normal">
                          Raramente (1-2 vezes/ano)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="ocasionalmente" id="ronco-ocasionalmente" />
                        <FormLabel htmlFor="ronco-ocasionalmente" className="font-normal">
                          Ocasionalmente (4-8 vezes/ano)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="algumas-vezes" id="ronco-algumas-vezes" />
                        <FormLabel htmlFor="ronco-algumas-vezes" className="font-normal">
                          Algumas vezes (1-2 vezes/mês)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="frequentemente" id="ronco-frequentemente" />
                        <FormLabel htmlFor="ronco-frequentemente" className="font-normal">
                          Frequentemente (3-5 vezes/semana) (1-2 vezes/semana)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="sempre" id="ronco-sempre" />
                        <FormLabel htmlFor="ronco-sempre" className="font-normal">
                          Sempre (todos as noites)
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apneia"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">
                    3. "Meu parceiro diz que engasgo ou fico sufocado enquanto durmo". Escolha a melhor resposta sobre a frequência desses sintomas:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="nao-sei" id="apneia-nao-sei" />
                        <FormLabel htmlFor="apneia-nao-sei" className="font-normal">
                          Não sei dizer
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="nunca" id="apneia-nunca" />
                        <FormLabel htmlFor="apneia-nunca" className="font-normal">
                          Nunca
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="raramente" id="apneia-raramente" />
                        <FormLabel htmlFor="apneia-raramente" className="font-normal">
                          Raramente (1-2 vezes/ano)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="ocasionalmente" id="apneia-ocasionalmente" />
                        <FormLabel htmlFor="apneia-ocasionalmente" className="font-normal">
                          Ocasionalmente (4-8 vezes/ano)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="algumas-vezes" id="apneia-algumas-vezes" />
                        <FormLabel htmlFor="apneia-algumas-vezes" className="font-normal">
                          Algumas vezes (1-2 vezes/mês)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="frequentemente" id="apneia-frequentemente" />
                        <FormLabel htmlFor="apneia-frequentemente" className="font-normal">
                          Frequentemente (3-5 vezes/semana) (1-2 vezes/semana)
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="sempre" id="apneia-sempre" />
                        <FormLabel htmlFor="apneia-sempre" className="font-normal">
                          Sempre (todos as noites)
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pescocoCircunferencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">4. Circunferência do Pescoço (cm):</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="25"
                      max="60"
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={!form.formState.isValid}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calcular Resultado
              </Button>
            </div>
          </form>
        </Form>

        {resultado !== null && (
          <ResultDisplay
            score={resultado}
            interpretation={resultado >= 15 
              ? "Alta probabilidade de síndrome de apneia obstrutiva do sono (SAOS)"
              : "Baixa probabilidade de síndrome de apneia obstrutiva do sono (SAOS)"}
            severity={resultado >= 15 ? "danger" : "success"}
            notes={[
              "Resultado ≥ 15 indica alta probabilidade de síndrome de apneia obstrutiva do sono (SAOS)."
            ]}
          />
        )}
      </QuestionnaireContent>

      <QuestionnaireSidebar pdfUrl='/questionarios/sacs.pdf'>
        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Como calcular o SACS-BR:</h2>
        <p className="text-neutral-700 mb-4">
          1. Qualquer resposta diferente de "Não sei dizer" ou "Nunca" é considerada positiva.
          <br />
          2. Medir a circunferência de pescoço (CP) e marcar na tabela abaixo o escore apropriado.
        </p>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Tabela de Pontuação:</h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse table-auto text-sm">
            <thead>
              <tr className="bg-neutral-50">
                <th className="border px-2 py-1" colSpan={1} rowSpan={2}>CP (cm)</th>
                <th className="border px-2 py-1" colSpan={3}>Sem HAS</th>
                <th className="border px-2 py-1" colSpan={3}>Com HAS</th>
              </tr>
              <tr className="bg-neutral-50">
                <th className="border px-2 py-1">Nenhuma</th>
                <th className="border px-2 py-1">Uma</th>
                <th className="border px-2 py-1">Ambas</th>
                <th className="border px-2 py-1">Nenhuma</th>
                <th className="border px-2 py-1">Uma</th>
                <th className="border px-2 py-1">Ambas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">&lt;30</td>
                <td className="border px-2 py-1 text-center">0</td>
                <td className="border px-2 py-1 text-center">0</td>
                <td className="border px-2 py-1 text-center">1</td>
                <td className="border px-2 py-1 text-center">0</td>
                <td className="border px-2 py-1 text-center">1</td>
                <td className="border px-2 py-1 text-center">2</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">30 / 31</td>
                <td className="border px-2 py-1 text-center">0</td>
                <td className="border px-2 py-1 text-center">0</td>
                <td className="border px-2 py-1 text-center">1</td>
                <td className="border px-2 py-1 text-center">1</td>
                <td className="border px-2 py-1 text-center">2</td>
                <td className="border px-2 py-1 text-center">4</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">32 / 33</td>
                <td className="border px-2 py-1 text-center">0</td>
                <td className="border px-2 py-1 text-center">1</td>
                <td className="border px-2 py-1 text-center">2</td>
                <td className="border px-2 py-1 text-center">1</td>
                <td className="border px-2 py-1 text-center">3</td>
                <td className="border px-2 py-1 text-center">5</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">34 / 35</td>
                <td className="border px-2 py-1 text-center">1</td>
                <td className="border px-2 py-1 text-center">2</td>
                <td className="border px-2 py-1 text-center">3</td>
                <td className="border px-2 py-1 text-center">2</td>
                <td className="border px-2 py-1 text-center">4</td>
                <td className="border px-2 py-1 text-center">8</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">36 / 37</td>
                <td className="border px-2 py-1 text-center">1</td>
                <td className="border px-2 py-1 text-center">3</td>
                <td className="border px-2 py-1 text-center">5</td>
                <td className="border px-2 py-1 text-center">4</td>
                <td className="border px-2 py-1 text-center">6</td>
                <td className="border px-2 py-1 text-center">11</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">38 / 39</td>
                <td className="border px-2 py-1 text-center">2</td>
                <td className="border px-2 py-1 text-center">4</td>
                <td className="border px-2 py-1 text-center">7</td>
                <td className="border px-2 py-1 text-center">5</td>
                <td className="border px-2 py-1 text-center">9</td>
                <td className="border px-2 py-1 text-center">16</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">40 / 41</td>
                <td className="border px-2 py-1 text-center">3</td>
                <td className="border px-2 py-1 text-center">6</td>
                <td className="border px-2 py-1 text-center">10</td>
                <td className="border px-2 py-1 text-center">8</td>
                <td className="border px-2 py-1 text-center">13</td>
                <td className="border px-2 py-1 text-center">22</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">42 / 43</td>
                <td className="border px-2 py-1 text-center">5</td>
                <td className="border px-2 py-1 text-center">8</td>
                <td className="border px-2 py-1 text-center">14</td>
                <td className="border px-2 py-1 text-center">11</td>
                <td className="border px-2 py-1 text-center">18</td>
                <td className="border px-2 py-1 text-center">30</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">44 / 45</td>
                <td className="border px-2 py-1 text-center">7</td>
                <td className="border px-2 py-1 text-center">12</td>
                <td className="border px-2 py-1 text-center">20</td>
                <td className="border px-2 py-1 text-center">15</td>
                <td className="border px-2 py-1 text-center">25</td>
                <td className="border px-2 py-1 text-center">42</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">46 / 47</td>
                <td className="border px-2 py-1 text-center">10</td>
                <td className="border px-2 py-1 text-center">16</td>
                <td className="border px-2 py-1 text-center">28</td>
                <td className="border px-2 py-1 text-center">21</td>
                <td className="border px-2 py-1 text-center">35</td>
                <td className="border px-2 py-1 text-center">58</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">48 / 49</td>
                <td className="border px-2 py-1 text-center">14</td>
                <td className="border px-2 py-1 text-center">23</td>
                <td className="border px-2 py-1 text-center">38</td>
                <td className="border px-2 py-1 text-center">29</td>
                <td className="border px-2 py-1 text-center">48</td>
                <td className="border px-2 py-1 text-center">80</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">&gt;49</td>
                <td className="border px-2 py-1 text-center">19</td>
                <td className="border px-2 py-1 text-center">32</td>
                <td className="border px-2 py-1 text-center">53</td>
                <td className="border px-2 py-1 text-center">40</td>
                <td className="border px-2 py-1 text-center">66</td>
                <td className="border px-2 py-1 text-center">110</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Referências:</h2>
        <div className="text-sm text-neutral-600 space-y-3">
          <p>
            <strong>Referência original em inglês:</strong><br />
            Flemons WW, Whitelaw WA, Brant R, Remmers JE. Likelihood ratios for a sleep apnea 
            clinical prediction rule. Am J Respir Crit Care Med 1994;150:1279-85
          </p>
          <p>
            <strong>Referência da Validação em Português:</strong><br />
            Lapas, V. S. C., Faria, A. C., Rufino, R. L., & Costa, C. H. (2020). Tradução e adaptação cultural do questionário Sleep Apnea Clinical Score para uso no Brasil. Jornal Brasileiro de Pneumologia, 46(3), 223-231. Disponível em: <a href="https://www.scielo.br/j/jbpneumol/a/z64XKXLhXLvKf86XZ8k8f8k/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Link para o artigo</a>
          </p>
        </div>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default SacsPage;


import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

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
    
    // Verifica ronco positivo (quase sempre ou sempre)
    if (data.ronco === "quase-sempre" || data.ronco === "sempre") {
      caracteristicasClinicas++;
    }
    
    // Verifica apneia positiva (frequentemente, quase sempre ou sempre)
    if (data.apneia === "frequentemente" || data.apneia === "quase-sempre" || data.apneia === "sempre") {
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
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      <main className="flex-grow py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/categorias/apneia" className="inline-flex items-center text-primary-600 hover:text-primary-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Voltar para Apneia do Sono</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold mb-4 text-primary-700">Escore Clínico da Apneia do Sono (SACS-BR)</h1>
            <p className="mb-6 text-gray-600">
              O SACS-BR é um instrumento validado para triagem da síndrome de apneia obstrutiva do sono em adultos brasileiros.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="hipertensao"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base">1. Você tem pressão alta ou toma remédio para controlar a pressão?</FormLabel>
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
                        2. "Pessoas que dividem ou que dividiram o quarto comigo, dizem que eu ronco". Por favor, escolha qual a melhor resposta para esta afirmativa:
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-1"
                        >
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
                              Frequentemente (1-2 vezes/semana)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="quase-sempre" id="ronco-quase-sempre" />
                            <FormLabel htmlFor="ronco-quase-sempre" className="font-normal">
                              Quase sempre (3-5 vezes/semana)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="sempre" id="ronco-sempre" />
                            <FormLabel htmlFor="ronco-sempre" className="font-normal">
                              Sempre (todos os dias)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="nao-sei" id="ronco-nao-sei" />
                            <FormLabel htmlFor="ronco-nao-sei" className="font-normal">
                              Não sei dizer se ronco
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
                        3. "Já me disseram que engasgo, paro de respirar ou suspiro enquanto durmo". Por favor, escolha qual a melhor resposta para esta afirmativa:
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-1"
                        >
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
                              Frequentemente (1-2 vezes/semana)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="quase-sempre" id="apneia-quase-sempre" />
                            <FormLabel htmlFor="apneia-quase-sempre" className="font-normal">
                              Quase sempre (3-5 vezes/semana)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="sempre" id="apneia-sempre" />
                            <FormLabel htmlFor="apneia-sempre" className="font-normal">
                              Sempre (todos os dias)
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="nao-sei" id="apneia-nao-sei" />
                            <FormLabel htmlFor="apneia-nao-sei" className="font-normal">
                              Não sei dizer se tenho esses sintomas
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
                      <FormLabel className="text-base">4. Circunferência do pescoço (cm):</FormLabel>
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
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calcular Resultado
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {resultado !== null && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary-700">Resultado</h2>
              <div className="p-4 rounded-md mb-4" style={{
                backgroundColor: resultado >= 15 ? "#FEE2E2" : "#DCFCE7",
                borderColor: resultado >= 15 ? "#FECACA" : "#BBF7D0",
                borderWidth: "1px"
              }}>
                <p className="text-xl font-medium">
                  Seu escore SACS-BR é: <span className="font-bold">{resultado}</span>
                </p>
                <p className="mt-2">
                  {resultado >= 15 
                    ? "Resultado ≥ 15 indica alta probabilidade de síndrome de apneia obstrutiva do sono (SAOS)." 
                    : "Resultado < 15 indica baixa probabilidade de síndrome de apneia obstrutiva do sono (SAOS)."}
                </p>
              </div>
              <div className="text-gray-700">
                <h3 className="font-semibold mb-2">Interpretação:</h3>
                <p>O Escore Clínico da Apneia do Sono (SACS-BR) considera três fatores principais:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Presença de hipertensão arterial</li>
                  <li>Frequência de ronco</li>
                  <li>Presença de pausas respiratórias</li>
                  <li>Circunferência do pescoço</li>
                </ul>
                <p className="mt-3">
                  Um escore maior ou igual a 15 indica alta probabilidade de SAOS. Recomenda-se consultar um especialista em medicina do sono para avaliação apropriada.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-500">
            <p>
              <strong>Referência:</strong> Lapas, V. S. C., Faria, A. C., Rufino, R. L., & Costa, C. H. (2020). Tradução e adaptação cultural do questionário Sleep Apnea Clinical Score para uso no Brasil. Jornal Brasileiro de Pneumologia, 46(3), 223-231.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SacsPage;

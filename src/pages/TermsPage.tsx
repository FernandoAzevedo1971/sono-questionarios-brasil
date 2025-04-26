
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        {/* Terms Header */}
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Voltar para o início</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">Termos de Uso</h1>
            <p className="text-lg opacity-90">
              Termos e condições para uso do Portal de Questionários em Medicina do Sono – Brasil
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Termos de Uso</h2>
              
              <div className="space-y-6 text-neutral-700">
                <p>
                  Ao acessar e utilizar este portal, você concorda com os seguintes termos e condições:
                </p>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-neutral-900">1. Objetivo do Portal</h3>
                  <p>
                    O Portal de Questionários em Medicina do Sono – Brasil tem como objetivo 
                    disponibilizar questionários validados em português para uso em prática 
                    clínica e pesquisa na área de medicina do sono.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-neutral-900">2. Uso dos Questionários</h3>
                  <p>
                    Os questionários disponibilizados neste portal são para uso clínico 
                    e de pesquisa. A utilização comercial não é permitida sem autorização 
                    prévia dos detentores dos direitos autorais de cada instrumento.
                  </p>
                  <p className="mt-2">
                    Ao utilizar os questionários, respeite as regras de citação acadêmica, 
                    referenciando adequadamente os autores originais e os estudos de validação 
                    para a língua portuguesa.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-neutral-900">3. Limitação de Responsabilidade</h3>
                  <p>
                    Os questionários são ferramentas de triagem e avaliação, não substituindo 
                    o diagnóstico clínico realizado por profissionais qualificados. Não nos 
                    responsabilizamos por decisões clínicas tomadas exclusivamente com base 
                    nos resultados obtidos através dos instrumentos disponibilizados.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-neutral-900">4. Propriedade Intelectual</h3>
                  <p>
                    O conteúdo deste portal, incluindo textos, gráficos, logotipos e outros 
                    materiais, é protegido por leis de direitos autorais. Os questionários 
                    disponibilizados são de propriedade de seus respectivos autores e 
                    instituições, conforme indicado nas referências.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-neutral-900">5. Alterações nos Termos</h3>
                  <p>
                    Reservamo-nos o direito de modificar estes termos a qualquer momento, 
                    sendo responsabilidade do usuário verificar periodicamente quaisquer alterações.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-neutral-900">6. Contato</h3>
                  <p>
                    Para dúvidas sobre estes termos ou solicitações relacionadas aos 
                    questionários disponibilizados, entre em contato através do formulário 
                    na página de Contato.
                  </p>
                </div>
                
                <p className="text-sm text-neutral-500">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;

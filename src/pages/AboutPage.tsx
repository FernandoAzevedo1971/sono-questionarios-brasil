
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        {/* About Header */}
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Voltar para o início</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">Sobre o Portal</h1>
            <p className="text-lg opacity-90">
              Conheça o Portal de Questionários em Medicina do Sono – Dr. Fernando Azevedo
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Nossa Missão</h2>
              
              <p className="text-neutral-700 mb-6">
                O Portal de Questionários em Medicina do Sono – Dr. Fernando Azevedo tem como missão 
                facilitar o acesso a instrumentos validados em português para uso 
                na prática clínica e na pesquisa em medicina do sono no Brasil.
              </p>
              
              <p className="text-neutral-700 mb-6">
                Nosso objetivo é centralizar em um único local os principais questionários 
                utilizados para avaliação, diagnóstico e acompanhamento de pacientes 
                com distúrbios do sono, sempre respeitando os direitos autorais e 
                as validações científicas desses instrumentos.
              </p>
              
              <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Para quem é este portal?</h2>
              
              <ul className="list-disc pl-6 mb-6">
                <li className="text-neutral-700 mb-2">
                  <span className="font-medium">Profissionais de saúde</span>: médicos, psicólogos, 
                  fisioterapeutas, fonoaudiólogos e outros profissionais que atuam na área 
                  de medicina do sono.
                </li>
                <li className="text-neutral-700 mb-2">
                  <span className="font-medium">Pesquisadores</span>: acadêmicos conduzindo estudos 
                  na área de sono e cronobiologia.
                </li>
                <li className="text-neutral-700 mb-2">
                  <span className="font-medium">Estudantes</span>: alunos de graduação e pós-graduação 
                  interessados em medicina do sono.
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-6 text-neutral-900">Importante</h2>
              
              <p className="text-neutral-700 mb-6">
                Os questionários disponibilizados neste portal são ferramentas de triagem 
                e avaliação, não substituindo o diagnóstico clínico realizado por profissionais 
                qualificados. Os resultados obtidos devem ser interpretados dentro do contexto 
                clínico completo de cada paciente.
              </p>
              
              <p className="text-neutral-700 mb-6">
                Todos os instrumentos disponibilizados possuem validação científica para 
                uso em português do Brasil, com suas respectivas referências bibliográficas.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

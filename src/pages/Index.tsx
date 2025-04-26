
import { categories } from "@/data/questionnaires";
import CategoryCard from "@/components/CategoryCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Portal de Questionários em Medicina do Sono – Brasil
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Acesse questionários validados em português para uso na prática clínica
                da Medicina do Sono no Brasil.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  className="bg-white text-primary-700 hover:bg-neutral-100"
                  size="lg"
                  onClick={() => {
                    const element = document.getElementById('categorias');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explorar Categorias
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Todos os Questionários
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-neutral-900">
                A importância dos questionários na Medicina do Sono
              </h2>
              <p className="text-neutral-700 mb-4">
                Os questionários validados são ferramentas essenciais para o diagnóstico, 
                acompanhamento e pesquisa em distúrbios do sono. Eles permitem uma abordagem 
                padronizada e comparável para a avaliação de diversos aspectos relacionados 
                ao sono dos pacientes.
              </p>
              <p className="text-neutral-700">
                Este portal reúne os principais instrumentos validados em português do Brasil,
                organizados por categorias de distúrbios, para facilitar o acesso por 
                profissionais de saúde, pesquisadores e estudantes da área.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categorias" className="py-10 lg:py-16 bg-neutral-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-neutral-900">
              Categorias de Distúrbios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

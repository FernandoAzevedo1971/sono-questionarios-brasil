
import { categories, getCategoryQuestionnaires } from "@/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import * as icons from "lucide-react";

// Import SVG path for lungs icon
const LungsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.081 20c0-2.21 2.02-4 4.5-4s4.5 1.79 4.5 4"></path>
    <path d="M4 10c0-1.93 1.57-3.5 3.5-3.5"></path>
    <path d="M20 10c0-1.93-1.57-3.5-3.5-3.5"></path>
    <path d="M12 12a4 4 0 0 0-4-4c-.99 0-3 .16-3 2.5C5 13 6 13 6 14c0 .5 0 2 2 2s2 0 2-2"></path>
    <path d="M12 12a4 4 0 0 1 4-4c.99 0 3 .16 3 2.5 0 2.5-1 2.5-1 3.5 0 .5 0 2-2 2s-2 0-2-2"></path>
    <path d="M7 16c-2.5.5-5 .5-5-2C2 8 6 6.5 8 7"></path>
    <path d="M17 16c2.5.5 5 .5 5-2 0-6-4-7.5-6-7"></path>
    <path d="M8 7c0-3 1.5-5 4-5s4 2 4 5"></path>
  </svg>
);

// Add Brain icon
const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const Index = () => {
  // Function to get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    if (iconName === "lungs") {
      return LungsIcon;
    }
    
    if (iconName === "brain") {
      return BrainIcon;
    }
    
    // First character needs to be uppercase for the icons import
    const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    return (icons as any)[formattedIconName];
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        {/* Logo Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 text-center">
            <img 
              src="/lovable-uploads/687d02db-9bbd-49d4-a884-c1355fcd2739.png" 
              alt="Fernando Azevedo - Pneumologia e Medicina do Sono" 
              className="max-w-full h-auto mx-auto" 
              style={{ maxHeight: "180px" }}
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Portal de Questionários em Medicina do Sono
                <br />
                Dr. Fernando Azevedo
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 text-left">
                Acesse questionários validados em português para uso na prática clínica
                da Medicina do Sono no Brasil.
              </p>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-neutral-900 text-center">
                A importância dos questionários na Medicina do Sono
              </h2>
              <p className="text-neutral-700 mb-4 text-left">
                Os questionários validados são ferramentas essenciais para o diagnóstico, 
                acompanhamento e pesquisa em distúrbios do sono. Eles permitem uma abordagem 
                padronizada e comparável para a avaliação de diversos aspectos relacionados 
                ao sono dos pacientes.
              </p>
              <p className="text-neutral-700 text-left">
                Este portal reúne os principais instrumentos validados em português do Brasil,
                organizados por categorias de distúrbios, para facilitar o acesso por 
                profissionais de saúde, pesquisadores e estudantes da área.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Accordion Section */}
        <section id="categorias" className="py-10 lg:py-16 bg-neutral-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-neutral-900">
              Categorias de Distúrbios
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {categories.map((category) => {
                  const IconComponent = getIconComponent(category.icon);
                  const questionnaires = getCategoryQuestionnaires(category.id);
                  
                  return (
                    <AccordionItem key={category.id} value={category.id} className="border-b border-neutral-200">
                      <AccordionTrigger className="py-4 px-2 hover:no-underline text-left">
                        <div className="flex items-center gap-3 text-left">
                          {IconComponent && (
                            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-50 text-primary-600">
                              <IconComponent className="h-5 w-5" />
                            </span>
                          )}
                          <div>
                            <h3 className="font-medium text-lg text-neutral-900">{category.name}</h3>
                            <p className="text-neutral-600 text-sm hidden md:block">{category.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-2">
                        <div className="pl-12 py-2 space-y-2">
                          {questionnaires.length > 0 ? (
                            questionnaires.map((questionnaire) => (
                              <Link 
                                key={questionnaire.id} 
                                to={`/questionarios/${questionnaire.id}`}
                                className="block p-2 rounded-md hover:bg-white transition-colors duration-200 text-left"
                              >
                                <h4 className="text-primary-600 font-medium">{questionnaire.name}</h4>
                                <p className="text-sm text-neutral-600">{questionnaire.description}</p>
                              </Link>
                            ))
                          ) : (
                            <p className="text-neutral-500 italic text-left">Nenhum questionário disponível nesta categoria.</p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

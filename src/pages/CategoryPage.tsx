
import { useParams } from "react-router-dom";
import { categories, getCategoryQuestionnaires } from "@/data/questionnaires";
import QuestionnaireList from "@/components/QuestionnaireList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Find the category
  const category = categories.find(cat => cat.id === categoryId);
  
  // If category doesn't exist, show error
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
            <p className="mb-6">A categoria que você está procurando não existe.</p>
            <Link to="/">
              <Button>Voltar para a página inicial</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get questionnaires for this category
  const questionnaires = getCategoryQuestionnaires(category.id as any);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        {/* Category Header */}
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Voltar para o início</span>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-lg opacity-90">{category.description}</p>
              </div>
              {questionnaires.length > 0 && (
                <div className="mt-6 md:mt-0">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Baixar todos ({questionnaires.length})
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Questionnaires List */}
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8">
              Questionários Disponíveis
            </h2>
            
            <QuestionnaireList questionnaires={questionnaires} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;

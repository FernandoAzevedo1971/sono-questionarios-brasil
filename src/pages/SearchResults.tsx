
import { useSearchParams } from "react-router-dom";
import { searchQuestionnaires } from "@/data/utils";
import QuestionnaireList from "@/components/QuestionnaireList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  // Get search results
  const results = searchQuestionnaires(query);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        {/* Search Header */}
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Voltar para o início</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-2">Resultados da Busca</h1>
            <p className="text-lg opacity-90">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para "{query}"
            </p>
          </div>
        </section>

        {/* Results List */}
        <section className="py-10 lg:py-16">
          <div className="container mx-auto px-4">
            <QuestionnaireList questionnaires={results} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;

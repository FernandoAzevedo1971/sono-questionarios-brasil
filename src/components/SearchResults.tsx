
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Questionnaire } from "@/data";
import { Search } from "lucide-react";
import QuestionnaireList from "./QuestionnaireList";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Questionnaire[]>([]);

  useEffect(() => {
    if (query) {
      // Função local para buscar questionários
      const searchQuestionnaires = (searchQuery: string) => {
        // Importar questionários apenas quando necessário
        const { questionnaires } = require("@/data");
        
        return questionnaires.filter((q: Questionnaire) => {
          const searchText = `${q.name} ${q.description} ${q.category}`.toLowerCase();
          return searchText.includes(searchQuery.toLowerCase());
        });
      };
      
      const foundQuestionnaires = searchQuestionnaires(query);
      setResults(foundQuestionnaires);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Resultados da pesquisa</h1>
        <div className="flex items-center gap-1 text-neutral-600">
          <Search className="h-4 w-4" />
          <p>
            {results.length} resultado{results.length !== 1 ? "s" : ""} para <span className="font-medium">"{query}"</span>
          </p>
        </div>
      </div>

      <QuestionnaireList questionnaires={results} />
    </div>
  );
};

export default SearchResults;

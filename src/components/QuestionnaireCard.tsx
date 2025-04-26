
import { Questionnaire } from "@/data/questionnaires";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuestionnaireCard = ({ questionnaire }: { questionnaire: Questionnaire }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <h3 className="font-semibold text-lg text-primary-700 mb-2">{questionnaire.name}</h3>
      <p className="text-neutral-700 mb-4">{questionnaire.description}</p>
      
      <div className="mb-4">
        <p className="text-sm text-neutral-600">
          <strong>Indicação:</strong> {questionnaire.indication}
        </p>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 text-primary-600 border-primary-200 hover:border-primary-300 hover:bg-primary-50"
          onClick={() => window.open(questionnaire.pdfUrl, '_blank')}
        >
          <Download size={16} />
          <span>PDF</span>
        </Button>
        
        {questionnaire.id === 'epworth' ? (
          <Link to="/questionarios/epworth">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-primary-600 border-primary-200 hover:border-primary-300 hover:bg-primary-50"
            >
              <ExternalLink size={16} />
              <span>Versão Online</span>
            </Button>
          </Link>
        ) : questionnaire.onlineUrl && (
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-primary-600 border-primary-200 hover:border-primary-300 hover:bg-primary-50"
            onClick={() => window.open(questionnaire.onlineUrl, '_blank')}
          >
            <ExternalLink size={16} />
            <span>Versão Online</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireCard;

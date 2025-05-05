
import { Questionnaire } from "@/data";
import QuestionnaireCard from "./QuestionnaireCard";

const QuestionnaireList = ({ questionnaires }: { questionnaires: Questionnaire[] }) => {
  if (questionnaires.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-600">Nenhum questionário encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {questionnaires.map((questionnaire) => (
        <QuestionnaireCard key={questionnaire.id} questionnaire={questionnaire} />
      ))}
    </div>
  );
};

export default QuestionnaireList;

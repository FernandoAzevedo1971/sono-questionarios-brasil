
import { useNavigate } from "react-router-dom";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PsqiIntroPage = () => {
  const navigate = useNavigate();

  const handleOriginalVersionClick = () => {
    window.open("https://www.sleep.pitt.edu/psqi", "_blank");
  };

  return (
    <QuestionnaireContainer
      title="Índice de Qualidade de Sono de Pittsburgh (PSQI)"
      categoryPath="/categorias/outros"
      categoryName="Outros"
    >
      <QuestionnaireContent
        title="Índice de Qualidade de Sono de Pittsburgh (PSQI)"
      >
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-4 text-left">ENGLISH</h3>
              <div className="space-y-4 text-left">
                <p>
                  Fill out the questionnaire on the author's website, record your answers and enter them on the next page.
                </p>
                <p>
                  Copyright for the PSQI is owned by the University of Pittsburgh and may be used without charge only for non-commercial research and educational purposes. Changes or modifications of the PSQI require prior written permission from the University of Pittsburgh.
                </p>
                <p>
                  You can download the instrument from website: <a 
                    href="https://www.sleep.pitt.edu/psqi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Pittsburgh Sleep Quality Index
                  </a>
                </p>
                <p>
                  All publications, presentations, reports, or developments resulting from or relative to the use of this material shall be referenced as follows:
                </p>
                <p className="italic">
                  The Pittsburgh Sleep Quality Index: A New Instrument for Psychiatric Practice and Research (Authors Daniel J. Buysse, Charles F. Reynolds III, Timothy H. Monk, Susan R. Berman, and David J Kupfer, © University of Pittsburgh 1989)
                </p>
                <p>
                  Note that Question 10 is not used in scoring the PSQI. This question is for informational purposes only, and may be omitted during data collection per requirements of the particular study.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-4 text-left">PORTUGUÊS</h3>
              <div className="space-y-4 text-left">
                <p>
                  Acesse o questionário no site do autor, formule suas respostas e insira na próxima página, na versão em português (validação pela Faculdade de Lisboa).
                </p>
                <p>
                  O copyright do PSQI pertence à Universidade de Pittsburgh e seu uso é permitido gratuitamente apenas para fins educacionais e de pesquisa não comercial. Alterações no instrumento exigem autorização prévia da universidade.
                </p>
                <p>
                  Você pode baixar o instrumento original no site: <a 
                    href="https://www.sleep.pitt.edu/psqi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Pittsburgh Sleep Quality Index
                  </a>
                </p>
                <p>
                  Todas as publicações, apresentações ou desenvolvimentos que utilizem esse material devem referenciar:
                </p>
                <p className="italic">
                  "The Pittsburgh Sleep Quality Index: A New Instrument for Psychiatric Practice and Research", por Daniel J. Buysse et al., © University of Pittsburgh 1989.
                </p>
                <p>
                  Atenção: a questão 10 não é utilizada para pontuação do PSQI, podendo ser omitida conforme o objetivo do estudo.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4 mt-8">
            <Button 
              size="lg"
              onClick={handleOriginalVersionClick}
            >
              Versão Original
            </Button>
            <Button 
              size="lg"
              onClick={() => navigate("/questionarios/psqi-pt")}
            >
              Versão Portuguesa
            </Button>
          </div>
        </div>
      </QuestionnaireContent>

      <QuestionnaireSidebar pdfUrl="/questionarios/psqi.pdf">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Sobre o questionário</h2>
        <p className="text-neutral-700 mb-4 text-left">
          O Índice de Qualidade de Sono de Pittsburgh (PSQI) é um instrumento validado para avaliar a qualidade
          do sono durante o último mês. O questionário avalia diversos aspectos relacionados ao sono,
          incluindo qualidade subjetiva, latência, duração, eficiência habitual, distúrbios do sono,
          uso de medicação para dormir e disfunção diurna.
        </p>
        <p className="text-neutral-700 mb-4 text-left">
          A pontuação global varia de 0 a 21 pontos, sendo que pontuações mais altas indicam pior
          qualidade de sono.
        </p>
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default PsqiIntroPage;


import React from "react";
import QuestionnaireContainer from "@/components/questionnaire/QuestionnaireContainer";
import QuestionnaireContent from "@/components/questionnaire/QuestionnaireContent";
import QuestionnaireSidebar from "@/components/questionnaire/QuestionnaireSidebar";
import StopBangForm from "@/components/questionnaires/stopBang/StopBangForm";
import StopBangSidebar from "@/components/questionnaires/stopBang/StopBangSidebar";

const StopBangPage = () => {
  return (
    <QuestionnaireContainer 
      title="Questionário STOP-BANG"
      categoryPath="/categorias/apneia"
      categoryName="Apneia do Sono"
    >
      {/* Left Panel - Questionnaire Form */}
      <QuestionnaireContent 
        title="Questionário STOP-BANG validado em português" 
        description="Responda as 8 perguntas abaixo selecionando 'Sim' ou 'Não' para cada item."
      >
        <StopBangForm />
      </QuestionnaireContent>

      {/* Right Panel - Info and Download */}
      <QuestionnaireSidebar pdfUrl='/questionarios/stop-bang.pdf'>
        <StopBangSidebar />
      </QuestionnaireSidebar>
    </QuestionnaireContainer>
  );
};

export default StopBangPage;

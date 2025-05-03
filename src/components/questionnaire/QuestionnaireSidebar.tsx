
import React from "react";
import { Button } from "@/components/ui/button";

type QuestionnaireSidebarProps = {
  pdfUrl?: string;
  children: React.ReactNode;
};

const QuestionnaireSidebar = ({ pdfUrl, children }: QuestionnaireSidebarProps) => {
  return (
    <div className="lg:w-96">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        {pdfUrl && (
          <Button 
            className="w-full mb-6" 
            variant="outline"
            onClick={() => window.open(pdfUrl, '_blank')}
          >
            Baixar versão em PDF
          </Button>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default QuestionnaireSidebar;


import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type QuestionnaireContainerProps = {
  title: string;
  categoryPath: string;
  categoryName: string;
  children: React.ReactNode;
};

const QuestionnaireContainer = ({
  title,
  categoryPath,
  categoryName,
  children,
}: QuestionnaireContainerProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Button
                variant="link"
                className="p-0 h-auto text-neutral-600 hover:text-primary-600"
                onClick={() => navigate("/")}
              >
                Início
              </Button>
              <span>/</span>
              <Button
                variant="link"
                className="p-0 h-auto text-neutral-600 hover:text-primary-600"
                onClick={() => navigate(categoryPath)}
              >
                {categoryName}
              </Button>
              <span>/</span>
              <span className="text-neutral-900">{title}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuestionnaireContainer;

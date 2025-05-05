
import React from "react";

const StopBangSidebar = () => {
  return (
    <>
      <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Sobre o questionário</h2>
      <p className="text-neutral-700 mb-3 text-left">
        O questionário STOP-BANG é uma ferramenta validada para triagem de Apneia Obstrutiva do Sono (AOS).
        É composto por oito perguntas de sim/não, sendo um dos instrumentos mais utilizados mundialmente
        para identificação de pacientes com risco de AOS.
      </p>
      <p className="text-neutral-700 mb-6 text-left">
        <strong>Validação para o português:</strong> Sim. O questionário foi traduzido e adaptado para a língua portuguesa falada no Brasil por Fonseca et al. (2016).
      </p>

      <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Critérios de Pontuação</h2>
      <p className="text-sm text-neutral-600 mb-2 text-left">Para a população geral:</p>
      <p className="text-sm text-neutral-600 mb-2 text-left">
        Baixo risco de AOS: Sim para 0 a 2 perguntas
      </p>
      <p className="text-sm text-neutral-600 mb-2 text-left">
        Risco intermediário de AOS: Sim para 3 a 4 perguntas
      </p>
      <p className="text-sm text-neutral-600 mb-2 text-left">
        Risco alto de AOS: Sim para 5 a 8 perguntas OU Sim para 2 ou mais das 4 perguntas iniciais + sexo masculino OU
        Sim para 2 ou mais das 4 perguntas iniciais + IMC &gt; 35 kg/m² OU Sim para 2 ou mais das 4 perguntas iniciais + 
        circunferência do pescoço (43 cm em homens, 41 cm em mulheres)
      </p>

      <h2 className="text-lg font-semibold text-neutral-900 mb-3 text-left">Referências</h2>
      <div className="text-sm text-neutral-600 space-y-4 text-left">
        <p>
          Fonseca LBM, Silveira EA, Lima NM, Rabahi MF. 
          Tradução e adaptação transcultural do questionário STOP-Bang para a língua portuguesa falada no Brasil. 
          J Bras Pneumol. 2016;42(4):266–272. 
          doi:10.1590/S1806-37562015000000243
        </p>
        <p>
          Chung F, Yegneswaran B, Liao P, et al. STOP questionnaire: a tool to screen patients for obstructive sleep apnea. 
          Anesthesiology. 2008;108(5):812-821
        </p>
        <p>
          Chung F, Subramanyam R, Liao P, Sasaki E, Shapiro C, Sun Y. High STOP-Bang score indicates a high probability of 
          obstructive sleep apnoea. Br J Anaesth. 2012 May;108(5):768-75.
        </p>
      </div>
    </>
  );
};

export default StopBangSidebar;

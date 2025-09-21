
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";
import EpworthPage from "./pages/EpworthPage";
import IsiPage from "./pages/IsiPage";
import FasPage from "./pages/FasPage";
import FssPage from "./pages/FssPage";
import GoalPage from "./pages/GoalPage";
import SacsPage from "./pages/SacsPage";
import StopBangPage from "./pages/StopBangPage";
import HamAPage from "./pages/HamAPage";
import PsqiPage from "./pages/PsqiPage";
import PsqiIntroPage from "./pages/PsqiIntroPage";
import PsqiPtPage from "./pages/PsqiPtPage";
import BerlinPage from "./pages/BerlinPage";
import MeqHoPage from "./pages/MeqHoPage";
import NoSasPage from "./pages/NoSasPage";
import HdasPage from "./pages/HdasPage";
import RbdsqPage from "./pages/RbdsqPage";
import Fosq36Page from "./pages/Fosq36Page";
import Fosq10Page from "./pages/Fosq10Page";
import BeckDepressionPage from "./pages/BeckDepressionPage";
import Phq9Page from "./pages/Phq9Page";
import PromisFatiguePage from "./pages/PromisFatiguePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* All routes are now public */}
          <Route path="/" element={<Index />} />
          <Route path="/categorias/:categoryId" element={<CategoryPage />} />
          <Route path="/pesquisa" element={<SearchResults />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/termos" element={<TermsPage />} />
          <Route path="/questionarios/epworth" element={<EpworthPage />} />
          <Route path="/questionarios/isi" element={<IsiPage />} />
          <Route path="/questionarios/fas" element={<FasPage />} />
          <Route path="/questionarios/fss" element={<FssPage />} />
          <Route path="/questionarios/goal" element={<GoalPage />} />
          <Route path="/questionarios/sacs" element={<SacsPage />} />
          <Route path="/questionarios/stop-bang" element={<StopBangPage />} />
          <Route path="/questionarios/ham-a" element={<HamAPage />} />
          <Route path="/questionarios/beck-depression" element={<BeckDepressionPage />} />
          <Route path="/questionarios/phq-9" element={<Phq9Page />} />
          <Route path="/questionarios/psqi" element={<Navigate to="/questionarios/psqi-intro" replace />} />
          <Route path="/questionarios/psqi-intro" element={<PsqiIntroPage />} />
          <Route path="/questionarios/psqi-pt" element={<PsqiPtPage />} />
          <Route path="/questionarios/berlin" element={<BerlinPage />} />
          <Route path="/questionarios/meq-ho" element={<MeqHoPage />} />
          <Route path="/questionarios/nosas" element={<NoSasPage />} />
          <Route path="/questionarios/hdas" element={<HdasPage />} />
          <Route path="/questionarios/rbdsq" element={<RbdsqPage />} />
          <Route path="/questionarios/fosq-36" element={<Fosq36Page />} />
        <Route path="/questionarios/fosq-10" element={<Fosq10Page />} />
        <Route path="/questionarios/promis-fatigue" element={<PromisFatiguePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

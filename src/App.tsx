
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

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
import PsqiPage from "./pages/PsqiPage"; // New import
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/categorias/:categoryId" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
            <Route path="/pesquisa" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
            <Route path="/sobre" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
            <Route path="/contato" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
            <Route path="/termos" element={<ProtectedRoute><TermsPage /></ProtectedRoute>} />
            <Route path="/perfil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/questionarios/epworth" element={<ProtectedRoute><EpworthPage /></ProtectedRoute>} />
            <Route path="/questionarios/isi" element={<ProtectedRoute><IsiPage /></ProtectedRoute>} />
            <Route path="/questionarios/fas" element={<ProtectedRoute><FasPage /></ProtectedRoute>} />
            <Route path="/questionarios/fss" element={<ProtectedRoute><FssPage /></ProtectedRoute>} />
            <Route path="/questionarios/goal" element={<ProtectedRoute><GoalPage /></ProtectedRoute>} />
            <Route path="/questionarios/sacs" element={<ProtectedRoute><SacsPage /></ProtectedRoute>} />
            <Route path="/questionarios/stop-bang" element={<ProtectedRoute><StopBangPage /></ProtectedRoute>} />
            <Route path="/questionarios/ham-a" element={<ProtectedRoute><HamAPage /></ProtectedRoute>} />
            <Route path="/questionarios/psqi" element={<ProtectedRoute><PsqiPage /></ProtectedRoute>} /> {/* New route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import GamesCatalogPage from "./pages/GamesCatalogPage";
import PressPage from "./pages/PressPage";
import JobsPage from "./pages/JobsPage";
import JobPostingPage from "./pages/JobPostingPage";
import LinksPage from "./pages/LinksPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPostings from "./pages/admin/AdminPostings";
import AdminPostingEditor from "./pages/admin/AdminPostingEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/admin" element={<Navigate to="/admin/postings" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/postings" element={<AdminPostings />} />
          <Route path="/admin/postings/new" element={<AdminPostingEditor />} />
          <Route path="/admin/postings/:code/edit" element={<AdminPostingEditor />} />
          <Route path="/:locale" element={<LandingPage />} />
          <Route path="/:locale/games" element={<GamesCatalogPage />} />
          <Route path="/:locale/games/:gameSlug" element={<GamePage />} />
          <Route path="/:locale/press" element={<PressPage />} />
          <Route path="/:locale/jobs" element={<JobsPage />} />
          <Route path="/:locale/jobs/:jobSlug" element={<JobPostingPage />} />
          <Route path="/:locale/links" element={<LinksPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

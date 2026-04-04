import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import GamesCatalogPage from "./pages/GamesCatalogPage";
import PressPage from "./pages/PressPage";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/en" replace />} />
          <Route path="/:locale" element={<LandingPage />} />
          <Route path="/:locale/games/:gameSlug" element={<GamePage />} />
          <Route path="/:locale/press" element={<PressPage />} />
          <Route path="/:locale/jobs" element={<JobsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

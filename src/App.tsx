import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AgeVerification } from "@/components/AgeVerification";
import { useState } from "react";
import Home from "./pages/Home";
import Index from "./pages/Index";
import ECigarette from "./pages/ECigarette";
import Disposable from "./pages/Disposable";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AgeVerification onVerified={() => setIsVerified(true)} />
        {isVerified && (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/e-liquid" element={<Index />} />
              <Route path="/e-cigarette" element={<ECigarette />} />
              <Route path="/disposable" element={<Disposable />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

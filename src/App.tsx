import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiConfig } from 'wagmi';
import { config } from './lib/web3Config';
import Index from "./pages/Index";
import Presales from "./pages/Presales";
import Purchase from "./pages/Purchase";
import { Navbar } from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <WagmiConfig config={config}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/presales" element={<Presales />} />
            <Route path="/purchase" element={<Purchase />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </WagmiConfig>
);

export default App;
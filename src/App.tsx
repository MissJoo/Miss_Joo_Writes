import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsTracker from "./components/AnalyticsTracker";
import CookieConsent from "./components/CookieConsent";
import HeadManager from "./components/HeadManager";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Lifestyle from "./pages/Lifestyle";
import Downloads from "./pages/Downloads";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import PillarHub from "./pages/PillarHub";
import WorkWithMe from "./pages/WorkWithMe";
import TheSuitcase from "./pages/TheSuitcase";
import NotFound from "./pages/NotFound";
import { pillars } from "./data/pillars";

const queryClient = new QueryClient();

// The router itself is supplied by main.tsx (browser) or entry-server.tsx (prerender).
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <AnalyticsTracker />
      <HeadManager />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/shared-experiences" element={<Lifestyle />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work-with-me" element={<WorkWithMe />} />
        <Route path="/the-suitcase" element={<TheSuitcase />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        {pillars.map((pillar) => (
          <Route key={pillar.slug} path={`/${pillar.slug}`} element={<PillarHub slug={pillar.slug} />} />
        ))}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

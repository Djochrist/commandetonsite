import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Home = lazy(() => import("@/pages/home"));
const Influenceur = lazy(() => import("@/pages/influenceur"));
const EntrepriseInformatique = lazy(() => import("@/pages/entreprise-informatique"));
const Automobile = lazy(() => import("@/pages/automobile"));
const Hopital = lazy(() => import("@/pages/hopital"));
const MaisonHabillement = lazy(() => import("@/pages/maison-habillement"));
const Restaurant = lazy(() => import("@/pages/restaurant"));
const Supermarche = lazy(() => import("@/pages/supermarche"));
const Ecole = lazy(() => import("@/pages/ecole"));
const SalonCoiffure = lazy(() => import("@/pages/salon-coiffure"));
const BoutiqueEnLigne = lazy(() => import("@/pages/boutique-en-ligne"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense fallback={<div aria-live="polite">Chargement...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/influenceur" component={Influenceur} />
        <Route path="/entreprise-informatique" component={EntrepriseInformatique} />
        <Route path="/automobile" component={Automobile} />
        <Route path="/hopital" component={Hopital} />
        <Route path="/maison-habillement" component={MaisonHabillement} />
        <Route path="/restaurant" component={Restaurant} />
        <Route path="/supermarche" component={Supermarche} />
        <Route path="/ecole" component={Ecole} />
        <Route path="/salon-coiffure" component={SalonCoiffure} />
        <Route path="/boutique-en-ligne" component={BoutiqueEnLigne} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 👈 Pense à adapter ce chemin

import { supabase } from "./supabase/supabase";
import type { Session } from "@supabase/supabase-js";
import Loading from "./pages/Loading";

import LogoutPopin from "./components/auth/LogoutPopin";

const queryClient = new QueryClient();

// 1. Création d'un composant App pour gérer les hooks
function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutPopin, setShowLogoutPopin] = useState(false);

  useEffect(() => {
    // Récupérer la session au chargement initial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Écouter les changements (connexion, déconnexion)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === "SIGNED_OUT") {
        setShowLogoutPopin(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  // 3. Rendre l'application en injectant la session dans le contexte du router
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ session }} />
      <LogoutPopin
        isVisible={showLogoutPopin}
        onClose={() => setShowLogoutPopin(false)}
      />
    </QueryClientProvider>
  );
}

// 4. Rendu final
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes";
import type { Session } from "@supabase/supabase-js";
import ErrorPage from "../pages/ErrorPage";

export interface RouterContext {
  session: Session | null;
}

export const router = createRouter({
  routeTree,
  context: {
    session: null,
  },
  defaultNotFoundComponent: () =>
    ErrorPage({
      errorCode: "404",
      title: "Page Introuvable",
    }),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes";

export const router = createRouter({
    routeTree,
    context: {
        session: null 
    }
});


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
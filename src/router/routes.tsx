import {
  createRootRouteWithContext,
  createRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import AccountPage from "../pages/AccountPage";
import MyRentalsPage from "../pages/MyRentalsPage";
import AccountParameterPage from "../pages/AccountParametersPage";
import PaymentPage from "../pages/PaymentPage";
import WishlistPage from "../pages/WishlistPage";
import CarListPage from "../pages/CarListPage";
import AdminPanel from "../pages/AdminPanel";
import Vehicules from "../pages/Vehicules";
import Clients from "../pages/Clients";
import Reservation from "../pages/Reservation";
import Economie from "../pages/Economie";
import Maintenance from "../pages/Maintenance";
import JournalActivites from "../pages/JournalActivites";
import AdminParameter from "../pages/AdminParameter";
import TermsOfUsePage from "../pages/TermsOfUsePage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import type { Session } from "@supabase/supabase-js";
import { getUserRole } from "../api/user";
import ErrorPage from "../pages/ErrorPage";

interface MyRouterContext {
  session: Session | null;
}

export const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
});

export const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_auth",
  component: () => <Outlet />,
  beforeLoad: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/login" });
    }

    const userRole = (await getUserRole())?.trim().toLowerCase();

    if (userRole !== "user") {
      throw redirect({
        to: "/error/$code",
        params: { code: "403" },
        search: {
          from: "user-route",
          reason: "not-user",
        },
      });
    }
  },
});

export const adminProtectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-protected",
  component: () => <Outlet />,
  beforeLoad: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/login" });
    }

    const userRole = (await getUserRole())?.trim().toLowerCase();

    if (userRole !== "admin") {
      throw redirect({
        to: "/error/$code",
        params: { code: "403" },
        search: {
          from: "admin-route",
          reason: "not-admin",
        },
      });
    }
  },
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  beforeLoad: async ({ context }) => {
    if (context.session) {
      const userRole: string = await getUserRole();
      if (userRole.trim().toLowerCase() === "admin") {
        throw redirect({
          to: "/admin-panel",
        });
      } else {
        throw redirect({
          to: "/dashboard/account",
        });
      }
    }
  },
});

export const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
  beforeLoad: ({ context }) => {
    if (context.session) {
      throw redirect({
        to: "/dashboard/account",
      });
    }
  },
});
export const carsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cars",
  component: CarListPage,
});
export const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms-of-use",
  component: TermsOfUsePage,
});
export const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});
export const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

export const accountRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard/account",
  component: AccountPage,
});
export const myRentalRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard/rentals",
  component: MyRentalsPage,
});
export const settingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard/settings",
  component: AccountParameterPage,
});
export const paymentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard/payments",
  component: PaymentPage,
});
export const wishlistRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard/wishlist",
  component: WishlistPage,
});

export const adminPanelRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel",
  component: AdminPanel,
});
export const vehiculesRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel/vehicules",
  component: Vehicules,
});
export const journalRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel/journal",
  component: JournalActivites,
});
export const promotionsRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel/promotions",
  component: () => <div style={{ padding: '2rem' }}><h1>Promotions</h1><p>En construction...</p></div>,
});
export const maintenanceRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel/maintenance",
  component: Maintenance,
});
export const economieRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel/economie",
  component: Economie,
});
export const clientsRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel/clients",
  component: Clients,
});
export const reservationsRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel/reservations",
  component: Reservation,
});
export const parametresRoute = createRoute({
  getParentRoute: () => adminProtectedRoute,
  path: "/admin-panel/parametres",
  component: AdminParameter,
});

export const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/error/$code",
  component: ErrorPage,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signupRoute,
  carsRoute,
  termsRoute,
  privacyRoute,
  resetPasswordRoute,
  errorRoute,

  protectedRoute.addChildren([
    accountRoute,
    myRentalRoute,
    settingsRoute,
    paymentRoute,
    wishlistRoute,

    // ← routes admin à l’intérieur du adminProtectedRoute
  ]),
  adminProtectedRoute.addChildren([
    adminPanelRoute,
    vehiculesRoute,
    maintenanceRoute,
    economieRoute,
    clientsRoute,
    reservationsRoute,
    promotionsRoute,
    journalRoute,
    parametresRoute,
  ]),
]);

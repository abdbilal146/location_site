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
import AdminParameter from "../pages/AdminParameter";
import TermsOfUsePage from "../pages/TermsOfUsePage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import type { Session } from "@supabase/supabase-js";

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
  beforeLoad: ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
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
  beforeLoad: ({ context }) => {
    if (context.session) {
      throw redirect({
        to: "/dashboard/account",
      });
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
  getParentRoute: () => protectedRoute,
  path: "/admin-panel",
  component: AdminPanel,
});
export const vehiculesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-panel/vehicules",
  component: Vehicules,
});
export const clientsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-panel/clients",
  component: Clients,
});
export const reservationsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-panel/reservations",
  component: Reservation,
});
export const parametresRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin-panel/parametres",
  component: AdminParameter,
});

export const routeTree = rootRoute.addChildren([
  // Enfants publics
  homeRoute,
  loginRoute,
  signupRoute,
  carsRoute,
  termsRoute,
  privacyRoute,
  resetPasswordRoute,

  protectedRoute.addChildren([
    accountRoute,
    myRentalRoute,
    settingsRoute,
    paymentRoute,
    wishlistRoute,
    adminPanelRoute,
    vehiculesRoute,
    clientsRoute,
    reservationsRoute,
    parametresRoute,
  ]),
]);

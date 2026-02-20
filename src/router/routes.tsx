import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
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


export const rootRoute = createRootRoute({
    component: () => <Outlet />
})

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
})

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage
})

export const signupRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/signup',
    component: SignUpPage
})

export const accountRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard/account',
    component: AccountPage
})

export const myRentalRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard/rentals',
    component: MyRentalsPage
})

export const settingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard/settings',
    component: AccountParameterPage
})

export const paymentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard/payments',
    component: PaymentPage
})

export const wishlistRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard/wishlist',
    component: WishlistPage
})

export const carsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/cars',
    component: CarListPage
})

export const adminPanelRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin-panel',
    component: AdminPanel
})

export const vehiculesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin-panel/vehicules',
    component: Vehicules
})

export const clientsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin-panel/clients',
    component: Clients
})

export const reservationsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin-panel/reservations',
    component: Reservation
})

export const parametresRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin-panel/parametres',
    component: AdminParameter
})

export const routeTree = rootRoute.addChildren([
    homeRoute,
    loginRoute,
    signupRoute,
    accountRoute,
    myRentalRoute,
    settingsRoute,
    paymentRoute,
    wishlistRoute,
    carsRoute,
    adminPanelRoute,
    vehiculesRoute,
    clientsRoute,
    reservationsRoute,
    parametresRoute
])
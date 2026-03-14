import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminStatCard from "../components/AdminStatCard";
import AdminRecentReservations from "../components/AdminRecentReservations";
import {
  IconCar,
  IconUsers,
  IconFileDescription,
  IconChartLine,
} from "@tabler/icons-react";
import "./AdminPanel.scss";
import { useQueries } from "@tanstack/react-query";
import { getAllClients } from "../api/client";
import { getAllCars } from "../api/car";
import Loading from "./Loading";
import { getAllReservations } from "../api/reservation";
import { getMonthlyRevenue } from "../api/revenue";
import AdminNavbar from "../components/AdminNavbar";

const AdminPanel: React.FC = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["clients"],
        queryFn: getAllClients,
      },
      {
        queryKey: ["cars"],
        queryFn: getAllCars,
      },
      {
        queryKey: ["reservations"],
        queryFn: getAllReservations,
      },
      {
        queryKey: ["revenue"],
        queryFn: getMonthlyRevenue,
      },
    ],
  });

  const [clientsQuery, carsQuery, reservationsQuery, revenueQuery] = results;

  if (
    clientsQuery.isLoading ||
    carsQuery.isLoading ||
    reservationsQuery.isLoading ||
    revenueQuery.isLoading
  ) {
    return <Loading></Loading>;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <AdminNavbar />
        <header className="admin-header">
          <h1 className="admin-header__title">Tableau de Bord</h1>
          <p className="admin-header__subtitle">
            Bienvenue dans votre panneau d'administration
          </p>
        </header>

        <div className="admin-stats-grid">
          <AdminStatCard
            title="Total Véhicules"
            value={carsQuery.data?.length}
            change="+12%"
            changeType="positive"
            icon={<IconCar size={24} />}
            iconBgColor="#22c55e"
            iconColor="#ffffff"
          />
          <AdminStatCard
            title="Clients Actifs"
            value={clientsQuery.data?.length}
            change="+8%"
            changeType="positive"
            icon={<IconUsers size={24} />}
            iconBgColor="#3b82f6"
            iconColor="#ffffff"
          />
          <AdminStatCard
            title="Réservations"
            value={reservationsQuery.data?.length}
            change="+23%"
            changeType="positive"
            icon={<IconFileDescription size={24} />}
            iconBgColor="#a855f7"
            iconColor="#ffffff"
          />
          <AdminStatCard
            title="Revenu Mensuel"
            value={`€ ${revenueQuery.data?.totalRevenue}`}
            change={`+${revenueQuery.data?.revenueGrowthPercentage}%`}
            changeType="positive"
            icon={<IconChartLine size={24} />}
            iconBgColor="#f97316"
            iconColor="#ffffff"
          />
        </div>

        <AdminRecentReservations reservations={reservationsQuery.data!} />
      </main>
    </div>
  );
};

export default AdminPanel;

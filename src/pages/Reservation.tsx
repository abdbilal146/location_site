import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  IconSearch,
  IconFilter,
  IconCalendarEvent,
  IconPlus,
} from "@tabler/icons-react";
import AddReservationModal from "../components/AddReservationModal";
import "./Reservation.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllReservations } from "../api/reservation";
import ErrorPage from "./ErrorPage";
import { isAxiosError } from "axios";
import Loading from "./Loading";
import AdminNavbar from "../components/AdminNavbar";

interface Reservation {
  id: string;
  clientInitials: string;
  clientName: string;
  vehicle: string;
  periodStart: string;
  periodEnd: string;
  price: string;
  status: "Confirmée" | "En cours" | "Terminée" | "Annulée";
}

export default function Reservation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: getAllReservations,
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error) {
    let statusCode = 500;

    if (isAxiosError(error)) {
      statusCode = error.response?.status || 500;
    } else if ("status" in error) {
      statusCode = (error as any).status;
    }

    return (
      <ErrorPage errorCode={statusCode} message={error.message} title="Oups" />
    );
  }

  return (
    <div className="reservations-wrapper">
      <AdminSidebar activeTab="reservations" />
      <main className="reservations-content">
        <AdminNavbar />
        <header className="reservations-header">
          <div className="reservations-header__title-section">
            <h1 className="reservations-header__title">Réservations</h1>
            <p className="reservations-header__subtitle">
              6 réservations au total
            </p>
          </div>
          <button
            className="reservations-header__add-button"
            onClick={() => setIsModalOpen(true)}
          >
            <IconPlus size={18} />
            <span>Nouvelle Réservation</span>
          </button>
        </header>

        <div className="reservations-controls">
          <div className="reservations-search">
            <IconSearch size={20} color="#9ca3af" />
            <input type="text" placeholder="Rechercher une réservation..." />
          </div>
          <div className="reservations-filter">
            <IconFilter size={20} color="#9ca3af" />
            <select>
              <option>Tous les statuts</option>
              <option>Confirmée</option>
              <option>En cours</option>
              <option>Terminée</option>
              <option>Annulée</option>
            </select>
          </div>
        </div>

        <div className="reservations-table-container">
          <table className="reservations-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>CLIENT</th>
                <th>VÉHICULE</th>
                <th>PÉRIODE</th>
                <th>PRIX TOTAL</th>
                <th>STATUT</th>
              </tr>
            </thead>
            <tbody>
              {data.map((res: any) => (
                <tr key={res.id}>
                  <td className="reservation-id">{res.id}</td>
                  <td>
                    <div className="client-info">
                      <div className="client-initials">
                        {res.clientInitials}
                      </div>
                      <span className="client-name">
                        {res.client?.fullName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="vehicle-name">{res.car?.model}</span>
                  </td>
                  <td>
                    <div className="reservation-period">
                      <IconCalendarEvent size={16} />
                      <span>
                        {res.startDate} - {res.endDate}
                      </span>
                    </div>
                  </td>
                  <td>
                    <strong className="reservation-price">
                      {res.car.rentPrice}
                    </strong>
                  </td>
                  <td>
                    <span
                      className={`status-badge status-${res.reservationStatus?.toLowerCase().replace(" ", "-")}`}
                    >
                      {res.reservationStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}

import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  IconPlus,
  IconSearch,
  IconAlertTriangle,
  IconClock,
  IconTool,
  IconCircleCheck,
  IconCalendarEvent
} from "@tabler/icons-react";
import "./Maintenance.scss";

// Mock Data
const stats = {
  enRetard: 1,
  planifiees: 1,
  enCours: 1,
  terminees: 1,
};

const maintenanceData = [
  {
    id: 1,
    vehicle: "Renault Clio",
    plate: "AB-123-CD",
    type: "Révision complète",
    desc: "Révision des 50 000 km + changement filtres",
    date: "2026-03-10",
    cost: "350 €",
    status: "En retard",
    next_maintenance: "60 000 km",
  },
  {
    id: 2,
    vehicle: "Peugeot 308",
    plate: "EF-456-GH",
    type: "Vidange",
    desc: "Vidange + contrôle freins",
    date: "2026-03-18",
    cost: "-",
    status: "Planifiée",
    next_maintenance: "35 000 km",
  },
  {
    id: 3,
    vehicle: "BMW Série 3",
    plate: "IJ-789-KL",
    type: "Changement pneus",
    desc: "Remplacement 4 pneus été",
    date: "2026-03-14",
    cost: "600 €",
    status: "En cours",
    next_maintenance: "-",
  },
  {
    id: 4,
    vehicle: "Audi A4",
    plate: "MN-012-OP",
    type: "Révision",
    desc: "Révision annuelle",
    date: "2026-03-05",
    cost: "280 €",
    status: "Terminée",
    next_maintenance: "45 000 km",
  },
];

const Maintenance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous les statuts");

  const getStatusClass = (status: string) => {
    switch (status) {
      case "En retard":
        return "status-badge status-badge--retard";
      case "Planifiée":
        return "status-badge status-badge--planifiee";
      case "En cours":
        return "status-badge status-badge--encours";
      case "Terminée":
        return "status-badge status-badge--terminee";
      default:
        return "status-badge";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "En retard":
        return <IconAlertTriangle size={14} />;
      case "Planifiée":
        return <IconClock size={14} />;
      case "En cours":
        return <IconTool size={14} />;
      case "Terminée":
        return <IconCircleCheck size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout maintenance-page">
      <AdminSidebar activeTab="maintenance" />
      <main className="admin-main-content">
        <header className="maintenance-header">
          <div className="maintenance-header__titles">
            <h1 className="maintenance-header__title">Gestion de Maintenance</h1>
            <p className="maintenance-header__subtitle">
              4 opérations de maintenance
            </p>
          </div>
          <button className="maintenance-header__action-btn">
            <IconPlus size={20} />
            <span>Planifier Maintenance</span>
          </button>
        </header>

        <div className="maintenance-stats-grid">
          <div className="maintenance-stat-card">
            <div className="maintenance-stat-card__icon maintenance-stat-card__icon--retard">
              <IconAlertTriangle size={24} />
            </div>
            <div className="maintenance-stat-card__info">
              <p className="maintenance-stat-card__label">En retard</p>
              <h3 className="maintenance-stat-card__value">{stats.enRetard}</h3>
            </div>
          </div>
          <div className="maintenance-stat-card">
            <div className="maintenance-stat-card__icon maintenance-stat-card__icon--planifiee">
              <IconClock size={24} />
            </div>
            <div className="maintenance-stat-card__info">
              <p className="maintenance-stat-card__label">Planifiées</p>
              <h3 className="maintenance-stat-card__value">{stats.planifiees}</h3>
            </div>
          </div>
          <div className="maintenance-stat-card">
            <div className="maintenance-stat-card__icon maintenance-stat-card__icon--encours">
              <IconTool size={24} />
            </div>
            <div className="maintenance-stat-card__info">
              <p className="maintenance-stat-card__label">En cours</p>
              <h3 className="maintenance-stat-card__value">{stats.enCours}</h3>
            </div>
          </div>
          <div className="maintenance-stat-card">
            <div className="maintenance-stat-card__icon maintenance-stat-card__icon--terminee">
              <IconCircleCheck size={24} />
            </div>
            <div className="maintenance-stat-card__info">
              <p className="maintenance-stat-card__label">Terminées</p>
              <h3 className="maintenance-stat-card__value">{stats.terminees}</h3>
            </div>
          </div>
        </div>

        <div className="maintenance-content">
          <div className="maintenance-filters">
            <div className="maintenance-search">
              <IconSearch size={20} className="maintenance-search__icon" />
              <input
                type="text"
                placeholder="Rechercher par véhicule, plaque ou type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="maintenance-search__input"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="maintenance-select"
            >
              <option>Tous les statuts</option>
              <option>En retard</option>
              <option>Planifiée</option>
              <option>En cours</option>
              <option>Terminée</option>
            </select>
          </div>

          <div className="table-responsive">
            <table className="maintenance-table">
              <thead>
                <tr>
                  <th>VÉHICULE</th>
                  <th>TYPE</th>
                  <th>DATE PRÉVUE</th>
                  <th>COÛT</th>
                  <th>STATUT</th>
                  <th>PROCHAIN ENTRETIEN</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="cell-vehicle">
                        <span className="cell-vehicle__name">{item.vehicle}</span>
                        <span className="cell-vehicle__plate">{item.plate}</span>
                      </div>
                    </td>
                    <td>
                      <div className="cell-type">
                        <span className="cell-type__name">{item.type}</span>
                        <span className="cell-type__desc">{item.desc}</span>
                      </div>
                    </td>
                    <td>
                      <div className="cell-date">
                        <IconCalendarEvent size={16} />
                        <span>{item.date}</span>
                      </div>
                    </td>
                    <td>
                      <span className="cell-cost">{item.cost}</span>
                    </td>
                    <td>
                      <span className={getStatusClass(item.status)}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <span className="cell-next">{item.next_maintenance}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Maintenance;

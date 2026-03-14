import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  IconSearch,
  IconUserPlus,
  IconEdit,
  IconCalendarPlus,
  IconTrash,
  IconLogin,
  IconUser,
  IconCar,
  IconFileDescription,
  IconTag,
  IconSettings
} from "@tabler/icons-react";
import "./JournalActivites.scss";
import AdminNavbar from "../components/AdminNavbar";

// Mock Data
const activitiesData = [
  {
    id: 1,
    title: "Nouveau client ajouté",
    actionType: "Création",
    entityType: "Client",
    details: "Marie Dubois - marie.dubois@email.com",
    author: "Admin",
    date: "2026-03-14 14:32",
    iconType: "user-plus",
  },
  {
    id: 2,
    title: "Véhicule modifié",
    actionType: "Modification",
    entityType: "Véhicule",
    details: "Renault Clio - Prix mis à jour: 45€/jour",
    author: "Admin",
    date: "2026-03-14 13:15",
    iconType: "edit",
  },
  {
    id: 3,
    title: "Nouvelle réservation créée",
    actionType: "Création",
    entityType: "Réservation",
    details: "Jean Martin - Peugeot 308 - 5 jours",
    author: "Admin",
    date: "2026-03-14 11:45",
    iconType: "calendar-plus",
  },
  {
    id: 4,
    title: "Promotion supprimée",
    actionType: "Suppression",
    entityType: "Promotion",
    details: "Code: WINTER2025",
    author: "Admin",
    date: "2026-03-14 10:20",
    iconType: "trash",
  },
  {
    id: 5,
    title: "Connexion administrateur",
    actionType: "Connexion",
    entityType: "Système",
    details: " ",
    author: "Admin",
    date: "2026-03-14 09:00",
    iconType: "login",
  },
  {
    id: 6,
    title: "Informations client mises à jour",
    actionType: "Modification",
    entityType: "Client",
    details: "Sophie Bernard - Documents vérifiés",
    author: "Admin",
    date: "2026-03-13 16:45",
    iconType: "edit-client",
  },
  {
    id: 7,
    title: "Nouveau véhicule ajouté",
    actionType: "Création",
    entityType: "Véhicule",
    details: "BMW Série 3 - AB-789-XY",
    author: "Admin",
    date: "2026-03-13 14:30",
    iconType: "car-plus",
  },
  {
    id: 8,
    title: "Réservation annulée",
    actionType: "Suppression",
    entityType: "Réservation",
    details: "Réservation #1234",
    author: "Admin",
    date: "2026-03-13 11:15",
    iconType: "trash-reservation",
  },
];

const JournalActivites: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous les types");
  const [entityFilter, setEntityFilter] = useState("Toutes les entités");

  const getActionClass = (type: string) => {
    switch (type) {
      case "Création":
        return "badge-action badge-action--creation";
      case "Modification":
        return "badge-action badge-action--modification";
      case "Suppression":
        return "badge-action badge-action--suppression";
      case "Connexion":
        return "badge-action badge-action--connexion";
      default:
        return "badge-action";
    }
  };

  const getEntityIcon = (entity: string) => {
    switch (entity) {
      case "Client":
        return <IconUser size={14} />;
      case "Véhicule":
        return <IconCar size={14} />;
      case "Réservation":
        return <IconFileDescription size={14} />;
      case "Promotion":
        return <IconTag size={14} />;
      case "Système":
        return <IconSettings size={14} />;
      default:
        return null;
    }
  };

  const getActivityIcon = (iconType: string) => {
    switch (iconType) {
      case "user-plus":
      case "car-plus":
      case "calendar-plus":
        return (
          <div className="activity-icon activity-icon--creation">
            {iconType === "user-plus" && <IconUserPlus size={20} />}
            {iconType === "car-plus" && <IconCar size={20} />} 
            {iconType === "calendar-plus" && <IconCalendarPlus size={20} />} 
          </div>
        );
      case "edit":
      case "edit-client":
        return (
          <div className="activity-icon activity-icon--modification">
            <IconEdit size={20} />
          </div>
        );
      case "trash":
      case "trash-reservation":
        return (
          <div className="activity-icon activity-icon--suppression">
            <IconTrash size={20} />
          </div>
        );
      case "login":
        return (
          <div className="activity-icon activity-icon--system">
            <IconLogin size={20} />
          </div>
        );
      default:
        return (
          <div className="activity-icon">
            <IconSettings size={20} />
          </div>
        );
    }
  };

  return (
    <div className="admin-layout journal-page">
      <AdminSidebar activeTab="journal" />
      <main className="admin-main-content">
        <AdminNavbar />
        <header className="journal-header">
          <div className="journal-header__titles">
            <h1 className="journal-header__title">Journal d'Activités</h1>
            <p className="journal-header__subtitle">
              Historique de toutes les actions administrateur
            </p>
          </div>
        </header>

        <div className="journal-content">
          <div className="journal-filters">
            <div className="journal-search">
              <IconSearch size={20} className="journal-search__icon" />
              <input
                type="text"
                placeholder="Rechercher une activité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="journal-search__input"
              />
            </div>
            
            <div className="journal-selects">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="journal-select"
              >
                <option>Tous les types</option>
                <option>Création</option>
                <option>Modification</option>
                <option>Suppression</option>
                <option>Connexion</option>
              </select>

              <select
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
                className="journal-select"
              >
                <option>Toutes les entités</option>
                <option>Client</option>
                <option>Véhicule</option>
                <option>Réservation</option>
                <option>Promotion</option>
                <option>Système</option>
              </select>
            </div>
          </div>

          <div className="activities-list">
            {activitiesData.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-item__left">
                  {getActivityIcon(activity.iconType)}
                  <div className="activity-item__details">
                    <div className="activity-item__header-row">
                      <h3 className="activity-item__title">{activity.title}</h3>
                      <span className={getActionClass(activity.actionType)}>
                        {activity.actionType}
                      </span>
                      <span className="badge-entity">
                        {getEntityIcon(activity.entityType)}
                        {activity.entityType}
                      </span>
                    </div>
                    {activity.details.trim() && (
                      <p className="activity-item__desc">{activity.details}</p>
                    )}
                    <p className="activity-item__author">
                      Par: {activity.author}
                    </p>
                  </div>
                </div>
                <div className="activity-item__right">
                  <span className="activity-item__date">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalActivites;

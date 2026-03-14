import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabase/supabase';
import { 
  IconBell, 
  IconUser, 
  IconChevronDown, 
  IconAlertCircle, 
  IconClock, 
  IconCar, 
  IconCircleCheck 
} from '@tabler/icons-react';
import './AdminNavbar.scss';

const notifications = [
  {
    id: 1,
    title: "Véhicule en retard",
    desc: "La Renault Clio (AB-123-CD) aurait dû être retournée il y a 2 heures",
    time: "Il y a 5 min",
    type: "danger",
    icon: <IconAlertCircle size={18} />
  },
  {
    id: 2,
    title: "Nouvelle réservation",
    desc: "Jean Martin a réservé une Peugeot 308 pour 5 jours",
    time: "Il y a 15 min",
    type: "success",
    icon: <IconCircleCheck size={18} />
  },
  {
    id: 3,
    title: "Maintenance requise",
    desc: "La BMW Série 3 nécessite une révision dans 2 jours",
    time: "Il y a 1 heure",
    type: "warning",
    icon: <IconClock size={18} />
  },
  {
    id: 4,
    title: "Nouveau client",
    desc: "Marie Dubois a créé un compte",
    time: "Il y a 3 heures",
    type: "info",
    icon: <IconCar size={18} />
  }
];

const AdminNavbar: React.FC = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await supabase.auth.signOut();
    navigate({ to: '/' });
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar__spacer"></div>
      
      <div className="admin-navbar__actions">
        {/* Notifications Dropdown */}
        <div className="admin-navbar__dropdown-container" ref={notifRef}>
          <button 
            className="admin-navbar__icon-btn" 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
          >
            <IconBell size={24} stroke={1.5} />
            <span className="admin-navbar__badge">3</span>
          </button>

          {isNotifOpen && (
            <div className="admin-dropdown admin-dropdown--notif">
              <div className="admin-dropdown__header">
                <div>
                  <h4>Notifications</h4>
                  <span>3 non lues</span>
                </div>
                <button className="admin-dropdown__header-action">Tout marquer comme lu</button>
              </div>
              
              <div className="admin-dropdown__list">
                {notifications.map(notif => (
                  <div key={notif.id} className="admin-dropdown__item-notif">
                    <div className={`admin-dropdown__notif-icon admin-dropdown__notif-icon--${notif.type}`}>
                      {notif.icon}
                    </div>
                    <div className="admin-dropdown__notif-content">
                      <div className="admin-dropdown__notif-top">
                        <h5>{notif.title}</h5>
                        <button className="admin-dropdown__notif-close">×</button>
                      </div>
                      <p>{notif.desc}</p>
                      <span className="admin-dropdown__notif-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="admin-dropdown__footer">
                <button>Voir toutes les notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="admin-navbar__dropdown-container" ref={profileRef}>
          <div 
            className="admin-navbar__profile"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
          >
            <div className="admin-navbar__avatar">
              <IconUser size={20} />
            </div>
            <div className="admin-navbar__user-info">
              <span className="admin-navbar__user-name">Admin</span>
              <span className="admin-navbar__user-role">Administrateur</span>
            </div>
            <IconChevronDown size={16} className="admin-navbar__chevron" />
          </div>

          {isProfileOpen && (
            <div className="admin-dropdown admin-dropdown--profile">
              <ul className="admin-dropdown__menu">
                <li><button onClick={() => navigate({ to: '/admin-panel/parametres' })}>Mon Profil</button></li>
                <li><button onClick={() => navigate({ to: '/admin-panel/parametres' })}>Paramètres</button></li>
                <li className="admin-dropdown__menu-divider"></li>
                <li><button className="text-danger" onClick={handleLogout}>Déconnexion</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

import React from 'react';
import { Link } from '@tanstack/react-router';
import {
    IconLayoutDashboard,
    IconCar,
    IconUsers,
    IconFileDescription,
    IconSettings,
    IconLogout
} from '@tabler/icons-react';
import './AdminSidebar.scss';

interface AdminSidebarProps {
    activeTab?: 'dashboard' | 'vehicules' | 'clients' | 'reservations' | 'parametres';
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab = 'dashboard' }) => {
    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar__brand">
                <div className="admin-sidebar__brand-icon">
                    <IconCar size={24} color="white" />
                </div>
                <div className="admin-sidebar__brand-text">
                    <h2>AutoLocation</h2>
                    <p>Admin Panel</p>
                </div>
            </div>

            <nav className="admin-sidebar__nav">
                <ul className="admin-sidebar__nav-list">
                    <li className={`admin-sidebar__nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
                        <Link to="/admin-panel" className="admin-sidebar__nav-link">
                            <IconLayoutDashboard size={20} />
                            <span>Tableau de Bord</span>
                        </Link>
                    </li>
                    <li className={`admin-sidebar__nav-item ${activeTab === 'vehicules' ? 'active' : ''}`}>
                        <Link to="/admin-panel/vehicules" className="admin-sidebar__nav-link">
                            <IconCar size={20} />
                            <span>Gestion Véhicules</span>
                        </Link>
                    </li>
                    <li className={`admin-sidebar__nav-item ${activeTab === 'clients' ? 'active' : ''}`}>
                        <Link to="/admin-panel/clients" className="admin-sidebar__nav-link">
                            <IconUsers size={20} />
                            <span>Clients</span>
                        </Link>
                    </li>
                    <li className={`admin-sidebar__nav-item ${activeTab === 'reservations' ? 'active' : ''}`}>
                        <Link to="/admin-panel/reservations" className="admin-sidebar__nav-link">
                            <IconFileDescription size={20} />
                            <span>Réservations</span>
                        </Link>
                    </li>
                    <li className={`admin-sidebar__nav-item ${activeTab === 'parametres' ? 'active' : ''}`}>
                        <Link to="/admin-panel/parametres" className="admin-sidebar__nav-link">
                            <IconSettings size={20} />
                            <span>Paramètres</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="admin-sidebar__footer">
                <a href="#" className="admin-sidebar__logout">
                    <IconLogout size={20} />
                    <span>Déconnexion</span>
                </a>
            </div>
        </aside>
    );
};

export default AdminSidebar;

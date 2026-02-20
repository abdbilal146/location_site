import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminStatCard from '../components/AdminStatCard';
import AdminRecentReservations from '../components/AdminRecentReservations';
import { IconCar, IconUsers, IconFileDescription, IconChartLine } from '@tabler/icons-react';
import './AdminPanel.scss';

const AdminPanel: React.FC = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main-content">
                <header className="admin-header">
                    <h1 className="admin-header__title">Tableau de Bord</h1>
                    <p className="admin-header__subtitle">Bienvenue dans votre panneau d'administration</p>
                </header>

                <div className="admin-stats-grid">
                    <AdminStatCard
                        title="Total Véhicules"
                        value="48"
                        change="+12%"
                        changeType="positive"
                        icon={<IconCar size={24} />}
                        iconBgColor="#10b981"
                        iconColor="#ffffff"
                    />
                    <AdminStatCard
                        title="Clients Actifs"
                        value="1,234"
                        change="+8%"
                        changeType="positive"
                        icon={<IconUsers size={24} />}
                        iconBgColor="#3b82f6"
                        iconColor="#ffffff"
                    />
                    <AdminStatCard
                        title="Réservations"
                        value="856"
                        change="+23%"
                        changeType="positive"
                        icon={<IconFileDescription size={24} />}
                        iconBgColor="#a855f7"
                        iconColor="#ffffff"
                    />
                    <AdminStatCard
                        title="Revenu Mensuel"
                        value="€45,231"
                        change="+15%"
                        changeType="positive"
                        icon={<IconChartLine size={24} />}
                        iconBgColor="#f97316"
                        iconColor="#ffffff"
                    />
                </div>

                <AdminRecentReservations />
            </main>
        </div>
    );
};

export default AdminPanel;

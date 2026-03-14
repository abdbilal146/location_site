import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminStatCard from "../components/AdminStatCard";
import {
  IconDownload,
  IconCurrencyEuro,
  IconArrowUpRight,
  IconCurrencyDollar,
  IconTrendingUp,
  IconCalendarEvent
} from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import "./Economie.scss";
import AdminNavbar from "../components/AdminNavbar";

// Mock Data
const stats = {
  revenuTotal: 128500,
  revenuEvolution: 18.2,
  depensesTotales: 61100,
  depensesEvolution: 5.4,
  beneficeNet: 67400,
  beneficeEvolution: 32.1,
  tauxOccupation: 78,
  tauxEvolution: 4.5
};

const evolutionData = [
  { month: 'Jan', revenu: 12000, depenses: 8000, benefice: 4000 },
  { month: 'Fév', revenu: 15500, depenses: 8500, benefice: 7000 },
  { month: 'Mar', revenu: 18000, depenses: 9000, benefice: 9000 },
  { month: 'Avr', revenu: 21000, depenses: 10000, benefice: 11000 },
  { month: 'Mai', revenu: 25000, depenses: 11000, benefice: 14000 },
  { month: 'Juin', revenu: 29000, depenses: 12000, benefice: 17000 }
];

const categoryData = [
  { name: 'Berline', value: 35, amount: 45231, color: '#22c55e' },
  { name: 'SUV', value: 28, amount: 38450, color: '#3b82f6' },
  { name: 'Sport', value: 22, amount: 29800, color: '#f59e0b' },
  { name: 'Compacte', value: 15, amount: 18230, color: '#a855f7' }
];

const topVehiclesData = [
  { id: 1, name: 'BMW Serie 5', reservations: 45, revenu: 12750 },
  { id: 2, name: 'Mercedes Classe C', reservations: 38, revenu: 11400 },
  { id: 3, name: 'Audi Q5', reservations: 42, revenu: 10080 },
  { id: 4, name: 'Porsche 911', reservations: 28, revenu: 9800 },
  { id: 5, name: 'Toyota Camry', reservations: 51, revenu: 9180 }
];

const monthlyComparisonData = [
  { month: 'Jan', revenu: 12000, benefice: 4000 },
  { month: 'Fév', revenu: 15500, benefice: 7000 },
  { month: 'Mar', revenu: 18000, benefice: 9000 },
  { month: 'Avr', revenu: 21000, benefice: 11000 },
  { month: 'Mai', revenu: 25000, benefice: 14000 },
  { month: 'Juin', revenu: 29000, benefice: 17000 }
];

const formatCurrency = (val: number) => {
  return `€${val.toLocaleString()}`;
};

const Economie: React.FC = () => {
  const [timeRange, setTimeRange] = useState("6 derniers mois");

  return (
    <div className="admin-layout economie-page">
      <AdminSidebar activeTab="economie" />
      <main className="admin-main-content">
        <AdminNavbar />
        <header className="economie-header">
          <div className="economie-header__titles">
            <h1 className="economie-header__title">Gestion Économique</h1>
            <p className="economie-header__subtitle">
              Analyse financière et statistiques de performance
            </p>
          </div>
          <button className="economie-header__export-btn">
            <IconDownload size={20} />
            <span>Exporter Rapport</span>
          </button>
        </header>

        <div className="admin-stats-grid">
          <AdminStatCard
            title="Revenu Total"
            value={formatCurrency(stats.revenuTotal)}
            change={`+${stats.revenuEvolution}%`}
            changeType="positive"
            icon={<IconCurrencyEuro size={24} />}
            iconBgColor="#dcfce7"
            iconColor="#16a34a"
          />
          <AdminStatCard
            title="Dépenses Totales"
            value={formatCurrency(stats.depensesTotales)}
            change={`+${stats.depensesEvolution}%`}
            changeType="positive"
            icon={<IconArrowUpRight size={24} />}
            iconBgColor="#fee2e2"
            iconColor="#dc2626"
          />
          <AdminStatCard
            title="Bénéfice Net"
            value={formatCurrency(stats.beneficeNet)}
            change={`+${stats.beneficeEvolution}%`}
            changeType="positive"
            icon={<IconCurrencyDollar size={24} />}
            iconBgColor="#dcfce7"
            iconColor="#16a34a"
          />
          <AdminStatCard
            title="Taux d'Occupation"
            value={`${stats.tauxOccupation}%`}
            change={`+${stats.tauxEvolution}%`}
            changeType="positive"
            icon={<IconTrendingUp size={24} />}
            iconBgColor="#dbeafe"
            iconColor="#2563eb"
          />
        </div>

        <div className="economie-grid">
          {/* Ligne 1 */}
          <section className="economie-card economie-card--linechart">
            <div className="economie-card__header">
              <h2 className="economie-card__title">Évolution du Revenu</h2>
              <div className="economie-card__filter">
                <IconCalendarEvent size={18} />
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="economie-card__select"
                >
                  <option>6 derniers mois</option>
                  <option>1 an</option>
                  <option>Cette année</option>
                </select>
              </div>
            </div>
            <div className="economie-card__chart" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => `€${value}`} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="revenu" name="Revenu" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="depenses" name="Dépenses" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="benefice" name="Bénéfice" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="economie-card economie-card--piechart">
            <div className="economie-card__header">
              <h2 className="economie-card__title">Revenus par Catégorie</h2>
            </div>
            <div className="economie-card__chart" style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* Labels for Pie Chart on the pie itself are tricky, we'll just add a custom legend block below like in the design */}
            </div>
            <div className="economie-pie-legend">
              {categoryData.map(item => (
                <div key={item.name} className="economie-pie-legend__item">
                  <div className="economie-pie-legend__name">
                    <span className="color-dot" style={{ backgroundColor: item.color }}></span>
                    {item.name}
                  </div>
                  <div className="economie-pie-legend__amount">€{item.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Ligne 2 */}
          <section className="economie-card economie-card--list">
            <div className="economie-card__header">
              <h2 className="economie-card__title">Véhicules les Plus Rentables</h2>
            </div>
            <div className="top-vehicles-list">
              {topVehiclesData.map((vehicle, index) => (
                <div key={vehicle.id} className="top-vehicle-item">
                  <div className="top-vehicle-item__left">
                    <div className="top-vehicle-item__rank">{index + 1}</div>
                    <div className="top-vehicle-item__info">
                      <h3 className="top-vehicle-item__name">{vehicle.name}</h3>
                      <p className="top-vehicle-item__reservations">{vehicle.reservations} réservations</p>
                    </div>
                  </div>
                  <div className="top-vehicle-item__right">
                    <span className="top-vehicle-item__revenue">{formatCurrency(vehicle.revenu)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="economie-card economie-card--barchart">
            <div className="economie-card__header">
              <h2 className="economie-card__title">Comparaison Mensuelle</h2>
            </div>
            <div className="economie-card__chart" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => `€${value}`} />
                  <Legend iconType="square" />
                  <Bar dataKey="revenu" name="Revenu" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="benefice" name="Bénéfice" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Economie;

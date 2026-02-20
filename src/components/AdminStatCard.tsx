import React from 'react';
import './AdminStatCard.scss';

interface AdminStatCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: React.ReactNode;
    iconBgColor: string;
    iconColor: string;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({
    title,
    value,
    change,
    changeType,
    icon,
    iconBgColor,
    iconColor
}) => {
    return (
        <div className="admin-stat-card">
            <div className="admin-stat-card__header">
                <div
                    className="admin-stat-card__icon"
                    style={{ backgroundColor: iconBgColor, color: iconColor }}
                >
                    {icon}
                </div>
                <div className={`admin-stat-card__change ${changeType}`}>
                    {change}
                </div>
            </div>
            <div className="admin-stat-card__content">
                <h3 className="admin-stat-card__title">{title}</h3>
                <div className="admin-stat-card__value">{value}</div>
            </div>
        </div>
    );
};

export default AdminStatCard;

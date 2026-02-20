import { IconGasStation, IconHeart, IconManualGearbox, IconUsers, IconAutomaticGearbox } from '@tabler/icons-react';
import './CarCard.scss';

interface CarCardProps {
    image: string;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    transmission: 'Manuel' | 'Automatique';
    fuel: string;
    seats: number;
    price: number;
}

export default function CarCard({
    image,
    name,
    category,
    rating,
    reviews,
    transmission,
    fuel,
    seats,
    price
}: CarCardProps) {
    return (
        <div className="car-card">
            <div className="car-card-image-container">
                <img src={image} alt={name} className="car-card-image" />
                <span className={`car-card-badge ${category.toLowerCase()}`}>{category}</span>
                <button className="car-card-wishlist">
                    <IconHeart size={20} />
                </button>
            </div>
            <div className="car-card-content">
                <div className="car-card-header">
                    <h3 className="car-card-title">{name}</h3>
                    <div className="car-card-rating">
                        ⭐ {rating} <span className="car-card-reviews">({reviews})</span>
                    </div>
                </div>

                <div className="car-card-specs">
                    <div className="spec-item">
                        {transmission === 'Automatique' ? <IconAutomaticGearbox size={18} /> : <IconManualGearbox size={18} />}
                        <span>{transmission}</span>
                    </div>
                    <div className="spec-item">
                        <IconGasStation size={18} />
                        <span>{fuel}</span>
                    </div>
                    <div className="spec-item">
                        <IconUsers size={18} />
                        <span>{seats} places</span>
                    </div>
                </div>

                <div className="car-card-footer">
                    <div className="car-card-price">
                        <span className="price-amount">€{price}</span>
                        <span className="price-period">/ jour</span>
                    </div>
                    <button className="car-card-button">
                        Réserver
                    </button>
                </div>
            </div>
        </div>
    );
}

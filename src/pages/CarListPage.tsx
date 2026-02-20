import { useState } from 'react';
/* import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons-react'; */
import CarCard from '../components/CardComponents/CarCard';
import './CarListPage.scss';
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react';

// Mock Data
const CAR_DATA = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=2080&auto=format&fit=crop',
        name: 'BMW Serie 5',
        category: 'Berline',
        rating: 4.8,
        reviews: 124,
        transmission: 'Automatique' as const,
        fuel: 'Essence',
        seats: 5,
        price: 95
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop', // Mercedes
        name: 'Mercedes-Benz Classe C',
        category: 'Sport',
        rating: 4.9,
        reviews: 98,
        transmission: 'Automatique' as const,
        fuel: 'Essence',
        seats: 4,
        price: 120
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop', // Audi Q5
        name: 'Audi Q5',
        category: 'SUV',
        rating: 4.7,
        reviews: 156,
        transmission: 'Automatique' as const,
        fuel: 'Diesel',
        seats: 7,
        price: 85
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop', // Golf
        name: 'Volkswagen Golf',
        category: 'Compacte',
        rating: 4.5,
        reviews: 203,
        transmission: 'Manuel' as const,
        fuel: 'Essence',
        seats: 5,
        price: 45
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?q=80&w=2070&auto=format&fit=crop', // Toyota Camry
        name: 'Toyota Camry',
        category: 'Berline',
        rating: 4.6,
        reviews: 178,
        transmission: 'Automatique' as const,
        fuel: 'Hybride',
        seats: 5,
        price: 60
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop', // Porsche
        name: 'Porsche 911',
        category: 'Sport',
        rating: 5.0,
        reviews: 87,
        transmission: 'Automatique' as const,
        fuel: 'Essence',
        seats: 2,
        price: 250
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop', // Volvo
        name: 'Volvo XC90',
        category: 'Familiale',
        rating: 4.8,
        reviews: 112,
        transmission: 'Automatique' as const,
        fuel: 'Hybride',
        seats: 7,
        price: 110
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?q=80&w=1932&auto=format&fit=crop', // Range Rover
        name: 'Range Rover Sport',
        category: 'SUV',
        rating: 4.7,
        reviews: 143,
        transmission: 'Automatique' as const,
        fuel: 'Diesel',
        seats: 5,
        price: 140
    },
    {
        id: 9,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop', // Tesla
        name: 'Tesla Model 3',
        category: 'Berline',
        rating: 4.9,
        reviews: 320,
        transmission: 'Automatique' as const,
        fuel: 'Électrique',
        seats: 5,
        price: 90
    }
];

const CATEGORIES = ['Toutes', 'Compacte', 'Berline', 'SUV', 'Sport', 'Familiale', 'Pickup'];

export default function CarListPage() {
    const [activeCategory, setActiveCategory] = useState('Toutes');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCars = CAR_DATA.filter(car => {
        const matchesCategory = activeCategory === 'Toutes' || car.category === activeCategory;
        const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="car-list-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Trouvez Votre Véhicule Idéal</h1>
                    <p>{filteredCars.length} véhicules disponibles à la location</p>

                    <div className="search-bar-container">
                        <div className="search-input-wrapper">
                            <IconSearch className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher un véhicule..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="filter-button">
                            <IconAdjustmentsHorizontal size={20} />
                            Filtres
                        </button>
                    </div>
                </div>
            </section>

            <section className="content-section">
                <div className="category-tabs">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="results-header">
                    <span className="results-count">{filteredCars.length} véhicules trouvés</span>
                    <div className="sort-dropdown">
                        <span>Trier par: </span>
                        <select>
                            <option>Popularité</option>
                            <option>Prix croissant</option>
                            <option>Prix décroissant</option>
                        </select>
                    </div>
                </div>

                <div className="car-grid">
                    {filteredCars.map(car => (
                        <CarCard key={car.id} {...car} />
                    ))}
                </div>
            </section>
        </div>
    );
}
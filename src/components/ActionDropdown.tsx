import React, { useState, useRef, useEffect } from 'react';
import { IconDotsVertical, IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import './ActionDropdown.scss';

interface ActionDropdownProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ onView, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="action-dropdown-container" ref={dropdownRef}>
            <button className={`action-dots-btn ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <IconDotsVertical size={18} />
            </button>

            {isOpen && (
                <div className="action-dropdown-menu">
                    <button className="dropdown-item view" onClick={() => { setIsOpen(false); onView?.(); }}>
                        <IconEye size={16} />
                        Voir les détails
                    </button>
                    <button className="dropdown-item edit" onClick={() => { setIsOpen(false); onEdit?.(); }}>
                        <IconPencil size={16} />
                        Modifier
                    </button>
                    <button className="dropdown-item delete" onClick={() => { setIsOpen(false); onDelete?.(); }}>
                        <IconTrash size={16} />
                        Supprimer
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActionDropdown;

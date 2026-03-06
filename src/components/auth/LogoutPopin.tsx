import React, { useEffect } from "react";
import { IconCheck } from "@tabler/icons-react";
import "./LogoutPopin.scss";

interface LogoutPopinProps {
  isVisible: boolean;
  onClose: () => void;
}

const LogoutPopin: React.FC<LogoutPopinProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="logout-popin">
      <div className="logout-popin__content">
        <div className="logout-popin__icon">
          <IconCheck size={24} />
        </div>
        <div className="logout-popin__message">
          Vous avez été déconnecté avec succès
        </div>
      </div>
      <button
        className="logout-popin__close"
        onClick={onClose}
        aria-label="Fermer"
      >
        &times;
      </button>
      <div className="logout-popin__progress-bar"></div>
    </div>
  );
};

export default LogoutPopin;

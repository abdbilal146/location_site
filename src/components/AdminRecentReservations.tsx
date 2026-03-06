import "./AdminRecentReservations.scss";

const AdminRecentReservations = ({ reservations }: { reservations: any[] }) => {
  return (
    <div className="admin-recent-reservations">
      <h3 className="admin-recent-reservations__title">
        Réservations Récentes
      </h3>
      <div className="admin-recent-reservations__table-container">
        <table className="admin-recent-reservations__table">
          <thead>
            <tr>
              <th>CLIENT</th>
              <th>VÉHICULE</th>
              <th>DATE</th>
              <th>STATUT</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td className="client-name">{res.client?.fullName}</td>
                <td className="vehicle-name">{res.car.model}</td>
                <td className="date-text">{res.createdAt}</td>
                <td>
                  <span
                    className={`status-badge status-${res.reservationStatus?.toLowerCase().replace(" ", "-")}`}
                  >
                    {res.reservationStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecentReservations;

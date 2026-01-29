import React from "react";

function getSourceColor(source) {
  switch (source) {
    case "EMERGENCY":
      return "#ff4d4f";
    case "PAID_PRIORITY":
      return "#faad14";
    case "FOLLOW_UP":
      return "#52c41a";
    case "ONLINE":
      return "#1890ff";
    case "WALK_IN":
    default:
      return "#595959";
  }
}

export function DoctorDashboard({
  doctors,
  selectedDoctorId,
  onSelectDoctor,
  slots,
}) {
  return (
    <div className="card">
      <h2>Doctor Dashboard</h2>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <button
            key={doctor._id}
            className={`doctor-button ${selectedDoctorId === doctor._id ? "active" : ""}`}
            onClick={() => onSelectDoctor(doctor._id)}
          >
            <strong>{doctor.name}</strong>
            <span className="doctor-specialization">
              {doctor.specialization}
            </span>
          </button>
        ))}
      </div>

      <h3>Slots for Selected Doctor</h3>
      {slots.length === 0 ? (
        <p className="muted-text">Select a doctor to see slots.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Booked</th>
              <th>Waitlisted</th>
              <th>Total</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id}>
                <td>{slot.timeRange}</td>
                <td>{slot.bookedTokens}</td>
                <td>{slot.waitlistedTokens}</td>
                <td>{slot.totalTokens}</td>
                <td>{slot.maxCapacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="legend">
        <span className="legend-item">
          <span
            className="color-dot"
            style={{ backgroundColor: getSourceColor("EMERGENCY") }}
          />{" "}
          Emergency
        </span>
        <span className="legend-item">
          <span
            className="color-dot"
            style={{ backgroundColor: getSourceColor("PAID_PRIORITY") }}
          />{" "}
          Paid Priority
        </span>
        <span className="legend-item">
          <span
            className="color-dot"
            style={{ backgroundColor: getSourceColor("FOLLOW_UP") }}
          />{" "}
          Follow Up
        </span>
        <span className="legend-item">
          <span
            className="color-dot"
            style={{ backgroundColor: getSourceColor("ONLINE") }}
          />{" "}
          Online
        </span>
        <span className="legend-item">
          <span
            className="color-dot"
            style={{ backgroundColor: getSourceColor("WALK_IN") }}
          />{" "}
          Walk In
        </span>
      </p>
    </div>
  );
}

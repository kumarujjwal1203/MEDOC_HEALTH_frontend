import React from 'react';

function getSourceColor(source) {
  switch (source) {
    case 'EMERGENCY':
      return '#ff4d4f';
    case 'PAID_PRIORITY':
      return '#faad14';
    case 'FOLLOW_UP':
      return '#52c41a';
    case 'ONLINE':
      return '#1890ff';
    case 'WALK_IN':
    default:
      return '#595959';
  }
}

export function OPDDayView({ dayView }) {
  if (!dayView) {
    return (
      <div className="card">
        <h2>OPD Day View</h2>
        <p className="muted-text">Run a simulation or create some tokens to see the day view.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>OPD Day View</h2>
      <p className="muted-text">Date: {dayView.date}</p>
      {Object.values(dayView.view).map((doctorGroup) => (
        <div key={doctorGroup.doctor._id} className="doctor-day-view">
          <h3>{doctorGroup.doctor.name}</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Tokens</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(doctorGroup.slots).map(({ slot, tokens }) => (
                <tr key={slot._id}>
                  <td>{slot.timeRange}</td>
                  <td>
                    <div className="token-chip-container">
                      {tokens.map((token) => (
                        <span
                          key={token._id}
                          className={`token-chip state-${token.state.toLowerCase()}`}
                          style={{ borderColor: getSourceColor(token.source) }}
                          title={`${token.patientName} (${token.source}, ${token.state})`}
                        >
                          {token.patientName} ({token.source})
                        </span>
                      ))}
                      {tokens.length === 0 && <span className="muted-text small">No tokens</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}


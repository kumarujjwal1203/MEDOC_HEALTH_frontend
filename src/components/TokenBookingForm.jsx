import React, { useState } from 'react';

const TOKEN_SOURCES = ['WALK_IN', 'ONLINE', 'FOLLOW_UP', 'PAID_PRIORITY', 'EMERGENCY'];

export function TokenBookingForm({ doctors, slots, selectedDoctorId, onCreateToken, loading }) {
  const [patientName, setPatientName] = useState('');
  const [source, setSource] = useState('WALK_IN');
  const [slotId, setSlotId] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!patientName || !slotId || !selectedDoctorId) {
      alert('Please fill all fields and choose a doctor and slot.');
      return;
    }

    onCreateToken({
      patientName,
      doctorId: selectedDoctorId,
      slotId,
      source,
    });

    setPatientName('');
  }

  const isEmergency = source === 'EMERGENCY';

  return (
    <div className="card">
      <h2>Token Booking Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <label>Patient Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient name"
          />
        </div>

        <div className="form-row">
          <label>Token Source</label>
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            {TOKEN_SOURCES.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Slot</label>
          <select value={slotId} onChange={(e) => setSlotId(e.target.value)}>
            <option value="">Select slot</option>
            {slots.map((slot) => (
              <option key={slot._id} value={slot._id}>
                {slot.timeRange} (Booked {slot.bookedTokens}/{slot.maxCapacity})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : isEmergency ? 'Create Emergency Token' : 'Book Token'}
        </button>

        <p className="muted-text small">
          Emergency tokens have the highest priority and can replace lower priority tokens when a slot is full.
        </p>
      </form>
    </div>
  );
}


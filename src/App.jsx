import React, { useEffect, useState } from "react";
import {
  seedDoctors,
  fetchDoctors,
  fetchSlotsByDoctor,
  createToken,
  createEmergencyToken,
  fetchDayView,
  simulateDay,
} from "./services/api";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { TokenBookingForm } from "./components/TokenBookingForm";
import { OPDDayView } from "./components/OPDDayView";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [slots, setSlots] = useState([]);
  const [dayView, setDayView] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadDoctors();
    loadDayView();
  }, []);

  async function loadDoctors() {
    try {
      const data = await fetchDoctors();
      setDoctors(data);
      if (data.length > 0) {
        setSelectedDoctorId((prev) => prev || data[0]._id);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to load doctors");
    }
  }
  useEffect(() => {
    if (!selectedDoctorId) return;
    fetchSlotsByDoctor(selectedDoctorId)
      .then((data) => setSlots(data))
      .catch((error) => {
        console.error(error);
        setMessage(error.message || "Failed to load slots");
      });
  }, [selectedDoctorId]);

  async function handleCreateToken(payload) {
    setLoading(true);
    setMessage("");
    try {
      const isEmergency = payload.source === "EMERGENCY";
      const apiFn = isEmergency ? createEmergencyToken : createToken;
      const result = await apiFn(payload);
      setMessage(result.message);
      await Promise.all([reloadSlots(), loadDayView()]);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to create token");
    } finally {
      setLoading(false);
    }
  }

  async function reloadSlots() {
    if (!selectedDoctorId) return;
    try {
      const data = await fetchSlotsByDoctor(selectedDoctorId);
      setSlots(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadDayView() {
    try {
      const data = await fetchDayView();
      setDayView(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSeed() {
    setLoading(true);
    setMessage("");
    try {
      const result = await seedDoctors();
      setMessage(result.message);
      await loadDoctors();
      await Promise.all([reloadSlots(), loadDayView()]);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to seed doctors");
    } finally {
      setLoading(false);
    }
  }

  async function handleSimulation() {
    setLoading(true);
    setMessage("");
    try {
      const result = await simulateDay();
      setMessage(result.message);
      await Promise.all([reloadSlots(), loadDayView()]);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Simulation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>OPD Token Allocation Engine</h1>
        <p className="muted-text">
          Simple MERN project demonstrating priority-based token allocation with
          elastic capacity management.
        </p>
        <div className="header-actions">
          <button onClick={handleSeed} disabled={loading}>
            Seed Doctors & Slots
          </button>
          <button onClick={handleSimulation} disabled={loading}>
            Run One-Click Simulation
          </button>
        </div>
        {message && <p className="status-message">{message}</p>}
      </header>

      <main className="grid">
        <section>
          <DoctorDashboard
            doctors={doctors}
            selectedDoctorId={selectedDoctorId}
            onSelectDoctor={setSelectedDoctorId}
            slots={slots}
          />
          <TokenBookingForm
            doctors={doctors}
            slots={slots}
            selectedDoctorId={selectedDoctorId}
            onCreateToken={handleCreateToken}
            loading={loading}
          />
        </section>

        <section>
          <OPDDayView dayView={dayView} />
        </section>
      </main>
    </div>
  );
}

export default App;

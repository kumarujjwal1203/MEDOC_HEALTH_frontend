const API_BASE_URL = "https://medoc-health-backend.onrender.com";

async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const error = new Error(errorBody.message || "API request failed");
    error.status = response.status;
    error.body = errorBody;
    throw error;
  }

  return response.json();
}

export function seedDoctors() {
  return apiRequest("/doctors/seed", { method: "POST" });
}

export function fetchDoctors() {
  return apiRequest("/doctors");
}

export function fetchSlotsByDoctor(doctorId, date) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  return apiRequest(`/slots/${doctorId}${query}`);
}

export function createToken(payload) {
  return apiRequest("/tokens", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createEmergencyToken(payload) {
  return apiRequest("/tokens/emergency", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function cancelToken(tokenId) {
  return apiRequest(`/tokens/cancel/${tokenId}`, {
    method: "POST",
  });
}

export function fetchDayView(date) {
  const query = date ? `?date=${encodeURIComponent(date)}` : "";
  return apiRequest(`/tokens/day${query}`);
}

export function simulateDay() {
  return apiRequest("/simulate/day", {
    method: "POST",
  });
}

const API_BASE = '/api';

async function handleResponse(res) {
  if (!res.ok) {
    const errorText = await res.text();
    let message = 'An unexpected server error occurred';
    try {
      const json = JSON.parse(errorText);
      message = json.message || json.error || message;
    } catch (e) {
      message = errorText || message;
    }
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await handleResponse(res);
    } catch (e) {
      return { status: 'offline', error: e.message };
    }
  },

  // Stats
  getStats: async () => {
    const res = await fetch(`${API_BASE}/stats`);
    return await handleResponse(res);
  },

  // Auth & Officers
  getOfficers: async () => {
    const res = await fetch(`${API_BASE}/auth/officers`);
    return await handleResponse(res);
  },
  login: async (officerId, pin) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ officerId, pin })
    });
    return await handleResponse(res);
  },

  // Operators
  getOperators: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/operators?${query}`);
    return await handleResponse(res);
  },
  addOperator: async (data) => {
    const res = await fetch(`${API_BASE}/operators`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  updateOperator: async (id, data) => {
    const res = await fetch(`${API_BASE}/operators/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  deleteOperator: async (id) => {
    const res = await fetch(`${API_BASE}/operators/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  // Grower Farmers
  getFarmers: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/farmers?${query}`);
    return await handleResponse(res);
  },
  addFarmer: async (data) => {
    const res = await fetch(`${API_BASE}/farmers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  deleteFarmer: async (srNo) => {
    const res = await fetch(`${API_BASE}/farmers/${srNo}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  // Approved Inputs
  getInputs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/inputs?${query}`);
    return await handleResponse(res);
  },
  addInput: async (data) => {
    const res = await fetch(`${API_BASE}/inputs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  updateInput: async (id, data) => {
    const res = await fetch(`${API_BASE}/inputs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  deleteInput: async (id) => {
    const res = await fetch(`${API_BASE}/inputs/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  // Circulars
  getCirculars: async () => {
    const res = await fetch(`${API_BASE}/circulars`);
    return await handleResponse(res);
  },
  addCircular: async (data) => {
    const res = await fetch(`${API_BASE}/circulars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  deleteCircular: async (id) => {
    const res = await fetch(`${API_BASE}/circulars/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  // Downloads
  getDownloads: async () => {
    const res = await fetch(`${API_BASE}/downloads`);
    return await handleResponse(res);
  },
  addDownload: async (data) => {
    const res = await fetch(`${API_BASE}/downloads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  deleteDownload: async (id) => {
    const res = await fetch(`${API_BASE}/downloads/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  // Applications
  getApplications: async () => {
    const res = await fetch(`${API_BASE}/applications`);
    return await handleResponse(res);
  },
  submitApplication: async (data) => {
    const res = await fetch(`${API_BASE}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  updateApplication: async (id, data) => {
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  deleteApplication: async (id) => {
    const res = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  // Inquiries
  getInquiries: async () => {
    const res = await fetch(`${API_BASE}/inquiries`);
    return await handleResponse(res);
  },
  submitInquiry: async (data) => {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  updateInquiry: async (id, data) => {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },
  deleteInquiry: async (id) => {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  // Staff & Board
  getStaff: async () => {
    const res = await fetch(`${API_BASE}/staff`);
    return await handleResponse(res);
  },
  addStaff: async (data) => {
    const res = await fetch(`${API_BASE}/staff`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  },

  // Reset
  resetDatabase: async () => {
    const res = await fetch(`${API_BASE}/reset`, { method: 'POST' });
    return await handleResponse(res);
  }
};

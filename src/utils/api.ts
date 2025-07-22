const API_BASE = process.env.NODE_ENV === 'production' 
  ? `${import.meta.env.VITE_API_URL}/api`
  : `${window.location.protocol}//localhost:3001/api`;

export const api = {
  // Typo endpoints
  getTypos: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE}/typos`);
    return response.json();
  },

  addTypo: async (typo: Omit<any, 'id' | 'timestamp'>): Promise<any> => {
    const response = await fetch(`${API_BASE}/typos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(typo),
    });
    return response.json();
  },

  updateTypo: async (id: string, typo: Partial<any>): Promise<any> => {
    const response = await fetch(`${API_BASE}/typos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(typo),
    });
    return response.json();
  },

  deleteTypo: async (id: string): Promise<void> => {
    await fetch(`${API_BASE}/typos/${id}`, {
      method: 'DELETE',
    });
  },

  // User endpoints
  getUsers: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE}/users`);
    return response.json();
  },

  getLeaderboard: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE}/users/leaderboard`);
    return response.json();
  },
};
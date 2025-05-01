const API_URL = 'http://localhost:5000/api';

export const fetchWithToken = async (url, method = 'GET', data, token) => {
  return fetch(`${API_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then(res => res.json());
};

export const postData = async (url, data) => {
  const res =  await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const response = await res.json()
  if (!res.ok){
    console.log("Error logging in")
  }
  return response;
};

export const putData = async (endpoint, data) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const deleteData = async (endpoint) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return await res.json();
};


export const fetchTasksByProject = async (projectId, token) => {
  const res = await fetch(`${API_URL}/tasks/project/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || `Request failed with status ${res.status}`);
    } catch {
      throw new Error(errorText || `Request failed with status ${res.status}`);
    }
  }

  return await res.json();
};

import api from './index';

export const reportsAPI = {
  getAll: (params) => api.get('/hazard-reports/', { params }),
  getById: (id) => api.get(`/hazard-reports/${id}/`),
  create: (data) => api.post('/hazard-reports/', data),
  update: (id, data) => api.put(`/hazard-reports/${id}/`, data),
  delete: (id) => api.delete(`/hazard-reports/${id}/`),
};

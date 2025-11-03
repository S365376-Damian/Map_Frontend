import api from './index';

export const usersAPI = {
  getMyRoutes: () => api.get('/users/my-routes'),
  getMyReports: () => api.get('/users/my-reports'),
  getFavorites: () => api.get('/users/favorites'),
  addFavorite: (data) => api.post('/users/favorites', data),
  removeFavorite: (id) => api.delete(`/users/favorites/${id}`)
};


import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lilac_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors gracefully
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    
    // Auto-refresh token if 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('lilac_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post('/api/v1/auth/refresh', { refreshToken });
          if (res.data?.success) {
            localStorage.setItem('lilac_access_token', res.data.data.accessToken);
            localStorage.setItem('lilac_refresh_token', res.data.data.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
            return api(originalRequest);
          }
        } catch {
          localStorage.removeItem('lilac_access_token');
          localStorage.removeItem('lilac_refresh_token');
          localStorage.removeItem('lilac_user');
          window.location.href = '/admin/login';
        }
      }
    }
    
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

// Services
export const servicesApi = {
  getAll: (includeInactive = false) => api.get(`/services?includeInactive=${includeInactive}`),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// Projects
export const projectsApi = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getFeatured: () => api.get('/projects/featured'),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Blog
export const blogApi = {
  getAll: (params = {}) => api.get('/blog', { params }),
  getRecent: (count = 3) => api.get(`/blog/recent?count=${count}`),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  getCategories: () => api.get('/blog/categories'),
  createCategory: (data) => api.post('/blog/categories', data),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
};

// Careers
export const careersApi = {
  getActive: () => api.get('/careers'),
  getBySlug: (slug) => api.get(`/careers/${slug}`),
  apply: (id, formData) => api.post(`/careers/${id}/apply`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getApplications: (params = {}) => api.get('/careers/applications', { params }),
  updateStatus: (id, data) => api.patch(`/careers/applications/${id}/status`, data),
  createJob: (data) => api.post('/careers', data),
  updateJob: (id, data) => api.put(`/careers/${id}`, data),
  deleteJob: (id) => api.delete(`/careers/${id}`),
};

// Contact & Quote
export const contactApi = {
  submit: (data) => api.post('/contact', data),
  getAll: (params = {}) => api.get('/contact', { params }),
  markRead: (id) => api.patch(`/contact/${id}/read`),
};

export const quoteApi = {
  submit: (data) => api.post('/quote', data),
  getAll: (params = {}) => api.get('/quote', { params }),
  updateStatus: (id, data) => api.patch(`/quote/${id}/status`, data),
};

// Newsletter
export const newsletterApi = {
  subscribe: (data) => api.post('/newsletter/subscribe', data),
  getSubscribers: () => api.get('/newsletter/subscribers'),
};

// Testimonials & Team
export const testimonialsApi = {
  getAll: (featuredOnly = false) => api.get(`/testimonials?featuredOnly=${featuredOnly}`),
  create: (data) => api.post('/testimonials', data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export const teamApi = {
  getAll: () => api.get('/team'),
  create: (data) => api.post('/team', data),
  delete: (id) => api.delete(`/team/${id}`),
};

// Dashboard & Auth
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
};

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  refresh: (data) => api.post('/auth/refresh', data),
  me: () => api.get('/auth/me'),
};

export default api;

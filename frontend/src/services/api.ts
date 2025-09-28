import axios from 'axios'

const API_BASE_URL = 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    } else if (error.response?.status === 404) {
      console.error('Not found:', error.response.data)
    } else if (error.response?.status === 400) {
      console.error('Bad request:', error.response.data)
    } else if (!error.response) {
      console.error('Network error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export { api }

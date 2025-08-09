// API Configuration
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000',
    SOCKET_URL: 'http://localhost:5000'
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'https://your-app-name.onrender.com',
    SOCKET_URL: process.env.REACT_APP_API_URL || 'https://your-app-name.onrender.com'
  }
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment];

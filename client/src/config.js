const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://seu-backend.vercel.app/api'
    : 'http://localhost:5002/api'
};

export default config; 
const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://120420251103-xa5x.vercel.app/api'
    : 'http://localhost:5002/api'
};

export default config; 
export default {
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  clientURL: process.env.CLIENT_URL || 'https://your-production-domain.com',
  nodeEnv: 'production',
  corsOrigin: process.env.CORS_ORIGIN || 'https://your-production-domain.com'
};
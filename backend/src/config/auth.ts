export default {
  jwt: {
    secret: process.env.APP_SECRET || 'error',
    expiresIn: '1d',
  },
};

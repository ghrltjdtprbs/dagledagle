// src/config/config.prod.ts
export default () => ({
  database: {
    host: process.env.PROD_DB_HOST,
    port: +(process.env.PROD_DB_PORT ?? '5432'),
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    name: process.env.PROD_DB_DATABASE,
    logging: false,
    ssl: {
      rejectUnauthorized: false, 
    },
  },
  jwt: {
    Secret: process.env.JWT_SECRET,
  },
  swagger: false,
});

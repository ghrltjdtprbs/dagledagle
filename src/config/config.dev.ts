// src/config/config.dev.ts
export default () => ({
  database: {
    host: process.env.DEV_DB_HOST,
    port: +(process.env.DEV_DB_PORT ?? '5432'),
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    name: process.env.DEV_DB_DATABASE,
    synchronize: true, 
    logging: true,
  },
  jwt: {
    Secret: process.env.JWT_SECRET, 
  },
  swagger: true,
});


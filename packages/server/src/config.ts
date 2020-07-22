export const config = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.DB_PASSWORD,
  jwtSecret: process.env.JWT_SECRET as string,
  httpsEnabled: process.env.HTTPS_ENABLED,
  port: process.env.PORT
}

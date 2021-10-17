import * as session from 'express-session'
import * as sessionStore from 'express-mysql-session'
import * as dotenv from 'dotenv'

dotenv.config()

const MySQLStore = sessionStore(session)

export default app => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 60 * 60 * 1000 },
      resave: false,
      saveUninitialized: true,
      store: new MySQLStore({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
    }),
  )
}

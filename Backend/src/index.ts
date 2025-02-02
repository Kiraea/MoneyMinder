

import express from 'express' 
import Pool from "pg-pool"
import cors from 'cors';
import session from 'express-session'
import dotenv from 'dotenv'
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple'
import './strategies/local-strategy';
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import categoryRoutes from './routes/categories'


dotenv.config();


 

const pgSession = connectPgSimple(session)

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0
const validPort = isNaN(port) ? port : 0




const pool = new Pool({
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: validPort,
  ssl: process.env.DB_SSL === "true",
  /*
  max: 20, // set pool max size to 20
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
  */
  })


  pool.on('connect', (client) => { 
    client.query(`SET search_path TO '${process.env.DB_SCHEMA}', public;`);
  });

const app = express() 
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true, // basically no javascript to access cookie,
    sameSite: 'lax',
    maxAge: 60000 * 60,
  } 
}))

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}
app.use(cors(corsOptions))



app.use(passport.initialize())
app.use(passport.session())




app.use('/api/users', userRoutes)
app.use('/api/auth',  authRoutes)
app.use('/api/categories',  categoryRoutes)


const run = async () => {
  try {
    await setupDatabase(); // Wait for DB setup first
    app.listen(process.env.PORT, () => { // Start server AFTER setup
      console.log(`Server listening on port ${process.env.PORT}`);
      console.log();
    });
  } catch (e) {
    console.error("Failed to start:", e);
    process.exit(1); // Exit on critical errors
  }
};

export {pool}

const setupDatabase = async () => {
  await pool.query(`SET search_path TO '${process.env.DB_SCHEMA}';`)

  //await pool.query(`DROP TABLE IF EXISTS users;`);

  //await pool.query(`DROP TYPE IF EXISTS provider_enum CASCADE;`);
  //await pool.query(`CREATE TYPE provider_enum AS ENUM('facebook', 'google', 'github');`);
  //await pool.query(`CREATE TYPE category_enum as ENUM('income', 'expenses', 'savings')`);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      display_name VARCHAR(255) NOT NULL,
      is_disabled BOOLEAN DEFAULT FALSE,

      provider provider_enum,
      provider_id VARCHAR(255),

      CONSTRAINT auth_type CHECK (
        (username IS NOT NULL AND password IS NOT NULL AND provider IS NULL AND provider_id IS NULL)
        OR
        (username IS NULL AND password IS NULL and provider IS NOT NULL AND provider_id IS NOT NULL)  
      
      
      ),

      UNIQUE (provider, provider_id)
      
      
    );

  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      type category_enum NOT NULL,
      UNIQUE (user_id, name, type)
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      description VARCHAR(255) NOT NULL,
      category_id int REFERENCES categories(id) ON DELETE CASCADE,
      amount INT NOT NULL,
      date DATE DEFAULT CURRENT_DATE
    );
    
  `)


}


run();


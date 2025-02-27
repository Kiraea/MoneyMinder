

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
import expensesRoutes from './routes/expenses'
import incomeRoutes from './routes/income'
import savingsRoutes from './routes/savings'
import automatedIncomeRoutes from './routes/automatedIncome'
import cron from 'node-cron'
import { queries } from './queries';
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
app.use('/api/expenses', expensesRoutes)
app.use('/api/income', incomeRoutes)
app.use('/api/savings', savingsRoutes)
app.use('/api/automatedIncome', automatedIncomeRoutes)


const runCronScheduler = async () => {
  cron.schedule('*/10 * * * * *', async () => {
    console.log("KOKOKOKO");
    cronFunctions(); 
  })
}


const cronFunctions =  async () => {

  let shouldInsert = false
  try{
    let {rows: arrAutomatedIncome, rowCount: rowCount} = await pool.query(queries.automatedIncome.getAutomatedIncomeAllQ)
    if (rowCount! === 0){
      return
    }
    for (let automatedIncome of arrAutomatedIncome){

      console.log("this happens")
      let startDate = new Date(automatedIncome.date); //date
      let  currentDate = new Date(); //date
      let diffInMilliseconds = currentDate.getTime() - startDate.getTime(); //num

      const diffInDays = Math.floor(Math.abs(diffInMilliseconds / (1000 * 60 * 60 * 24)))
      console.log("startDate:", startDate, "currentDate:", currentDate, "diffInMiliseconds:", diffInMilliseconds, "diffInDays", diffInDays)

      const newDate = new Date(currentDate).getDate()
      if (automatedIncome.schedule_frequency === 'daily'){
        if (diffInDays >= 0 ){
          shouldInsert = true
        }
      }
      if (automatedIncome.schedule_frequency === 'weekly'){
        if (diffInDays % 7 === 0){
          shouldInsert = true
        }
      }
      if (automatedIncome.schedule_frequency === 'monthly'){
        if (diffInDays > 0 && startDate.getDate() === currentDate.getDate()){
          shouldInsert = true
        }
      }
      

      if (shouldInsert){
        console.log("insert statement");
        const {description, category_id, amount, date, user_id} = automatedIncome 
        try{
            let result = await pool.query(queries.income.createIncomeQ, [user_id, description, category_id, amount, date])
        }catch(e){
            console.log(e)
        }
      }

    }
  }catch(e){
    console.log(e)
  }
}
/*
id SERIAL PRIMARY KEY,
user_id uuid REFERENCES users(id),
description VARCHAR(255) NOT NULL,
category_id int REFERENCES categories(id),
amount INT NOT NULL,
date DATE NOT NULL,
schedule_frequency schedule_enum
*/

const run = async () => {
  try {
    await setupDatabase(); // Wait for DB setup first

    await runCronScheduler()
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
  
  await pool.query(`DROP TABLE IF EXISTS automated_income CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS expenses CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS savings CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS income CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS categories CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS users CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS user_sessions CASCADE;`);

  await pool.query(`DROP TYPE IF EXISTS category_enum CASCADE;`);
  await pool.query(`DROP TYPE IF EXISTS provider_enum CASCADE;`);
  await pool.query(`DROP TYPE IF EXISTS schedule_enum CASCADE;`);
  
  
  await pool.query(`CREATE TYPE schedule_enum as ENUM('daily', 'monthly', 'weekly', 'yearly');`);
  await pool.query(`CREATE TYPE category_enum as ENUM('income', 'expenses', 'savings')`);
  await pool.query(`CREATE TYPE provider_enum AS ENUM('facebook', 'google', 'github');`);
  

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
      user_id uuid REFERENCES users(id),
      name VARCHAR(255) NOT NULL,
      type category_enum NOT NULL,
      UNIQUE (user_id, name, type)
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      user_id uuid REFERENCES users(id),
      description VARCHAR(255) NOT NULL,
      category_id int REFERENCES categories(id),
      amount INT NOT NULL,
      date DATE DEFAULT CURRENT_DATE
    );
    
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS income (
      id SERIAL PRIMARY KEY,
      user_id uuid REFERENCES users(id),
      description VARCHAR(255) NOT NULL,
      category_id int REFERENCES categories(id),
      amount INT NOT NULL,
      date DATE DEFAULT CURRENT_DATE
    ); 
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS savings (
      id SERIAL PRIMARY KEY,
      user_id uuid REFERENCES users(id),
      description VARCHAR(255) NOT NULL,
      category_id int REFERENCES categories(id),
      amount INT NOT NULL,
      date DATE DEFAULT CURRENT_DATE
    ); 
  `)


  await pool.query(`
    CREATE TABLE IF NOT EXISTS automated_income(
      id SERIAL PRIMARY KEY,
      user_id uuid REFERENCES users(id),
      description VARCHAR(255) NOT NULL,
      category_id int REFERENCES categories(id),
      amount INT NOT NULL,
      date DATE DEFAULT CURRENT_DATE,
      schedule_frequency schedule_enum

    ); 
  `)

}


run();


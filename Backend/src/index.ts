

import express from 'express' 
import userRoutes from './routes/users'
import Pool from "pg-pool"
import cors from 'cors';
import 'dotenv/config'

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0
const validPort = isNaN(port) ? port : 0


const pool = new Pool({
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: validPort,
  ssl: process.env.DB_SSL === "true",
  max: 20, // set pool max size to 20
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
})




const app = express() 
app.use(express.json());



const corsOptions = {
  origin: "localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  crededentials: true
}
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', userRoutes)


const run = async () =>  {
  app.listen(process.env.PORT,  async () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })
  try{
    setupDatabase()
  }catch(e){
    console.log(e)
  }
  
}

export {pool}

const setupDatabase = async () => {
  await pool.query(`SET search_path TO 'MoneyMinderSchema';`)

  await pool.query(`DROP TABLE IF EXISTS users;`);


  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      display_name VARCHAR(255) NOT NULL,
      is_disabled BOOLEAN DEFAULT FALSE 
    );
  `);

}


run();


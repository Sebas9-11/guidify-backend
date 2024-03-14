import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

// const config = {
//   connectionString: process.env.POSTGRES_URL,
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE
// }

const config = {
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  password: process.env.PASS_DB,
  database: process.env.NAME_DB
}


export const connection = new Pool(config)
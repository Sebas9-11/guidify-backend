import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const config = {
  connectionString: process.env.POSTGRES_URL,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE
}

console.log(config)

export const connection = new Pool(config)
import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE
}

export const connection = new Pool(config)
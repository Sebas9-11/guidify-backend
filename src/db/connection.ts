import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const config = {
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  password: process.env.PASS_DB,
  database: process.env.NAME_DB
}

export const connection = new Pool(config)
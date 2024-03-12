import crypto from 'crypto'
import { connection } from '../db/connection'

export const login = async (email: string, password: string) => {
  const hashedPassword = crypto.createHash('sha256').update(password).digest('base64')

  const query = `
    SELECT *
    FROM users
    WHERE email = '${email}' AND password = '${hashedPassword}'
  `

  try {
    const response = await connection.query(query)
    if (response.rows.length !== 0) {
      return response.rows
    }

    return 'Invalid email or password'
  } catch (err) {
    return err
  }
}

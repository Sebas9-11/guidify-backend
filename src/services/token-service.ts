import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { connection } from '../db/connection'

export const validateToken = async (req: any, res: any, next: any) => {
  if (req.path === '/token' || req.path === '/public' || req.path === '/') {
    return next()
  }

  const token: any = req.headers.authorization?.split(' ')[1]
  try {
    if (!token) {
      throw new Error('Token not provided')
    }
    const payload: any = jwt.verify(token, process.env.SECRET as string)
    if (moment().unix() > payload.exp) {
      throw new Error('Token expired')
    }
    next()
  } catch (error: any) {
    res.status(401).send({ error: error.message })
  }
}

export const getToken = async () => {
  const query = `
    SELECT * FROM tokens
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const createToken = async (email: string, pass: string) => {
  const hashedPassword = crypto.createHash('sha256').update(pass).digest('base64')
  try {
    const userQuery = `
      SELECT id, name
      FROM public.users
      WHERE email = $1 AND password = $2
    `
    const userResult = await connection.query(userQuery, [email, hashedPassword])

    if (userResult.rowCount === 0) {
      throw new Error('User not found or invalid credentials')
    }

    const userId = userResult.rows[0].id
    const userName = userResult.rows[0].name

    const { id: sub, name } = { id: userId, name: userName }
    const token = jwt.sign(
      {
        sub,
        name,
        exp: moment().add(365, 'days').unix()
      },
      process.env.SECRET as string
    )

    const tokenQuery = `
      INSERT INTO tokens (token, user_id)
      VALUES ($1, $2)
    `
    await connection.query(tokenQuery, [token, userId])

    return { token }
  } catch (err) {
    return err
  }
}

import express from 'express'
import { createToken, getToken } from '../services/token-service'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const data = await getToken()
    res.send(data)
  } catch (err: any) {
    res.status(400).send({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { email, pass } = req.body
    await createToken(email, pass)
  } catch (err: any) {
    res.status(400).send({ error: err.message })
  }
})

export default router

import express from 'express'
import { login } from '../services/login-service'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    const data = await login(email, password)
    res.send(data)
  } catch (err) {
    res.status(400).send('' + err)
  }
})

export default router

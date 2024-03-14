import express from 'express'
import { createCity, getCities, getCityById, updateCity } from '../services/cities-service'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const data = await getCities()
    res.send(data)
  } catch (err) {
    res.status(400).send('' + err)
  }
})

router.post('/', async (req, res) => {
  try {
    const data = await createCity(req.body)
    res.send(data)
  } catch (err) {
    res.status(400).send('' + err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await getCityById(Number(req.params.id))
    res.send(data)
  } catch (err) {
    res.status(400).send('' + err)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const data = await updateCity(Number(req.params.id), req.body)
    res.send(data)
  } catch (err) {
    res.status(400).send('' + err)
  }
})

export default router

import express from 'express'
import { createService, getAllService, getServiceById } from '../services/service-service'

const router = express.Router()

router.get('/', async (_req, res) => {
  const data = await getAllService()
  res.send(data)
})

router.post('/', async (req, res) => {
  const service = req.body
  const data = await createService(service)
  res.send(data)
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      throw new Error('Invalid id')
    }
    const data = await getServiceById(id)
    res.send(data)
  } catch (err) {
    res.status(400).send('' + err)
  }
})

export default router

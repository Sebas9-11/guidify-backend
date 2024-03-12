import express from 'express'
import { User } from '../../types'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserAll,
  getUserCostumer,
  getUserSupplier,
  updateUser
} from '../services/user-service'

const router = express.Router()

router.get('/', async (_req, res) => {
  const data = await getAllUsers()
  res.send(data)
})

router.post('/', async (req, res) => {
  const user: User = req.body
  const data = await createUser(user)
  res.send(data)
})

router.get('/supplier', async (_req, res) => {
  const data = await getUserSupplier()
  res.send(data)
})

router.get('/costumer', async (_req, res) => {
  const data = await getUserCostumer()
  res.send(data)
})

router.get('/all', async (_req, res) => {
  const data = await getUserAll()
  res.send(data)
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      throw new Error('Invalid id')
    }
    const data = await getUser(id)
    res.send(data)
  } catch (err) {
    res.status(400).send('' + err)
  }
})
router.patch('/:id', async (req, res) => {
  const user: User = req.body
  const id = parseInt(req.params.id)
  const data = await updateUser(user, id)
  res.send(data)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const data = await deleteUser(id)
  res.send(data)
})

export default router

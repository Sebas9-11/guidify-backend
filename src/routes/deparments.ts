import express from 'express'
import { getDepartmentById, getDepartments } from '../services/departments-service'

const router = express.Router()

router.get('/', async (_req, res) => {
  const departments = await getDepartments()
  res.json(departments)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id) || id < 1 || !Number.isInteger(id)) {
    res.send('Invalid id')
    return
  }

  const department = await getDepartmentById(id)

  if (department === undefined) {
    res.send('Department not found')
    return
  } else {
    res.json(department)
    return
  }
})

export default router

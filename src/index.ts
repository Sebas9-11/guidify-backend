import cors from 'cors'
import express from 'express'

import login from './routes/login'
import service from './routes/service'
import user from './routes/users'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000

app.get('/', (_req, res) => {
  res.send('Guidify API is running!')
})

app.use('/api/login', login)

app.use('/api/users', user)

app.use('/api/services', service)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

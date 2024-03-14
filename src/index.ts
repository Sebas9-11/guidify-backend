import cors from 'cors'
import express from 'express'
import path from 'path'

import auth from './routes/auth'
import cities from './routes/cities'
import departments from './routes/deparments'
import services from './routes/service'
import token from './routes/token'
import users from './routes/users'
import { validateToken } from './services/token-service'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './views')))
app.use(express.static(path.join(__dirname, './assets')))

app.use(validateToken)

const PORT = process.env.PORT || 3000

const viewPath = path.join(__dirname, './views')

app.get('/', (_req, res) => {
  const htmlResponse = path.join(viewPath, 'index.html')
  res.sendFile(htmlResponse)
})
app.use('/auth', auth)

app.use('/api/token', token)

app.use('/api/users', users)

app.use('/api/services', services)

app.use('/api/cities', cities)

app.use('/api/departments', departments)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

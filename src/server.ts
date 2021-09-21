import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { routes } from './routes'

dotenv.config()

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || port, () =>
    console.log(`Server running in http://localhost:${port}`)
)

import dotenv from 'dotenv'
import { app } from './app'

dotenv.config()

const port = 8000

app.listen(process.env.PORT || port, () =>
    console.log(`Server running in http://localhost:${port}`)
)

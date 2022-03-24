import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import routes from './routes/userRoutes'
import authRouter from './routes/authRoutes'
import helmet from 'helmet'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'

import { dbConnection } from './db/db'

dotenv.config()

const app: Application = express()

app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
app.use('/auth', authRouter)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

dbConnection()

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

export default app

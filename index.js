import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import Connection from './config/dbConfig.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import path from 'path'
import morgan from "morgan";
const app = express()
const port = process.env.PORT || 8000;
dotenv.config()
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/news', newsRoutes)
app.use(express.static('client/build'))
Connection()

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('./client/build/index.html'))
})

app.listen(port, () => { console.log(`Server Is Running On Port ${port}`); })
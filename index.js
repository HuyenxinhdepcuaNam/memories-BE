import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import * as dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/users', userRoutes)
// const CONNECTION_URL = 'mongodb+srv://memories_project:123456789963951@cluster0.v4lpyqy.mongodb.net/?retryWrites=true&w=majority'
// const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Sever running on port: ${PORT}`)))
    .catch((error) => console.log(error))
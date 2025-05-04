import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

// Initialize express
const app = express()

// connect to database
await connectDB()

// Middlewares
app.use(cors())

// Default route
app.get('/', (req, res)=> res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks)

// PORT
const PORT = process.env.PORT || 5000 

app.listen(PORT, ()=>{
    console.log(`Server Is running on port ${PORT}`)
})
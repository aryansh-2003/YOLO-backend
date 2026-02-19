import express from "express"
import cors from 'cors'



export const app = express()


app.use(cors({
    origin: "https://yolo-virid-six.vercel.app", 
    credentials: true
}))
app.use(express.json({limit:"16kb"}))

import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'
import healthCheckRouter from './routes/healthcheck.route.js'


app.use("/api/v1/health",healthCheckRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/message",messageRouter)


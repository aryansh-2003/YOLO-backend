import express from "express"
import cors from 'cors'



export const app = express()


app.use(cors({
    origin: "https://yolo-virid-six.vercel.app", 
    credentials: true
}))
app.use(express.json({limit:"16kb"}))


// app.post('/credentials',(req,res)=>{
//     const {name,username} = req.body
//     console.log(name, username)

//     if(!name || !username) return res.status(400).json({message:"username and name is required"})
//     res.send({name:name,username:username}).status(200)
// })

// routes

import userRouter from './routes/user.routes.js'
import messageRouter from './routes/message.routes.js'


app.use("/api/v1/user",userRouter)
app.use("/api/v1/message",messageRouter)


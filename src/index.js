import dotenv from 'dotenv'
import http from 'http'
import {Server} from 'socket.io'
import {activeUsers} from './activeUsers.js'
import connectDB from './db/db.js'
import app from './app.js'


dotenv.config()


const httpServer = http.createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin: "*"
    }
})


const port = 8000
const workers = new Map()

io.on("connection",(socket) => {

    socket.broadcast.emit("activeUsers", activeUsers.map(user => user?.user))
    console.log("client connected",socket.id)

    socket.on("disconnect",(disconnection) =>{
        workers.delete(socket.id)
        
      const deActivatingUser = [...workers].map((user) => {
         if(user?.[1].socketID == socket.id){
            workers.delete(user?.[0])
         }
    })
        io.emit("activeUsers", [...workers])
    })

    socket.on("connected", (data) => {
        workers.set(data?.user?.username,{userData:data.user,socketID:data.socketID})

        if(activeUsers.length == 0){
             activeUsers.push(data)
             workers.set(data?.user?.username,{userData:data.user,socketID:data.socketID})
             io.emit("activeUsers", [...workers])
        }else{
            const exsits2 = workers.has(data?.user?.username)
            if (!exsits2) {
                workers.set(data?.user?.username,{userData:data.user,socketID:data.socketID})
                io.emit("activeUsers", [...workers])
            } else {
                io.emit("activeUsers", [...workers])
            }

        }

    })
        
     socket.on("newMessage", (message) =>{
      socket.broadcast.emit("textMessage", message)
    })

})





connectDB()
.then(()=>{
    httpServer.on("Error",(Error)=>{
    console.log(Error)
    })

    httpServer.listen(port,()=>{
        console.log(`App is listening on port ${port}`)
    })
})
.catch((error)=>{
    console.log("MONGO db connection failed!!!", error)
})


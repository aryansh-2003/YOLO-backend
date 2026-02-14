import dotenv from 'dotenv'
import http from 'http'
import {Server} from 'socket.io'
import {activeUsers} from './activeUsers.js'
import connectDB from './db/db.js'
import {app} from './app.js'


dotenv.config()


const httpServer = http.createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin: "*"
    }
})


const port = 8000

io.on("connection",(socket) => {

    socket.broadcast.emit("activeUsers", activeUsers.map(user => user?.user))
    console.log("client connected",socket.id)

    socket.on("disconnect",(socket) =>{
      const deActivatingUser = activeUsers.pop(user => user?.user.socketID === socket.id)
        console.log("client disconnected")
        io.emit("activeUsers", activeUsers.map(user => user?.user))
    })

    socket.on("connected", (data) => {
        if(activeUsers.length == 0){
             activeUsers.push(data)
             io.emit("activeUsers", activeUsers.map(user => user?.user))
        }else{
          const exists = activeUsers.some(user => user?.user?.username === data?.user?.username)
            if (!exists) {
                activeUsers.push(data)
                io.emit("activeUsers", activeUsers.map(user => user?.user))
            } else {
                io.emit("activeUsers", activeUsers.map(user => user?.user))
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


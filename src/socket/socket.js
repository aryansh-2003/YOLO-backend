import { Server } from "socket.io"
import { addUsers, deleteUser } from "./workers.js"


let io
export function initSocket(server){
io = new Server(server,{
    cors:{
        origin: "*"
    }
})


io.on("connection",(socket) => {

    console.log("client connected",socket.id)

    socket.on("disconnect",(disconnection) =>{
        const activeUsers =  deleteUser(socket.id)
          if(activeUsers){
             io.emit("activeUsers", activeUsers)
         }
    })

    socket.on("connected", (data) => {
         const activeUsers = addUsers(data)
         if(activeUsers){
             io.emit("activeUsers", activeUsers)
         }
    })

    socket.on("sendActiveUsers",()=>{
        const activeUsers = addUsers()
        io.emit("activeUsers", activeUsers)
    })
        
     socket.on("newMessage", (message) =>{
      socket.broadcast.emit("textMessage", message)
    })

})

}
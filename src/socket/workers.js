const workers = new Map()


function addUsers(data){
         if(workers.size == 0){
             workers.set(data?.user?.username,{userData:data.user,socketID:data.socketID})
             return [...workers]
        }else{
            const exsits2 = workers.has(data?.user?.username)
            if (!exsits2) {
                workers.set(data?.user?.username,{userData:data.user,socketID:data.socketID})
                return [...workers]
            } else {
                return [...workers]
            }

        }
}

 function deleteUser(socketid) {
            workers.delete(socketid)
        const deActivatingUser =  [...workers].map((user) => {
         if(user?.[1].socketID == socketid){
            workers.delete(user?.[0])
         }
    })
    return [...workers]
}

export {addUsers,deleteUser}
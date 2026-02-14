import {User} from '../models/user.model.js'


const logInUser = async(req,res) => {
    const {name,username} = req.body
    console.log(name)
    if(!name || !username) return res.status(400).json("Name and Username is required")

    const result = await User.create({
        fullname:name,
        username:username
    })

    console.log(result)

    if(!result) return res.status(400).json("Something went wrong")

    return res.status(200).json(result)
}

const getUser = async(req,res) =>{
    const {name,username} = req.body

    if(!name || !username) return res.status(400).json("Name and Username is required")
    
    const result = await User.find({
        name:name,
        username:username
    })

    if(!result) return res.status(400).json("User not found")

    return res.status(200).json("User Found", result)

}
export {
    logInUser,
    getUser
}
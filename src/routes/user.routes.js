import {Router} from "express"
import { getUser, logInUser } from "../controllers/user.controller.js"


const router  = Router()

router.route('/loginUser').post(logInUser)
router.route('/getUser').post(getUser)


export default router

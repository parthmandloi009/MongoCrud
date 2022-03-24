import express from 'express'
import {
    login,
    signup,
    userLogin,
    userSignup,
    userLogout,
} from '../controller/authControllers'
//import { authMiddleware } from '../middleware/userAuthorization'

const authRouter = express.Router()

authRouter.route('/signup').get(userSignup).post(signup)
authRouter.route('/login').get(userLogin).post(login)
authRouter.route('/logout').get(userLogout)
export default authRouter

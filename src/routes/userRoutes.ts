import express from 'express'
import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addUser,
    editUser,
} from '../controller/userControllers'
import { authMiddleware } from '../middleware/userAuthorization'
import validate from '../middleware/validateRepo'

const router = express.Router()

router.route('/user').get(getUser).post(validate, createUser).put(updateUser)

router.route('/user/delete/:id').get(deleteUser)

router.route('/edit/:id').get(editUser)

router.route('/user/edit').post(updateUser)

router.route('/create').get(addUser)
export default router

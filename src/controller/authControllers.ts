import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Users } from '../interfaces/userInterfaces'
import users from '../models/userModel'
import { FAILURE } from '../constant/errorCodes'
import { SECRET } from '../constant/responseCodes'

export const userSignup: RequestHandler = async (req, res) => {
    res.render('signUp', { title: 'Sign Up', msg: '' })
}
export const userLogin: RequestHandler = async (req, res) => {
    res.render('login', { title: 'Login', msg: '' })
}

export const signup: RequestHandler = async (req, res) => {
    try {
        const { email, givenName, familyName, password } = req.body

        const isUserExists = await users.findOne({ email: email }).exec()

        if (isUserExists) {
            return res.status(FAILURE).json({ message: 'User Already Exists.' })
        }

        const passwordBody = bcrypt.hashSync(password, 8)

        const createUser: Users = await users.create({
            email: email,
            givenName: givenName,
            familyName: familyName,
            password: passwordBody,
        })
        if (createUser) {
            res.redirect('/auth/login')
        }
    } catch (error) {
        res.status(FAILURE).json({ message: error })
    }
}

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body

    try {
        const isUserExists = await users.findOne({ email: email }).exec()

        if (!isUserExists) {
            res.render('login', { topicHead: 'Login', msg: 'User Not Found.' })
        }

        const passwordIsValid = bcrypt.compareSync(
            password,
            isUserExists.password
        )
        if (!passwordIsValid) {
            return res.status(FAILURE).json({ message: 'Invalid password.' })
        }

        const token = jwt.sign(
            { _id: isUserExists._id, email: email },
            SECRET,
            {
                expiresIn: 86400,
            }
        )
        // window.localStorage.setItem('userToken', token)
        // window.localStorage.setItem('loginEmail', email)
        // console.log(token)

        res.redirect('/user')
    } catch (error) {
        console.log(error)

        res.status(FAILURE).json({ message: error })
    }
}

export const userLogout: RequestHandler = async (req, res) => {
    res.render('login', { topicHead: 'Login', msg: 'logout successfully.' })
}

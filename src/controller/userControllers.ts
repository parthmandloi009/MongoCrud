import { RequestHandler } from 'express'
import { Users } from '../interfaces/userInterfaces'
import users from '../models/userModel'

export const addUser: RequestHandler = async (req, res) => {
    res.render('createUser', { topicHead: 'Add User' })
}
export const getUser: RequestHandler = async (req, res) => {
    const result: Promise<Users>[] = await users.find()
    res.render('user', { results: result })
}

export const createUser: RequestHandler = async (req, res) => {
    const result: Promise<Users> = await users.create(req.body)

    res.redirect('/user')
}

export const editUser: RequestHandler = async (req, res) => {
    const data = await users.findById({ _id: req.params.id })

    res.render('editUser', { records: data })
}

export const updateUser: RequestHandler = async (req, res) => {
    try {
        const result = await users.updateOne(
            { _id: req.body.id },
            {
                $set: {
                    email: req.body.email,
                    givenName: req.body.givenName,
                    familyName: req.body.familyName,
                },
            }
        )
        if (result) {
            res.redirect('/user')
        }
    } catch (error) {}
}

export const deleteUser: RequestHandler = async (req, res) => {
    const result: object = await users.deleteOne({ _id: req.params.id })

    res.redirect('/user')
}

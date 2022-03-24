import mongoose, { Schema } from 'mongoose'

export const User = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        givenName: {
            type: String,
        },
        familyName: {
            type: String,
        },
        password: {
            type: String,
        },
        access_token: {
            type: String,
        },
        role: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const users = mongoose.model('user', User)

export default users

import { Request } from 'express'

export interface Id {
    id: string
}

export interface Users extends Id {
    email: string
    givenName: string
    familyName: string
    created: Date
}
export default interface RequestWithUser extends Request {
    user: Users
}

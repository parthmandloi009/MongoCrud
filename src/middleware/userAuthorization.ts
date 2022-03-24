import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { UNAUTHORIZED, NOTFOUND } from '../constant/errorCodes'
import { SECRET } from '../constant/responseCodes'
import RequestWithUser from '../interfaces/userInterfaces'
import users from '../models/userModel'

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //let token = req.headers.authorization?.split(' ')[1]
    const token = window.localStorage.getItem('userToken')
    console.log(token)

    if (token) {
        UNAUTHORIZED
        jwt.verify(token, SECRET, (error, decoded) => {
            if (error) {
                return res.status(NOTFOUND).json({
                    message: error,
                    error,
                })
            } else {
                res.locals.jwt = decoded
                next()
            }
        })
    } else {
        return res.status(UNAUTHORIZED).json({
            message: 'Unauthorized',
        })
    }
}

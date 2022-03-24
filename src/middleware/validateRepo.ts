import { RequestHandler } from 'express'
import Joi from 'joi'
import { FAILURE } from '../constant/errorCodes'

const schema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    givenName: Joi.string(),
    familyName: Joi.string(),
})

const validate: RequestHandler = (req, res, next) => {
    const validation = schema.validate(req.query)
    if (validation.error) {
        res.status(FAILURE).json({
            message: validation.error.details[0].message,
            status: FAILURE,
        })
    } else {
        next()
    }
}

export default validate

'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const joi_1 = __importDefault(require('joi'))
const errorCodes_1 = require('../constant/errorCodes')
const schema = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }),
    givenName: joi_1.default.string(),
    familyName: joi_1.default.string(),
})
const validate = (req, res, next) => {
    const validation = schema.validate(req.query)
    if (validation.error) {
        res.status(errorCodes_1.FAILURE).json({
            message: validation.error.details[0].message,
            status: errorCodes_1.FAILURE,
        })
    } else {
        next()
    }
}
exports.default = validate

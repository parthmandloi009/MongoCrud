'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const authControllers_1 = require('../controller/authControllers')
const authRouter = express_1.default.Router()
authRouter
    .route('/signup')
    .get(authControllers_1.userSignup)
    .post(authControllers_1.signup)
authRouter
    .route('/login')
    .get(authControllers_1.userLogin)
    .post(authControllers_1.login)
authRouter.route('/logout').get(authControllers_1.userLogout)
exports.default = authRouter

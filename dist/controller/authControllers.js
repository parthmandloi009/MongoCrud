'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.userLogout =
    exports.login =
    exports.signup =
    exports.userLogin =
    exports.userSignup =
        void 0
const bcrypt_1 = __importDefault(require('bcrypt'))
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
const userModel_1 = __importDefault(require('../models/userModel'))
const errorCodes_1 = require('../constant/errorCodes')
const responseCodes_1 = require('../constant/responseCodes')
const userSignup = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        res.render('signUp', { topicHead: 'Sign Up', msg: '' })
    })
exports.userSignup = userSignup
const userLogin = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        res.render('login', { topicHead: 'Login', msg: '' })
    })
exports.userLogin = userLogin
const signup = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, givenName, familyName, password } = req.body
            const isUserExists = yield userModel_1.default
                .findOne({ email: email })
                .exec()
            if (isUserExists) {
                return res
                    .status(errorCodes_1.FAILURE)
                    .json({ message: 'User Already Exists.' })
            }
            const passwordBody = bcrypt_1.default.hashSync(password, 8)
            const createUser = yield userModel_1.default.create({
                email: email,
                givenName: givenName,
                familyName: familyName,
                password: passwordBody,
            })
            if (createUser) {
                res.redirect('/auth/login')
            }
        } catch (error) {
            res.status(errorCodes_1.FAILURE).json({ message: error })
        }
    })
exports.signup = signup
const login = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body
        try {
            const isUserExists = yield userModel_1.default
                .findOne({ email: email })
                .exec()
            if (!isUserExists) {
                res.render('login', {
                    topicHead: 'Login',
                    msg: 'User Not Found.',
                })
            }
            const passwordIsValid = bcrypt_1.default.compareSync(
                password,
                isUserExists.password
            )
            if (!passwordIsValid) {
                return res
                    .status(errorCodes_1.FAILURE)
                    .json({ message: 'Invalid password.' })
            }
            const token = jsonwebtoken_1.default.sign(
                { _id: isUserExists._id, email: email },
                responseCodes_1.SECRET,
                {
                    expiresIn: 86400,
                }
            )
            window.localStorage.setItem('userToken', token)
            window.localStorage.setItem('loginEmail', email)
            console.log(token)
            res.redirect('/user')
        } catch (error) {
            res.status(errorCodes_1.FAILURE).json({ message: error })
        }
    })
exports.login = login
const userLogout = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        res.render('login', { topicHead: 'Login', msg: 'logout successfully.' })
    })
exports.userLogout = userLogout

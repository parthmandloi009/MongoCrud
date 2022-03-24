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
exports.deleteUser =
    exports.updateUser =
    exports.editUser =
    exports.createUser =
    exports.getUser =
    exports.addUser =
        void 0
const userModel_1 = __importDefault(require('../models/userModel'))
const addUser = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        res.render('createUser', { topicHead: 'Add User' })
    })
exports.addUser = addUser
const getUser = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel_1.default.find()
        res.render('user', { results: result })
    })
exports.getUser = getUser
const createUser = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel_1.default.create(req.body)
        res.redirect('/user')
    })
exports.createUser = createUser
const editUser = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const data = yield userModel_1.default.findById({ _id: req.params.id })
        res.render('editUser', { records: data })
    })
exports.editUser = editUser
const updateUser = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield userModel_1.default.updateOne(
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
    })
exports.updateUser = updateUser
const deleteUser = (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel_1.default.deleteOne({
            _id: req.params.id,
        })
        res.redirect('/user')
    })
exports.deleteUser = deleteUser

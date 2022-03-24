'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.createUserService = void 0
const userModel_1 = __importDefault(require('../models/userModel'))
const createUserService = () => {
    const userCreate = userModel_1.default.create()
    return userCreate
}
exports.createUserService = createUserService

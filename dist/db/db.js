'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.dbConnection = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const dbConnection = () => {
    const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    mongoose_1.default.connect(uri, (err) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log(`Connecting to MONGO`)
        }
    })
}
exports.dbConnection = dbConnection

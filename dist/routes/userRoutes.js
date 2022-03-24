'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const userControllers_1 = require('../controller/userControllers')
const userAuthorization_1 = require('../middleware/userAuthorization')
const validateRepo_1 = __importDefault(require('../middleware/validateRepo'))
const router = express_1.default.Router()
router
    .route('/user')
    .get(userAuthorization_1.authMiddleware, userControllers_1.getUser)
    .post(validateRepo_1.default, userControllers_1.createUser)
    .put(userControllers_1.updateUser)
router.route('/user/delete/:id').get(userControllers_1.deleteUser)
router.route('/edit/:id').get(userControllers_1.editUser)
router.route('/user/edit').post(userControllers_1.updateUser)
router.route('/create').get(userControllers_1.addUser)
exports.default = router

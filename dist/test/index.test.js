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
const supertest_1 = __importDefault(require('supertest'))
const chai_1 = require('chai')
const app_1 = __importDefault(require('../app'))
describe('GET /', function () {
    it('return true', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app_1.default).get(
                '/user'
            )
            ;(0, chai_1.expect)(res.status).to.equal(200)
            ;(0, chai_1.expect)(res.body).to.be.empty
        })
    })
})
describe('Should return success response in signup', function () {
    it(`Should return true`, function () {
        ;(0, supertest_1.default)(app_1.default)
            .get('/auth/signup')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(`User Create successfully.`)
            .expect(200)
    })
})
describe('Should return success response in login ', function () {
    it(`Should return token`, function () {
        ;(0, supertest_1.default)(app_1.default)
            .get('/auth/login')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect('token')
            .expect(200)
    })
})
describe('Should return html', function () {
    it('should respond with an htmL file when root is requested', function (done) {
        ;(0, supertest_1.default)(app_1.default)
            .get('/user')
            .expect(200)
            .end(function (err, response) {
                if (err) console.log(err)
                chai_1.assert.equal(
                    response.header['content-type'],
                    'text/html; charset=utf-8'
                )
                done()
            })
    })
})
describe('Should return 404', function () {
    it('should send 404 when a request is made to any other path', function (done) {
        ;(0, supertest_1.default)(app_1.default)
            .get('/user/path')
            .expect(404, done)
    })
})
describe('Server test', function () {
    it('Should return true', function () {
        var server
        beforeEach(function () {
            server = require('./server').server
        })
    })
})

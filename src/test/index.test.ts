import request from 'supertest'
import { assert, expect } from 'chai'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import moment from 'moment'
import app from '../app'

describe('GET /', function () {
    it('return true', async function () {
        const res = await request(app).get('/user')
        expect(res.status).to.equal(200)
        expect(res.body).not.to.be.empty
    })
})

describe('Should return success response in signup', function () {
    it(`Should return true`, function () {
        request(app)
            .get('/auth/signup')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(`User Create successfully.`)
            .expect(200)
    })
})

describe('Should return success response in login ', function () {
    it(`Should return token`, function () {
        request(app)
            .get('/auth/login')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect('token')
            .expect(200)
    })
})
describe('Should return html', function () {
    it('should respond with an htmL file when root is requested', function (done) {
        request(app)
            .get('/user')
            .expect(200)
            .end(function (err, response) {
                if (err) console.log(err)

                assert.equal(
                    response.header['content-type'],
                    'text/html; charset=utf-8'
                )
                done()
            })
    })
})

describe('Should return 404', function () {
    it('should send 404 when a request is made to any other path', function (done) {
        request(app).get('/user/path').expect(404, done)
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

const app = require('../src/server')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

describe('Api Root endpoint test', () => {
  it('should respond with a string', async() => {
    const res = await request(app).get('/')
    expect(res.statusCode).to.equal(200)
  })
})

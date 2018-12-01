const app = require('../src/server')
const mongoose = require('mongoose')
const User = require('../src/models/user.model')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

describe('## Create User Account', () => {
  afterEach(async() => {
    await mongoose.connection.db.dropDatabase()
  })
  it('should respond with a string', async() => {
    const userData = {
      email: 'babe150@gmail.com',
      password: '12345678ddd',
      passwordConf: '12345678ddd'
    }
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
    expect(res.statusCode).to.equal(200)
    expect(res.body.message).to.equal('Account was created.')
  })

  it('fail to create if no password provided', async() => {
    const userData = {
      'email': 'janedoe@gmail.com',
      'password': '',
      'passwordConf': ''
    }
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
    expect(res.statusCode).to.equal(400)
    expect(res.body.error).to.equal('Invalid password.')
  })

  it('fail to create with invalid email', async() => {
    const userData = {
      'email': 'janedoegmailcom',
      'password': '123456789',
      'passwordConf': '123456789'
    }
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
    expect(res.statusCode).to.equal(400)
    expect(res.body.error).to.equal('Invalid Email. Try again.')
  })

  it('fail to create duplicate account email', async() => {
    await User.create({
      'email': 'janedoe@gmail.com',
      'password': '123456789',
      'passwordConf': '123456789'
    })
    const res = await request(app).post('/api/user/register').send({
      'email': 'janedoe@gmail.com',
      'password': '123456789',
      'passwordConf': '123456789'
    })
    expect(res.statusCode).to.equal(409)
    expect(res.body.error).to.equal('Email already taken.')
  })
})

const app = require('../src/server')
const mongoose = require('mongoose')
const User = require('../src/models/user.model')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

describe('## Create User Account', () => {
  beforeEach(async () => {
    await User.create({
      'username': 'janedoe',
      'email': 'janedoe@gmail.com',
      'password': '123456789'
    })
  })

  afterEach(async() => {
    await mongoose.connection.db.dropDatabase()
  })

  it('should respond with a 201', async() => {
    const userData = {
      username: 'babu150',
      email: 'babu150@gmail.com',
      password: '12345678ddd'
    }
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
    expect(res.statusCode).to.equal(201)
    expect(res.body.message).to.equal('Account was successfully created')
  })

  it('should respond with "Invalid Password" if invalid Password is used', async() => {
    const userData = {
      'username': 'janedoe',
      'email': 'janedoe@gmail.com',
      'password': ''
    }
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
    expect(res.statusCode).to.equal(400)
    expect(res.body[0].msg).to.equal('Invalid Password')
  })

  it('should respond with "invalid email" if invalid email is used', async() => {
    const userData = {
      'username': 'janedoe',
      'email': 'janedoegmailcom',
      'password': '123456789'
    }
    const res = await request(app)
      .post('/api/user/register')
      .send(userData)
    expect(res.statusCode).to.equal(400)
    expect(res.body[0].msg).to.equal('Invalid Email')
  })

  it('fail to create duplicate account email', async() => {
    const res = await request(app)
      .post('/api/user/register')
      .send({
        'username': 'janedoe',
        'email': 'janedoe@gmail.com',
        'password': '123456789'
      })
    expect(res.statusCode).to.equal(409)
    expect(res.body.message).to.equal('Email already taken')
  })
})

describe('## User Account logging', () => {
  beforeEach(async() => {
    await User.create({
      'username': 'johndoe',
      'email': 'johndoe@gmail.com',
      'password': '123456789'
    })
  })

  afterEach(async() => {
    await mongoose.connection.db.dropDatabase()
  })

  it('fails to login a user who is not register.', async() => {
    const res = await request(app).post('/api/user/login').send({
      'email': 'janedoe@gmail.com',
      'password': '123456789',
    })
    expect(res.statusCode).to.equal(400)
    expect(res.body.message.message).to.equal('User not found. Please Sign Up to proceed')
  })

})

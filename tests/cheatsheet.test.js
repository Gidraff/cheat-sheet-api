const app = require('../src/server')
const mongoose = require('mongoose')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

let token

describe('CheatSheet tests', () => {

  beforeEach(async () => {
    await request(app)
      .post('/api/user/register')
      .send({
        'username': 'janedoe',
        'email': 'janedoe@gmail.com',
        'password': '123456789'
      })

    const response = await request(app)
      .post('/api/user/login')
      .send({
        'email': 'janedoe@gmail.com',
        'password': '123456789'
      })
    token = response.body.token
  })

  afterEach(async() => {
    await mongoose.connection
      .db.dropDatabase()
  })

  describe('POST /user/cheats', () => {
    it('should create a new cheat CheatSheet', async () => {
      const res = await request(app)
        .post('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
        .send({title: 'qwerty'})
      expect(res.statusCode).to.equal(201)
      expect(res.type).to.equal('application/json')
      expect(res.body.message).to
        .equal('Cheat Sheet successfully created')
    })

    it('should respond with 409 when a duplicate Cheat Sheet is created', async () => {
      await request(app)
        .post('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
        .send({title: 'Configurations'})
      const res = await request(app)
        .post('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
        .send({title: 'Configurations'})
      expect(res.statusCode).to.equal(409)
      expect(res.type).to.equal('application/json')
      expect(res.body.message).to
        .equal('Cheat Sheet with Configurations already exists')
    })

    it('should respond with 400 if CheatSheet is null', async () => {
      const res = await request(app)
        .post('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
        .send({title: ''})
      expect(res.statusCode).to.equal(400)
      expect(res.type).to.equal('application/json')
      expect(res.body[0].msg).to.equal('The Title is not valid')
    })
  })

  describe('GET /user/cheats', () => {
    it('should respond with an empty array if no CheatSheets are available', async () => {
      const res = await request(app)
        .get('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
      expect(res.statusCode).to.equal(200)
      expect(res.body.docs.length).to.equal(0)
    })
  })

  describe('GET /user/cheats/:cheatId', () => {
    it('should respond with a single CheatSheet matching the provided Id', async () => {
      const cheatResponse = await request(app)
        .post('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
        .send({title: 'Configurations'})
      const res = await request(app)
        .get(`/user/cheats/${cheatResponse.body.newCheat._id}`)
        .set('Authorization', 'Bearer ' + token)
      expect(res.statusCode).to.equal(200)
      expect(res.body._id).to.equal(cheatResponse.body.newCheat._id)
    })
  })

  describe('PUT /user/cheats/:cheatId', () => {
    it('should update cheat sheet with given id', async () => {
      const cheatResponse = await request(app)
        .post('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
        .send({title: 'Configurations'})

      const res = await request(app)
        .put(`/user/cheats/${cheatResponse.body.newCheat._id}`)
        .set('Authorization', 'Bearer ' + token)
        .send({title: 'Configurations1'})
      expect(res.statusCode).to.equal(200)
    })
  })

  describe('DELETE /user/cheats/:cheatId', () => {
    it('should delete a CheatSheet matching the provided Id', async () => {
      const cheatResponse = await request(app)
        .post('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
        .send({title: 'Configurations'})

      const resBeforeDelete = await request(app)
        .get('/user/cheats')
        .set('Authorization', 'Bearer ' + token)
      const deleteRes = await request(app)
        .delete(`/user/cheats/${cheatResponse.body.newCheat._id}`)
        .set('Authorization', 'Bearer ' + token)

      const resAfterDelete = await request(app)
        .get('/user/cheats')
        .set('Authorization', 'Bearer ' + token)

      expect(deleteRes.statusCode).to.equal(200)
      expect(resBeforeDelete.body.docs.length - resAfterDelete.body.docs.length)
        .to.equal(1)
      expect(deleteRes.body.message).to.equal('Successfully deleted')
    })
  })
})

const app = require('../src/server')
const mongoose = require('mongoose')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

let token
let cheatId
let commandId

describe('CheatSheet/Command endpoints test', () => {

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
    const cheatResponse = await request(app)
      .post('/user/cheats')
      .set('Authorization', 'Bearer ' + token)
      .send({title: 'qwerty'})
    cheatId = cheatResponse.body.newCheat._id
    const command = await request(app)
      .post(`/user/cheats/${cheatId}/commands`)
      .set('Authorization', 'Bearer ' + token)
      .send({ description: 'clones a repo', command: 'git clone url'})
    commandId = command.body.newCommand._id
  })


  afterEach(async() => {
    await mongoose.connection.db.dropDatabase()
  })


  describe('POST CheatSheet/:cheatId/commands endpoints test', () => {
    it('should create and save command', async () => {
      const res = await request(app)
        .post(`/user/cheats/${cheatId}/commands`)
        .set('Authorization', 'Bearer ' + token)
        .send({ description: 'clones a remote repo', command: 'git clone <url>'})
      expect(res.statusCode).to.equal(201)
      expect(res.body.message).to.equal('Command successfully created')
    })
  })

  describe('GET CheatSheet/:cheatId/Command endpoints test', () => {
    it('should respond with an array of cheatId commands', async () => {
      const res = await request(app)
        .get(`/user/cheats/${cheatId}/commands/`)
        .set('Authorization', 'Bearer ' + token)
      expect(res.statusCode).to.equal(200)
      expect(res.body.docs).to.be.an('array')
    })
  })

  describe('GET CheatSheet/:cheatId/Command/:commandId endpoints test', () => {
    it('should get a command with commandId', async () => {
      const res = await request(app)
        .get(`/user/cheats/${cheatId}/commands/${commandId}`)
        .set('Authorization', 'Bearer ' + token)
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.be.an('object')
      expect(res.body._id).to.equal(commandId)
    })
  })

  describe('PUT CheatSheet/:cheatId/Command/commandId endpoints test', () => {
    it('should edit command with given commandId', async () => {
      const res = await request(app)
        .put(`/user/cheats/${cheatId}/commands/${commandId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          description: 'clones a repo from remote', command: 'git clone url'
        })
      expect(res.statusCode).to.equal(200)
    })
  })

  describe('DELETE CheatSheet/:cheatId/Command/commandId endpoints test', () => {
    it('should delete command with given commandId', async () => {
      const res = await request(app)
        .delete(`/user/cheats/${cheatId}/commands/${commandId}`)
        .set('Authorization', 'Bearer ' + token)
      expect(res.statusCode).to.equal(200)
      expect(res.body.status).to.equal(true)
      expect(res.body.message).to.equal('Command successfully deleted')
    })
  })
})

const commandController = require('../controllers/command.controller')
const passport = require('passport')

module.exports = (app) => {
  app.post(
    '/user/cheats/:cheatId/commands',
    passport.authenticate('jwt', {session: false}),
    commandController.addCommand
  )
  app.get(
    '/user/cheats/:cheatId/commands',
    passport.authenticate('jwt', {session: false}),
    commandController.getAllCommands
  )
  app.get(
    '/user/cheats/:cheatId/commands/:commandId',
    passport.authenticate('jwt', {session: false}),
    commandController.getOneCommand
  )
  app.put(
    '/user/cheats/:cheatId/commands/:commandId',
    passport.authenticate('jwt', {session: false}),
    commandController.updateCommand
  )
  app.delete(
    '/user/cheats/:cheatId/commands/:commandId',
    passport.authenticate('jwt', {session: false}),
    commandController.deleteCommand
  )
}

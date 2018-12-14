const cheatSheetController = require('../controllers/cheatsheet.controller')
const passport = require('passport')

module.exports = (app) => {
  app.post(
    '/user/cheats',
    passport.authenticate('jwt', {session: false}),
    cheatSheetController.addCheatSheet)
  app.get(
    '/user/cheats',
    passport.authenticate('jwt', {session: false}),
    cheatSheetController.getAllCheatSheets
  )
  app.get(
    '/user/cheats/:cheatId',
    passport.authenticate('jwt', {session: false}),
    cheatSheetController.getOneCheatSheet
  )
  app.get(
    '/user/profile',
    passport.authenticate('jwt', {session: false}),
    cheatSheetController.getProfile)
  app.put(
    '/user/cheats/:cheatId',
    passport.authenticate('jwt', { session: false}),
    cheatSheetController.updateCheatSheet
  )
  app.delete(
    '/user/cheats/:cheatId',
    passport.authenticate('jwt', { session: false}),
    cheatSheetController.deleteCheatSheet
  )
}

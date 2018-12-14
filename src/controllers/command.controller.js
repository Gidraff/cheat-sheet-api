const User = require('../models/user.model')
const CheatSheet = require('../models/cheatsheet.model')
const Command = require('../models/command.model')
const _ = require('lodash')

exports.addCommand = async (req, res, next) => {
  try {

    req.checkBody('description', 'The description not valid').notEmpty().trim().isLength({ min: 5})
    req.checkBody('command', 'The command not valid').notEmpty().trim().isLength({ min: 5})

    const errors = req.validationErrors()
    if (errors && errors.length > 0) {
      const response = _.uniqBy(errors, 'msg')
      res.statusCode = 400
      return res.json(response)
    }

    const { description, command } = req.body
    const checkIfCommandExist = await Command.findOne({
      description,
      command,
      cheatId: req.params.cheatId
    })

    if(checkIfCommandExist) {
      return res.status(409).send({
        status: false,
        message: `Command with ${req.body.description}/${req.body.command} already exists`
      })
    }

    const newCommand = new Command(req.body)
    const cheatSheet = await CheatSheet.findById(req.params.cheatId)
    if(!cheatSheet) {
      return res.status(404).json({
        status: false,
        message: `Resource with ${req.params.cheatId} was not found`
      })
    }

    newCommand.cheatId = cheatSheet._id
    await newCommand.save()
    cheatSheet.commands.push(newCommand)
    cheatSheet.save()
    res.status(201).json({
      status: true,
      message: 'Command successfully created',
      newCommand
    })
    next()
  } catch (e) {
    next()
  }
}

exports.getAllCommands = async (req, res, next) => {
  try {
    const pageNo = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const options = {
      page: pageNo,
      limit: limit,
      populate: 'commands'
    }

    const commands = await Command
      .paginate(
        {cheatId: req.params.cheatId},
        options
      )
    return res.json(commands)
    next()
  } catch (e) {
    next(e)
  }
}


exports.getOneCommand = async (req, res, next) => {
  try {
    const command = await Command.findById(req.params.commandId)
    if (command) return res.json(command)
    res.status(404).json({
      status: false,
      message: `Resource with ${req.params.commandId} Id not found`
    })
    next()
  } catch (e) {
    next()
  }
}


exports.updateCommand = async (req, res, next) => {
  try {
    req.checkBody('description', 'The description not valid').notEmpty().trim().isLength({ min: 5})
    req.checkBody('command', 'The command not valid').notEmpty().trim().isLength({ min: 5})
    const errors = req.validationErrors()
    if (errors && errors.length > 0) {
      const response = _.uniqBy(errors, 'msg')
      res.statusCode = 400
      return res.json(response)
    }

    const { description, command } = req.body
    const checkIfCommandExist = await Command.findOne({
      description,
      command,
      cheatId: req.params.cheatId
    })

    if(checkIfCommandExist) {
      return res.status(409).send({
        status: false,
        message: `Command with ${req.body.description}/${req.body.command} already exists`
      })
    }


    const updatedCommand = await Command.findByIdAndUpdate(
      req.params.commandId,
      req.body,
      {new: true}
    )
    if(updatedCommand) {
      return res.json(updatedCommand)
    }
    res.status(404).json({
      status: false,
      message: `Resource with this ${req.params.commandId} id could not be updated`
    })
    next()
  } catch (e) {
    next(e)
  }
}


exports.deleteCommand = async (req, res, next) => {
  try {
    const checkIfWasDeleted = await Command
      .findByIdAndRemove(req.params.commandId)
    if(checkIfWasDeleted) {
      return res.json({
        status: true,
        message: 'Command successfully deleted'
      })
    }
    res.status(404).json({
      status: false,
      message: `Resource with this ${req.params.commandId} id could not be deleted`
    })
    next()
  } catch (e) {
    next(e)
  }
}

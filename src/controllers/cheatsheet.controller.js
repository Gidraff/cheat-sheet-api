const CheatSheet = require('../models/cheatsheet.model')
const User = require('../models/user.model')
const _ = require('lodash')

exports.addCheatSheet = async (req, res, next) => {
  try {
    if(!req.body){
      return res.status(422).send({
        message: 'Could not process this request. Check input and try again.'
      })
    }

    req.checkBody('title', 'The Title is not valid').notEmpty().trim().isLength({ min: 5})
    const errors = req.validationErrors()
    if (errors && errors.length > 0) {
      const response = _.uniqBy(errors, 'msg')
      res.statusCode = 400
      return res.json(response)
    }

    const { title } = req.body
    const checkIfCheatSheetExist = await CheatSheet.findOne({title, createdBy: req.user.id})
    if(checkIfCheatSheetExist) {
      return res.status(409).send({
        message: `Cheat Sheet with ${req.body.title} already exists`
      })
    }

    const newCheat = new CheatSheet(req.body)
    const user = await User.findById(req.user.id)

    newCheat.createdBy = user._id
    await newCheat.save()
    user.cheats.push(newCheat)
    await user.save()


    res.status(201).send({
      message: 'Cheat Sheet successfully created',
      newCheat
    })
  } catch (e) {
    return next(e)
  }
}

exports.getAllCheatSheets = async (req, res, next) => {
  try {
    const pageNo = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12

    const options = {
      page: pageNo,
      limit: limit,
      populate: 'commands'
    }
    const cheats = await CheatSheet
      .paginate(
        {createdBy: req.user.id},
        options)
    res.json(cheats)
  } catch (e) {
    return next(e)
  }
}

exports.getOneCheatSheet = async (req, res, next) => {
  try {
    const cheat = await CheatSheet.findOne({
      _id: req.params.cheatId,
      createdBy: req.user.id
    }).populate('commands')
    if(cheat) {
      res.json(cheat)
      return next()
    }
    res.status(400).json({
      message: `cheat sheet with id ${req.params.cheatId} not found`
    })
    return next()
  } catch (e) {
    next(e)
  }
}

exports.updateCheatSheet = async (req, res, next) => {
  try {
    if(!req.body){
      return res.status(422).send({
        message: 'Could not process this request. Check input and try again.'
      })
    }

    req.checkBody('title', 'The Title is not valid').notEmpty().trim().isLength({ min: 5})
    const errors = req.validationErrors()
    if (errors && errors.length > 0) {
      const response = _.uniqBy(errors, 'msg')
      res.statusCode = 400
      return res.json(response)
    }

    const { title } = req.body
    const checkIfCheatSheetExist = await CheatSheet.findOne({title, createdBy: req.user.id})
    if(checkIfCheatSheetExist) {
      return res.status(409).send({
        message: `Cheat Sheet with ${req.body.title} already exists`
      })
    }

    const updatedCheatSheet = await CheatSheet.findByIdAndUpdate(
      req.params.cheatId,
      req.body,
      {new: true}
    )
    if(updatedCheatSheet) {
      return res.json(updatedCheatSheet)
    }
    res.status(404).json({
      status: false,
      message: `Resource with this ${req.params.cheatId} could not be updated`
    })
    next()
  } catch (e) {
    next(e)
  }
}

exports.deleteCheatSheet = async (req, res, next) => {
  try {
    const checkIfCheatIsDeleted = await CheatSheet.findByIdAndRemove(req.params.cheatId)
    if(checkIfCheatIsDeleted) return res.json({
      status: true,
      message: 'Successfully deleted'
    })
    res.status(500).json({
      status: false,
      message: 'Some error occurred while deleting'
    })
    next()
  } catch (e) {
    next()
  }
}

exports.getProfile =  (req, res, next) => {
  res.json({
    success: true,
    user: req.user
  })
  next()
}

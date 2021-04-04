const { check } = require('express-validator')


module.exports.actionValidato = [

  check('actionDescription')
    .exists().notEmpty().withMessage('Provide details about the action taken').bail(),

  check('status')
    .exists().notEmpty().withMessage('Provide current complaint status').bail(),
]
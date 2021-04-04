const { check } = require('express-validator')





module.exports.complaintValidator = [

  check('name')
    .exists().withMessage('Username must be exist').bail()
    .isLength({ min: 2, max: 30 }).withMessage('Name must have length between 2 to 30 character').bail(),

  check('email')
    .exists().withMessage('Provide Email').bail()
    .isEmail().withMessage('Provide a valid email').bail()
    .isLength({ min: 10, max: 30 }).withMessage('Length of the email must be between 10 to 30 character'),

  check('lat')
    .exists().withMessage('Provide latitude').bail(),
   
  check('lng')
    .exists().withMessage('Provide longitude').bail(),
    
  check('description')
    .exists().withMessage('Provide Description').bail()
    .isLength({ min: 10, max: 80 }).withMessage('Description must have length between 10 to 80 character').bail(),

]


module.exports.upVoteValidator = [

  check('email')
    .exists().withMessage('Provide Email').bail()
    .isEmail().withMessage('Provide a valid email').bail()
    .isLength({ min: 5, max: 30 }).withMessage('Length of the email must be between 10 to 30 character'),

]


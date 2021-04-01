const { check } = require('express-validator')


const validRegions=['Margao', 'Panaji']
const validDepartments=['Inspection', 'Civil', 'Authorization']
const validRoles=['Engineer', 'Senior Engineer', 'Cheif Engineer']



module.exports.officerValidator = [
  check('name')
    .exists().withMessage('Username must be exist').bail()
    .isLength({ min: 2, max: 30 }).withMessage('Name must have length between 2 to 30 character').bail(),

  check('email')
    .exists().withMessage('Provide Email').bail()
    .isEmail().withMessage('Provide a valid email').bail()
    .isLength({ min: 10, max: 50 }).withMessage('Length of the email must be between 10 to 30 character'),

  check('password')
    .exists().withMessage('Provide Password').bail()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').bail(),

  check('region')
    .exists().withMessage('Provide Region').bail()
    .notEmpty().bail()
    .isIn(validRegions).withMessage('Provide a valid region').bail(),

  check('department')
    .exists().withMessage('Provide Department').bail()
    .isIn(validDepartments).withMessage('Provide a valid Department').bail(),

  check('role')
    .exists().withMessage('Provide Role').bail()
    .isIn(validRoles).withMessage('Provide a valid Role').bail(),

]

module.exports.officerLoginValidator=[
  check('email')
    .exists().withMessage('Provide Email').bail()
    .isEmail().withMessage('Provide a valid email').bail()
    .isLength({ min: 5, max: 50 }).withMessage('Length of the email must be between 10 to 30 character'),

  check('password')
    .exists().withMessage('Provide Password').bail()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').bail(),
]
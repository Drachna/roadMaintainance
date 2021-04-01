const router=require('express').Router()
const officerController=require('../controllers/officerController')
const {officerValidator,officerLoginValidator}=require('../middlewares/validatorMiddlewares/requestBodyValidator/officerValidator')
const authMiddleware =require('../middlewares/authMiddlewares/authMiddleware')
const { validationResultCheck } = require('../middlewares/validatorMiddlewares/validationResultCheck')

router.post('/addOfficer',officerValidator,validationResultCheck,officerController.addOfficer)
router.delete('/removeOfficer',officerController.removeOfficer)
router.post('/editOfficer',officerController.editOfficerDetails)
router.post('/loginOfficer',officerLoginValidator,validationResultCheck,officerController.loginOfficer)

module.exports=router
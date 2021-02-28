const router=require('express').Router()
const officerController=require('../controllers/officerController')
const authMiddleware =require('../middlewares/authMiddleware')

router.post('/addOfficer',officerController.addOfficer)
router.delete('/removeOfficer',officerController.removeOfficer)
router.post('/editOfficer',officerController.editOfficerDetails)
router.post('/loginOfficer',officerController.loginOfficer)

module.exports=router
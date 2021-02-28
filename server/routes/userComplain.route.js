const router=require('express').Router()
const userComplainController=require('../controllers/userComplainController')
const authMiddleware=require('../middlewares/authMiddleware')

router.get('/getAllUserComplain',userComplainController.fetchAllComplains)
router.post('/createUserComplain',userComplainController.createComplain)
router.put('/addAction/:id',authMiddleware,userComplainController.addAction)
router.put('/addUpvote',userComplainController.addUpvote)
router.get('/getComplaint/:id',userComplainController.getSpecificComplaint)

module.exports=router
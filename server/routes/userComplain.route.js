const router=require('express').Router()
const userComplainController=require('../controllers/userComplainController')
const {complaintValidator,upVoteValidator}=require('../utils/schemaValidators/complaintValidator')
const authMiddleware=require('../middlewares/authMiddlewares/authMiddleware')
const { validationResultCheck } = require('../middlewares/validatorMiddlewares/validationResultCheck')
const { imageFileValidator } = require('../middlewares/validatorMiddlewares/imageFileValidator')
const { actionValidato } = require('../utils/schemaValidators/actionValidator')



router.get('/getAllUserComplain',userComplainController.fetchAllComplains)
router.post('/createUserComplain',imageFileValidator,complaintValidator,validationResultCheck,userComplainController.createComplain)
router.put('/addAction/:id',authMiddleware,actionValidato,validationResultCheck,userComplainController.addAction)
router.put('/addUpvote',upVoteValidator,validationResultCheck,userComplainController.addUpvote)
router.get('/getComplaint/:id',userComplainController.getSpecificComplaint)

module.exports=router
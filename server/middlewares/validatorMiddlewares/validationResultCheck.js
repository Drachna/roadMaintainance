const { validationResult } = require("express-validator")
const errorFormatter = require("../../utils/errorFormatter/errorFormatter")


module.exports.validationResultCheck=(req,res,next)=>{

  const errors=validationResult(req)
  if (!errors.isEmpty()) {
    const formattedErrors = errorFormatter(errors)
    return res.status(400).send(formattedErrors)
  }
  next()
}
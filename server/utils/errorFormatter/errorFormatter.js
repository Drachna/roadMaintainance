
const errorFormatter=(errors)=>{
  const formattedErrors=[]
  errors.errors.map(err=>formattedErrors.push({[err.param]:err.msg}))
  return formattedErrors
}
module.exports=errorFormatter
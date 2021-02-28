const jwt=require('jsonwebtoken')

const authMiddleware=async (req,res,next)=>{
  try {
    const token=req.cookies.token
    if (token){
      jwt.verify(token,'secrete',(err,decodedToken)=>{
        if (err){
          res.send("Invalid user")
        }
        else{
          req.officer_id=decodedToken.id
          next()
        }
      })
    }
    else{
    return  res.send("login failed")
    }

    
  } catch (error) {
    return res.send("not logged in")
  }
}
module.exports=authMiddleware
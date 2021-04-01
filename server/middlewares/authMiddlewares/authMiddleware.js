const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (token) {
      jwt.verify(token, process.env.SECRETE, (err, decodedToken) => {
        if (err) {
          return res.status(403).send({ message: 'Something went wrong while verifying user token' })
        }
        else {
          req.officer_id = decodedToken.id
          next()
        }
      })
    }
    else {
      return res.status(403).send({ message: 'Invalid User' })
    }


  } catch (error) {
     return res.status(403).send({ message: 'Login attempt failed' })
  }
}
module.exports = authMiddleware

const jwt = require('jsonwebtoken')

const tokenExpiresIn = 1 * 60 * 60

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETE, { expiresIn: tokenExpiresIn })
}

module.exports={tokenExpiresIn,createToken}


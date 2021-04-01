const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const officerSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required:true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true

  },
  department: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})



officerSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})


officerSchema.statics.login = async function (email, password) {
  const officer = await this.findOne({ email })
 
  if (officer) {
    const auth = await bcrypt.compare(password, officer.password)
    if (auth) return officer
    else {
      throw Error('Incorrect Email or Password')
    }
  }
  throw Error('Officer Not Found')
}


const Officer = mongoose.model('Officer', officerSchema)
module.exports = Officer
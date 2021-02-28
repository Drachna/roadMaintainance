const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const officerSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Name must have atleast 2 character'],
    require: [true, 'Name is required']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    //unique: true,
    require: [true, 'Email is required']
  },
  password: {
    type: String,
    require: [true, 'Provide Password']
  },
  region: {
    type: String,
    require: [true, 'Provide region handled by the Officer']

  },
  department: {
    type: String,
    require: [true, 'Department is required']
  },
  role: {
    type: String,
    require: [true, 'Provide role']
  }
})



officerSchema.pre('save', async function (next) {

  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


officerSchema.statics.login = async function (email, password) {
  const officer = await this.findOne({ email })
  console.log(officer);
  if (officer) {
    const auth = await bcrypt.compare(password, officer.password)
    if (auth) return officer
    else {
      throw Error('Incorrect Password')
    }
  }
  throw Error('Officer Not Found')
}


const Officer = mongoose.model('Officer', officerSchema)
module.exports = Officer
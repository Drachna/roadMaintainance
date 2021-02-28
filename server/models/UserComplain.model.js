const mongoose = require('mongoose')

// const ActionSchema=require('./ActionTaken.model')
const ActionSchema = mongoose.Schema({

  actionDate: {
    type: Date,
    required: [true, 'Provide Date on which the action was taken']
  },
  officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
    required : [true, 'Provide ref to the officer who acted upon this complaint']
  },
  actionDescription: {
    type: String,
    required : [true, 'Provide Description']
  },
  status: {
    type: String,
    required : [true, 'Provide current status']
  }

})


const userComplainSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Name must have atleast 2 character'],
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    //unique: true,
    required: [true, 'Email is required']
  },
  lat: {
    type: String,
    required: [true, 'Provide Latitude']
  },
  lng: {
    type: String,
    required: [true, 'Provide Longitude']
  },
  description: {
    type: String,
    maxLength: [500, 'Length of description cannot exceed 500 characters'],
    required: [true, 'Provide Description']
  },
  image: {
    type: String,
    required: [true, 'Provide Image']
  },
  regDate: {
    type: Date,
    // require:[true,'Provide Registration Date']
  },
  upvote: {
    count:{
    type: Number,
    default: 1
    },
    upvotedBy:{
      type:[String]
    }
  },
  
  address: {
    type: String,
    required: [false, 'Location is in the middle of nowhere']
  },
  ActionArray: [ActionSchema],
  region: {
    type: String,
    required: [false, 'why am i doing this']
  },
  status: {
    type: String,
    default:'Complain Registered',
    required: [true, 'Provide current status']
  }
  // actionTaken:{
  //   type:Boolean,
  //   default:false,
  //   require:[true,'Provide if action was taken on this complain']
  // }
})


userComplainSchema.pre('save', async function (next) {

  this.upvote.upvotedBy = [this.email]
  next()
})
const UserComplain = mongoose.model('UserComplain', userComplainSchema)
module.exports = UserComplain
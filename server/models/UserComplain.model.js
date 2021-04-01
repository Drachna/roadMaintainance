const mongoose = require('mongoose')
const geocoder = require('../utils/geoCoder/geoCoder')
// const ActionSchema=require('./ActionTaken.model')
const axios = require('axios');
const ActionSchema = mongoose.Schema({

  actionDate: {
    type: Date,
    required:true
  },
  officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
    required:true
  },
  actionDescription: {
    type: String,
    required:true
  },
  status: {
    type: String,
    required: true
  }

})


const userComplainSchema = mongoose.Schema({
  name: {
    type: String,
    minlength:2,
    maxlength:30,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  lat: {
    type: String,
    required:true
  },
  lng: {
    type: String,
    required:true
  },
  description: {
    type: String,
    maxlength: 500,
    required:true
  },
  image: {
    type: String,
    required: true
  },
  regDate: {
    type: Date,
    required:true
  },
  upvote: {
    count: {
      type: Number,
      default: 1
    },
    upvotedBy: {
      type: [String]
    }
  },

  address: {
    type: [],
    required: true
  },
  
  ActionArray: [ActionSchema],
  status: {
    type: String,
    default: 'Complain Registered',
    required: true
  }
  
})


userComplainSchema.pre('save', async function (next) {
  this.upvote.upvotedBy = [this.email]
})


const UserComplain = mongoose.model('UserComplain', userComplainSchema)
module.exports = UserComplain
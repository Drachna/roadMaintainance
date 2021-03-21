const mongoose = require('mongoose')
const geocoder = require('../utils/geoCoder/geoCoder')
// const ActionSchema=require('./ActionTaken.model')
const mongooseErrorFormatter = require('../utils/validators/mongooseErrorFormator')
const axios = require('axios');
const ActionSchema = mongoose.Schema({

  actionDate: {
    type: Date,
    required: [true, 'Provide Date on which the action was taken']
  },
  officer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
    required: [true, 'Provide ref to the officer who acted upon this complaint']
  },
  actionDescription: {
    type: String,
    required: [true, 'Provide Description']
  },
  status: {
    type: String,
    required: [true, 'Provide current status']
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
    // required: [false, 'Location is in the middle of nowhere']
  },
  streetName: {
    type: String,
    // required: [true, 'Provide a value for this field']
  },
  locality: {
    type: String,
    // required: [true, 'Provide a value for this field']
  },
  zipcode: {
    type: String,
    // required: [true, 'Provide a value for this field']
  },
  state: {
    type: String,
    // required: [true, 'Provide a value for this field']
  },
  ActionArray: [ActionSchema],
  region: {
    type: String,
    required: [false, 'why am i doing this']
  },
  status: {
    type: String,
    default: 'Complain Registered',
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
  // const loc = await geocoder.reverse({ lat: this.lat, lon: this.lng })
  // this.address=loc[0].formattedAddress
  // this.streetName=loc[0].streetName
  // this.city=loc[0].city,
  // this.state=loc[0].stateCode,
  // this.zipcode=loc[0].zipcode
  // console.log(loc);




  const params = {
    access_key: '79bc3323f379bf3298bdf4d085a2eb92',
    //  query: '15.265498755623128,73.96076687914311',
    query: `${this.lat},${this.lng}`,
    limit: 2
  }

  // this.locality = response.data.data[0].locality,
  //   this.state = response.data.data[0].region
  // const address = {
  //   location: response.data.data[0].label,
  //   distance: response.data.data[0].distance,
  //   confidence: response.data.data[0].confidence
  // }
  // this.address = address

  // const response = await axios.get('http://api.positionstack.com/v1/reverse', { params })

  // this.locality = response.data.data[0].locality,
  //   this.state = response.data.data[0].region
  // const address1 = {
  //   location: response.data.data[0].label,
  //   distance: response.data.data[0].distance,
  //   confidence: response.data.data[0].confidence
  // }
  // this.address = address1
  console.log('in here in presave');
  await axios.get('http://api.positionstack.com/v1/reverse', { params }).then(response => {

    response.data.data.map(locationq => {
      try {
        if (locationq.region != 'Goa') {
          
         next(new Error("This site is meant for Goans Only"))
        }

        if (locationq.confidence > 0.5) {

          this.locality = locationq.locality,
            this.state = locationq.region
          const address = {
            location: locationq.label,
            distance: locationq.distance,
            confidence: locationq.confidence
          }
          this.address.push(address)
          next()
        }
        // console.log(locationq);
      } catch (error) {
        console.log('in error',error.message);
        // const errors = mongooseErrorFormatter(error)
        // console.log(errors,'i');
        //  next(error)
      }
    })

  }).catch(error => {
    console.log(error);
  });
 
})

const UserComplain = mongoose.model('UserComplain', userComplainSchema)
module.exports = UserComplain
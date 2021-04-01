const path = require('path');
const UserComplain = require('../models/UserComplain.model')
const getLocationDetatils = require('../utils/geoCoder/getAddress')
// const mailer = require('../utils/mailer/mailer')
// const messageGenerator = require('../utils/mailer/messages');





module.exports.createComplain = async (req, res) => {
  try {
    const locationDetails = await getLocationDetatils(req.body.lat, req.body.lng)
    if (locationDetails) {
      const isLocationValid = locationDetails.some(location => location.state === 'Goa')
      if (!isLocationValid) {
        return res.status(400).send({ message: 'This site is for Goans only' })
      }
      else {
        const url = req.protocol + "://" + req.get('host')
        let imageFile = req.files.imageToAdd;
        const temp_string=new Date().getTime().toString()
        const fileName=temp_string+imageFile.name.split(' ').join('-')
        await imageFile.mv(path.resolve(__dirname, '../images', fileName), async function (err) {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Something went wrong while saving the image' })
          }
          else {
           
            req.body.regDate = new Date()
            req.body.image = url + '/images/'  + fileName;
            req.body.address = locationDetails
            const complain = UserComplain(req.body)
            await complain.save()
            return res.status(201).send({ message: 'Complaint registered successfully!!' })
          }
        });
      }
    }
    else{
      return res.status(500).send({ message: 'Something went wrong while fetching address of the provided location' })
    }
  } catch (error) {
    
    return res.status(500).send({ message: 'Something went wrong while saving the complaint' })
  }


}

module.exports.addAction = async (req, res) => {
  try {

    await UserComplain.findOneAndUpdate({ _id: req.params.id },
      {
        $push: {
          "ActionArray": {
            "actionDate": new Date(),
            "officer": req.officer_id,
            "actionDescription": req.body.actionDescription,
            "status": req.body.status
          },
        },
        status: req.body.status
      })
    return res.status(200).send({ message: 'Action added successfully!!' })

  } catch (error) {

    res.status(500).send({ message: 'Something went wrong while registering the action' })
  }
}

module.exports.getSpecificComplaint = async (req, res) => {
  try {
    const complaint = await UserComplain.findById(req.params.id)
    res.status(200).send({data:complaint,message:'Complaint details fetched successfully!!!'})
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong while fetching the Complaint' })
  }
}

module.exports.addUpvote = async (req, res) => {
  try {

    const complain = await UserComplain.find({
      _id: req.body._id,
      "upvote.upvotedBy": { $nin: [req.body.email] }
    })

    if (complain.length > 0) {
      complain[0].upvote.count += 1
      complain[0].upvote.upvotedBy.push(req.body.email)
      await complain[0].save()
      return res.status(200).send({message:'you have upvoted the complaint successfully!!!'})
    }
    else {
      return res.status(400).send({message:" You already upvoted this complaint"})
    }
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong while registering an upvote' })
  }
}


module.exports.fetchAllComplains = async (req, res) => {
  try {
    const complaints = await UserComplain.find({})
    return res.status(200).send({data:complaints,message:'Complaint details fetched successfully!!!'})
  } catch (error) {
   return res.status(500).send({ message: 'Something went wrong while fetching all Complaints' })
  }
}

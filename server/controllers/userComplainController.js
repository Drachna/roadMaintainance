const mongooose = require('mongoose')
const path = require('path');
const mongooseErrorFormatter = require('../utils/validators/mongooseErrorFormator')
const UserComplain = require('../models/UserComplain.model')


const mailer = require('../utils/mailer/mailer')
const messageGenerator = require('../utils/mailer/messages')


module.exports.createComplain = async (req, res) => {

  const url = req.protocol + "://" + req.get('host')

  if (req.files && Object.keys(req.files).length !== 0) {
    let imageFile = req.files.imageToAdd;
    await imageFile.mv(path.resolve(__dirname, '../images', imageFile.name), async function (err) {
      if (err)
        console.log(err);
      else {
        req.body.regDate = new Date()
        req.body.image = url + '/images/' + imageFile.name;
        const complain = await UserComplain(req.body)
        try {
          await complain.save()

          // TAKES TIME--FIX PERFORMANCE ISSUE 
          // const authorityMsg=messageGenerator.authorityInfoMessage(complain,'Rachna')
          // const userMsg=messageGenerator.sendUserMessage(complain,'Rachna','Successfully Registered')
          // // send mail to officer
          // await mailer.sendEmail('kedard249.kd@gmail.com','New Complaint Assigned',authorityMsg)
          // // send mail to user
          // await mailer.sendEmail(complain.email,'Complaint Registered Succesfully',userMsg)
          // console.log(authorityMsg,userMsg);
        } catch (error) {
     
          const errors = mongooseErrorFormatter(error)
          console.log(errors);
         return res.status(400).json(error)
        }


        return res.status(200).json(complain)
      }
    });

  }
}

module.exports.addAction = async (req, res) => {
  try {
    console.log(req.params.id, req.body)
    const complain = await UserComplain.findOneAndUpdate({ _id: req.params.id },
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
    console.log(complain);
    // .then(result=>{
    //   console.log(result,complain);
    // })
    // .catch(err=>{console.log(err);})

    // const userMsg=messageGenerator.sendUserMessage(complain,'Rachna','being acted upon')
    // // send mail to user
    // await mailer.sendEmail(complain.upvotedBy,'Action Taken!!!',userMsg)
    res.status(200).send("done")
  } catch (error) {
    console.error(error);
    const errors = mongooseErrorFormatter(error)
    res.status(400).json(errors)
  }
}

module.exports.getSpecificComplaint = async (req, res) => {
  try {
    const complaint = await UserComplain.findById(req.params.id)
    res.json(complaint)
  } catch (error) {

  }
}

module.exports.addUpvote = async (req, res) => {
  try {
    // const complain = await UserComplain.findById(req.body._id)
    console.log(req.body, 'in addvote');
    const complain = await UserComplain.find({
      _id: req.body._id,
      "upvote.upvotedBy": { $nin: [req.body.email] }
    })
    console.log(complain[0]);
    if (complain.length > 0) {
      complain[0].upvote.count += 1
      complain[0].upvote.upvotedBy.push(req.body.email)
      await complain[0].save()
    }
    else {
      return res.status(400).send("Already upvoted")
    }
    console.log(complain[0]);
    // const userMsg=messageGenerator.sendUserMessage(complain,'Rachna','Successfully Registered')
    // // send mail to upvoted person
    // await mailer.sendEmail(req.body.email,'Complaint Registered Succesfully',userMsg)

    res.status(200).send("upvoted")
  } catch (error) {
    console.log(error);
    const errors = mongooseErrorFormatter(error)
    res.status(400).json(errors)
  }
}


module.exports.fetchAllComplains = async (req, res) => {
  console.log('here');
  try {
    const complain = await UserComplain.find({})
    res.send(complain)

  } catch (error) {
    const errors = mongooseErrorFormatter(error)
    res.status(400).json(errors)
  }
}

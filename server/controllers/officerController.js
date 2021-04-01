const Officer = require('../models/Officer.model')
const { createToken, tokenExpiresIn } = require('../utils/tokenGenerator/generateToken')



module.exports.addOfficer = async (req, res) => {
  try {
      const officer = new Officer(req.body)
      await officer.save()
      const token = createToken(officer._id)
      res.cookie('token', token, { httpOnly: true, maxAge: tokenExpiresIn * 1000 })
      res.status(201).send({ status: 'LoggedIn' ,message:'Registered successfully!'})

  } catch (error) {
    res.status(500).send({message:'Something went wrong while adding the officer'})
  }
}

module.exports.removeOfficer = async (req, res) => {
  try {
    await Officer.deleteOne({ _id: req.params.id })
    res.status(200).send({message:'Deleted Successfully'})

  } catch (error) {
    res.status(500).send({message:'Failed to delete the officer'})
  }
}

module.exports.editOfficerDetails = async (req, res) => {
  try {
    const officer = Officer(req.body)
    await officer.save()
    res.status(200).send({message: "Officer details are successfully updated"})
  } catch (error) {
    res.status(500).send({message:'Something went wrong while updating the details'})
  }
}

module.exports.loginOfficer = async (req, res) => {
  try {
   
      const officer = await Officer.login(req.body.email, req.body.password)
      const token = createToken(officer._id)
      res.cookie('token', token, { httpOnly: true, maxAge: tokenExpiresIn * 1000 })
      res.status(200).send({ status: 'LoggedIn',message:'Login Successful' })
 
  } catch (error) {
    console.log(error);
    res.status(500).send({message:'Something went wrong'})
  }

}
const mongoose = require('mongoose')
const Officer = require('../models/Officer.model')
const jwt=require('jsonwebtoken')
const mongooseErrorFormatter = require('../utils/validators/mongooseErrorFormator')
const tokenExpiresIn=1*60*60

const createToken=(id)=>{
  return jwt.sign({id},'secrete',{expiresIn:tokenExpiresIn})
}


module.exports.addOfficer = async (req, res) => {
  try {
    console.log(req.body);
    const officer = await new Officer(req.body)
    officer.save()
    const token=createToken(officer._id)
    res.cookie('token',token,{httpOnly:true,maxAge:tokenExpiresIn*1000})
    res.status(200).json({status:'LoggedIn'})
  } catch (error) {
    const errors = mongooseErrorFormatter(error)
    res.status(400).json(errors)
  }
}

module.exports.removeOfficer = async (req, res) => {
  try {
    const officer = await Officer.deleteOne({ _id: req.params.id })
    res.send('deleted')

  } catch (error) {
    const errors = mongooseErrorFormatter(error)
    res.status(400).json(errors)
  }
}

module.exports.editOfficerDetails = async (req, res) => {
  try {
    const officer = Officer(req.body)
    officer.save()
  } catch (error) {
    const errors = mongooseErrorFormatter(error)
    res.status(400).json(errors)
  }
}

module.exports.loginOfficer=async(req,res)=>{
  try {
    const officer=await Officer.login(req.body.email,req.body.password)
    const token=createToken(officer._id)
    res.cookie('token',token,{httpOnly:true,maxAge:tokenExpiresIn*1000})
    res.status(200).json({status:'LoggedIn'})
  } catch (error) {
    console.error(error);
    const errors = mongooseErrorFormatter(error)
    res.status(400).json(errors)
  }

}
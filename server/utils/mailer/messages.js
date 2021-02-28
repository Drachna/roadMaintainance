module.exports.authorityInfoMessage = (complain, officerName) => {
  const msg = `
  <h3>Dear ${officerName}</h3>

  <p>A new complain has been assigned to you. Following are the complaint details</p>
    <ul>
      <li>Complaint Number:${complain._id}</li>
      <li>Status:${complain.status}</li>
    </ul>
  <p> Kindly take suitable action withing 3 working days to avoid escalation</p>

  <p> Regards<p>
  <p>Team</p>
  `

  return msg
}

module.exports.sendUserMessage=(complain,officer,state)=>{
  const msg=`
  <h3>Dear sir/madam<h3>

  <p>Your complaint is ${state}. Here are your complain deatils</p>
  <ul>
    <li>Complaint Number:${complain._id}</li>
    <li>Assigned to :${officer}</li>
    <li>Current Status :${complain.status}</li>
  </ul>
  <p> Do not reach out to us. we are busy doing studying web developement</p>
 
  <p> Regards<p>
  <p>Team</p>
  `
  return msg
}
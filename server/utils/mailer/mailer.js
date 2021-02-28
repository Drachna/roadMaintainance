const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
  host: 'mail.yahoo.com',
  port: 587,
  service: 'yahoo',
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER, 
    pass: process.env.PASSWORD 
  },
  debug: false,
  logger: true
})



module.exports.sendEmail=async (to,subject,msg)=>{
  let mailOptions={
    from:'Road Maintainance rachna.devasthali@yahoo.com',
    to,
    subject,
    text:'hello',
    html:msg
  }
  console.log(mailOptions);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
  
    return 
  });
}




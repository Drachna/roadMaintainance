const express = require('express');
const nodeMailer = require('nodemailer');

const app = express();


app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>`;

  const transporter = nodeMailer.createTransport({
    host: 'mail.yahoo.com',
    port: 587 ,
    service:'yahoo',
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rachna.devasthali@yahoo.com', // generated ethereal user
      pass: 'sztljgqqxflgaaxk'  // generated ethereal password
    },
    debug: false,
            logger: true
  })
  
  
  let mailOptions = {
    from: 'Nodemailer Contact rachna.devasthali@yahoo.com', // sender address
    to: 'rachna.devasthali@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));
  
    // res.render('contact', {msg:'Email has been sent'});
    res.send("sent")
  });
  
  
  });

app.listen(4000, () => console.log('Server started...'));
import nodemailer from 'nodemailer'
// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pycharan01@gmail.com',
    pass: 'ctqv gyuw wqhu ywdl'
  }
});
var s = "";
for(let i=200001;i<200003;i++){
    s += 'rr'+i+'@rguktrkv.ac.in,'
}
s += 'rr200589@rguktrkv.ac.in'

console.log(s);
// Set up email data with unicode symbols
const mailOptions = {
  from: 'pycharan01@gmail.com', // sender address
  to: 'cherryiiit1234@gmail.com , botmail8520@gmail.com, rr200589@rguktrkv.ac.in , r210032@rguktrkv.ac.in', // list of receivers
//   to: s,
  subject: 'Hello', // Subject line
  text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>' // html body
};

// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("bro we fucked up !!\n", error);
  }
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});

const nodemailer = require('nodemailer');
const ExpressError = require('../ExpressError');
const jwt = require('jsonwebtoken');
const User = require('./User');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_HOME, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// send mail with defined transport object
const emailSender = async (mailTo, userId) => {
  try {
    await transporter.sendMail({
      from: '"Hello from us" <authentication-generator@outlook.com>', // sender address
      to: mailTo, // list of receivers
      subject: 'Please verify your email address', // Subject line
      text: 'Hello world?', // plain text body
      html: `<p>Thank you for registering, to prevent spam accounts, please follow this <a href="http://localhost:5000/authentication/verify/${userId}">link</a><p>`, // html body
    });
  } catch (err) {
    throw new ExpressError(err);
  }
};
const resetPasswordMail = async (mailTo, userId) => {
  const token = jwt.sign({ _id: userId }, process.env.RESTART_KEY, { expiresIn: '15min' });
  try {
    await transporter.sendMail({
      from: '"Alzheimer" <authentication-generator@outlook.com>',
      to: mailTo,
      subject: 'Password reset',
      text: 'Follow the link below',
      html: `<p>To get a new password, please click on this <a href="http://localhost:3000/user/setNewPassword/${token}">link</a> and reset your password </p>`,
    });
  await User.findByIdAndUpdate(userId,{resetLink:token})
  } catch (err) {
    throw new ExpressError(err);
  }
};
module.exports = { emailSender, resetPasswordMail };

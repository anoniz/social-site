const nodemailer = require('nodemailer');

const SMTP = process.env.SMTP;
const from_email = process.env.FROM_EMAIL;
const password = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    host: SMTP,
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: from_email,
      pass: password
    }
  });

module.exports = transporter
import express from 'express';
import nodemailer from 'nodemailer';
import mailGun from 'nodemailer-mailgun-transport';
import dotenv from 'dotenv';
import cors from 'cors';

const router = express.Router();
dotenv.config();

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, message, cb) => {
  const mailOptions = {
    sender: name,
    from: email,
    to: 'lakpazeedev@gmail.com',
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Data: ', req.body);
  
  sendMail(name, email, subject, message, function(err, data) {
    if (err) {
      res.status(500).json({ message: 'Internal Error!' });
    } else {
      res.status({ message: 'Email Sent!' });
    }
  });
});

export default router;
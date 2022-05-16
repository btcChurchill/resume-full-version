const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config();

api = process.env.KEY_API;
domain = process.env.DOMAIN;

const auth = {
    auth: {
        api_key: api,
        domain: domain
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, project, message, cb) => {

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `New message from ${name}, with subject ${project}`,
        text: message,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            cb(err, null);
    
        } else {
            cb(null, data);
        }
    });
}

module.exports = sendMail;
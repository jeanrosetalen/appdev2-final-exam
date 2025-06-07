const nodemailer = require('nodemailer');
const pug = require('pug');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendConfirmationEmail = async (userEmail, eventDetails) => {
  try {
    const html = pug.renderFile(__dirname + '/views/email-template.pug', eventDetails);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Event Created Successfully!',
      html
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendConfirmationEmail;



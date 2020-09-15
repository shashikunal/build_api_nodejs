const nodemailer = require("nodemailer");
const {
  SMTP_EMAIL,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_HOST,
  FROM_EMAIL,
  FROM_NAME,
} = require("../Config");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  let message = {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: `<h5>${options.message}</h5>`,
  };

  const info = await transporter.sendMail(message);
  console.log("Message send : %s", info.messageId);
};

module.exports = sendEmail;

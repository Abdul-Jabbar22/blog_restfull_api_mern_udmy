const nodemailer = require("nodemailer");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "abduljabbarray@gmail.com",
      pass: "bwod xdal hbyr dioy",
    },
  });

  const message = {
    from: '"abdul.jabbar" <abduljabbarray@gmail.com>', // sender address
    to: emailTo,
    subject,
    html: `
      <div>
        <h3>Use this code to ${content}</h3>
        <p><strong>Code:</strong> ${code}</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;

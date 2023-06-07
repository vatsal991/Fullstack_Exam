const nodeMailer = require("nodemailer");

const transport = nodeMailer.createTransport({
  host: "mail.mailtest.radixweb.net",
  port: 465,
  auth: {
    user: "testdotnet@mailtest.radixweb.net",
    pass: "Radix@web#8",
  },
});

const sendMail = (Body, MailId) => {
  var mailOptions = {
    from: "testdotnet@mailtest.radixweb.net",
    to: `${MailId}`,
    subject: "Sending Email using Node.js",
    text: `${Body}`,
  };

  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;

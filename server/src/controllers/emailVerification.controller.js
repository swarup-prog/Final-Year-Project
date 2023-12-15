const nodemailer = require("nodemailer");

const sendEmail = (req, res) => {
  const { email, OTP } = req.body;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mail_configs = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>Gamer Connect Email Verification</title>
      
    
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #ef4343;text-decoration:none;font-weight:600">Gamer Connect</a>
        </div>
        <p style="font-size:1.1em">Dear User,</p>
        <p>Use the following OTP to complete email verification Procedure for your Gamer Connect account. OTP is valid for 5 minutes</p>
        <h2 style="background: #ef4343;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
        <p style="font-size:0.9em;">Regards,<br />Gamer Connect</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Gamer Connect Ltd.</p>
          <p>Durbarmarg, Kathmandu</p>
          <p>Nepal</p>
        </div>
      </div>
    </div>
    <!-- partial -->
      
    </body>
    </html>`,
  };

  transporter.sendMail(mail_configs, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error." });
    }
    return res.status(200).send({ message: "Email sent successfully" });
  });
};

module.exports = sendEmail;

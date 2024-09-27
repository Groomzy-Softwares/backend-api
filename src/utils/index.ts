import { createTransport } from "nodemailer";
import _ from "lodash";

const transport = createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5a98d73fcea9ef",
    pass: "540715227a9279",
  },
});

// const transport = createTransport({
//   auth: {
//     pass: process.env.GROOMZY_MAIL_PASSWORD,
//     user: process.env.GROOMZY_MAIL_USER,
//   },
//   host: process.env.GROOMZY_MAIL_SERVICE,
//   port: Number(process.env.GROOMZY_MAIL_PORT),
// });

const mailContent = (givenName: string, message: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Groomzy</title>
    <style>
      .main {
        margin-left: 30%;
        margin-right: 30%;
      }
      @media screen and (max-width:768px) {
        .main {
          margin-left: 5%;
          margin-right: 5%;
        }
      }
    </style>
  </head>
  <body>
    <div class="main" align="center"> 
      <div>
        <img src="http://groomzy.co.za/api/profile/groomzy-logo.png" alt="Groomzy Logo" width="200" height="70" style="display: block;" />
      </div>
      <hr color="#607d8b"/>
      <div align="left" style="margin-bottom: 2%;">
        <b>Hi ${givenName}</b>
      </div>
      <div align="left" style="margin-bottom: 2%;">
        <p>${message}</p>
      </div>
      <div style="padding: 1%; background: #607d8b;">
        <a href="">
          <img src="http://groomzy.co.za/api/profile/get-it-on-google-play-badge-logo.png" alt="App Store" width="120" height="40" />
        </a>
        <p style="color: white;">Copyright &copy; 2020 <b>Groomzy</b>. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
export { transport, mailContent };

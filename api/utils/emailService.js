import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendSubscriptionEmail = (toEmail) => {
  // Create a transporter using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: 'nike.updates@nike.com',
    to: toEmail,
    subject: 'Welcome to Nike Updates & Newsletter',
    html: `
      <html>
        <head>
          <style>
            .container {
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .logo {
              color: #FF6452;
              font-weight: bold;
            }
            .button {
              background-color: #FF6452;
              color: #FFFFFF;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin: 20px 0;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to <span class="logo">Nike</span> Updates!</h1>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>You'll now receive:</p>
            <ul>
              <li>Latest product updates</li>
              <li>Exclusive offers</li>
              <li>Special discounts</li>
              <li>Early access to sales</li>
            </ul>
            <a href="https://nike.com/shop" class="button">Start Shopping</a>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>The Nike Team</p>
          </div>
        </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
}; 
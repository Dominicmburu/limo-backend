const nodemailer = require('nodemailer');

class EmailService {

  static async sendEmail(to, subject, text, html = null) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.example.com',
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_PORT == 465, 
        auth: {
          user: process.env.EMAIL_USER || 'your_email@example.com',
          pass: process.env.EMAIL_PASS || 'your_email_password',
        },
      });

      const mailOptions = {
        from: `"Limousine Service" <${process.env.EMAIL_USER || 'your_email@example.com'}>`,
        to,
        subject,
        text,
        html,
      };

      // Send email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EmailService;

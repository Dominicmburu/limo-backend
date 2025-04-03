const nodemailer = require('nodemailer');

class EmailService {

  static async sendEmail(to, subject, text, html = null) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        // secure: process.env.EMAIL_PORT == 465, 
        auth: {
          user: process.env.EMAIL_USER || 'oliviamarjorie787@gmail.com',
          pass: process.env.EMAIL_PASS || 'qajw qeqz ciwj wmbg',
        },
      });

      const mailOptions = {
        from: `"Limousine Service" <${process.env.EMAIL_USER || 'oliviamarjorie787@gmail.com'}>`,
        to,
        subject,
        text,
        html,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EmailService;

import nodemailer from "nodemailer";

export default class Email {
  constructor(user, url, message, subject) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.message = message;
    this.subject = subject;
    this.from = `Shop Sphere <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    return nodemailer.createTransport({
        service: 'SendinBlue',
        host: process.env.SENDINBLUE_HOST,
        port: process.env.SENDINBLUE_PORT,
        auth: {
          user: process.env.SENDINBLUE_USERNAME,
          pass: process.env.SENDINBLUE_PASSWORD,
        },
    });
  }
  async sendMail() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      text: this.message,
    };

    await this.createTransport().sendMail(mailOptions);
  }
}

import nodemailer from 'nodemailer'

export default class EmailNotificationService {
  private transporter: any
  private fromEmail: string

  constructor(host: string, port: number, user: string, password: string, fromEmail: string) {
    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      auth: {
        user: user,
        pass: password
      }
    })
    this.fromEmail = fromEmail
  }
  send = (to: string, subject: string, message: string): void => {
    const mailOptions = {
      from: this.fromEmail,
      to: to,
      subject: subject,
      text: message
    }

    this.transporter.sendMail(mailOptions, function (err: string, info: object) {
      if(err) {
        console.log(err)
      } else {
        console.log(`email has sent!`)
        console.log(info)
      }
    });
  }
}

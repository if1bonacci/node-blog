import nodemailer from 'nodemailer'

export default class EmailNotificationService {
  private transporter: any
  private fromEmail: string

  constructor(host, port, user, password, fromEmail) {
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
  send = (to, subject, message) => {
    let mailOptions = {
      from: this.fromEmail,
      to: to,
      subject: subject,
      text: message
    }

    this.transporter.sendMail(mailOptions, function (err, info) {
      if(err) {
        console.log(err)
        return false
      } else {
        console.log(`email has sent!`)
        console.log(info)
        return true
      }
    });
  }
}

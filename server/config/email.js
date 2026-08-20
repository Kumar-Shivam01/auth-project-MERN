const nodeMailer = require('nodemailer')

const sendEmail = async (options)=>{
    //create a transporter
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }  
    })
    //create email options
    const emailOptions = {
        from: 'Auth support<support@Auth_MERN.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    }
    await transporter.sendMail(emailOptions)
}
module.exports = sendEmail

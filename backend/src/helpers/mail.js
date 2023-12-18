import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:  process.env.EMAIL,
    pass:  process.env.EMAIL_PASSWORD,
  },
 })

export const sendMail = async (email) => {
  try {
      let mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Bienvenido!",
          text: "Gracias por registrarte en nuestra pagina!",
        }
     
      transporter.sendMail(mailOptions, (err, data) => {
          if (err) console.log(err)
          if (data) console.log(data)
        })
  } catch (error) {
      res.status(500).json({ message: 'Error sending email' });
  }
}
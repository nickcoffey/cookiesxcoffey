import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
})

type RequestBody = {
  email: string
  name: string
  phone?: string
  deliveryDate: Date
  cookieCount: number
  message: string
}

type Response = {
  message: string
}

const sendEmail = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  if (req.method === 'POST') {
    const { email, name, phone, deliveryDate, cookieCount, message } =
      req.body as RequestBody

    try {
      const accessToken = oauth2Client.getAccessToken()
      const transporter = nodemailer.createTransport({
        // @ts-ignore
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken
        }
      })

      await transporter.sendMail({
        from: `"My 🍪 Website" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject: 'New Cookie Order 🍪🍪🍪',
        html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Date:</strong> ${new Date(deliveryDate).toDateString()}</p>
        <p><strong>Number of Cookies:</strong> ${cookieCount}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
      })

      transporter.close()
      res.status(200).json({ message: 'Message sent' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Message failed to send' })
    }
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' })
  }
}

export default sendEmail

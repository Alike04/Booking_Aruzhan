const Booking = require("../models/Booking")
const nodemailer = require("nodemailer")
const { GoogleSpreadsheet } = require("google-spreadsheet")
const { promisify } = require('util');
const creds = require("../creds.json")

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "aclass.cs.ia@gmail.com",
    pass: "gvakgfpfvbchfunp"
  }
})


const createBooking = async (body, email) => {
  const book = await Booking.create(body)
  const message = {
    from: "alcass.cs.ia@gmail.com",
    to: email.toString(),
    subject: "Booking",
    text: `You have booked ${body.course} lesson at ${body.time} ${body.date}`
  }
  const doc = new GoogleSpreadsheet("1bwmHXkaJOOZ8XgUrb7IxRqkFdlRI27s2b0m2KjyrpR4")
  await doc.useServiceAccountAuth({
    client_email: "aclass@modified-hearth-377316.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJXcFOxHPDGH4W\nC7/vbJ+/ywqz1Es06p5wXtDTkCD6Q2Ok6k1ziMZty5+PXrQbDnk5XAkX+NSYXAHJ\nv02RCSKaiBhIyjKiWDzsnk1ezsFUkTmxmZ86LGFbxOfBTOHElApcm/iSQ340nwvu\nYOGHVqWTUjbFhGmomc+42fE3jHBKG112+vj2GrUJcxlMfjiPMk2fHv6sQ3EPelYT\nYv4867dKMCVi4MbYoF7Z0IokhlLmQkK3Xzluz7C4AQ/1qQmeGGrLwh0W9k0LRLXP\n/xiDjhUme1+FlJO9YaB5MzzWJRYgH2WxMZzye0vDq74ja5rnW9ilWfM9ICZBM7jA\noKH+I9ztAgMBAAECggEAHgny6t2qiTmPoZlKHhzdrd5Lr+zk9TVkwk2aqFzRVpQT\n+seLG0eVlk5wdJJDmt+rXM+qeZ2AlWPwTljP6OlsdJIF0WH8cLRqDkBFOXXtaECr\n0x8gHiz9rxNuIStnaIxPCWapC6Su4ImzXXGtYyOdWp9ClW991Y1wa9pzPf6gx6UO\nqtKm56Fh1AWx4bdgo9Nb8lRkLKD1TYEqkoOpqZOa1C3aAlfP0nrgx/QtYdMCxz3Q\nIc+/x6zKWd6Xl8G8iYN/f5eTHrb8K92v1LpxbU3fIfOh8px1HKapPg/mhdIOoHzN\nBgjVhLHjUaYC2UggqukRDwzkRajLOjrCYwpjsY4SAQKBgQDmCV7ZIQJ2o0IOaud0\nwgOK08s77+4ty0bM+O778jOTC+/paxPfSb+x0Awn+6rJgHA0JOspuU23ifQBgWxB\nXciOoyGre5svCOj7A/cjyJ65/B/nLW4Ohez0Fd2ZjBfEhD9TUJP74gBfr8nRKXcI\nyAfe7zHLIhKovZ4hJ1ilv3eN7QKBgQDgF/0l1aMXkaiRStjIFy6izdUGJihAi0uI\nRhWvYhUnbipJPSFpvlVI+cTfRcuI63e1Q5mA/QSLnd0L+8bWEgqto2TyAv6OLXaD\nE7gWQQI5Z3rUXbDuAdI8bVwXHSfEaro72/BY0Yvgc1GvMp7u6/+y9LpQcVTSZJF6\nYZqounurAQKBgGP4+pGeuPVaamDdsQ2bK/LvrMm1smuQhoqaPTKdxjBH5dIpyQ8n\ne/oJEt9ljonYGetviAwwDkiP2c21s5iM65ah6wYdyAme87HzvTp9/A2UN0E/Cy+g\noKRLxGzw53tuhh7tTAMR61uqiCkwvhzA4jrO9XL0setHzStXcD1IgurZAoGAa0IQ\nIHPIxBcrn587c0nlQHdUZsUMrxf85xTkfDVt+pl4E+X2gC5hk7Q4zsURTk+l1FSu\nvFZePpUon/u6h+vKwKFcR5m3TUXlW4esrLog3mjxGYRekwy8G8AcO9PwnMqYqN30\nhA6H7L5Fcp3ABItgr78DDk2wU6NfHjxpUikv2AECgYBi5p7TBDRxfLKmDDfgSFEW\ngD3PKbocn2zmtF2Llns0aG3ZU5OXCpv6i+zfre2O6MTpkBemSmEtF5qkYPOJc3SR\nfc5p06vRKhtGE7WDyVLFZn0X7w4d1picyI36uoqwAQ7SHX7LBoeuvzWd3+pYh2cN\nCj+FgqfNA9Pv7rzifq+Nvg==\n-----END PRIVATE KEY-----\n"
  })


  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({ email: email, time: body.time, date: body.date, teacher: body.teacher, course: body.course })

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    }
  })

  return book;
}
const updateBooking = async (body) => {
  const booking = await Booking.findById(body.bookingId)
  Object.assign(booking, body.booking);
  await booking.save();
  return booking
}
const cancelBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);
  booking.status = 'canceled'
  booking.save();
  return booking;
}

const getActiveBooking = async (userId) => {
  const booking = await Booking.find({ user: userId })
  const active = booking.filter(el => el.status != "canceled")
  return active ? active : [];
}

const getAllBookings = async () => {
  const booking = await Booking.find()
  return booking
}

module.exports = { createBooking, updateBooking, cancelBooking, getActiveBooking, getAllBookings }
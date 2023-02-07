const Booking = require("../models/Booking")

const createBooking = async (body) => {
  const book = await Booking.create(body)
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
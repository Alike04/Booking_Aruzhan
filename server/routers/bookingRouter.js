const express = require("express")
const User = require("../models/User")
const { createBooking, getActiveBooking, getAllBookings, updateBooking, cancelBooking } = require("../controllers/bookingController")
const auth = require("../middleware/authHandler")

const bookingRouter = express.Router();

bookingRouter.post("/create", auth, async (req, res) => {
  req.body.user = req.userData._id;
  req.body.status = "active"
  const booking = await createBooking(req.body, req.userData.email);
  return res.status(200).send({ booking: booking });
});
bookingRouter.get("/:userId", auth, async (req, res) => {
  const booking = await getActiveBooking(req.userBody._id)
  return res.status(200).send({ booking: booking });
});
bookingRouter.get("/", auth, async (req, res) => {
  const booking = await getActiveBooking(req.userData._id);
  return res.status(200).send({ booking: booking });
});
bookingRouter.patch("/update", auth, async (req, res) => {
  const booking = await updateBooking(req.body);
  return res.status(200).send({ booking: booking });

});
bookingRouter.patch("/cancel", auth, async (req, res) => {
  const booking = await cancelBooking(req.body.bookingId)
  return res.status(200).send({ booking: booking });
});

module.exports = bookingRouter;
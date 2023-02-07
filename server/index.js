const express = require("express")
const { default: mongoose } = require("mongoose")
const bookingRouter = require("./routers/bookingRouter")
const userRouter = require("./routers/UserRouter")
const cors = require("cors");
const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: false
}));

app.get("/api/get", (req, res) => {
  return res.status(200).json({ message: "123" })
})

app.use(express.json())
app.use("/api/auth", userRouter)
app.use("/api/booking", bookingRouter)

mongoose.connect("mongodb://localhost:27017/aclass").then(() =>
  app.listen(8080, () => {
    console.log("server is running");
  })
);
const express = require("express")
const { createUser, getUserByEmail } = require("../controllers/userController")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const userRouter = express.Router()
userRouter.post("/login", async (req, res) => {
  const { password, email } = req.body;
  const user = await getUserByEmail(email)
  if (user.password == password) {
    return res.status(200).json({ user: user, token: generateToken(user) });
  }
  return res.status(401).json({ message: "incorrect password or email" })
})
userRouter.post("/register", async (req, res) => {
  const user = await createUser(req.body);
  const token = generateToken(user)
  return res.status(200).json({ user: user, token: token });
})
function generateToken(user) {
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    "asdkfhasdfujkhjk123c",
    {
      expiresIn: "10h",
    }
  );
  return token;
}
userRouter.post("", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token || token === null) {
      throw new Error(401, "Authenticate again");
    }
    const result = jwt.verify(token, "asdkfhasdfujkhjk123c");
    const { userId } = result;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(401, "Authentication is failed");
    }
    return res.status(200);
  } catch (e) {
    res.status(401).send();
  }
})

module.exports = userRouter;
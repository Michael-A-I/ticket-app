const router = require("express").Router()
/* Login + Register*/
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")

router.get("/", (req, res) => {
  console.log("home")
  res.send("Home Page")
})

router.post("/register", async (req, res) => {
  console.log("prxy")

  const user = req.body

  console.log(req.body)

  const takenUsername = await User.findOne({ username: user.username })
  const takenEmail = await User.findOne({ email: user.email })

  if (takenUsername || takenEmail) {
    res.json({ message: "Username or email has already been taken" })
    console.log("username or email taken")
  } else {
    user.password = await bcrypt.hash(req.body.password, 10)

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password
    })
    dbUser.save()
    res.json({ message: "Success" })
  }
})

router.post("/login", (req, res) => {
  console.log("login")

  const userLoggingIn = req.body
  /* find record of user */

  console.log(req.body.username)

  User.findOne({ username: userLoggingIn.username }).then(dbUser => {
    console.log(dbUser)
    if (!dbUser) {
      return res.json({
        message: "invalid Username or Password"
      })
    }

    bcrypt.compare(userLoggingIn.password, dbUser.password).then(isCorrect => {
      console.log("/login password correct?:" + isCorrect)
      if (isCorrect) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 86400
          },
          (err, token) => {
            console.log(token)
            if (err) return res.json({ message: err })
            return res.json({
              message: "Success",
              token: "Bearer" + token
            })
          }
        )
      } else {
        return res.json({
          message: "invalid Username or Password"
        })
      }
    })
  })
})

/* dashboard */
router.get("/dashboard", (req, res) => {
  console.log("dashboard")
  res.send("dashboard")
})

/* verify user can access route */
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split[1]

  console.log("Token: " + token)
  if (token) {
    jwt.verify(token.process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) {
        return res.json({
          isLoggedIn: false,
          message: "Failed to Authenticate"
        })
      }

      req.user = {}
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  } else {
    res.json({ message: "incorrect Token Given", isLoggedIn: false })
  }
}

router.get("/isUserAuth", verifyJWT, (req, res) => {
  console.log("prxy")

  return res.json({ isLoggedIn: true, username: req.user.username })
})

router.get("/getUsername", verifyJWT, (req, res) => {
  console.log("prxy")
  res.json({ isLoggedIn: true, username: req.user.username })
})

module.exports = router
/* logging out handled on front end */

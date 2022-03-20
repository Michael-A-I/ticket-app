require("dotenv").config()

const router = require("express").Router()
/* Login + Register*/
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Post = require("../models/post")
const verifyJWT = require("../verifyJWT")

router.post("/posts/new", verifyJWT, (req, res) => {
  console.log(req.body)

  const post = req.body

  const dbPost = new Post({
    title: post.title,
    description: post.description
  })
  dbPost.save()
  res.json({ message: "Success" })
})

router.get("/posts", verifyJWT, (req, res) => {
  // show all posts
})

// router.get("/posts/isUserAuth", verifyJWT, (req, res) => {
//   console.log("prxy")

//   return res.json({ isLoggedIn: true, user: req.user })
// })

module.exports = router

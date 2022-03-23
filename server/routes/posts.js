require("dotenv").config()
const mongoose = require("mongoose")
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

router.get("/posts/index", verifyJWT, async (req, res) => {
  const post = await Post.find({})
  console.log("trying to send data to front end")

  // console.log(res.json)
  return res.json(post)
})

router.get("/posts/:id", verifyJWT, async (req, res) => {
  console.log(typeof req.params.id)
  let paramsId = req.params.id
  const post = await Post.findById({ _id: `${req.params.id}` }).exec()
  console.log("trying to send data to front end")

  console.log(res.json(post))
  // return res.json(post)
})

// router.get("/posts/isUserAuth", verifyJWT, (req, res) => {
//   console.log("prxy")

//   return res.json({ isLoggedIn: true, user: req.user })
// })

module.exports = router

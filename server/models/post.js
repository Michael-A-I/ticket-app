const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
)

const Post = mongoose.model("Post", userSchema)

module.exports = Post

import { useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ValidationError from "./ValidationError"
import Dashboard from "./Dashboard.js"
import { Navbar } from "./Navbar"

export function CreatePost() {
  const history = useNavigate()

  /*! if user logs out -> go to /login */

  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")
        console.log("createposts.js token: " + token)
        const res = await fetch("http://localhost:5000/isUserAuth", {
          headers: {
            "x-access-token": token
          }
        })

        const data = await res.json()

        return data.isLoggedIn ? null : history("/login")
      } catch (error) {
        console.log("CreatePosts.js" + error)
      }
    }

    Authorization()
  }, [history])

  async function handleCreatePost(event) {
    event.preventDefault()

    const form = event.target
    const createPost = { title: form[0].value, description: form[1].value }
    console.log("createPost: " + JSON.stringify(createPost))

    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/posts/new", {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-type": "application/json"
        },
        body: JSON.stringify(createPost)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <h1>Create Post</h1>
      <div class="row">
        <div class="col-sm-4 col-sm-offset-4">
          <form onSubmit={event => handleCreatePost(event)}>
            <legend>New Post</legend>
            <div class="form-group">
              <label for="post-title">Title</label>
              <input type="text" name="title" class="form-control" id="post-title" placeholder="Title" />
            </div>
            <div class="form-group">
              <label for="post-description">Summary</label>
              <textarea name="description" class="form-control" id="post-description" placeholder="description"></textarea>
            </div>
            <div class="text-right">
              <button type="submit" class="btn btn-primary">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

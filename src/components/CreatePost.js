import { useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ValidationError from "./ValidationError"
import Dashboard from "./Dashboard.js"
import { Navbar } from "./Navbar"
import swal from "sweetalert"
import "./css/CreatePost.css"

export function CreatePost() {
  const history = useNavigate()

  /*! if user logs out -> go to /login */

  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")
        console.log("createposts.js token: " + token)
        const res = await fetch("https://ticket-app-serverside.herokuapp.com/isUserAuth", {
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

  function swalLoad() {
    swal({ text: "New Post", icon: "success", buttons: false, timer: 1500 })
  }

  async function handleCreatePost(event) {
    event.preventDefault()

    const form = event.target
    const createPost = { title: form[0].value, description: form[1].value }
    console.log("createPost: " + JSON.stringify(createPost))

    try {
      const token = localStorage.getItem("token")
      const res = await fetch("https://ticket-app-serverside.herokuapp.com/posts/new", {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-type": "application/json"
        },
        body: JSON.stringify(createPost)
      })

      const postResponse = await res.json()
      console.log(postResponse)

      history(`/posts/${postResponse._id}`, { state: { message: postResponse.message } })

      return swalLoad()
    } catch (error) {
      console.log(error)
    }
  }

  // redirect to post created.

  return (
    <>
      <Navbar />
      <h1 className="title">Create Post</h1>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4">
          <div class="input-form">
            <form onSubmit={event => handleCreatePost(event)}>
              <legend>New Post</legend>
              <div className="form-group">
                <label for="post-title">Title</label>
                <input required maxlength="50" type="text" name="title" className="form-control" id="post-title" placeholder="Title" />
              </div>
              <div className="form-group">
                <label for="post-description">Summary</label>
                <textarea required name="description" className="form-control" id="post-description" placeholder="description"></textarea>
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-primary">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

import React, { useContext, useEffect, useState } from "react"
import Navbar from "./Navbar"
import Page from "./Page"
import "./css/Home.css"
import Feed from "./ui/Feed"
/* Context */
import StateContext from "../context/StateContext"
import { useNavigate } from "react-router"
function Product() {
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [posts, setPosts] = useState([])
  const history = useNavigate()

  useEffect(() => {
    Authorization()
    getPosts()
  }, [history])

  async function Authorization() {
    try {
      console.log("appState.isLoggedIn :" + appState.loggedIn)
      return appState.loggedIn ? null : history("/login")
    } catch (error) {
      console.log("islogged in?:" + error)
    }
  }

  async function getPosts() {
    try {
      console.log("PostsIndex.js token: " + token)
      const res = await fetch("/posts/product", {
        headers: {
          "x-access-token": token
        }
      })

      // console.log(typeof res)
      const posts = await res.json()

      setPosts(posts)

      console.log(Array.isArray(posts))
    } catch (error) {
      console.log("PostsIndex.js " + error)
    }
  }

  async function handleDelete(id) {
    try {
      console.log("PostsIndex.js token: " + token)
      await fetch(`/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      getPosts()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <Page title="Product">
        <Feed title="Product" posts={posts} setPosts={setPosts} handleDelete={handleDelete} />
      </Page>
    </>
  )
}

export default Product

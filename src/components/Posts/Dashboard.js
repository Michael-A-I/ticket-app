import React, { useContext, useEffect, useState } from "react"
import Page from "../ui/Page"
import "./css/Home.css"
import Feed from "../ui/Feed"
import { useNavigate } from "react-router"

/* Context */
import StateContext from "../../context/StateContext"

function Dashboard() {
  const appState = useContext(StateContext)
  const [token, setToken] = useState(appState.user.token)
  const [posts, setPosts] = useState([])

  const history = useNavigate()

  useEffect(() => {
    // Authorization()
    getPosts()
  }, [history])

  async function Authorization() {
    try {
      console.log("appState.isLoggedIn :" + appState.loggedIn)
      return appState.loggedIn ? setToken(appState.uster.token) : history("/login")
    } catch (error) {
      console.log("islogged in?:" + error)
    }
  }

  async function getPosts() {
    try {
      console.log("TOKEN" + token)
      const res = await fetch("/api/posts/index", {
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
      const posts = await fetch(`/api/posts/${id}`, {
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
      <Page title="Dashboard">
        <Feed title="Dashboard" posts={posts} setPosts={setPosts} getPosts={getPosts} handleDelete={handleDelete} />
      </Page>
    </>
  )
}

export default Dashboard

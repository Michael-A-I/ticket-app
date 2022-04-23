import { React, useEffect, useState, useContext } from "react"
import { Navbar } from "./Navbar"
import { useNavigate, Navigate } from "react-router-dom"
import { PostsIndex } from "./PostsIndex"
import { Comments } from "./Comments"
import { Posts } from "./Posts"
import { LikedPosts } from "./LikedPosts"
import { RecentPosts } from "./RecentPosts"
import { PostsFollowed } from "./PostFollwed"
/* Context */
function Dashboard() {
  const history = useNavigate()

  const [component, setComponent] = useState(null)

  const [id, setId] = useState()

  useEffect(() => {
    Authorization()
  })

  async function Authorization() {
    try {
      const token = localStorage.getItem("token")

      console.log("dashboard client token=" + token)

      const res = await fetch("https://ticket-app-serverside.herokuapp.com/isUserAuth", {
        headers: {
          "x-access-token": token
        }
      })
      const data = await res.json()
      console.log(data.isLoggedIn)

      setId(data.user.id)
      return data.isLoggedIn ? null : history("/login")
    } catch (error) {
      console.log(error)
    }
  }

  function componentSetter(component) {
    setComponent(component)
  }
  return (
    <>
      <Navbar />
      <div className="post__container">
        <div className="post__wrapper">
          <button className="btn btn-warning btn-sm" onClick={() => componentSetter(<PostsIndex title={"Dashboard"} id={id} />)}>
            All Posts
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => componentSetter(<Posts title={"Dashboard"} id={id} />)}>
            My Posts
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => componentSetter(<Comments title={"Dashboard"} id={id} />)}>
            My Comments
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => componentSetter(<LikedPosts title={"Dashboard"} id={id} />)}>
            Sort Posts by Likes
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => componentSetter(<RecentPosts title={"Dashboard"} id={id} />)}>
            Sort Posts by Most Recent
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => componentSetter(<PostsFollowed title={"Dashboard"} id={id} />)}>
            Sort by Posts Followed
          </button>
        </div>
      </div>
      {component ? component : <PostsIndex title={"Dashboard"} id={id} />}
    </>
  )
}

export default Dashboard
// Show all cases view
// search cases
// filter cases by name, date,

/* TODO: sort by most recent not working */

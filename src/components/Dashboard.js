import { React, useEffect } from "react"
import { Navbar } from "./Navbar"
import { useNavigate, Navigate } from "react-router-dom"
import { PostsIndex } from "./PostsIndex"
function Dashboard() {
  const history = useNavigate()

  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")

        console.log("dashboard client token=" + token)

        const res = await fetch("http://localhost:5000/isUserAuth", {
          headers: {
            "x-access-token": token
          }
        })
        const data = await res.json()
        console.log(data.isLoggedIn)

        return data.isLoggedIn ? null : history("/login")
      } catch (error) {
        console.log(error)
      }
    }

    Authorization()
  })

  return (
    <>
      <Navbar />
      <h1>Dashboard</h1>
      <PostsIndex />
    </>
  )
}

export default Dashboard
// Show all cases view
// search cases
// filter cases by name, date,

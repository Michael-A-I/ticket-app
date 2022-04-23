import { React, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "./Navbar"

export function Home() {
  const history = useNavigate()
  // if user is logged in render home.
  // if user is logged out render login.

  // Is user logged in
  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://ticket-app-serverside.herokuapp.com/isUserAuth", {
          headers: {
            "x-access-token": token
          }
        })
        const data = await res.json()
        console.log(data.isLoggedIn)
        console.log("Is person logged in? = " + JSON.stringify(data))

        return data.isLoggedIn ? null : history("/login")
      } catch (error) {
        console.log("islogged in?:" + error)
      }
    }

    Authorization()
  }, [history])

  return (
    <>
      <Navbar />
      <h1>Home</h1>
    </>
  )
}

// Create a Case

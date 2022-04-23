import { useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import ValidationError from "./ValidationError"
import Dashboard from "./Dashboard.js"
import { Navbar } from "./Navbar"
import { UserContext } from "../context/UserContext"

export function Login() {
  const [login, setLogin] = useState()
  const [message, setMessage] = useState("")
  const history = useNavigate()

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("/isUserAuth", {
          headers: {
            "x-access-token": token
          }
        })
        const data = await res.json()
        console.log(data.isLoggedIn)
        console.log("Is person logged in? = " + JSON.stringify(data))

        // user data passed through application
        /* If user is already authenticated and they try to acess page */
        return data.isLoggedIn ? history("/dashboard") : null
      } catch (error) {
        console.log("islogged in?:" + error)
      }
    }

    Authorization()
  }, [history])

  async function handleLogin(e) {
    e.preventDefault()
    console.log(process.env.URL)

    const form = e.target
    const user = { username: form[0].value, password: form[1].value }

    /* send login information to database and authenticat user */
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      localStorage.setItem("token", data.token)

      /* if user autheticats set Success authentication message */
      setMessage(data.message)
    } catch (error) {
      setMessage(error)
    }
  }

  return (
    <>
      <Navbar />

      <div class="input-form">
        <form onSubmit={event => handleLogin(event)}>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Username
              </span>
            </div>
            <input required type="text" />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
            </div>
            <input required type="password" />
          </div>
          <div class="input-group mb-3">
            <input type="submit" value="Submit" />
          </div>

          {message === "" ? null : message === "Success" ? <Navigate to="/dashboard" /> : <ValidationError message={message} />}
        </form>
      </div>
    </>
  )
}

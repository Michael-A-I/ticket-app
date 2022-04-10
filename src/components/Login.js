import { useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ValidationError from "./ValidationError"
import Dashboard from "./Dashboard.js"
import { Navbar } from "./Navbar"

export function Login() {
  const [login, setLogin] = useState()
  const [message, setMessage] = useState("")
  const history = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    console.log(process.env.URL)
    const form = e.target
    const user = { username: form[0].value, password: form[1].value }
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      localStorage.setItem("token", data.token)

      // console.log("/login token: " + data.token)
      // console.log("/login message: " + data.message)
      setMessage(data.message)
    } catch (error) {
      setMessage(error)
    }
  }

  useEffect(() => {
    async function Authorization() {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:5000/isUserAuth", {
          headers: {
            "x-access-token": token
          }
        })
        const data = await res.json()
        console.log(data.isLoggedIn)
        console.log("Is person logged in? = " + JSON.stringify(data))

        return data.isLoggedIn ? history("/dashboard") : null
      } catch (error) {
        console.log("islogged in?:" + error)
      }
    }

    Authorization()
  }, [history])

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

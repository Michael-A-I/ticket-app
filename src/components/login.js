import { useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import ValidationError from "./ValidationError"

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
      console.log("/login token: " + data.token)
      console.log("/login message: " + data.message)
      setMessage(data.message)
    } catch (error) {
      setMessage(error)
    }
  }

  useEffect(() => {
    async function Authorization() {
      try {
        const res = await fetch("http://localhost:5000/isUserAuth", {
          header: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        const data = await res.json()
        console.log(data)
        return data.isLoggedIn ? history.push("/api/dashboard") : null
        // .then(res => res.json)
        // .then(data => (data.isLoggedIn ? history.push("/dashboard") : null))
        // }, [history])
      } catch (error) {
        console.log(error)
      }
    }
    console.log(history)
    Authorization()
  }, [history])

  return (
    <div>
      <form onSubmit={event => handleLogin(event)}>
        <input required type="text" />
        <input required type="password" />
        <input type="submit" value="Submit" />
      </form>
      {message === "Success" ? <Navigate to="/dashboard" /> : <ValidationError message={message} />}
    </div>
  )
}

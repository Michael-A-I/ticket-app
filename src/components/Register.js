import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { Navbar } from "./Navbar"

export function Register() {
  const history = useNavigate()

  const [state, setState] = useState()

  async function handleRegister(e) {
    e.preventDefault()

    const form = e.target
    // console.log(form[0].value, form[1].value, form[2].value)
    const user = { username: form[0].value, email: form[1].value, password: form[2].value }

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(response => setState(response.message))
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

      <form onSubmit={event => handleRegister(event)}>
        <label for="username">Username:</label>
        <br />
        <input type="text" id="username" name="username" />
        <input required type="email" />
        <input required type="password" />
        <input type="submit" value="Submit" />
        <h1>{state}</h1>
      </form>
    </>
  )
}

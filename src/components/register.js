import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"

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
    fetch("/isUserAuth", {
      header: {
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json)
      .then(data => (data.isLoggedIn ? history.push("/dashboard") : null))
  }, [])

  return (
    <>
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

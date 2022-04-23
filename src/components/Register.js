import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { Navbar } from "./Navbar"
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Register.css"
export function Register() {
  const history = useNavigate()

  const [state, setState] = useState()

  async function handleRegister(e) {
    e.preventDefault()

    const form = e.target
    // console.log(form[0].value, form[1].value, form[2].value)
    const user = { username: form[0].value, email: form[1].value, password: form[2].value }

    fetch("https://ticket-app-serverside.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(response => setState(response.message))
  }

  return (
    <>
      <Navbar />

      <div class="input-form">
        <form onSubmit={event => handleRegister(event)}>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Username
              </span>
            </div>

            <input required minlength="5" type="text" id="username" name="username" class="form-control" />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Email
              </span>
            </div>
            <input required type="email" class="form-control" />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Password
              </span>
            </div>
            <input required minlength="8" type="password" class="form-control" />
          </div>
          <button class="btn btn-primary" type="submit" value="Submit">
            Submit
          </button>
          <h1>{state}</h1>
        </form>
      </div>
    </>
  )
}

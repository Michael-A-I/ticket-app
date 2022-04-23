import { React, useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Navbar } from "./Navbar"
import moment from "moment"
import { handleDate } from "../helper/helper"
import { handleTimestamp } from "../helper/helper"

import { Posts } from "./Posts"
import { Comments } from "./Comments"
import "./css/Profile.css"

/* React Component */
export function Profile() {
  let { id } = useParams()

  const [actions, setActions] = useState([])
  const [view, setView] = useState(false)
  const history = useNavigate()

  console.log(id)
  useEffect(() => {
    Authorization()
    Actions()
  }, [])

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

      return data.isLoggedIn ? null : history("/login")
    } catch (error) {
      console.log(error)
    }
  }

  async function Actions() {
    try {
      const token = localStorage.getItem("token")

      // get comments
      const user = await fetch(`https://ticket-app-serverside.herokuapp.com/u/${id}`, {
        headers: {
          "x-access-token": token
        }
      })

      const userActions = await user.json()

      const userActionsSorted = userActions.sort((a, b) => {
        return handleTimestamp(b.updatedAt) - handleTimestamp(a.updatedAt)
      })

      setActions(userActionsSorted)
    } catch (error) {
      return error
    }
  }

  function handleView() {
    setView(!view)
    console.log("handleview " + view)
  }

  return (
    <>
      <Navbar />
      <div className="profile__container">
        <div className="profile__wrapper">
          <h1>Recent Activity Log</h1>

          {actions.map(action =>
            action.typeOf == "Post" ? (
              <h2>
                {action.name} made a post at <a href="#">{action.title}</a>
                <br />
                {handleDate(action.updatedAt)}
              </h2>
            ) : (
              <h2>
                {action.name} made a comment at <a href="#">{action.postName}</a>
                <br />
                {handleDate(action.updatedAt)}
              </h2>
            )
          )}
        </div>
      </div>
    </>
  )
}
/* 
TODO: add likes to recent user activity

*/

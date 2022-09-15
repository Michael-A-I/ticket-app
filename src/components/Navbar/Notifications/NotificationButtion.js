import React, { useContext } from "react"
import DispatchContext from "../../../context/DispatchContext"
import StateContext from "../../../context/StateContext"
import "./css/NotificationButton.css"

function NotificationButtion(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const viewNotification = () => {
    console.log("viewNotification")
    appDispatch({ type: "setNotification" })
  }

  return (
    <>
      <i class="fa-solid fa-bell notification-button" onClick={viewNotification}></i>
    </>
  )
}

export default NotificationButtion

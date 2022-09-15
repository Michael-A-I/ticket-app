import React, { useContext } from "react"
import { v4 } from "uuid"
import Notifications from "./Notifications.js"
import "./css/NotificationProvider.css"
import StateContext from "../../../context/StateContext.js"

const NotificationProvider = props => {
  const appState = useContext(StateContext)

  const notifications = [
    {
      id: v4(),
      type: "SUCCESS",
      message: "hello world"
    }
  ]

  return (
    <div className={appState.notification ? "notification-provider" : "notifnication-provider-hide"}>
      {notifications.map(note => {
        return <Notifications key={note.id} {...note} />
      })}
      {props.children}
    </div>
  )
}

export default NotificationProvider

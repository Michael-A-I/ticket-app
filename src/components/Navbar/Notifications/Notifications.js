import React from "react"
import "./css/Notifications.css"

function Notification(props) {
  return (
    <>
      <div className="notification">{props.message}</div>
    </>
  )
}

export default Notification

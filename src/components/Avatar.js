import React from "react"
import { useContext } from "react"
import StateContext from "../context/StateContext"

/* User Avatar */
function Avatar(props) {
  const appState = useContext(StateContext)

  return <img src={`${appState.user.avatar}`} alt="avatar" className="img-thumbnail mt-2" style={{ height: `${props.height}`, width: `${props.width}` }} />
}

export default Avatar

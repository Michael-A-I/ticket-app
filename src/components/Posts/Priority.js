import React, { useContext, useEffect, useState } from "react"
import { Button, Dropdown, Form } from "react-bootstrap"
import { useParams } from "react-router"
import StateContext from "../../context/StateContext"

function Priority(props) {
  // current state of status
  const appState = useContext(StateContext)
  const token = appState.user.token
  const { id } = useParams()

  useEffect(() => {
    if (props.retrun) return
    props.getStatus()
  }, [])

  const [priority, setPriority] = useState()

  let stat = ["none", "low", "medium", "high"]
  stat = stat.filter(item => item !== props.priority)
  stat.unshift(props.priority)

  return (
    <>
      {console.log(props.priority)}
      <h1>Priority</h1>
      <Form.Select aria-label="Default select example">
        {stat.map(s => (
          <option value={s}>{s}</option>
        ))}
      </Form.Select>
    </>
  )
}

export default Priority

import React, { useContext, useEffect, useState } from "react"
import { Button, Dropdown, Form } from "react-bootstrap"
import { useParams } from "react-router"
import StateContext from "../../context/StateContext"

function Status(props) {
  // current state of status
  const appState = useContext(StateContext)
  const token = appState.user.token
  const { id } = useParams()

  useEffect(() => {
    if (props.retrun) return
    props.getStatus()
  }, [])

  const [status, setStatus] = useState()

  let stat = ["completed", "additional", "inprogress", "new"]
  stat = stat.filter(item => item !== props.status)
  stat.unshift(props.status)

  return (
    <>
      {console.log(props.status)}
      <h1>Status</h1>
      <Form.Select aria-label="Default select example">
        {stat.map(s => (
          <option value={s}>{s}</option>
        ))}
      </Form.Select>
    </>
  )
}

export default Status

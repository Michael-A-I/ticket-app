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
    props.getStatus()
  }, [])

  return (
    <>
      <Form onSubmit={e => props.handleStatusSubmit(e)}>
        {props.status ? (
          <Form.Select aria-label="Default select example">
            <option value={true}>Completed</option>
            <option value={false}>Not Completed</option>
          </Form.Select>
        ) : (
          <Form.Select aria-label="Default select example">
            <option value={false}>Not Completed</option>
            <option value={true}>Completed</option>
          </Form.Select>
        )}

        <Button type="submit">Submit</Button>
      </Form>
    </>
  )
}

export default Status

// import { Container } from 'reactstrap';
// import React, { useState } from "react"

import { Form, Card, Button } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import StateContext from "../../../../context/StateContext"
import { handleDate } from "../../../../helper/helper"
import { Link } from "react-router-dom"

// import { useState } from "react"
// import { Dropdown } from "bootstrap"
const RenderEditRow = props => {
  const appState = useContext(StateContext)
  const token = appState.user.token

  const { name } = props.row.original

  const [userState, setUserState] = useState(props.row.original)

  useEffect(() => {
    setRoles()
  }, [userState.role])

  console.log("original: " + props.row.original._id)

  console.log(props.row.original)

  const [edit, setEdit] = useState(true)
  const [input, setInput] = useState({ Email: userState.email, firstName: userState.firstName, lastName: userState.lastName })

  const handleChange = event => {
    const target = event.target

    console.log(target.name)
    console.log(target.value)

    setInput(prev => ({ ...prev, [target.name]: target.value }))
    console.log(input)
  }
  /* edit mode */
  const handleEdit = event => {
    setEdit(!edit)
  }

  const roles = ["owner", "administrator", "manager", "member", "support", "unassigned"]
  const setRoles = () => {
    const fromIndex = roles.indexOf(userState.role)
    const toIndex = 0

    const element = roles.splice(fromIndex, 1)[0]

    roles.splice(toIndex, 0, element)

    console.log(roles)
  }
  /* submit User info */
  const handleSubmit = async (event, id) => {
    event.preventDefault()

    console.log(id)

    const form = event.target

    const body = { firstName: form[0].value, lastName: form[1].value, email: form[2].value, role: form[3].value }
    console.log(body)

    /* send data to back end */
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(body)
      })
      console.log(res)
      // const user = await res.json()
      // refresh view
      props.users()
      // console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  /* delete user */
  const handleDelete = async (event, id) => {
    console.log(id)
    event.preventDefault()
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })
      console.log(res)
      // refresh view
      props.users()
    } catch (error) {
      console.log(error)
    }
  }

  console.log({ userState })

  return (
    <>
      {edit ? (
        <Card style={{ display: "flex", flexFlow: "row wrap", alignItems: "center", width: "100%", margin: "0 auto", padding: "10px" }}>
          <Card.Title style={{ width: "100%", margin: "auto" }}>{userState.title}</Card.Title>

          <div style={{ padding: "10px" }}>
            <Card.Text dangerouslySetInnerHTML={{ __html: userState.description }}></Card.Text>
          </div>

          <div style={{ padding: "10px", width: "100%", float: "left" }}>
            <Card.Text>
              Created by {userState.createdBy.firstName} {userState.createdBy.lastName} on {handleDate(userState.createdAt)}
            </Card.Text>
          </div>

          {/* <Card.Text>id: {userState._id}</Card.Text> */}

          {/* <Button variant="primary">Go somewhere</Button> */}
          <Link style={{ background: "black", padding: "5px 20px", color: "white", textDecoration: "none", width: "200px", borderRadius: "5px", display: "inline", textAlign: "center" }} to={`/projects/ticket/${props.row.original._id}`}>
            Go to Ticket
          </Link>
        </Card>
      ) : (
        <>
          {/* <pre>{JSON.stringify(props.row.original)}</pre> */}
          <Form style={{ display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "space-between" }} onSubmit={event => handleSubmit(event, userState._id)}>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" name="firstName" placeholder="First Name" value={input.firstName} onChange={handleChange} />
                <Form.Text className="text-muted">edit first name</Form.Text>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" placeholder="Last Name" value={input.lastName} onChange={handleChange} />
                <Form.Text className="text-muted">{"edit last name"}</Form.Text>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="Email" placeholder="Email" value={input.Email} onChange={handleChange} />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select aria-label="Default select example">
                  <option value={userState.role}>{userState.role}</option>
                  {roles.map(role => {
                    return role == userState.role ? null : <option value={role}>{role}</option>
                  })}
                </Form.Select>
              </Form.Group>
            </div>
            <div>
              {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
            </div>
            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            <div>
              <Button variant="primary" type="btn" onClick={handleEdit}>
                Cancel
              </Button>
            </div>
            <div>
              <Button variant="primary" type="btn" onClick={event => handleDelete(event, userState._id)}>
                Delete
              </Button>
            </div>
          </Form>
        </>
      )}
    </>
  )
}

export default RenderEditRow

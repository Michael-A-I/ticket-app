// import { Container } from 'reactstrap';
// import React, { useState } from "react"

import { Form, Card, Button } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import StateContext from "../../../../context/StateContext"

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

  console.log("original: " + props.row.original)

  const [edit, setEdit] = useState(true)

  const handleChange = event => {
    const target = event.target

    console.log(target.name)
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

  return (
    <>
      {edit ? (
        <Card style={{ width: "18rem", margin: "0 auto" }}>
          <Card.Title>
            {userState.firstName} {userState.lastName}{" "}
          </Card.Title>

          <Card.Img variant="top" src={userState.image} />
          <Card.Text>Role: {userState.role}</Card.Text>
          <Card.Text>Email: {userState.email}</Card.Text>
          <Card.Text>Created: {userState.createdAt}</Card.Text>
          <Card.Text>id: {userState._id}</Card.Text>

          <Button variant="primary">Go somewhere</Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Card>
      ) : (
        <>
          <pre>{JSON.stringify(props.row.original)}</pre>
          <Form style={{ width: "18rem", margin: "0 auto" }} onSubmit={event => handleSubmit(event, userState._id)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" name="firstName" placeholder="First Name" value={userState.firstName} onChange={handleChange} />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" placeholder="Last Name" value={userState.lastName} onChange={handleChange} />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="lastName" placeholder="Email" value={userState.email} onChange={handleChange} />
              <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Select aria-label="Default select example">
                <option value={userState.role}>{userState.role}</option>
                {roles.map(role => {
                  return role == userState.role ? null : <option value={role}>{role}</option>
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="primary" type="btn" onClick={handleEdit}>
              Cancel
            </Button>
            <Button variant="primary" type="btn" onClick={event => handleDelete(event, userState._id)}>
              Delete
            </Button>
          </Form>
        </>
      )}
    </>
  )
}

export default RenderEditRow

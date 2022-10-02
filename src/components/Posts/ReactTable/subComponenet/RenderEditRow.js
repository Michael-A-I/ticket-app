// import { Container } from 'reactstrap';
// import React, { useState } from "react"

import { Form, Card, Button, Row, Col } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import StateContext from "../../../../context/StateContext"
import { handleDate } from "../../../../helper/helper"
import msgConext from "../../../ui/helpers/toastyMessages"

// import { useState } from "react"
// import { Dropdown } from "bootstrap"
const RenderEditRow = props => {
  const appState = useContext(StateContext)
  const token = appState.user.token

  const { name } = props.row.original

  console.log({ userId: props.row.original.userId })

  const [userState, setUserState] = useState(props.row.original)

  useEffect(() => {
    setRoles()
  }, [userState.role])

  console.log("original: " + props.row.original)

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
    console.log("handleSubmit")
    event.preventDefault()

    const form = event.target

    const body = { firstName: form[0].value, lastName: form[1].value, email: form[2].value, role: form[3].value }
    console.log(body)

    let formRole = body.role

    const roleUpdate = { owner: ["owner", "admin", "member", "support"], administrator: ["admin", "member", "support"], member: ["member", "support"], support: ["support"] }

    for (const [key, value] of Object.entries(roleUpdate)) {
      if (key == formRole) {
        formRole = value
      }
    }

    try {
      /* send data to back end */
      console.log("id")

      console.log({ id })

      // ! Update front end
      const res = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(body)
      })

      props.users()

      //! Update Userfront
      const userId = props.row.original.userId
      const payload = {
        email: body.email,
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email
        }
      }
      const roles = {
        roles: formRole
      }

      // const response = await fetch(`https://api.userfront.com/v0/users/${userId}/`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer uf_test_admin_pn4qd8qb_716f06f96e75339e20560eff39515269"
      //   },
      //   body: JSON.stringify(payload)
      // })
      try {
        const response = await fetch(`/api/user/userfront/${userId}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([payload, roles])
        })

        const msg = await response.json()

        msgHandler(msg)
      } catch (err) {
        console.log(err)
        props.setMsg({
          show: true,
          poisiton: "center",
          msg: err.message,
          title: "Error",
          context: msgConext.danger
        })
      }
    } catch (err) {
      errHandler(err)
    }

    const msgHandler = msg => {
      if (msg.err) {
        props.setMsg({
          show: true,
          poisiton: "center",
          msg: msg.err,
          title: "Error",
          context: msgConext.danger
        })
      } else {
        props.setMsg({
          show: true,
          poisiton: "center",
          msg: msg.msg,
          title: "Error",
          context: msgConext.success
        })
      }
    }
    const errHandler = err => {
      console.log(err)
      props.setMsg({
        show: true,
        poisiton: "center",
        msg: err.message,
        title: "Error",
        context: msgConext.danger
      })
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
        <div>
          <Row style={{ boxShadow: "1px 2px black" }}>
            <Col style={{ maxWidth: "150px" }}></Col>
            <Col style={{ maxWidth: "250px", padding: "0px" }}>
              <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                <p style={{ margin: "0px", padding: "10px" }}>
                  {userState.firstName} {userState.lastName}
                </p>
              </div>
            </Col>
            <Col style={{ maxWidth: "250px", padding: "5px" }}>
              <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                <Card.Img variant="top" src={userState.image} style={{ height: "50px", width: "50px" }} />
              </div>
            </Col>
            <Col style={{ maxWidth: "250px", padding: "0px" }}>
              <div style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                <Card.Text>Created: {handleDate(userState.createdAt)}</Card.Text>
              </div>
            </Col>
            <Col style={{ maxWidth: "250px", padding: "0px" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card.Text>Role: {userState.role}</Card.Text>
              </div>
            </Col>
            <Col style={{ maxWidth: "250px", padding: "0px" }}>
              <Button style={{ width: "50%", margin: "auto" }} variant="primary" onClick={handleEdit}>
                Edit
              </Button>
            </Col>
          </Row>
        </div>
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

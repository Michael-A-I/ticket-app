import React, { useContext, useEffect, useState } from "react"
import { Button, Card, Container, FormControl, InputGroup } from "react-bootstrap"
import Navbar from "./Navbar"

import StateContext from "../context/StateContext"
import { Link } from "react-router-dom"
import Page from "./Page"

import ReactPaginate from "react-paginate"

function UserIndex() {
  const appState = useContext(StateContext)
  const token = appState.user.token

  const [users, setUsers] = useState([])
  const [pagination, setPagination] = useState({ data: [], offset: 0, numberPerPage: 10, pageCount: 0, currentData: [] })

  useEffect(() => {
    setDataAgain()
  }, [])

  const getUsers = async () => {
    try {
      const res = await fetch(`/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        }
      })

      const users = await res.json()

      // setUsers(users)

      return users
    } catch (error) {
      console.log(error)
    }
  }

  const setData = async () => {
    /* will run first */
    const result = await getUsers()
    /* set data */
    setPagination(prev => ({ ...prev, data: result, pageCount: prev.data.length / prev.numberPerPage }))

    console.log(result)

    return
  }

  const setDataAgain = async () => {
    await setData()

    setPagination(prev => ({ ...prev, currentData: prev.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage) }))
  }

  const handlePageClick = event => {
    const selected = event.selected
    const offset = selected * pagination.numberPerPage
    setPagination({ ...pagination, offset })
  }
  return (
    <>
      {/* <pre>{users}</pre> */}

      <Page>
        <Container>
          {/* Filter Users */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Users</InputGroup.Text>
            <FormControl placeholder="Find Users" aria-label="Username" aria-describedby="basic-addon1" />
          </InputGroup>
          {console.log(pagination)}
          {pagination.currentData &&
            pagination.currentData.map((user, index) => (
              <Card key={user._id}>
                {user.image ? <Card.Img variant="top" src={user.image} alt="profile" style={{ width: "250px", height: "250px" }} /> : <Card.Img variant="top" src={"/default-profile.jpg"} alt="profile" style={{ width: "250px", height: "250px" }} />}

                <Card.Body>
                  <Card.Title>
                    <Link to={"#"}>
                      <h1>{user.username}</h1>
                    </Link>
                  </Card.Title>
                  <Card.Text>{user.title}</Card.Text>
                  <Card.Text>{user.bio}</Card.Text>
                </Card.Body>
              </Card>
            ))}

          <ReactPaginate previousLabel={"previous"} nextLabel={"next"} breakLabel={"..."} pageCount={pagination.pageCount} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={handlePageClick} containerClassName={"pagination"} activeClassName={"active"} />

          {/* {console.log(users)} */}
        </Container>
      </Page>
    </>
  )
}

export default UserIndex

/* {users.map(user => (
  <Card>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>
        <Link to={"#"}>
          <h1>{user.username}</h1>
        </Link>
      </Card.Title>
      <Card.Text>{user.title}</Card.Text>
      <Card.Text>{user.bio}</Card.Text>
    </Card.Body>
  </Card>
))} */

/* {pagination.currentData &&
  pagination.currentData.map((item, index) => (
    <div key={item._id} className="post">
      <h3>{`${item.title} - ${item.id}`}</h3>
      <p>{item.bio}</p>
    </div>
  ))} */

/*  <h1>People ({users.length}) users</h1>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          </InputGroup> */

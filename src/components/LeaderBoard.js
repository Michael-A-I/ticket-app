import React, { useContext } from "react"
import { Button, Card, Container } from "react-bootstrap"
import Navbar from "./Navbar"
import Page from "./Page"
import StateContext from "../context/StateContext"
import { useParams } from "react-router"
import { useEffect } from "react"
import { useState } from "react"

function LeaderBoard() {
  const appState = useContext(StateContext)
  const { id } = useParams()

  const [activity, setActivity] = useState([])

  useEffect(() => {
    console.log("Check Follow")
    analytics()
  }, [])

  const analytics = async () => {
    /* Persistance */
    console.log("analytics")

    const token = appState.user.token

    const res = await fetch("/api/users/leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })

    const state = await res.json()

    console.log(state[0])

    setActivity(state[0])
  }

  /* get  */
  return (
    <>
      <Navbar></Navbar>
      <Page>
        <Container>
          <h1>Leaderboard</h1>
          <div className="container">
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>
                  <h1>Most Activity</h1>
                </Card.Title>
                {activity.map(activity => (
                  <Card.Text>{activity.username}</Card.Text>
                ))}

                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Page>
    </>
  )
}

export default LeaderBoard
